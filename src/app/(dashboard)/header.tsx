'use client'

import { Bell } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Breadcrumb, Button } from '@/component'
import { Fragment } from 'react'

export default function Header() {
  const pathname = usePathname()

  const breadcrumbs = pathname
    .split('/')
    .slice(1)
    .map((segment) =>
      segment
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )

  return (
    <header className='sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex w-full items-center gap-2 px-4'>
        <Breadcrumb>
          <Breadcrumb.List>
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={breadcrumb}>
                <Breadcrumb.Item key={breadcrumb}>
                  <Breadcrumb.Link href='/'>{breadcrumb}</Breadcrumb.Link>
                </Breadcrumb.Item>
                {index < breadcrumbs.length - 1 && <Breadcrumb.Separator />}
              </Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb>
        <Button size='icon' variant='ghost' className='ml-auto'>
          <Bell className='size-4' />
        </Button>
      </div>
    </header>
  )
}
