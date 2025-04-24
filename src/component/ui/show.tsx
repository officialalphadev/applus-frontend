export type ShowProps = {
  when?: boolean
  children: React.ReactNode
}

export function Show({ children, when }: ShowProps) {
  return when ? children : null
}
