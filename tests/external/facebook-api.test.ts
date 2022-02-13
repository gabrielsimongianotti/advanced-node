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
    const fbUser = await sut.loadUser({ token: 'EAAJQC7IZAIjMBAJFbEVdGeUPos3OaiOKHOqijFaDRQ8eZAacXjUPwIOSPrZCojch9WrLIdFycDAfQTtDmZCG3ihQhZBCwV8aac6Im7Clbpv7oAMEaF8Fj9r8ZBIN3q6POPIcMmqcZCP0HUp8lhljISUddZAHVJIR0azI4B1DhRBi0MNzvX7BtMuSQZBwVpRHa5bALY4qAvGZAphe7l1K95r5kf' })

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
