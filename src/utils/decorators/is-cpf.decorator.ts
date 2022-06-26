import { registerDecorator, ValidationOptions } from 'class-validator';

function isValidCpf(cpf: string): boolean {
  const cpfNumbersOnly = cpf.replace(/[^\d]+/g, '');
  if (
    cpfNumbersOnly.length !== 11 ||
    !cpfNumbersOnly.split('').filter(digit => digit !== cpfNumbersOnly[0])
      .length
  ) {
    return false;
  }

  const validator = cpfNumbersOnly
    .split('')
    // Pegar os últimos 2 digitos de validação
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    // Transformar digitos em números
    .map(el => +el);

  const toValidate = pop =>
    cpfNumbersOnly
      .split('')
      // Pegar Array de items para validar
      .filter((digit, index, array) => index < array.length - pop && digit)
      // Transformar digitos em números
      .map(el => +el);

  const rest = (count, pop) =>
    ((toValidate(pop)
      // Calcular Soma dos digitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      // Pegar o resto por 11
      11) %
    // transformar de 10 para 0
    10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCPF',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} must be a valid CPF`,
      },
      validator: {
        validate(value: string) {
          return value && isValidCpf(value);
        },
      },
    });
  };
}
