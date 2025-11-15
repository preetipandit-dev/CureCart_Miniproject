"use client"
import { useEffect } from 'react'
import { getOrders, getProducts } from '@/lib/api'
import { useStore } from '@/store/useStore'
import Protected from '@/components/Protected'
import { Button } from '@/components/ui/button'

function OrdersInner() {
  const orders = useStore((s) => s.orders)
  const setOrders = useStore((s) => s.setOrders)
  const addToCart = useStore((s) => s.addToCart)

  useEffect(() => {
    getOrders().then(setOrders)
  }, [setOrders])

  async function reorder(items: { productId: string; quantity: number }[]) {
    const products = await getProducts()
    items.forEach((i) => {
      const p = products.find((x: any) => x.id === i.productId)
      if (p) addToCart(p, i.quantity)
    })
  }

  return (
    <div className="grid gap-4">
      {orders.map((o) => (
        <div key={o.id} className="rounded border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Order {o.id}</div>
            <div className="text-sm text-slate-600">{o.date} • {o.status}</div>
          </div>
          <div className="mt-3 text-sm">Total ${o.total.toFixed(2)}</div>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" onClick={() => reorder(o.items)}>Reorder</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Protected>
      <OrdersInner />
    </Protected>
  )
}
