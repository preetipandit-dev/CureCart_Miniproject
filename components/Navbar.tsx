"use client"
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { ShoppingCart, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const cartCount = useStore((s) => s.cart.reduce((a, b) => a + b.quantity, 0))
  const loggedIn = useStore((s) => s.auth.loggedIn)
  const user = useStore((s) => s.user)
  const logout = useStore((s) => s.logout)
  const [q, setQ] = useState('')
  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q)
    router.push('/products?' + params.toString())
  }
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container flex h-14 items-center gap-4">
        <Link href="/" className="text-xl font-semibold text-primary">CureCart</Link>
        <form onSubmit={onSearch} className="flex-1">
          <Input placeholder="Search medicines" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-primary px-2 text-xs text-white">{cartCount}</span>}
        </Link>
        {loggedIn && user ? (
          <div className="flex items-center gap-3">
            <Link href="/profile" className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
            <button onClick={() => { logout(); router.push('/login') }} className="inline-flex items-center gap-1 text-sm text-slate-700">
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-blue-600">Login</Link>
            <Link href="/signup" className="text-sm text-blue-600">Signup</Link>
          </div>
        )}
      </div>
    </div>
  )
}
