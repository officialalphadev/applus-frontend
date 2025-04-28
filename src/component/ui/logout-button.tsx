'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button, ButtonProps } from './button'

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean
  redirectPath?: string
}

export function LogoutButton({ showIcon = true, redirectPath = '/auth/login', children, ...props }: LogoutButtonProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: redirectPath })
  }

  return (
    <Button onClick={handleLogout} variant='outline' {...props}>
      {showIcon && <LogOut className='mr-2 h-4 w-4' />}
      {children || 'Sign out'}
    </Button>
  )
}
