"use client"

import { products } from "@/lib/products"
import { ProductCarousel } from "@/components/product-carousel"

export function ProductGrid() {
  // Only show products with styled backgrounds (not white/transparent backgrounds)
  const productsWithBackground = products.filter(product => product.hasBackground)
  return <ProductCarousel products={productsWithBackground} />
}
