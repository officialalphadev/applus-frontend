import { z } from 'zod'

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const LoginSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(1)
})

export const LoginDefaultValue: LoginSchemaType = {
  emailAddress: 'dev.ramadann@gmail.com',
  password: 'asdasd'
}
