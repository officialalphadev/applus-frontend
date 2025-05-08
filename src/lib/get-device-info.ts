export function getDeviceInfo() {
  if (typeof window === 'undefined') return { deviceName: 'ServerDevice', platform: 'Node.js', userAgent: 'server' }
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const deviceName = `${platform} - ${userAgent.split('(')[0]}`
  return { deviceName, platform, userAgent }
}
