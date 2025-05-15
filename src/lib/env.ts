export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION ?? ''
} as const
