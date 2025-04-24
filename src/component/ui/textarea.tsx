import { cn } from '@/lib'

export function Textarea({ className, ...props }: Readonly<React.TextareaHTMLAttributes<HTMLTextAreaElement>>) {
  return (
    <textarea
      className={cn(
        'border-input flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 md:text-sm',
        'placeholder:text-muted-foreground focus:ring-ring/50 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
        'text-base shadow-xs outline-hidden transition-all duration-300',
        className
      )}
      {...props}
    />
  )
}
