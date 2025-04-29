import NextAuth from 'next-auth'

import { authOptionsConfig } from '@/config'

const handler = NextAuth(authOptionsConfig)

export { handler as GET, handler as POST }
