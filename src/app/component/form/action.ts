'use server'

import { ActionReturn } from '@/type'
import { TSendMessageSchema } from './schema'
import { Logger } from '@/lib'

export async function SendMessageAction(payload: TSendMessageSchema): Promise<ActionReturn> {
  Logger.Trace({ action: 'SendMessage', payload })

  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return Promise.resolve({ status: 'success', message: 'Pesan berhasil dikirim' })
  } catch (error) {
    Logger.Error({
      action: 'SendMessage',
      message: 'Failed to send message',
      error: (error as Error).message,
      stack: (error as Error).stack
    })

    return Promise.resolve({ status: 'error', message: 'Pesan gagal dikirim' })
  }
}
