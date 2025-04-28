import axios from 'axios'
// import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
// import type { JWT } from "next-auth/jwt"
import CredentialsProvider from 'next-auth/providers/credentials'

// Define interfaces for type safety
// interface User {
//   id: number
//   username: string
//   email: string
//   firstName: string
//   lastName: string
//   gender: string
//   image: string
// }

interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

// interface CustomJWT extends JWT {
//   user?: User
// }

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password required')
        }
        console.log('credentials', credentials)

        try {
          // Request to login API
          // Example Login with Dummy JSON
          const response = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', {
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 60
          })

          const userData = response.data

          console.log('userData', userData)

          if (userData) {
            // Return the user object to be stored in the JWT
            return {
              id: userData.id,
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
              image: userData.image,
              username: userData.username
            }
          }

          return null
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error('Invalid email or password')
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token.user) {
        session.user = token.user
      }
      return session
    }
  }
}
