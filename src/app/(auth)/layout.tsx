export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='h-screen w-full bg-neutral-100'>{children}</div>
}
