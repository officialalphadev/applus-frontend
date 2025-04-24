import { ENV } from './env'

export class Logger {
  static trace(message: string | object) {
    if (ENV.IS_PRODUCTION) return
    const logMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    console.log(`[TRACE] ${new Date().toISOString()} - ${logMessage}`)
  }

  static info(message: string | object) {
    const logMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    console.log(`[INFO] ${new Date().toISOString()} - ${logMessage}`)
  }

  static warn(message: string | object) {
    const logMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    console.warn(`[WARN] ${new Date().toISOString()} - ${logMessage}`)
  }

  static error(message: string | object) {
    const logMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    console.error(`[ERROR] ${new Date().toISOString()} - ${logMessage}`)
  }
}
