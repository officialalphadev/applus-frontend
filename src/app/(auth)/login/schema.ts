import { z } from 'zod'

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

export const LoginDefaultValue: LoginSchemaType = {
  username: 'emilys',
  password: 'emilyspass'
}
