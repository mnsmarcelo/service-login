import { Collection } from 'mongodb';
import faker from 'faker';
import { AccountMongoRepository } from 'src/infra/db/mongodb/account-mongo-repository';
import { MongoHelper } from 'src/infra/db/mongodb/mongo-helper';
import { mockAddAccountParams } from 'tests/domain/mocks/mock-account';

const makeSut = (): AccountMongoRepository => new AccountMongoRepository();

let accountColletion : Collection;

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountColletion = await MongoHelper.getCollection('accounts');
    await accountColletion.deleteMany({});
  });

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      const isValid = await sut.add(addAccountParams);
      expect(isValid).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountColletion.insertOne(addAccountParams);
      const exists = await sut.checkByEmail(addAccountParams.email);
      expect(exists).toBeTruthy();
    });

    test('Should return false if email not valid', async () => {
      const sut = makeSut();
      const exists = await sut.checkByEmail(faker.internet.email());
      expect(exists).toBeFalsy();
    });
  });
});
