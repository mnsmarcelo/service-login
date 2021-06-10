import { Validation } from 'src/presentation/protocols';
import {
  RequiredFieldValidation, CompareFieldsValidation, ValidationComposite,
} from 'src/validation/validators';
import { EmailValidation } from 'src/validation/validators/email-validation';
import { EmailValidatorAdapter } from 'src/infra/validators/email-validator-adapter';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['name', 'email', 'password', 'passwordConfirmation'].map((field) => {
    validations.push(new RequiredFieldValidation(field));
    return field;
  });

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
