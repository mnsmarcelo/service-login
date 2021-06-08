import { DbAddAccount } from 'src/data/usecases/db-add-account';
import { HasherSpy } from 'tests/data/mocks/mock-cryptography';
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy } from 'tests/data/mocks/mock-db-account';
import { mockAddAccountParams } from 'tests/domain/mocks/mock-account';

type SutTypes = {
  sut: DbAddAccount,
  hasherSpy: HasherSpy,
  addAccountRepositorySpy: AddAccountRepositorySpy,
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy,
};

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const sut = new DbAddAccount(
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  );

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct plainText', async () => {
    const { sut, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(hasherSpy.plainText).toBe(addAccountParams.password);
  });
});
