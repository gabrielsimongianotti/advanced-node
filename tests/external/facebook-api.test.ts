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
    const fbUser = await sut.loadUser({ token: 'EAAJQC7IZAIjMBAGeLkK4rOgZAE3y4QshU5xvyZAsIWyDKZCKo0f810ZAVLZANBw1JGnjjZBya8pzGv51EPnAJ3FhsZA1Mwgyb3ywnqpxk7ARBrzA5jgGDMSblUuHYK6yEQc2Jrn3rqCicbwJJNqgryFvFX6JxO1o72ny1ZBzz4fDDQBBM5ZAqcqrt0eiWq4kq5bShPf4B3XnXXA8Jg3AXbCl8X' })

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
