import { Validation } from 'src/presentation/protocols';
import { InvalidParamError } from 'src/presentation/errors';

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string,
  ) {}

  validate(input: any): Error {
    let error: InvalidParamError;
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      error = new InvalidParamError(this.fieldToCompareName);
    }
    return error;
  }
}
