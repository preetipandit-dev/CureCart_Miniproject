"use client"
import { useEffect, useState, use } from 'react'
import { getProduct, getProducts } from '@/lib/api'
import PrescriptionBadge from '@/components/PrescriptionBadge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/useStore'
import UploadModal from '@/components/UploadModal'
import Link from 'next/link'

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<any | null>(null)
  const addToCart = useStore((s) => s.addToCart)
  const [open, setOpen] = useState(false)
  const [related, setRelated] = useState<any[]>([])
  const { id } = use(params)

  useEffect(() => {
    getProduct(id).then(setProduct)
    getProducts().then((list) => setRelated(list.filter((p) => p.id !== id).slice(0, 3)))
  }, [id])

  if (!product) return null

  function onAdd() {
    if (product.requiresPrescription) setOpen(true)
    else addToCart(product, 1)
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <img src={product.image} alt={product.name} className="w-full rounded" />
      </div>
      <div>
        <div className="text-2xl font-semibold">{product.name}</div>
        <div className="mt-1 text-slate-600">{product.manufacturer}</div>
        <div className="mt-2"><PrescriptionBadge required={product.requiresPrescription} /></div>
        <div className="mt-4 text-primary text-xl">${product.price.toFixed(2)}</div>
        <div className="mt-4 flex gap-2">
          <Button onClick={onAdd}>Add to Cart</Button>
          <Link href="/cart"><Button variant="outline">Go to Cart</Button></Link>
        </div>
        <div className="mt-8">
          <div className="font-semibold">Related Medicines</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.id} href={`/products/${r.id}`} className="rounded border border-slate-200 p-3">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-slate-600">{r.brand}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <UploadModal open={open} onClose={() => setOpen(false)} productId={product.id} />
    </div>
  )
}
