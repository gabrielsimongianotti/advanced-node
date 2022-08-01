import { ForbiddenError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorization: string
  let authorize: jest.Mock

  beforeAll(() => {
    authorization = 'any_authontication_token'
    authorize = jest.fn().mockResolvedValue('any_user_id')
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize)
  })

  it('should return 403 if authorization is empty', async () => {
    const HttpRequest = await sut.hanble({ authorization: '' })

    expect(HttpRequest).toEqual({ statusCode: 403, data: new ForbiddenError() })
  })

  it('should return 403 if authorization is null', async () => {
    const HttpRequest = await sut.hanble({ authorization: null as any })

    expect(HttpRequest).toEqual({ statusCode: 403, data: new ForbiddenError() })
  })

  it('should authorization is undefined', async () => {
    const HttpRequest = await sut.hanble({ authorization: undefined as any })

    expect(HttpRequest).toEqual({ statusCode: 403, data: new ForbiddenError() })
  })

  it('should call authorize with correct input', async () => {
    await sut.hanble({ authorization })

    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if authorize thros', async () => {
    authorize.mockRejectedValueOnce(new Error('any_error'))

    const httpRespose = await sut.hanble({ authorization })

    expect(httpRespose).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 200 with userId on success', async () => {
    const httpRespose = await sut.hanble({ authorization })

    expect(httpRespose).toEqual({
      statusCode: 200,
      data: {
        userId: 'any_user_id'
      }
    })
  })
})
