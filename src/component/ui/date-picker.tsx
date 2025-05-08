'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button, Calendar, Popover } from '@/component'
import { cn } from '@/lib'

interface DatePickerProps {
  value?: Date
  onChange?: (date?: Date) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  formatStr?: string
}

export function DatePicker({ className, disabled, onChange, placeholder = 'Pilih tanggal', value, formatStr = 'PPP' }: Readonly<DatePickerProps>) {
  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date>()

  const selectedDate = isControlled ? value : internalDate

  function handleSelect(date?: Date) {
    if (!isControlled) setInternalDate(date)
    onChange?.(date)
  }

  useEffect(() => {
    if (isControlled) setInternalDate(undefined)
  }, [isControlled])

  return (
    <Popover>
      <Popover.Trigger asChild disabled={disabled}>
        <Button
          variant='outline'
          className={cn('flex w-full items-center justify-start font-normal', !selectedDate && 'text-muted-foreground', className)}
          aria-label='Buka pemilih tanggal'
          aria-haspopup='dialog'
        >
          <CalendarIcon className='mr-2 size-4' />
          {selectedDate ? format(selectedDate, formatStr, { locale: id }) : <span>{placeholder}</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content className='w-auto p-0'>
        <Calendar mode='single' selected={selectedDate} onSelect={handleSelect} initialFocus />
      </Popover.Content>
    </Popover>
  )
}
