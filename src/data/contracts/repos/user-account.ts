export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepositoty.Params) => Promise<LoadUserAccountRepositoty.Result>
}

export namespace LoadUserAccountRepositoty {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface SaveFacebookAccountRepositoy {
  saveWithFacebook: (params: SaveFacebookAccountRepositoy.Params) => Promise<SaveFacebookAccountRepositoy.Result>
}

export namespace SaveFacebookAccountRepositoy {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
  export type Result = {
    id: string
  }
}
