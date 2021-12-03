export interface HttpGetClient {
  get: <T = any> (params: HttpGetClient.Params) => Promise<T>
  params: {
    clientId: string
    grantType: string
    clientSecret: string
  }
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}
