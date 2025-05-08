import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Component | Applus', description: 'Applus' }

export interface ComponentLayoutProps {
  children: React.ReactNode
}

export default function ComponentLayout({ children }: Readonly<ComponentLayoutProps>) {
  return <div className='flex h-dvh flex-col items-center justify-center'>{children}</div>
}
