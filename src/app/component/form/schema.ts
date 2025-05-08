import { z } from 'zod'

export type TSendMessageSchema = z.infer<typeof SendMessageSchema>

export const SendMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  message: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1)
})

export const SendMessageDefaultValue: TSendMessageSchema = {
  name: '',
  email: '',
  message: '',
  category: '',
  date: ''
}
