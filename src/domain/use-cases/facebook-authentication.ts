import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/domain/contracts/repos'
import { TokenGeneration } from '@/domain/contracts/crypto'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (
  facebookApi: LoadFacebookUserApi,
  userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  crypto: TokenGeneration
) => FacebookAuthentication

export type FacebookAuthentication = (params: { token: string }) => Promise<{ accessToken: string} >

export const setupFacebookAuthentication: Setup = (facebookApi, userAccountRepo, crypto) => async params => {
  const fbData = await facebookApi.loadUser(params)
  if (fbData === undefined) throw new AuthenticationError()
  const accountData = await userAccountRepo.load({ email: fbData.email })
  const fbAccount = new FacebookAccount(fbData, accountData)
  const { id: key } = await userAccountRepo.saveWithFacebook(fbAccount)
  const accessToken = await crypto.generationToken({ key, expirationInMs: AccessToken.expirationInMs })
  return { accessToken }
}
