export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? ''
} as const
