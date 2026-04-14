import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function Input({ label, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700 ">{label}</span>
      <input
        id={inputId}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10     ${className}`}
        {...props}
      />
    </label>
  )
}

export default Input
