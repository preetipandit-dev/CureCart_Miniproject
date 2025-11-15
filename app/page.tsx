"use client"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { ShieldCheck, Truck, UserCheck, FileText } from 'lucide-react'

export default function Page() {
  const [products, setProducts] = useState<any[]>([])
  const categories = Array.from(new Set(products.map((p) => p.category)))

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <section className="rounded-xl bg-gradient-to-r from-blue-50 to-green-50 p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Your trusted online medicine partner</h1>
            <p className="mt-2 text-slate-600">Browse medicines, upload prescriptions, and get fast delivery</p>
          </div>
          <Link href="/products"><Button size="lg">Shop Medicines</Button></Link>
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-green-600" /> Secure Checkout</div>
          <div className="text-sm text-slate-600">Encrypted payments and privacy</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 font-semibold"><UserCheck className="h-5 w-5 text-blue-600" /> Verified Pharmacists</div>
          <div className="text-sm text-slate-600">Professional review of prescriptions</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 font-semibold"><Truck className="h-5 w-5 text-primary" /> Fast Delivery</div>
          <div className="text-sm text-slate-600">Same-day in select areas</div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Medicines</h2>
          <Link href="/products" className="text-sm text-blue-600">View all</Link>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="min-w-[280px] flex-shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Shop by Category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c} href={`/products`} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <div className="font-medium">{c}</div>
              <div className="text-sm text-slate-600">Browse {c} medicines</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 font-medium"><FileText className="h-5 w-5 text-primary" /> Browse</div>
            <div className="mt-1 text-sm text-slate-600">Find medicines and add to cart</div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 font-medium"><FileText className="h-5 w-5 text-green-600" /> Upload Rx</div>
            <div className="mt-1 text-sm text-slate-600">Upload or attach your prescription</div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 font-medium"><UserCheck className="h-5 w-5 text-blue-600" /> Review</div>
            <div className="mt-1 text-sm text-slate-600">Pharmacist reviews and approves</div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 font-medium"><Truck className="h-5 w-5 text-primary" /> Delivery</div>
            <div className="mt-1 text-sm text-slate-600">Get your medicines delivered fast</div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-6">
          <div className="text-lg font-semibold">What our customers say</div>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            <p>“Smooth upload and quick approval. Delivery was same-day.”</p>
            <p>“Clear Rx requirements and helpful status updates.”</p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-6">
          <div className="text-lg font-semibold">Frequently asked questions</div>
          <div className="mt-3 space-y-2">
            <details className="rounded border border-slate-200 p-3">
              <summary className="cursor-pointer font-medium">Do I need a prescription for all medicines?</summary>
              <div className="mt-2 text-sm text-slate-700">Only for items marked Prescription Required.</div>
            </details>
            <details className="rounded border border-slate-200 p-3">
              <summary className="cursor-pointer font-medium">How long does approval take?</summary>
              <div className="mt-2 text-sm text-slate-700">Approvals are mocked and typically update within minutes.</div>
            </details>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold">Ready to order?</div>
            <div className="text-sm text-slate-600">Browse catalog, upload your prescription, and checkout.</div>
          </div>
          <Link href="/products"><Button size="lg">Start Shopping</Button></Link>
        </div>
      </section>
    </motion.div>
  )
}
