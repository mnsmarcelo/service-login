import { LogControllerDecorator } from 'src/main/decorators';
import { Controller } from 'src/presentation/protocols';
import { LogMongoRepository } from 'src/infra/db/mongodb/log-mongo-repository';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
