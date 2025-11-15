"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default function LoginPage() {
  const authenticate = useStore((s) => s.authenticate)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = LoginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError('Enter valid email and password')
      return
    }
    const ok = authenticate(email, password)
    if (!ok) {
      setError('Invalid credentials')
      return
    }
    router.replace('/')
  }

  return (
    <div className="grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded border border-slate-200 p-6">
        <div className="text-lg font-semibold">Login</div>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Password</span>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button type="submit">Login</Button>
          <a className="text-sm text-blue-600" href="/signup">Create an account</a>
        </div>
      </form>
    </div>
  )
}
