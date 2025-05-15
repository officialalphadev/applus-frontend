import axiosOrigin from 'axios'
import { ENV } from './env'

export function getDeviceInfo() {
  if (typeof window === 'undefined') return { deviceName: 'ServerDevice', platform: 'Node.js', userAgent: 'server' }
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const deviceName = `${platform} - ${userAgent.split('(')[0]}`
  return { deviceName, platform, userAgent }
}

export const axios = axiosOrigin.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: ENV.API_BASE_URL + '/' + ENV.API_VERSION,
  withCredentials: true,
  timeout: 15000
})

axios.interceptors.request.use(
  async (config) => {
    const deviceInfo = getDeviceInfo()
    config.headers['X-Device-Name'] = deviceInfo.deviceName
    config.headers['X-Platform'] = deviceInfo.platform
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    if (response) return response
    return Promise.reject(error)
  }
)
