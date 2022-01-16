import { RequiredFieldValidation, ValidationComposite } from 'src/validation/validators';
import { Validation } from 'src/presentation/protocols';
import { EmailValidation } from 'src/validation/validators/email-validation';
import { EmailValidatorAdapter } from 'src/infra/validators/email-validator-adapter';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  ['email', 'password'].map((field) => {
    validations.push(new RequiredFieldValidation(field));
    return field;
  });

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
