export class AuthenticationError extends Error {
  constructor () {
    super('Authentication Failed')
    this.name = 'AuthenticationError'
  }
}
