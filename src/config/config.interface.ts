export interface IEnvVars {
  NODE_ENV: string
  PORT: number | string
  DATABASE_URL: string
  JWT_ACCESS_SECRET: string
  ACCESS_TOKEN_VALIDITY_MINUTES: string,
  FILE_MAX_SIZE: string | number
  MAIL_HOST: string
  MAIL_USER: string
  MAIL_PASS: string
  MAIL_FROM: string
  LOCK_TIME: string | number
  MAX_FAILED_ATTEMPTS: string | number
  API_KEY: string
  S3_REGION: string
  S3_ENDPOINT: string
  S3_ACCESS_KEY: string
  S3_SECRET_ACCESS_KEY: string
  FRONT_URL: string
  S3_BUCKET_NAME: string
  S3_PUBLIC_BUCKET_NAME: string
  SENTRY_DSN: string
  LOGO_URL: string
  AD_URL: string
  AD_BASE_DN: string
  AD_USERNAME: string
  AD_PASSWORD: string
}

export enum NodeEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TESTING = 'testing'
}