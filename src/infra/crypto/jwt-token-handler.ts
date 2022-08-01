import { TokenGeneration, TokenValidator } from '@/domain/contracts/crypto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGeneration, TokenValidator {
  constructor (private readonly secret: string) {}

  async generationToken (params: TokenGeneration.Params): Promise<TokenGeneration.Result> {
    const expirationInSecunds = params.expirationInMs / 1000
    return sign({ key: params.key }, this.secret, { expiresIn: expirationInSecunds })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<TokenValidator.Result> {
    const { key } = verify(token, this.secret) as JwtPayload
    return key
  }
}
