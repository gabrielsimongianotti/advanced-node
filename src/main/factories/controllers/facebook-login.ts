import { FacebookLoginController } from '@/application/controllers'

import { makeFacebookAuthenticationService } from '../services/facebook-authention'

export const makeFacebookLoginController = (): FacebookLoginController => {
  const fbAuthService = makeFacebookAuthenticationService()

  return new FacebookLoginController(fbAuthService)
}
