'use client'

import { DemoDialog } from './component/demo-dialog'
import { Animate, Button } from '@/component'

export default function DialogPage() {
  return (
    <Animate type='slideUp' asChild>
      <DemoDialog>
        <Button>Open Dialog</Button>
      </DemoDialog>
    </Animate>
  )
}
