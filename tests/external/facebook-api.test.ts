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
    const fbUser = await sut.loadUser({ token: 'EAAJQC7IZAIjMBADZCDIPbrwcCEwWgnrZAoZBMoZBZAMXphAij4aANkrXEmFpIbimZB7jBLCAqhpRY9ggnTbB3pOCVmQd44gD0pQ99nxZCncsNSBR5qPXsPoWLaKLdZBwJYkSOX2W9gQDCyp1D6MEJCtlC8u9QNCEOlIBoyZAdbKyrlh61N9LdxLHdlJn0VZCIfFZB2mIGTWAOWYtGCw6Lq89XwKV' })

    expect(fbUser).toEqual({
      facebookId: '100359959207389',
      email: 'open_kbcsrsh_user@tfbnw.net',
      name: 'Open Graph Test User'
    })
  })

  it('Should return undefine User if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
