import { MongoHelper } from 'src/infra/db/mongodb/mongo-helper';
import {
  AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from 'src/data/protocols';

export class AccountMongoRepository implements
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository {
  async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(data);
    return result.ops[0] !== null;
  }

  async loadByEmail(email:string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      email,
    }, {
      projection: {
        _id: true,
        name: true,
        password: true,
      },
    });
    return account && MongoHelper.map(account);
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({
      _id: id,
    }, {
      $set: {
        accessToken: token,
      },
    });
  }
}
