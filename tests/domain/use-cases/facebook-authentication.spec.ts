import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/domain/contracts/repos'
import { TokenGeneration } from '@/domain/contracts/crypto'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

jest.mock('@/domain/entities/facebook-account')

describe('FacebookAuthentication', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGeneration>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let sut: FacebookAuthentication
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    crypto = mock()
    crypto.generationToken.mockResolvedValue('any_generated_token')
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })
  })

  beforeEach(() => {
    sut = setupFacebookAuthentication(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('shoul throw AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('shoul call LoadFacebookUserApi with correct', async () => {
    await sut({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('shoul call loadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('shoul call SaveFacebookRepository with correct FacebookAccount', async () => {
    mocked(FacebookAccount).mockImplementation(jest.fn().mockImplementation(() => ({ any: 'any' })))
    await sut({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('shoul call TokenGeneration with correct params', async () => {
    await sut({ token })

    expect(crypto.generationToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('shoul return an AccessToken on success', async () => {
    const authResult = await sut({ token })
    expect(authResult).toEqual({ accessToken: 'any_generated_token' })
  })

  it('shoul rethrow  if LoadFacebookUserAPi', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })

  it('shoul rethrow  if LoadUserAccountRepository', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })

  it('shoul rethrow  if SaveFacebookAccountRepositoy', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })

  it('shoul rethrow  if TokenGeneration', async () => {
    crypto.generationToken.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })
})
