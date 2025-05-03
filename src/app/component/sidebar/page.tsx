import { AppSidebar } from '@/component/app-sidebar'
import { Breadcrumb } from '@/component/ui/breadcrumb'
import { Separator } from '@/component/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/component/ui/sidebar'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
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
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='bg-muted/50 aspect-video rounded-xl' />
            <div className='bg-muted/50 aspect-video rounded-xl' />
            <div className='bg-muted/50 aspect-video rounded-xl' />
          </div>
          <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
