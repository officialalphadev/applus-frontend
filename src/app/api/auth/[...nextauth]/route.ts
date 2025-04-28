import NextAuth from 'next-auth'
import { authOptions } from './auth-options'

// Create the handler using the NextAuth function
const handler = NextAuth(authOptions)

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST }
