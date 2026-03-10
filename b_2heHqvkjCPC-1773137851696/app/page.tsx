import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { RevealLamps } from "@/components/reveal-lamps"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"
import { CartSheet } from "@/components/cart-sheet"

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <RevealLamps />
        <ProductGrid />

        {/* Shop interior image */}
        <section className="relative h-screen">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1-XzPFS5AXf7q2JS2khuuwsw3lZquOdY.jpg"
            alt="Interior de la tienda Mignon con ceramica, lamparas y objetos vintage"
            fill
            className="object-cover"
          />
        </section>

      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
