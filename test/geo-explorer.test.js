const test = require('node:test');
const assert = require('node:assert/strict');
const { buscarTrilha, gerarDesafio, gerarCertificado } = require('../src/geo-explorer');

test('encontra trilha sem diferenciar maiúsculas e acentos', () => {
  assert.equal(buscarTrilha('JAVASCRIPT').id, 'javascript');
  assert.equal(buscarTrilha('cloud computing').id, 'cloud');
});

test('gera desafio no nível solicitado', () => {
  const desafio = gerarDesafio('python', 'intermediario');
  assert.equal(desafio.nivel, 'intermediario');
  assert.match(desafio.enunciado, /Python/);
});

test('gera certificado fictício com dados da trilha', () => {
  const certificado = gerarCertificado('Ana Silva', 'javascript');
  assert.equal(certificado.estudante, 'Ana Silva');
  assert.equal(certificado.cargaHoraria, 24);
  assert.match(certificado.codigo, /^GEO-JAVASCRIPT-/);
});
