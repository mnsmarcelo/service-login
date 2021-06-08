import faker from 'faker';
import { Hasher } from 'src/data/protocols';

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid();

  plainText: string;

  async hash(plainText: string): Promise<string> {
    this.plainText = plainText;

    return this.digest;
  }
}
