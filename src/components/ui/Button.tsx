import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent disabled:bg-indigo-400 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-slate-700 hover:bg-slate-50 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700',
  danger:
    'bg-white text-red-600 hover:bg-red-50 border-red-200 dark:bg-slate-800 dark:border-red-400/40 dark:text-red-300 dark:hover:bg-red-950/40',
}

function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
