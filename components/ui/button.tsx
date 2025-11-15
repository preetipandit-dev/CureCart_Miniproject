import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600',
    outline: 'border border-slate-200 hover:bg-slate-50',
    ghost: 'hover:bg-slate-100',
    success: 'bg-success text-white hover:bg-teal-600'
  }
  const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4', lg: 'h-12 px-6 text-lg' }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
