'use client'

import { useEffect, useState } from 'react'

import { Button, Dialog, Icon, Input, ScrollArea } from '@/component'
import { cn } from '@/lib'

interface SelectModalProps<T> {
  value?: string
  onChange?: (event: { target: { value: string } }) => void
  placeholder?: string
  data: T[]
  optionLabel: (data: T) => string
  optionValue: (data: T) => string
}

export function SelectModal<T>({ onChange, placeholder = 'Pilih...', value: parentValue = '', data, optionLabel, optionValue }: Readonly<SelectModalProps<T>>) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (parentValue) setValue(parentValue)
  }, [parentValue])

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant='outline' className={cn('w-full justify-between', !value && 'text-muted-foreground')}>
          {value ? optionLabel(data.find((option) => optionValue(option) === value)!) : placeholder}
          <Icon name='chevrons-up-down' className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className='sm:max-w-xl'>
        <Dialog.Header>
          <Dialog.Title className='mb-4'>{placeholder}</Dialog.Title>
          <Input placeholder='Search...' />
        </Dialog.Header>
        <ScrollArea className='h-72 border-y'>
          {data?.map((option, index) => (
            <Dialog.Close key={optionValue(option)} asChild>
              <div
                onClick={() => onChange?.({ target: { value: optionValue(option) } })}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground transition-full w-full cursor-pointer p-2 duration-300',
                  value === optionValue?.(option) && 'bg-accent text-accent-foreground',
                  index !== data.length - 1 && 'border-b'
                )}
              >
                {optionLabel(option)}
              </div>
            </Dialog.Close>
          ))}
        </ScrollArea>
        <Dialog.Footer>
          <Button className='mr-auto'>Sebelumnya</Button>
          <Button>Selanjutnya</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
