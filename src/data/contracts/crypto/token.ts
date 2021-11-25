export interface TokenGeneration {
  generateToken: (params: TokenGeneration.Params) => Promise<TokenGeneration.Result>
}

export namespace TokenGeneration {
  export type Params = {
    key: string
    expirationInMs: number
  }

  export type Result = string
}
