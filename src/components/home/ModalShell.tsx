import type { ReactNode } from 'react'

interface ModalShellProps {
  title: string
  children: ReactNode
}

function ModalShell({ title, children }: ModalShellProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-50 p-4 sm:p-8 overflow-hidden"
      style={{ animation: 'modalFadeIn 220ms ease-out' }}
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div
        className="relative mx-auto flex h-full max-w-6xl flex-col no-scrollbar"
        style={{ animation: 'modalScaleIn 260ms ease-out' }}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalShell
