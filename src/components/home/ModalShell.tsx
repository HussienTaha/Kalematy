import type { ReactNode } from 'react'

interface ModalShellProps {
  title: string
  children: ReactNode
}

function ModalShell({ title, children }: ModalShellProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/95 p-3 sm:p-6"
      style={{ animation: 'modalFadeIn 220ms ease-out' }}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div
        className="relative mx-auto flex h-full max-w-5xl flex-col overflow-y-auto pb-4 pt-12 sm:pt-6"
        style={{ animation: 'modalScaleIn 260ms ease-out' }}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalShell
