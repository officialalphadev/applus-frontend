import axios from 'axios'

// Get device information
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const deviceName = `${platform} - ${userAgent.split('(')[0]}`

  return {
    deviceName,
    platform,
    userAgent
  }
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add device information to headers
    const deviceInfo = getDeviceInfo()
    config.headers['X-Device-Name'] = deviceInfo.deviceName
    config.headers['X-Platform'] = deviceInfo.platform

    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    const { response } = error

    if (response && response.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.log('Unauthorized access, redirecting to login')
      // Example: router.push('/login');
    }

    if (!response) {
      // Network error
      console.error('Network error - please check your connection')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
