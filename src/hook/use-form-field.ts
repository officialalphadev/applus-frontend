'use client'

import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { Form } from '@/component'

export function useFormField() {
  const fieldContext = useContext(Form.FieldContext)
  const itemContext = useContext(Form.ItemContext)

  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) throw new Error('useFormField should be used within <FormField>')

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-description`,
    formMessageId: `${id}-form-message`,
    ...fieldState
  }
}
