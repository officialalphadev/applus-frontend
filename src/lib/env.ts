export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? ''
} as const
