import Link from 'next/link'
import PrescriptionBadge from '@/components/PrescriptionBadge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{product.name}</div>
          <PrescriptionBadge required={product.requiresPrescription} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <img src={product.image} alt={product.name} className="h-24 w-24 rounded object-cover" />
          <div className="flex-1">
            <div className="text-sm text-slate-600">{product.brand}</div>
            <div className="mt-2 text-primary">${product.price.toFixed(2)}</div>
            <Link href={`/products/${product.id}`} className="mt-3 inline-block text-sm text-blue-600">View Details</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
