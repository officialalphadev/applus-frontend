import { z } from 'zod'

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>

export const ChangePasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
})

export const ChangePasswordDefaultValue: ChangePasswordSchemaType = {
  password: '',
  confirmPassword: ''
}
