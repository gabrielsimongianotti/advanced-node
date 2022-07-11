import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('Should return a FacebookUser if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: env.facebookApi.token })

    expect(fbUser).toEqual({
      facebookId: '102876532498041',
      email: 'open_bypwkgn_user@tfbnw.net',
      name: 'Open Graph Test User'
    })
  })

  it('Should return undefine User if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
