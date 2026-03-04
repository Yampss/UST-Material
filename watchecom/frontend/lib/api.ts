// API service layer for microservices backend
// These functions are designed to connect to separate backend microservices

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

// ─── User Service ───────────────────────────────────────────
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function registerUser(data: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getUserProfile(userId: string) {
  const res = await fetch(`${API_BASE}/api/users/${userId}`)
  return res.json()
}

// ─── Product Service ────────────────────────────────────────
export async function getProducts(params?: {
  brand?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.brand) searchParams.set('brand', params.brand)
  if (params?.type) searchParams.set('type', params.type)
  if (params?.minPrice) searchParams.set('minPrice', String(params.minPrice))
  if (params?.maxPrice) searchParams.set('maxPrice', String(params.maxPrice))
  if (params?.sort) searchParams.set('sort', params.sort)
  const res = await fetch(`${API_BASE}/api/products?${searchParams}`)
  return res.json()
}

export async function getProduct(id: string) {
  const res = await fetch(`${API_BASE}/api/products/${id}`)
  return res.json()
}

// ─── Cart Service ───────────────────────────────────────────
export async function getCart(userId: string) {
  const res = await fetch(`${API_BASE}/api/cart/${userId}`)
  return res.json()
}

export async function addToCart(userId: string, productId: string, quantity: number) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, quantity }),
  })
  return res.json()
}

export async function removeFromCart(userId: string, productId: string) {
  const res = await fetch(`${API_BASE}/api/cart/${userId}/${productId}`, {
    method: 'DELETE',
  })
  return res.json()
}

// ─── Order Service ──────────────────────────────────────────
export async function createOrder(data: {
  userId: string
  items: { productId: string; quantity: number }[]
  shippingAddress: object
}) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getOrders(userId: string) {
  const res = await fetch(`${API_BASE}/api/orders/${userId}`)
  return res.json()
}

// ─── Seller Service ─────────────────────────────────────────
export async function createListing(data: FormData) {
  const res = await fetch(`${API_BASE}/api/sellers/listings`, {
    method: 'POST',
    body: data,
  })
  return res.json()
}

// ─── Review Service ─────────────────────────────────────────
export async function getReviews(productId: string) {
  const res = await fetch(`${API_BASE}/api/reviews/${productId}`)
  return res.json()
}

export async function createReview(data: {
  productId: string
  userId: string
  rating: number
  comment: string
}) {
  const res = await fetch(`${API_BASE}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
