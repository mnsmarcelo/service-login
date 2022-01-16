import { Controller, HttpResponse, Validation } from 'src/presentation/protocols';
import { Authentication } from 'src/domain/usecases';
import {
  badRequest, ok, serverError, unauthorized,
} from 'src/presentation/helpers';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const authenticationModel = await this.authentication.auth(request);
      if (!authenticationModel) {
        return unauthorized();
      }
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  };
}
