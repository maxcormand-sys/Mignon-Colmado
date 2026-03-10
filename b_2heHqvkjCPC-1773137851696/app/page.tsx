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

        {/* Featured Product Section */}
        <section className="relative min-h-screen bg-white overflow-hidden">
          {/* Large background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] md:text-[18vw] font-serif italic text-[#2c2420]/[0.03] whitespace-nowrap">
              Flexo 70s
            </span>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16 md:py-24">
            {/* Product image - hero size */}
            <div className="relative w-[70vw] md:w-[45vw] lg:w-[35vw] max-w-[500px] aspect-square mb-8 md:mb-12">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-1UrIiH6OIlrFGSE6Vy63QoWDex2fl9.png"
                alt="Lampara flexo azul vintage de los años 70"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Product info - centered below */}
            <div className="flex flex-col items-center text-center max-w-[500px]">
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#2c2420]/40 mb-3">
                Nou a la botiga
              </span>
              <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-[#2c2420] tracking-[-0.02em] mb-4">
                Làmpara flexo blau
              </h2>
              <p className="text-[13px] md:text-[14px] text-[#2c2420]/60 leading-relaxed mb-6 max-w-[400px]">
                Disseny italià dels anys 70. Braç articulat, base pesada i un blau que enamora.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-[28px] md:text-[36px] font-serif text-[#2c2420]">45€</span>
                <span className="h-4 w-px bg-[#2c2420]/20" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#2c2420]/40">Peça única</span>
              </div>
              <Link
                href="/producto/lampara-flexo-azul"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2c2420] text-[#fffdf8] text-[11px] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-[#2c2420]/90 transition-all hover:scale-[1.02]"
              >
                Afegir al carret
              </Link>
            </div>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#2c2420]/10" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#2c2420]/10" />
        </section>

      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
