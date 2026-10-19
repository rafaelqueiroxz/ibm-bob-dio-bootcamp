const fs = require('node:fs');
const path = require('node:path');

const databasePath = path.join(__dirname, '..', 'data', 'trilhas.json');

function normalizar(valor = '') {
  return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function carregarTrilhas() {
  return JSON.parse(fs.readFileSync(databasePath, 'utf8')).trilhas;
}

function buscarTrilha(tecnologia) {
  const termo = normalizar(tecnologia);
  return carregarTrilhas().find((trilha) =>
    normalizar(trilha.id) === termo || normalizar(trilha.tecnologia) === termo
  );
}

function obterTrilha(tecnologia) {
  const trilha = buscarTrilha(tecnologia);
  if (!trilha) throw new Error(`Trilha não encontrada para: ${tecnologia}.`);
  return trilha;
}

function gerarDesafio(tecnologia, nivel) {
  const trilha = obterTrilha(tecnologia);
  const nivelSolicitado = normalizar(nivel);
  const desafios = {
    iniciante: `Crie uma pequena aplicação usando ${trilha.tecnologia} que registre e liste tarefas. Valide os dados antes de salvar.`,
    intermediario: `Crie uma API simples com ${trilha.tecnologia} para organizar módulos de estudo. Inclua tratamento de erros e testes.`,
    avancado: `Projete uma solução escalável em ${trilha.tecnologia} para recomendar conteúdos, documentando decisões de arquitetura e segurança.`
  };
  if (!desafios[nivelSolicitado]) throw new Error('Nível inválido. Use iniciante, intermediario ou avancado.');
  return { tecnologia: trilha.tecnologia, nivel: nivelSolicitado, enunciado: desafios[nivelSolicitado], criterios: ['Código legível', 'Tratamento de erros', 'README com instruções'] };
}

function gerarCertificado(nome, tecnologia) {
  if (!nome || !nome.trim()) throw new Error('Informe o nome da pessoa estudante.');
  const trilha = obterTrilha(tecnologia);
  return {
    tipo: 'CERTIFICADO FICTÍCIO',
    estudante: nome.trim(),
    trilha: trilha.tecnologia,
    cargaHoraria: trilha.cargaHoraria,
    emitidoEm: new Date().toLocaleDateString('pt-BR'),
    codigo: `GEO-${trilha.id.toUpperCase()}-${Date.now().toString().slice(-6)}`
  };
}

module.exports = { carregarTrilhas, buscarTrilha, obterTrilha, gerarDesafio, gerarCertificado };
