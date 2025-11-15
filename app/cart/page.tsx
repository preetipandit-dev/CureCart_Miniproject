"use client"
import { useStore } from '@/store/useStore'
import StatusBadge from '@/components/StatusBadge'
import UploadModal from '@/components/UploadModal'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
import Protected from '@/components/Protected'
import Link from 'next/link'
import { toast } from 'sonner'

function CartInner() {
  const cart = useStore((s) => s.cart)
  const prescriptions = useStore((s) => s.prescriptions)
  const removeFromCart = useStore((s) => s.removeFromCart)
  const canCheckout = useStore((s) => s.canCheckout)
  const clearCart = useStore((s) => s.clearCart)
  const [openFor, setOpenFor] = useState<string | null>(null)

  const total = useMemo(() => cart.reduce((a, b) => a + b.product.price * b.quantity, 0), [cart])

  function checkout() {
    if (!canCheckout()) {
      toast.error('All prescription items must be Approved before checkout')
      return
    }
    clearCart()
    toast.success('Order placed')
  }

  return (
    <div className="grid gap-6">
      {cart.map((c) => (
        <div key={c.product.id} className="flex items-center gap-4 rounded border border-slate-200 p-4">
          <img src={c.product.image} alt={c.product.name} className="h-16 w-16 rounded object-cover" />
          <div className="flex-1">
            <div className="font-medium">{c.product.name}</div>
            <div className="text-sm text-slate-600">Qty {c.quantity}</div>
            {c.product.requiresPrescription && (
              <div className="mt-2 flex items-center gap-2">
                <div className="text-sm">Prescription:</div>
                {c.prescriptionId ? (
                  <StatusBadge status={prescriptions.find((p) => p.id === c.prescriptionId)?.status || 'Pending'} />
                ) : (
                  <span className="text-sm text-red-600">Not attached</span>
                )}
                <Button variant="outline" onClick={() => setOpenFor(c.product.id)}>Attach/Upload</Button>
              </div>
            )}
          </div>
          <div className="text-primary">${(c.product.price * c.quantity).toFixed(2)}</div>
          <Button variant="ghost" onClick={() => removeFromCart(c.product.id)}>Remove</Button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
        <Button onClick={checkout}>Checkout</Button>
      </div>
      <div className="flex gap-2">
        <Link href="/prescriptions" className="text-sm text-blue-600">Manage prescriptions</Link>
      </div>
      <UploadModal open={!!openFor} onClose={() => setOpenFor(null)} productId={openFor || undefined} />
    </div>
  )
}

export default function CartPage() {
  return (
    <Protected>
      <CartInner />
    </Protected>
  )
}
