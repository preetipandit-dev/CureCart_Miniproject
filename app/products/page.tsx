"use client"
import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [rxOnly, setRxOnly] = useState(false)
  const [priceMax, setPriceMax] = useState('')

  useEffect(() => {
    getProducts().then(setProducts)
    const sp = new URLSearchParams(window.location.search)
    setQ(sp.get('q') || '')
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
      if (category && p.category !== category) return false
      if (brand && p.brand !== brand) return false
      if (rxOnly && !p.requiresPrescription) return false
      if (priceMax && p.price > Number(priceMax)) return false
      return true
    })
  }, [products, q, category, brand, rxOnly, priceMax])

  const categories = Array.from(new Set(products.map((p) => p.category)))
  const brands = Array.from(new Set(products.map((p) => p.brand)))

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid gap-6 sm:grid-cols-[260px_1fr]">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-semibold">Filters</div>
          <div className="mt-3">
            <Input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="mt-3">
            <select className="w-full rounded-md border border-slate-200 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="mt-3">
            <select className="w-full rounded-md border border-slate-200 px-3 py-2" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="mt-3">
            <Input placeholder="Max Price" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input id="rx" type="checkbox" checked={rxOnly} onChange={(e) => setRxOnly(e.target.checked)} />
            <label htmlFor="rx" className="text-sm">Prescription Required</label>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => { setQ(''); setCategory(''); setBrand(''); setPriceMax(''); setRxOnly(false) }}>Reset</Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </motion.div>
  )
}
