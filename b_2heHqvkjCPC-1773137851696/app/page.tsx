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

        {/* Featured Product Section */}
        <section className="relative min-h-screen bg-[#b3dfe0] overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-screen">
            {/* Left side - Product info */}
            <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 order-2 md:order-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#2c2420]/50 mb-4">
                Peça destacada
              </span>
              <h2 className="font-serif italic text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-[#2c2420] tracking-[-0.02em] mb-6">
                Làmpara<br />
                flexo blau
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#2c2420]/70 max-w-[380px] leading-relaxed mb-8">
                Flexo dels anys 70 en perfecte estat. Braç flexible i disseny atemporal que aporta caràcter a qualsevol racó.
              </p>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-[32px] md:text-[40px] font-serif text-[#2c2420]">45€</span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#2c2420]/40">Peça única</span>
              </div>
              <Link
                href="/producto/lampara-flexo-azul"
                className="inline-flex self-start items-center gap-3 px-6 py-3 bg-[#2c2420] text-[#fffdf8] text-[11px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-[#2c2420]/90 transition-colors"
              >
                Veure detalls
              </Link>
            </div>
            
            {/* Right side - Large product image */}
            <div className="relative flex items-center justify-center order-1 md:order-2 py-12 md:py-0">
              <div className="relative w-[80%] md:w-[90%] aspect-square">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-1UrIiH6OIlrFGSE6Vy63QoWDex2fl9.png"
                  alt="Lampara flexo azul vintage de los años 70"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
