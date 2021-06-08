import { AddAccount } from 'src/domain/usecases';
import { BcryptAdapter } from 'src/infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from 'src/infra/db';
import { DbAddAccount } from 'src/data/usecases/db-add-account';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
