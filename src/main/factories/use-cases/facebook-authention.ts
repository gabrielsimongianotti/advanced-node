import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenHandler } from '../crypto'
import { makePgUserAccountRepo } from '../repository'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler())
}
