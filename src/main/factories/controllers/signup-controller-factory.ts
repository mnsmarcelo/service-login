import { Controller } from 'src/presentation/protocols';
import { SignUpController } from 'src/presentation/controllers/signup-controller';
import { makeDbAddAccount } from 'src/main/factories';
import { makeSignUpValidation } from 'src/main/factories/controllers/signup-validation-factory';
import { makeDbAuthentication } from 'src/main/factories/usecases/authentication-factory';
import { makeLogControllerDecorator } from 'src/main/factories/decorators';

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(controller);
};
