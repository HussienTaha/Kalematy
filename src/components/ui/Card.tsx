import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all duration-300   ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
