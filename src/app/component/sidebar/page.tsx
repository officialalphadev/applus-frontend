import SidebarLayout from '@/component/ui/sidebar-layout'
import Header from '@/component/ui/sidebar/header'

export default async function Page() {
  return (
    <SidebarLayout>
      <Header />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
          <div className='bg-muted/50 aspect-video rounded-xl' />
          <div className='bg-muted/50 aspect-video rounded-xl' />
          <div className='bg-muted/50 aspect-video rounded-xl' />
        </div>
        <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
      </div>
    </SidebarLayout>
  )
}
