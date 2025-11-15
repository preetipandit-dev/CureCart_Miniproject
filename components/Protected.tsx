"use client"
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Protected({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user)
  const router = useRouter()
  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])
  if (!user) return null
  return <>{children}</>
}
