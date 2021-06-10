import { Validation } from 'src/presentation/protocols';
import { MissingParamError } from 'src/presentation/errors/missing-param-error';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    let error: MissingParamError;
    if (!input[this.fieldName]) {
      error = new MissingParamError(this.fieldName);
    }
    return error;
  }
}
