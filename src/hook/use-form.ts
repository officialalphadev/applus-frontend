'use client'

import { ZodObject, ZodRawShape } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useFormOriginal, UseFormProps as UseFormOriginalProps, FieldValues } from 'react-hook-form'

export type UseFormProps<T extends FieldValues> = Omit<UseFormOriginalProps<T>, 'resolver'> & {
  schema: ZodObject<ZodRawShape>
}

export function useForm<T extends FieldValues>({ schema, ...options }: UseFormProps<T>) {
  return useFormOriginal<T>({ resolver: zodResolver(schema) as never, ...options })
}
