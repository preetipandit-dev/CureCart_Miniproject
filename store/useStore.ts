import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  image: string
  dosage: string
  manufacturer: string
  requiresPrescription: boolean
}

export type Prescription = {
  id: string
  imageURL: string | null
  status: 'Pending' | 'Approved' | 'Rejected'
  rejectionReason?: string | null
  productId?: string | null
}

export type CartItem = {
  product: Product
  quantity: number
  prescriptionId?: string | null
}

export type Order = {
  id: string
  date: string
  total: number
  status: string
  items: { productId: string; quantity: number }[]
}

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  role?: 'user' | 'admin'
}

type Store = {
  user: User | null
  auth: { loggedIn: boolean }
  cart: CartItem[]
  prescriptions: Prescription[]
  orders: Order[]
  users: { id: string; name: string; email: string; password: string; role?: 'user' | 'admin' }[]
  setUser: (u: User | null) => void
  login: (u: User) => void
  logout: () => void
  addUser: (name: string, email: string, password: string) => void
  authenticate: (email: string, password: string) => boolean
  setOrders: (o: Order[]) => void
  addToCart: (p: Product, qty?: number) => void
  removeFromCart: (productId: string) => void
  attachPrescriptionToItem: (productId: string, prescriptionId: string) => void
  uploadPrescription: (imageURL: string, productId?: string) => string
  updatePrescriptionStatus: (prescriptionId: string, status: Prescription['status'], reason?: string | null) => void
  canCheckout: () => boolean
  clearCart: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      auth: { loggedIn: false },
      cart: [],
      prescriptions: [],
      orders: [],
      users: [
        { id: 'admin', name: 'Admin', email: 'admin@pharmacy.com', password: 'admin123', role: 'admin' }
      ],
      setUser: (u) => set({ user: u }),
      login: (u) => set({ user: u, auth: { loggedIn: true } }),
      logout: () => set({ user: null, auth: { loggedIn: false } }),
      addUser: (name, email, password) => {
        const exists = get().users.find((x) => x.email.toLowerCase() === email.toLowerCase())
        if (exists) return
        const id = 'u-' + Math.random().toString(36).slice(2, 9)
        const role: 'user' = 'user'
        set({ users: [...get().users, { id, name, email, password, role }] })
      },
      authenticate: (email, password) => {
        const found = get().users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password)
        if (found) {
          set({ user: { id: found.id, name: found.name, email: found.email, role: found.role }, auth: { loggedIn: true } })
          return true
        }
        return false
      },
      setOrders: (o) => set({ orders: o }),
      addToCart: (p, qty = 1) => {
        const cart = get().cart.slice()
        const existing = cart.find((c) => c.product.id === p.id)
        if (existing) existing.quantity += qty
        else cart.push({ product: p, quantity: qty, prescriptionId: null })
        set({ cart })
      },
      removeFromCart: (productId) => {
        const cart = get().cart.filter((c) => c.product.id !== productId)
        set({ cart })
      },
      attachPrescriptionToItem: (productId, prescriptionId) => {
        const cart = get().cart.map((c) => c.product.id === productId ? { ...c, prescriptionId } : c)
        set({ cart })
      },
      uploadPrescription: (imageURL, productId) => {
        const id = 'p-' + Math.random().toString(36).slice(2, 9)
        const presc: Prescription = { id, imageURL, status: 'Pending', rejectionReason: null, productId: productId || null }
        set({ prescriptions: [presc, ...get().prescriptions] })
        return id
      },
      updatePrescriptionStatus: (prescriptionId, status, reason = null) => {
        const prescriptions = get().prescriptions.map((p) => p.id === prescriptionId ? { ...p, status, rejectionReason: reason } : p)
        set({ prescriptions })
      },
      canCheckout: () => {
        const cart = get().cart
        const prescriptions = get().prescriptions
        for (const item of cart) {
          if (item.product.requiresPrescription) {
            const p = prescriptions.find((x) => x.id === item.prescriptionId)
            if (!p || p.status !== 'Approved') return false
          }
        }
        return true
      },
      clearCart: () => set({ cart: [] })
    }),
    { name: 'curecart-store' }
  )
)
