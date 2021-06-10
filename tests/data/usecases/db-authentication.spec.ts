import { DbAuthentication } from 'src/data/usecases';

import {
  EncrypterSpy,
  HashComparerSpy,
  LoadAccountByEmailRepositorySpy,
  UpdateAccessTokenRepositorySpy,
} from 'tests/data/mocks/';
import { mockAuthenticationParams } from 'tests/domain/mocks';

type SutType = {
  sut: DbAuthentication,
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy,
  hashComparerSpy: HashComparerSpy,
  encrypterSpy: EncrypterSpy,
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy,
};

const makeSut = ():SutType => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
  );
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email);
  });
});
