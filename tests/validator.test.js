import { validator } from '../src/js/validator';

describe('InputValidation', () => {
  it('should validate the name correctly', () => {
    const inputName = {
      Fulana: {
        value: 'Fulana',
        name: 'FulanaField',
      },
      Cicrana: {
        value: '',
        name: 'CicranaField',
      },
    };
    const isNameValid = validator.validatorByType.name.validate(inputName.Fulana);
    expect(isNameValid).toEqual(true);

    const isCicranaNameValid = validator.validatorByType.name.validate(inputName.Cicrana);
    expect(isCicranaNameValid).toEqual(false);
    expect(validator.validatorByType.name.message(inputName.Cicrana)).toEqual('CicranaField cannot be blank.');
  });

  it('should validate the email correctly', () => {
    const inputEmail = {
      Fulana: {
        value: 'fulana@teste.com.br',
        name: 'FulanaFieldEmail',
      },
      Cicrana: {
        value: 'cicranateste',
        name: 'CicranaFieldEmail',
      },
    };

    const isCricranaEmailValid = validator.validatorByType.email.validate(inputEmail.Cicrana);
    expect(isCricranaEmailValid).toEqual(false);
    expect(validator.validatorByType.email.message(inputEmail.Cicrana)).toEqual('Invalid email format');
    const isEmailValid = validator.validatorByType.email.validate(inputEmail.Fulana);
    expect(isEmailValid).toEqual(true);
  });
});
