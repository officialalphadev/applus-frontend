'use client'

import { CollapsibleContent, CollapsibleTrigger, Root } from '@radix-ui/react-collapsible'

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export function Collapsible(props: Readonly<React.ComponentProps<typeof Root>>) {
  return <Root {...props} />
}
