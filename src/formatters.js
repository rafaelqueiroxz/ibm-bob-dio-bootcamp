function formatarTrilha(trilha) {
  const modulos = trilha.modulos.map((modulo, indice) =>
    `  ${indice + 1}. ${modulo.titulo} (${modulo.duracao})\n     Conteúdos: ${modulo.conteudos.join(', ')}`
  ).join('\n');
  return `\n${trilha.tecnologia} — nível ${trilha.nivel}\nCarga horária: ${trilha.cargaHoraria}h\n\nMódulos:\n${modulos}\n`;
}

function formatarDesafio(desafio) {
  return `\nDESAFIO — ${desafio.tecnologia} (${desafio.nivel})\n\n${desafio.enunciado}\n\nCritérios:\n${desafio.criterios.map((item) => `- ${item}`).join('\n')}\n`;
}

function formatarCertificado(certificado) {
  return `\n╔══════════════════════════════════════════════╗\n║           ${certificado.tipo.padEnd(28)}║\n╚══════════════════════════════════════════════╝\n\nCertificamos que ${certificado.estudante} concluiu a trilha\n${certificado.trilha}, com carga horária de ${certificado.cargaHoraria} horas.\n\nEmissão: ${certificado.emitidoEm}\nCódigo de validação: ${certificado.codigo}\n\nEste documento é fictício e tem finalidade educacional.\n`;
}

module.exports = { formatarTrilha, formatarDesafio, formatarCertificado };
