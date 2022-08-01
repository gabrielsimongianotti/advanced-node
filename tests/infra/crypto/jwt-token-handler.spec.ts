import { JwtTokenHandler } from '@/infra/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('jwtTokenGenerator', () => {
  let sut: JwtTokenHandler
  let fakeJWT: jest.Mocked<typeof jwt>
  const secret = 'any_secret'
  beforeAll(() => {
    fakeJWT = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JwtTokenHandler(secret)
  })

  describe('generationToken', () => {
    let key: string
    let token: string
    let expirationInMs: number
    beforeAll(() => {
      expirationInMs = 1000
      key = 'any_key'
      token = 'any_token'
      fakeJWT.sign.mockImplementation(() => token)
    })

    it('should call sign with correnct params', async () => {
      await sut.generationToken({ key, expirationInMs })

      expect(fakeJWT.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
      expect(fakeJWT.sign).toHaveBeenCalledTimes(1)
    })

    it('should return token', async () => {
      const generationToken = await sut.generationToken({ key, expirationInMs })

      expect(generationToken).toBe(token)
    })

    it('should rethrow if sign throws', async () => {
      fakeJWT.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generationToken({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validateToken', () => {
    let token: string
    let key: string
    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      fakeJWT.verify.mockImplementation(() => ({ key }))
    })

    it('should call sign with correnct params', async () => {
      await sut.validateToken({ token })

      expect(fakeJWT.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJWT.verify).toHaveBeenCalledTimes(1)
    })

    it('should return the key used to sign to sign', async () => {
      const generateKey = await sut.validateToken({ token })

      expect(generateKey).toBe(key)
    })

    it('should rethrow if verify throws', async () => {
      fakeJWT.verify.mockImplementationOnce(() => { throw new Error('key_error') })

      const promise = sut.validateToken({ token })

      await expect(promise).rejects.toThrow(new Error('key_error'))
    })

    it('should throw if verify return null', async () => {
      fakeJWT.verify.mockImplementationOnce(() => null)

      const promise = sut.validateToken({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})
