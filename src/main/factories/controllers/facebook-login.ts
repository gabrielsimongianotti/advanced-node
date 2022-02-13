import { FacebookLoginController } from '@/application/controllers'

import { makeFacebookAuthentication } from '../use-cases/facebook-authention'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthentication())
}
