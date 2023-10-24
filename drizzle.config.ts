import { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

export default {
  schema: './libs/drizzle/schema.ts',
  out: './libs/drizzle/schena-out.ts',
  dbCredentials: {
    connectionString: process.env.NEXT_POSTGRESQL_URI as string,
  },
  driver: 'pg',
} satisfies Config
