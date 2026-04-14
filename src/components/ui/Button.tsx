import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-sm hover:shadow-indigo-200/50 disabled:bg-indigo-400 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-sm',
  danger:
    'bg-white text-red-600 hover:bg-red-50 border-red-200 shadow-sm',
}

function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
