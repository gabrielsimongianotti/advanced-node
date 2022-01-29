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
    const fbUser = await sut.loadUser({ token: 'EAAJQC7IZAIjMBAAzqnULWVf2tBVAkRxIQbL0gtNHqIKpKIzrBokpvo5pLb8BZBGlsg0tVSvR9yVPeGNKOnv5rcChrNvMaAiKo6DS5DK9Yf26sNdVIhd0jHfup39y5PBEZCWu1MvTcveIciUWe8mrsZCEkd11WpSYPJMJlscaQRXKIBY2vibFe8hzQYAZBkzp0vFmbnEaahaRS1rFo2iAZA' })

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
