import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from './config/env'
import { config } from '@/infra/postgres/helper'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection(config)
  .then(() => app.listen(env.appPort, () => console.log(`Server sk running at http://localhost:${env.appPort}`)))
  .catch(console.error)
