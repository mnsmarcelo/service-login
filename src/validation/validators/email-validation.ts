import { Validation } from 'src/presentation/protocols';
import { InvalidParamError } from 'src/presentation/errors';
import { EmailValidator } from 'src/validation/protocols';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    let error: InvalidParamError;
    if (!isValid) {
      error = new InvalidParamError(this.fieldName);
    }
    return error;
  }
}
