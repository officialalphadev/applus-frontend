'use client'

import { TIME } from '@/lib'
import { UserService } from '@/service'
import { IUserQueryParams } from '@/type'
import { useQuery } from '@tanstack/react-query'

export const userKeys = {
  all: ['products'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: IUserQueryParams) => [...userKeys.lists(), { ...params }] as const
}

export const useUsers = (params?: IUserQueryParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => UserService.GetUsers(params),
    staleTime: TIME.FIVE_MINUTES
  })
}
