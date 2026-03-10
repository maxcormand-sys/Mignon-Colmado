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

        {/* Row of two product images */}
        <section className="relative h-screen grid grid-cols-2">
          <div className="relative h-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pJarron%20cristal%20rojo-F9UnWB1dcSaeXJ8LrIBVSsAvthMRyq.jpg"
              alt="Jarron de cristal rojo sobre tela con flores verdes y blancas"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pPlatos%20duralex%20amarillos-9of4wmhIirKKMQZDatqAoKoSS6O0wI.jpg"
              alt="Platos Duralex amarillos apilados sobre tela colorida"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Callout band */}
        <section className="bg-secondary">
          <div className="px-5 md:px-10 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h3 className="font-serif italic text-[clamp(1.8rem,4vw,3rem)] leading-[0.92] text-secondary-foreground tracking-[-0.01em]">
              Ven a descubrir
              <br className="hidden md:block" />{" "}
              el colmado
            </h3>
            <div className="flex flex-col gap-2 text-[12px] text-secondary-foreground/70">
              <span>C/ Diluvi, 11 -- Barcelona</span>
              <span>De martes a sabado, 11h - 14h / 17h - 20h</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
