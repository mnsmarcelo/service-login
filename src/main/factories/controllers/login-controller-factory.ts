import { Controller } from 'src/presentation/protocols';
import { LoginController } from 'src/presentation/controllers/login-controller';
import { makeDbAuthentication } from 'src/main/factories/usecases/authentication-factory';
import { makeLoginValidation } from 'src/main/factories/controllers/login-validation-factory';

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return controller;
};
