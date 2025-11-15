"use client"
import { useStore } from '@/store/useStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Protected from '@/components/Protected'
import { useRouter } from 'next/navigation'

function ProfileInner() {
  const user = useStore((s) => s.user)
  const setUser = useStore((s) => s.setUser)
  const logout = useStore((s) => s.logout)
  const router = useRouter()

  function onSave(e: React.FormEvent) {
    e.preventDefault()
  }

  async function onLogout() {
    logout()
    router.replace('/login')
  }

  if (!user) return null

  return (
    <div className="grid gap-6">
      <div className="text-lg font-semibold">Profile</div>
      <form onSubmit={onSave} className="grid gap-3 max-w-md">
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <Input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Phone</span>
          <Input value={user.phone || ''} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Address</span>
          <Input value={user.address || ''} onChange={(e) => setUser({ ...user, address: e.target.value })} />
        </label>
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button variant="outline" type="button" onClick={onLogout}>Logout</Button>
        </div>
      </form>
      <div>
        <Button variant="outline" asChild>
          <a href="/prescriptions">View prescription history</a>
        </Button>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Protected>
      <ProfileInner />
    </Protected>
  )
}
