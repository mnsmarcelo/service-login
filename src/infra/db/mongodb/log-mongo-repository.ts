import { MongoHelper } from 'src/infra/db/mongodb/mongo-helper';
import { LogErrorRepository } from 'src/data/protocols/log';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
