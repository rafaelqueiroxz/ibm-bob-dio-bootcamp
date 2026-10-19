// Servidor MCP minimalista baseado em JSON Lines, sem dependências externas.
const readline = require('node:readline');
const { obterTrilha, gerarDesafio, gerarCertificado } = require('./geo-explorer');

const tools = [
  { name: 'consultar_trilha', description: 'Consulta uma trilha por tecnologia.', inputSchema: { type: 'object', properties: { tecnologia: { type: 'string' } }, required: ['tecnologia'] } },
  { name: 'gerar_desafio', description: 'Gera um desafio de código.', inputSchema: { type: 'object', properties: { tecnologia: { type: 'string' }, nivel: { type: 'string' } }, required: ['tecnologia', 'nivel'] } },
  { name: 'gerar_certificado', description: 'Gera certificado fictício.', inputSchema: { type: 'object', properties: { nome: { type: 'string' }, tecnologia: { type: 'string' } }, required: ['nome', 'tecnologia'] } }
];

function responder(id, result) { process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, result })}\n`); }
function falhar(id, message) { process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, error: { code: -32000, message } })}\n`); }

readline.createInterface({ input: process.stdin }).on('line', (line) => {
  try {
    const request = JSON.parse(line); const args = request.params?.arguments || {};
    if (request.method === 'tools/list') return responder(request.id, { tools });
    if (request.method === 'tools/call') {
      const result = request.params.name === 'consultar_trilha' ? obterTrilha(args.tecnologia)
        : request.params.name === 'gerar_desafio' ? gerarDesafio(args.tecnologia, args.nivel)
        : request.params.name === 'gerar_certificado' ? gerarCertificado(args.nome, args.tecnologia)
        : null;
      if (!result) throw new Error('Ferramenta não encontrada.');
      return responder(request.id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] });
    }
    responder(request.id, {});
  } catch (erro) { falhar(null, erro.message); }
});
