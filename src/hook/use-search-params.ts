import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams as useSearchParamsOriginal } from 'next/navigation'

type DefaultParams = Record<string, string>

export function useSearchParams(defaults: DefaultParams) {
  const searchParams = useSearchParamsOriginal()
  const setSearchParams = useSetSearchParams()

  useEffect(() => {
    const updates: Record<string, string> = {}

    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (!searchParams.get(key)) {
        updates[key] = defaultValue
      }
    }

    if (Object.keys(updates).length > 0) {
      const prevParams = Object.fromEntries(searchParams.entries())
      setSearchParams({ ...prevParams, ...updates })
    }
  }, [searchParams, setSearchParams, defaults])

  return searchParams
}

export function useSetSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const currentSearchParams = useSearchParamsOriginal()

  return (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(currentSearchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    const queryString = params.toString()
    router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`)
  }
}
