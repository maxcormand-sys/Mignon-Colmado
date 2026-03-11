import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { RevealLamps } from "@/components/reveal-lamps"
import { ProductGrid } from "@/components/product-grid"
import { CategoryCarousel } from "@/components/category-carousel"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { CartSheet } from "@/components/cart-sheet"

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <RevealLamps />
        <CategoryCarousel />
        <ProductGrid />
        <AboutSection />
      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
