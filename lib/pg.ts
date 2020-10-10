import { Pool } from 'pg'
import {config} from '../config'

const pool = new Pool({
  connectionString: config.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  },
})

export {pool}
