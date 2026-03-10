import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/hero"

import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"
import { CartSheet } from "@/components/cart-sheet"

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <ProductGrid />

      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
