import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'castor.db.elephantsql.com',
  port: 5432,
  username: 'zoktmpal',
  password: 'CBs9RPP9d7sPWxeeWBbcTe8GShsvui5c',
  database: 'zoktmpal',
  entities: ['dist/infra/postgres/entities/index.js']
}