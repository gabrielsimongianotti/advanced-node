import { TokenGeneration } from '@/data/contracts/crypto'
import { sign } from 'jsonwebtoken'

export class JwtTokenGenerator implements TokenGeneration {
  constructor (private readonly secret: string) { }

  async generationToken (params: TokenGeneration.Params): Promise<TokenGeneration.Result> {
    const expirationInSecunds = params.expirationInMs / 1000
    return sign({ key: params.key }, this.secret, { expiresIn: expirationInSecunds })
  }
}
