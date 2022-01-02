import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos'
import { TokenGeneration } from '@/data/contracts/crypto'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken, FacebookAccount } from '@/domain/models'

jest.mock('@/domain/models/facebook-account')

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGeneration>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let sut: FacebookAuthenticationService
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
    crypto.generateToken.mockResolvedValue('any_generated_token')
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })
  })

  beforeEach(() => {
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('shoul return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('shoul call LoadFacebookUserApi with correct', async () => {
    await sut.perform({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('shoul call loadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('shoul call SaveFacebookRepository with correct FacebookAccount', async () => {
    mocked(FacebookAccount).mockImplementation(jest.fn().mockImplementation(() => ({})))
    await sut.perform({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({})
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('shoul call TokenGeneration with correct params', async () => {
    await sut.perform({ token })

    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('shoul return an AccessToken on success', async () => {
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })

  it('shoul rethrow  if LoadFacebookUserAPi', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut.perform({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })

  it('shoul rethrow  if LoadUserAccountRepository', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut.perform({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })

  it('shoul rethrow  if SaveFacebookAccountRepositoy', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut.perform({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })

  it('shoul rethrow  if TokenGeneration', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('fb_error'))
    const promice = sut.perform({ token })

    await expect(promice).rejects.toThrow(new Error('fb_error'))
  })
})
