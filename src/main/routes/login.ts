import { Router } from 'express'
import { makeFacebookLoginController } from '@/main/factories/controllers'
import { adapterExpressRoute } from '@/main/adapters'

export default (router: Router): void => {
  const controller = makeFacebookLoginController()

  router.post('/login/facebook', adapterExpressRoute(controller))
}
