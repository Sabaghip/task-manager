import { IEnvVars, NodeEnv } from "./config.interface";

export default (): IEnvVars => ({
  NODE_ENV: process.env.NODE_ENV || NodeEnv.DEVELOPMENT,
  PORT: parseInt(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  ACCESS_TOKEN_VALIDITY_MINUTES: process.env.ACCESS_TOKEN_VALIDITY_MINUTES,
})