export async function getProducts() {
  const res = await fetch('/data/products.json', { cache: 'no-store' })
  return res.json()
}

export async function getProduct(id: string) {
  const res = await fetch('/data/products.json', { cache: 'no-store' })
  const list = await res.json()
  return list.find((p: any) => p.id === id)
}

export async function getPrescriptions() {
  const res = await fetch('/data/prescriptions.json', { cache: 'no-store' })
  return res.json()
}

export async function getOrders() {
  const res = await fetch('/data/orders.json', { cache: 'no-store' })
  return res.json()
}

export async function getUsers() {
  const res = await fetch('/data/users.json', { cache: 'no-store' })
  return res.json()
}
