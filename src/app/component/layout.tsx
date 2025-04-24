import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Component | Applus', description: 'Applus' }

export interface ComponentLayoutProps {
  children: React.ReactNode
}

export default function ComponentLayout({ children }: Readonly<ComponentLayoutProps>) {
  return <main className='mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 p-4'>{children}</main>
}
