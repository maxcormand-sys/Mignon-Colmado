"use client"

import { products } from "@/lib/products"
import { ProductCarousel } from "@/components/product-carousel"

export function ProductGrid() {
  return <ProductCarousel products={products} />
}
