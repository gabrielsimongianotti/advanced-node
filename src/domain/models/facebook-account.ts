type FacebookData = {
  name: string
  email: string
  facebookId: string
}

type AccountData = {
  id?: string
  name?: string
}

export class FacebookAccount {
  id?: string
  name: string
  email: string
  facebookId: string

  constructor (fbData: FacebookData, accounData?: AccountData) {
    this.id = accounData?.id
    this.name = accounData?.name ?? fbData.name
    this.email = fbData.email
    this.facebookId = fbData.facebookId
  }
}
