import { AddAccountRepository, CheckAccountByEmailRepository } from 'src/data/protocols';
import { MongoHelper } from 'src/infra/db/mongodb/mongo-helper';

export class AccountMongoRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository {
  async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(data);
    return result.ops[0] !== null;
  }

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      email,
    }, {
      projection: {
        _id: true,
      },
    });
    return account !== null;
  }
}
