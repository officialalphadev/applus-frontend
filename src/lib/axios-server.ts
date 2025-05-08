'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

import { Logger } from '@/lib'

export const axiosServer = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

axiosServer.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('next-auth.session-token')?.value
    if (token) config.headers['Authorization'] = `Bearer ${token}`

    config.headers['X-Device-Name'] = 'ServerDevice'
    config.headers['X-Platform'] = 'Node.js'

    return config
  },
  (error) => Promise.reject(error)
)

axiosServer.interceptors.response.use(
  (response) => response,
  (error) => {
    Logger.Trace('interceptors.response')
    const { response } = error
    if (response && response.status === 401) Logger.Error('Unauthorized access, redirecting to login')
    if (!response) Logger.Error('Network error - please check your connection')
    return Promise.reject(error)
  }
)
