import { validator } from './validator';
import {jest} from '@jest/globals';

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
    const inputEmail = [
      {
        value: 'fulana@teste.com.br',
        name: 'FulanaFieldEmail',
        expected: true,
      },
      {
        value: 'cicranateste',
        name: 'CicranaFieldEmail',
        expected: false,
      },
      {
        value: 'fulaninhagmail.com',
        name: 'emailWithoutAt',
        expected: false,
      },
      {
        value: 'fulaninha@gmailcom',
        name: 'emailWithoutDot',
        expected: false,
      },
      {
        value: '.fulaninhagmail@com',
        name: 'emailWithoutFormat',
        expected: false,
      },
    ];
    expect.assertions(inputEmail.reduce(
      (acc, testCase) => (testCase.expected ? acc + 1 : acc + 2),
      0,
    ));

    inputEmail.forEach((testCase) => {
      const isEmailValid = validator.validatorByType.email.validate(testCase);
      expect(isEmailValid).toEqual(testCase.expected);
      if (!isEmailValid) {
        expect(validator.validatorByType.email.message(testCase)).toEqual('Invalid email format');
      }
    });
  });
});
