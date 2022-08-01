export interface TokenGeneration {
  generationToken: (params: TokenGeneration.Params) => Promise<TokenGeneration.Result>
}

export namespace TokenGeneration {
  export type Params = {
    key: string
    expirationInMs: number
  }

  export type Result = string
}

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<TokenValidator.Result>
}

export namespace TokenValidator{
  export type Params = { token: string }
  export type Result = string
}
