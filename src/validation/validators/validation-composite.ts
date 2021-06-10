import { Validation } from 'src/presentation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  // eslint-disable-next-line consistent-return
  validate(input: any): Error {
    // eslint-disable-next-line no-restricted-syntax
    for (const validation of this.validations) {
      const validate = validation.validate(input);
      if (validate) {
        return validate;
      }
    }
  }
}
