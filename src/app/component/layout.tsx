import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Component | Applus', description: 'Applus' }

export interface ComponentLayoutProps {
  children: React.ReactNode
}

export default function ComponentLayout({ children }: Readonly<ComponentLayoutProps>) {
  return <main>{children}</main>
}
