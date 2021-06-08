import { AddAccountRepository } from 'src/data/protocols';
import { MongoHelper } from 'src/infra/db/mongodb/mongo-helper';

export class AccountMongoRepository implements
  AddAccountRepository {
  async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(data);
    return result.ops[0] !== null;
  }
}
