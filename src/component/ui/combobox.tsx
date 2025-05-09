'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button, Command, Popover } from '@/component'
import { cn } from '@/lib'

export interface ComboboxProps {
  value?: string
  onChange?: (event: { target: { value: string } }) => void
  options?: { id: string; label: string }[]
  placeholder?: string
}

export function Combobox({ value: parentValue = '', onChange, options = [], placeholder = 'Pilih...' }: Readonly<ComboboxProps>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (parentValue) setValue(parentValue)
  }, [parentValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant='outline' className={cn('w-full justify-between', !value && 'text-muted-foreground')}>
          {value ? options.find((option) => option.id === value)?.label : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </Popover.Trigger>
      <Popover.Content className='p-0' align='start'>
        <Command>
          <Command.Input placeholder='Search...' />
          <Command.List>
            <Command.Empty>No found.</Command.Empty>
            <Command.Group>
              {options.map((option) => (
                <Command.Item
                  key={option.id}
                  value={option.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    onChange?.({ target: { value: currentValue === value ? '' : currentValue } })
                    setOpen(false)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === option.id ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  )
}
