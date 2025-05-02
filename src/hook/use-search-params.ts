'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams as useSearchParamsOriginal } from 'next/navigation'

export function useSearchParams(defaults?: Record<string, string | undefined>) {
  const searchParams = useSearchParamsOriginal()
  const setSearchParams = useSetSearchParams()

  const memoizedDefaults = useMemo(() => defaults, [defaults])

  useEffect(() => {
    if (!memoizedDefaults) return

    const updates: Record<string, string> = {}

    for (const [key, defaultValue] of Object.entries(memoizedDefaults)) {
      if (!searchParams.get(key) && defaultValue != null) updates[key] = defaultValue
    }

    if (Object.keys(updates).length > 0) {
      const currentParams = Object.fromEntries(searchParams.entries())
      const mergedParams = { ...currentParams, ...updates }

      const changed = Object.entries(updates).some(([key, value]) => searchParams.get(key) !== value)

      if (changed) setSearchParams(mergedParams)
    }
  }, [searchParams, setSearchParams, memoizedDefaults])

  return { searchParams, setSearchParams }
}

export function useSetSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const currentSearchParams = useSearchParamsOriginal()

  return (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(currentSearchParams.toString())

    for (const [key, value] of Object.entries(updates)) {
      if (value == null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    const queryString = params.toString()
    router.replace(`${pathname}${queryString ? '?' + queryString : ''}`)
  }
}
