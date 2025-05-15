'use client'

import { TIME } from '@/lib'
import { AuthService } from '@/service'
import { useQuery } from '@tanstack/react-query'

export const profileKeys = {
  myProfile: ['my-profile'] as const
}

export const useMyProfile = () => {
  return useQuery({
    queryKey: profileKeys.myProfile,
    queryFn: () => AuthService.GetMyProfile(),
    staleTime: TIME.FIVE_MINUTES
  })
}
