import axiosOriginal from 'axios'

import { Logger } from '@/lib'

const getDeviceInfo = () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const deviceName = `${platform} - ${userAgent.split('(')[0]}`
  return { deviceName, platform, userAgent }
}

export const axios = axiosOriginal.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

axios.interceptors.request.use(
  (config) => {
    const deviceInfo = getDeviceInfo()
    config.headers['X-Device-Name'] = deviceInfo.deviceName
    config.headers['X-Platform'] = deviceInfo.platform
    const token = localStorage.getItem('auth_token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    if (response && response.status === 401) Logger.Error('Unauthorized access, redirecting to login')
    if (!response) Logger.Error('Network error - please check your connection')
    return Promise.reject(error)
  }
)
