'use client'

import { Button, Dialog } from '@/component'

export function ConfirmDeleteModal({ children, onConfirm }: Readonly<{ children: React.ReactNode; onConfirm?: () => void }>) {
  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className='sm:max-w-[425px]'>
        <Dialog.Header>
          <Dialog.Title>Konfirmasi Hapus Data</Dialog.Title>
          <Dialog.Description>Apakah anda yakin ingin menghapus data ini?</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant='outline'>Batal</Button>
          </Dialog.Close>
          <Button onClick={onConfirm}>Hapus</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
