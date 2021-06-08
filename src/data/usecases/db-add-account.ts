import { AddAccount } from 'src/domain/usecases';
import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from 'src/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exist = await this.checkAccountByEmailRepository.checkByEmail(accountData.email);
    let isValid = false;
    if (!exist) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      isValid = await this.addAccountRepository.add({
        ...accountData,
        password: hashedPassword,
      });
    }
    return isValid;
  }
}
