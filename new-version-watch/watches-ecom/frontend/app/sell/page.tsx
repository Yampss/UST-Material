'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { brands, categories } from '@/lib/mock-data'

const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair']

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In production, this would call the Seller Service API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <CheckCircle className="h-16 w-16 text-accent" />
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
          Listing Submitted
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for your submission. Our team will review your listing and it will be live
          within 24-48 hours.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          className="mt-8 bg-foreground text-background hover:bg-foreground/90"
        >
          Submit Another Listing
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Seller Portal</p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Sell Your Watch
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Reach thousands of verified collectors. Complete the form below with accurate details
          to maximize your listing&apos;s visibility.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Image Upload */}
        <div>
          <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-foreground">
            Watch Image
          </label>
          {imagePreview ? (
            <div className="relative inline-block">
              <div className="relative h-64 w-64 overflow-hidden bg-secondary">
                <Image src={imagePreview} alt="Watch preview" fill className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-64 w-full items-center justify-center border-2 border-dashed border-border bg-secondary/50 transition-colors hover:border-accent"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <span className="text-sm">Click to upload watch image</span>
                <span className="text-xs">PNG, JPG up to 10MB</span>
              </div>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Brand & Model */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="brand" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground">
              Brand
            </label>
            <select
              id="brand"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="model" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground">
              Model
            </label>
            <input
              id="model"
              type="text"
              required
              placeholder="e.g. Submariner Date"
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Condition & Category */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="condition" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground">
              Condition
            </label>
            <select
              id="condition"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select condition</option>
              {conditions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground">
              Category
            </label>
            <select
              id="category"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground">
            Asking Price (USD)
          </label>
          <input
            id="price"
            type="number"
            required
            min={1}
            placeholder="Enter your asking price"
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none md:max-w-xs"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            required
            placeholder="Describe your watch, including any details about its history, condition, and included accessories..."
            className="w-full resize-none border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/90 md:w-auto md:min-w-[200px]"
        >
          Submit Listing
        </Button>
      </form>
    </div>
  )
}
