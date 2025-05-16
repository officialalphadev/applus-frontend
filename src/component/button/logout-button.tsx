'use client'

import { Button, ButtonProps } from '../ui/button'
import { AuthService } from '@/service'
import { Icon } from '../ui/icon'

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean
  redirectPath?: string
}

export function LogoutButton({ showIcon = true, children, ...props }: Readonly<LogoutButtonProps>) {
  async function handleSignOut() {
    const response = await AuthService.SignOut()
    if (response.statusCode === 200) document.location.reload()
  }

  return (
    <Button onClick={handleSignOut} variant='outline' {...props}>
      {showIcon && <Icon name='log-out' className='mr-2 h-4 w-4' />}
      {children || 'Sign out'}
    </Button>
  )
}
