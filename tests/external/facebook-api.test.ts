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
    const fbUser = await sut.loadUser({ token: 'EAAH873uuuPIBAGkwFqCr5qHVi5s7wgZAQ6AyipbFSuEfZCwFNnDXWgNJLgDEHIBSlLWpYa8ISVzlNSOLWqCYgMLFLikP4ZAMuuJIEhjok97ZCVagM3FaWros49sxWSARjYGE6isl5GsjSxDtKhEV6iJ4JHsXfmNyHlEyvztbWYEpgoDDTrLTwNnebLQjxoeR02hF4EPtohKZCpHQCGOnz' })

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
