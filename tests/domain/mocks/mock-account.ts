import faker from 'faker';
import { AddAccount } from 'src/domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
