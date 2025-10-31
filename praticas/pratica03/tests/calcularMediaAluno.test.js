const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('A função calcularMediaAluno deve estar definida', () => {
  expect(calcularMediaAluno).toBeDefined();
});

test('Deve lançar erro se a1 ou a2 não forem informadas', () => {
  expect(() => calcularMediaAluno(undefined, 8, 7))
    .toThrow('Notas a1 ou a2 não informadas');
  expect(() => calcularMediaAluno(5, undefined, 7))
    .toThrow('Notas a1 ou a2 não informadas');
});

test('Deve lançar erro se a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-5, 8, 7))
    .toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(5, -8, 7))
    .toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('Deve lançar erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(6, 9, -3))
    .toThrow('Nota a3 não pode ser negativa');
});

test('Cálculo da média quando a3 não é informada', () => {
  const resultado = calcularMediaAluno(6, 9); 
  expect(resultado).toBeCloseTo(6 * 0.4 + 9 * 0.6); 
});

test('Cálculo da média quando a3 é informada', () => {
  const a1 = 6;
  const a2 = 9;
  const a3 = 3;
  const mediaAritmetica = (a1 + a2 + a3) / 3;
  const combinacaoA1A3 = (a1 + a3) / 2;
  const combinacaoA2A3 = (a2 + a3) / 2;
  const esperado = Math.max(mediaAritmetica, combinacaoA1A3, combinacaoA2A3);

  const resultado = calcularMediaAluno(a1, a2, a3);
  expect(resultado).toBeCloseTo(esperado);
});

test('Cálculo da média quando a3 é informada e melhor combinação é a1 com a3', () => {
  const a1 = 7;
  const a2 = 5;
  const a3 = 9;
  const mediaAritmetica = (a1 + a2 + a3) / 3;
  const combinacaoA1A3 = (a1 + a3) / 2;
  const combinacaoA2A3 = (a2 + a3) / 2;
  const esperado = Math.max(mediaAritmetica, combinacaoA1A3, combinacaoA2A3);

  const resultado = calcularMediaAluno(a1, a2, a3);
  expect(resultado).toBeCloseTo(esperado);
});

test('Cálculo da média quando a3 é informada e melhor combinação é a3 com a2', () => {
  const a1 = 4;
  const a2 = 8;
  const a3 = 10;
  const mediaAritmetica = (a1 + a2 + a3) / 3;
  const combinacaoA1A3 = (a1 + a3) / 2;
  const combinacaoA2A3 = (a2 + a3) / 2;
  const esperado = Math.max(mediaAritmetica, combinacaoA1A3, combinacaoA2A3);

  const resultado = calcularMediaAluno(a1, a2, a3);
  expect(resultado).toBeCloseTo(esperado);
});
