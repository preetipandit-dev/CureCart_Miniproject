import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  className?: string
}

export function Badge({ children, variant = 'default', className }: Props) {
  const base = 'inline-flex items-center rounded-full px-2 py-1 text-xs'
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-800',
    destructive: 'bg-red-100 text-red-700'
  }
  return <span className={cn(base, variants[variant], className)}>{children}</span>
}
