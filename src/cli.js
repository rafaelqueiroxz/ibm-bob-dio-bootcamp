#!/usr/bin/env node
const { carregarTrilhas, obterTrilha, gerarDesafio, gerarCertificado } = require('./geo-explorer');
const { formatarTrilha, formatarDesafio, formatarCertificado } = require('./formatters');

function ajuda() {
  console.log(`Geo-Explorer\n\nUso:\n  node src/cli.js trilha <tecnologia>\n  node src/cli.js desafio <tecnologia> <iniciante|intermediario|avancado>\n  node src/cli.js certificado <nome> <tecnologia>\n  node src/cli.js listar`);
}

try {
  const [comando, ...args] = process.argv.slice(2);
  if (comando === 'trilha') console.log(formatarTrilha(obterTrilha(args.join(' '))));
  else if (comando === 'desafio') console.log(formatarDesafio(gerarDesafio(args[0], args[1])));
  else if (comando === 'certificado') {
    const separador = args.indexOf('--');
    const nome = separador >= 0 ? args.slice(0, separador).join(' ') : args[0];
    const tecnologia = separador >= 0 ? args.slice(separador + 1).join(' ') : args.slice(1).join(' ');
    console.log(formatarCertificado(gerarCertificado(nome, tecnologia)));
  } else if (comando === 'listar') console.log(carregarTrilhas().map((t) => `- ${t.tecnologia} (${t.nivel})`).join('\n'));
  else ajuda();
} catch (erro) {
  console.error(`Erro: ${erro.message}`);
  process.exitCode = 1;
}
