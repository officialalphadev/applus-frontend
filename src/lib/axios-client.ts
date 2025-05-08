import axios from 'axios'
// import { getSession } from 'next-auth/react'

import { getDeviceInfo, Logger } from '@/lib'

export const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

axiosClient.interceptors.request.use(
  async (config) => {
    Logger.Trace('client interceptors.request')

    const deviceInfo = getDeviceInfo()
    config.headers['X-Device-Name'] = deviceInfo.deviceName
    config.headers['X-Platform'] = deviceInfo.platform

    // const session = await getSession()
    // if (session?.accessToken) config.headers['Authorization'] = `Bearer ${session.accessToken}`

    return config
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    Logger.Trace('interceptors.response')
    const { response } = error
    if (response && response.status === 401) Logger.Error('Unauthorized access, redirecting to login')
    if (!response) Logger.Error('Network error - please check your connection')
    return Promise.reject(error)
  }
)
