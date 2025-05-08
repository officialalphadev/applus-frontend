export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='mx-auto flex min-h-dvh max-w-6xl flex-col items-center justify-center p-4'>{children}</div>
}
