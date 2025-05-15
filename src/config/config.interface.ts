export interface IEnvVars {
  NODE_ENV: string
  PORT: number | string
  DATABASE_URL: string
  JWT_ACCESS_SECRET: string
  ACCESS_TOKEN_VALIDITY_MINUTES: string,
}

export enum NodeEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TESTING = 'testing'
}