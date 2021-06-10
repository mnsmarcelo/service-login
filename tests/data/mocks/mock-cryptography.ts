import faker from 'faker';
import { Hasher, HashComparer, Encrypter } from 'src/data/protocols';

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid();

  plainText: string;

  async hash(plainText: string): Promise<string> {
    this.plainText = plainText;

    return this.digest;
  }
}

export class HashComparerSpy implements HashComparer {
  plainText: string;

  digest: string;

  isValid = true;

  async compare(plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText;
    this.digest = digest;
    return this.isValid;
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.datatype.uuid();

  plainText: string;

  async encrypt(plainText: string): Promise<string> {
    this.plainText = plainText;
    return this.ciphertext;
  }
}
