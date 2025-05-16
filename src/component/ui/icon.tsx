'use client'

import { DynamicIcon } from 'lucide-react/dynamic'

export function Icon(props: React.ComponentProps<typeof DynamicIcon>) {
  return <DynamicIcon {...props} />
}
