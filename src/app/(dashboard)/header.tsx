import { Breadcrumb, Separator, SidebarTrigger } from '@/component'
import { UserNav } from '@/app/(dashboard)/user-nav'

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item className='hidden md:block'>
              <Breadcrumb.Link href='#'>Building Your Application</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator className='hidden md:block' />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
      <div className='hidden items-center gap-4 px-4 md:flex'>
        <UserNav />
      </div>
    </header>
  )
}
