'use client'

import { CollapsibleContent, CollapsibleTrigger, Root } from '@radix-ui/react-collapsible'

export function Collapsible(props: Readonly<React.ComponentProps<typeof Root>>) {
  return <Root {...props} />
}
// const Collapsible = Root

Collapsible.Trigger = CollapsibleTrigger

Collapsible.Content = CollapsibleContent
