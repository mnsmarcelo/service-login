import { AddAccount } from 'src/domain/usecases';
import { CheckAccountByEmailRepository, Hasher } from 'src/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exist = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)ç
    let isValid = false;
    if (!exist) {
      const hashedPassword = await this.hasher.hash(accountData.password);
    }
    return isValid;
  }
}