export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='flex min-h-screen w-full flex-row gap-10 px-10 py-6'>{children}</div>
}
