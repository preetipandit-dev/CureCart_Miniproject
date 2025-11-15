"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const SignupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

export default function SignupPage() {
  const addUser = useStore((s) => s.addUser)
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = SignupSchema.safeParse({ name, email, password })
    if (!parsed.success) {
      setError('Enter valid name, email, and password')
      return
    }
    addUser(name, email, password)
    router.replace('/login')
  }

  return (
    <div className="grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded border border-slate-200 p-6">
        <div className="text-lg font-semibold">Signup</div>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
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
          <Button type="submit">Create account</Button>
          <a className="text-sm text-blue-600" href="/login">Login</a>
        </div>
      </form>
    </div>
  )
}
