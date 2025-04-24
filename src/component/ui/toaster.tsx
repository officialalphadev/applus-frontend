'use client'

import { List, Show, Toast } from '@/component'
import { useToast } from '@/hook'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <Toast.Provider>
      <List
        data={toasts}
        renderItem={({ id, title, description, action, ...props }) => (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              <Show when={!!title}>
                <Toast.Title>{title}</Toast.Title>
              </Show>
              <Show when={!!description}>
                <Toast.Description>{description}</Toast.Description>
              </Show>
            </div>
            {action}
            <Toast.Close />
          </Toast>
        )}
      />
      <Toast.Viewport />
    </Toast.Provider>
  )
}
