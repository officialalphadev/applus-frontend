'use client'

import { useState, useEffect, useRef } from 'react'

import { Fade } from '@/component'
import { cn } from '@/lib'

export interface AutocompleteOption {
  id: string
  label: string
}

export interface AutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: AutocompleteOption[]
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
}

export function Autocomplete({ options, value, onChange, placeholder, className, leftAdornment, rightAdornment, ...inputProps }: Readonly<AutocompleteProps>) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filtered, setFiltered] = useState(options)

  const containerRef = useRef<HTMLDivElement>(null)

  const isSelected = (id: string) => value === id
  const filter = () => options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))

  const handleSelect = (opt: AutocompleteOption) => {
    const event = { target: { value: opt.id } }
    onChange?.(event as React.ChangeEvent<HTMLInputElement>)
    setOpen(false)
    setInputValue(opt.label)
  }

  useEffect(() => {
    if (value) {
      const selected = options.find((opt) => opt.id === value)
      if (selected) setInputValue(selected.label)
    }
  }, [options, value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'border-input flex h-10 w-full items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-all duration-300 md:text-sm',
          'focus-within:ring-ring/50 focus-within:ring-4 disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        {leftAdornment && <div className='shrink-0'>{leftAdornment}</div>}
        <input
          type='search'
          value={inputValue}
          autoComplete='off'
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => (setInputValue(event.target.value), setOpen(true), setFiltered(filter()))}
          className='placeholder:text-muted-foreground flex-1 bg-transparent transition-all duration-300 outline-none'
          {...inputProps}
        />
        {rightAdornment && <div className='shrink-0'>{rightAdornment}</div>}
      </div>
      <Fade show={open} asChild>
        <ul className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg'>
          {filtered.map((option) => (
            <li
              key={option.id}
              onClick={() => (handleSelect(option), setFiltered(options))}
              className={cn('hover:bg-input/50 cursor-pointer px-4 py-2 transition-all duration-300', isSelected(option.id) && 'bg-input/50 font-medium')}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </Fade>
    </div>
  )
}
