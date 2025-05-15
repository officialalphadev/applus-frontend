import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Card, Badge } from '@/component'

export function SectionCards() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <Card.Header className='relative'>
          <Card.Description>Total Revenue</Card.Description>
          <Card.Title className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>$1,250.00</Card.Title>
          <div className='absolute top-4 right-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +12.5%
            </Badge>
          </div>
        </Card.Header>
        <Card.Footer className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Trending up this month <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Visitors for the last 6 months</div>
        </Card.Footer>
      </Card>
      <Card className='@container/card'>
        <Card.Header className='relative'>
          <Card.Description>New Customers</Card.Description>
          <Card.Title className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>1,234</Card.Title>
          <div className='absolute top-4 right-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingDownIcon className='size-3' />
              -20%
            </Badge>
          </div>
        </Card.Header>
        <Card.Footer className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Down 20% this period <TrendingDownIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Acquisition needs attention</div>
        </Card.Footer>
      </Card>
      <Card className='@container/card'>
        <Card.Header className='relative'>
          <Card.Description>Active Accounts</Card.Description>
          <Card.Title className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>45,678</Card.Title>
          <div className='absolute top-4 right-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +12.5%
            </Badge>
          </div>
        </Card.Header>
        <Card.Footer className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Strong user retention <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Engagement exceed targets</div>
        </Card.Footer>
      </Card>
      <Card className='@container/card'>
        <Card.Header className='relative'>
          <Card.Description>Growth Rate</Card.Description>
          <Card.Title className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>4.5%</Card.Title>
          <div className='absolute top-4 right-4'>
            <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
              <TrendingUpIcon className='size-3' />
              +4.5%
            </Badge>
          </div>
        </Card.Header>
        <Card.Footer className='flex-col items-start gap-1 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Steady performance <TrendingUpIcon className='size-4' />
          </div>
          <div className='text-muted-foreground'>Meets growth projections</div>
        </Card.Footer>
      </Card>
    </div>
  )
}
