import { z } from 'zod'

export type TambahPenggunaType = z.infer<typeof TambahPenggunaSchema>

export const TambahPenggunaSchema = z.object({
  email: z.string().min(1),
  jabatanId: z.string().min(1),
  jobLevelId: z.string().min(1),
  unitId: z.string().min(1),
  roleId: z.string().min(1)
})

export const TambahPenggunaDefaultValue: TambahPenggunaType = {
  email: '',
  jabatanId: '',
  jobLevelId: '',
  unitId: '',
  roleId: ''
}
