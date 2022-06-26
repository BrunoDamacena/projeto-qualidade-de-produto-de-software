import { registerDecorator, ValidationOptions } from 'class-validator';

function isValidCep(cep: string): boolean {
  const cepNumbersOnly = cep.replace(/[^\d]+/g, '');

  return cepNumbersOnly.length === 8;
}

export function IsCEP(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCEP',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} must be a valid CEP`,
      },
      validator: {
        validate(value: string) {
          return value && isValidCep(value);
        },
      },
    });
  };
}
