'use client'

import { Slot } from '@radix-ui/react-slot'
import React, { createContext, useId, useMemo } from 'react'
import { FieldPath, FieldValues, FormProvider, useFormContext, UseFormReturn } from 'react-hook-form'
import { ControllerProps, ControllerRenderProps, Path, SubmitHandler, Controller } from 'react-hook-form'

import { Button, Label, Show } from '@/component'
import { useFormField } from '@/hook'
import { cn } from '@/lib'

export type FormProps<T extends FieldValues> = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

export function Form<T extends FieldValues>({ className, form, onSubmit, ...props }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)} {...props} />
    </FormProvider>
  )
}

export type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)
Form.FieldContext = FormFieldContext

export type FormFieldProps<T extends FieldValues> = ControllerProps<T> & {
  name: Path<T>
  label?: string
  render: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode
}

Form.Field = function FormField<T extends FieldValues>({ name, label, render, ...props }: FormFieldProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <FormFieldContext.Provider value={useMemo(() => ({ name }), [name])}>
      <Controller
        {...props}
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item>
            <Show when={!!label}>
              <Form.Label htmlFor={name}>{label}</Form.Label>
            </Show>
            <Form.Control>{render(field)}</Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </FormFieldContext.Provider>
  )
}

export type FormItemContextValue = {
  id: string
}

Form.ItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

Form.Item = function FormItem({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  const id = useId()
  return (
    <Form.ItemContext.Provider value={useMemo(() => ({ id }), [id])}>
      <div className={cn('space-y-2', className)} {...props} />
    </Form.ItemContext.Provider>
  )
}

Form.Label = function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField()
  return <Label className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />
}

Form.Control = function FormControl(props: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return <Slot id={formItemId} aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`} aria-invalid={!!error} {...props} />
}

Form.Description = function FormDescription({ className, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { formDescriptionId } = useFormField()
  return <p id={formDescriptionId} className={cn('text-muted-foreground text-[0.8rem]', className)} {...props} />
}

Form.Message = function FormMessage({ className, children, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children
  if (!body) return null
  return (
    <p id={formMessageId} className={cn('text-destructive text-[0.8rem] font-medium', className)} {...props}>
      {body}
    </p>
  )
}

Form.SubmitButton = function FormSubmitButton({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  const { formState } = useFormContext()
  return (
    <Button type='submit' className={cn('w-full', className)} disabled={formState.isSubmitting} {...props}>
      {formState.isSubmitting ? 'Loading...' : children}
    </Button>
  )
}
