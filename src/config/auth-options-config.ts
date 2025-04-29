/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { LoginResponse } from '@/type'
import { Logger, TIME } from '@/lib'

export const authOptionsConfig: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: TIME.ONE_HOURS },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.username || !credentials?.password) throw new Error('Username and password required')

        Logger.Trace(`credentials : ${JSON.stringify(credentials)}`)

        try {
          const response = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', {
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 60
          })

          const userData = response.data

          Logger.Trace(`userData : ${JSON.stringify(userData)}`)

          if (!userData) return null

          return {
            id: userData.id,
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            image: userData.image,
            username: userData.username
          }
        } catch (error) {
          Logger.Error((error as Error).message)
          throw new Error('Invalid email or password')
        }
      }
    })
  ],
  pages: { signIn: '/auth/login', error: '/auth/error' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user
      return session
    }
  }
}
