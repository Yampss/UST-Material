'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In production, this would call the Order Service API
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <CheckCircle className="h-16 w-16 text-accent" />
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
          Order Confirmed
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for your purchase. You will receive a confirmation email shortly with
          tracking information.
        </p>
        <Link href="/orders">
          <Button className="mt-8 bg-foreground text-background hover:bg-foreground/90">
            View Orders
          </Button>
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <p className="text-lg text-muted-foreground">Your cart is empty.</p>
        <Link href="/shop">
          <Button variant="outline" className="mt-4">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="mb-12 font-serif text-4xl font-bold tracking-tight text-foreground">
        Checkout
      </h1>

      <div className="grid gap-12 lg:grid-cols-5">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:col-span-3">
          {/* Shipping */}
          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground">
              Shipping Information
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
              <input
                type="text"
                required
                placeholder="Street Address"
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="ZIP Code"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground">
              Payment
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Card Number"
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="MM / YY"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Place Order &mdash; ${totalPrice.toLocaleString()}
          </Button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="border border-border bg-card p-6">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground">
              Order Summary
            </h2>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.watch.id} className="flex items-center gap-4">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-secondary">
                    <Image
                      src={item.watch.image}
                      alt={`${item.watch.brand} ${item.watch.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{item.watch.brand}</p>
                    <p className="text-sm font-medium text-foreground">{item.watch.model}</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    ${(item.watch.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">Complimentary</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
                <span className="font-serif text-xl font-semibold text-foreground">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
