import Image from 'next/image'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { mockOrders } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const statusConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  Processing: { icon: Clock, color: 'text-muted-foreground' },
  Shipped: { icon: Truck, color: 'text-accent' },
  Delivered: { icon: CheckCircle, color: 'text-green-600' },
  Cancelled: { icon: Package, color: 'text-destructive' },
}

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Account</p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Your Orders
        </h1>
      </div>

      {mockOrders.length === 0 ? (
        <div className="py-20 text-center">
          <Package className="mx-auto h-12 w-12 text-border" />
          <p className="mt-4 text-muted-foreground">No orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            return (
              <div key={order.id} className="border border-border bg-card p-6">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Order</p>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Date</p>
                      <p className="text-sm text-foreground">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={cn('h-4 w-4', status.color)} />
                    <span className={cn('text-sm font-medium', status.color)}>{order.status}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-4 flex flex-col gap-4">
                  {order.items.map((item) => (
                    <div key={item.watch.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-secondary">
                        <Image
                          src={item.watch.image}
                          alt={`${item.watch.brand} ${item.watch.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          {item.watch.brand}
                        </p>
                        <p className="text-sm font-medium text-foreground">{item.watch.model}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        ${item.watch.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="mt-4 flex justify-end border-t border-border pt-4">
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total</p>
                    <p className="font-serif text-lg font-semibold text-foreground">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
