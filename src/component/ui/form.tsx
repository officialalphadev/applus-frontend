'use client'

import { createContext, useId } from 'react'
import { LabelProps } from '@radix-ui/react-label'
import { Slot, SlotProps } from '@radix-ui/react-slot'
import { FieldPath, FieldValues, FormProvider, useFormContext, UseFormReturn } from 'react-hook-form'
import { ControllerProps, ControllerRenderProps, Path, SubmitHandler, Controller } from 'react-hook-form'

import { Button, ButtonProps, Label, Show } from '@/component'
import { useFormField } from '@/hook'
import { cn } from '@/lib'

export type FormProps<T extends FieldValues> = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

export function Form<T extends FieldValues>({ className, form, onSubmit, ...props }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('mx-auto max-w-3xl space-y-4', className)} {...props} />
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

function FormField<T extends FieldValues>({ name, label, render, ...props }: FormFieldProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <FormFieldContext.Provider value={{ name }}>
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
Form.Field = FormField

export type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)
Form.ItemContext = FormItemContext

function FormItem({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}
Form.Item = FormItem

function FormLabel({ className, ...props }: LabelProps) {
  const { error, formItemId } = useFormField()

  return <Label className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />
}
Form.Label = FormLabel

function FormControl(props: SlotProps) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return <Slot id={formItemId} aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`} aria-invalid={!!error} {...props} />
}
Form.Control = FormControl

function FormDescription({ className, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { formDescriptionId } = useFormField()

  return <p id={formDescriptionId} className={cn('text-muted-foreground text-[0.8rem]', className)} {...props} />
}
Form.Description = FormDescription

function FormMessage({ className, children, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { error, formMessageId } = useFormField()

  const body = error ? String(error?.message) : children

  if (!body) return null

  return (
    <p id={formMessageId} className={cn('text-destructive text-[0.8rem] font-medium', className)} {...props}>
      {body}
    </p>
  )
}
Form.Message = FormMessage

function FormSubmitButton({ className, children, ...props }: ButtonProps) {
  const { formState } = useFormContext()

  return (
    <Button type='submit' className={cn('w-full', className)} disabled={formState.isSubmitting} {...props}>
      {formState.isSubmitting ? 'Loading...' : children}
    </Button>
  )
}
Form.SubmitButton = FormSubmitButton
