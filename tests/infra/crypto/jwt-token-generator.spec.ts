import { JwtTokenGenerator } from '@/infra/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('jwtTokenGenerator', () => {
  let sut: JwtTokenGenerator
  let fakeJWT: jest.Mocked<typeof jwt>
  const secret = 'any_secret'

  beforeAll(() => {
    fakeJWT = jwt as jest.Mocked<typeof jwt>
    fakeJWT.sign.mockImplementation(() => 'any_token')
  })

  beforeEach(() => {
    sut = new JwtTokenGenerator(secret)
  })

  it('should call sign with correnct params', async () => {
    await sut.generationToken({ key: 'any_key', expirationInMs: 1000 })

    expect(fakeJWT.sign).toHaveBeenCalledWith({ key: 'any_key' }, secret, { expiresIn: 1 })
  })

  it('should return token', async () => {
    const token = await sut.generationToken({ key: 'any_key', expirationInMs: 1000 })

    expect(token).toBe('any_token')
  })

  it('should rethrow if sign throws', async () => {
    fakeJWT.sign.mockImplementationOnce(() => { throw new Error('token_error') })

    const promise = sut.generationToken({ key: 'any_key', expirationInMs: 1000 })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
