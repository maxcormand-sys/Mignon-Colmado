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

        {/* Editorial collage section */}
        <section className="bg-muted">
          <div className="px-5 md:px-10 py-16 md:py-24">
            <div className="grid md:grid-cols-12 gap-4 md:gap-5 items-start">
              {/* Left text block */}
              <div className="md:col-span-4 flex flex-col gap-5 md:sticky md:top-28">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
                  Filosofia
                </span>
                <h2 className="font-serif italic text-[clamp(2rem,4vw,3.2rem)] leading-[0.92] text-foreground tracking-[-0.02em]">
                  Cada objeto
                  <br />
                  tiene su propia
                  <br />
                  historia
                </h2>
                <p className="text-[13px] text-foreground/50 max-w-[300px] leading-relaxed">
                  Recorremos mercados y ferias de toda Europa buscando piezas con diseno y personalidad.
                  Las cuidamos para que encuentren un nuevo hogar donde ser apreciadas.
                </p>
                <Link
                  href="/about"
                  className="inline-flex self-start text-[10px] font-bold uppercase tracking-[0.2em] text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground transition-colors"
                >
                  Sobre Mignon
                </Link>
              </div>

              {/* Right image collage */}
              <div className="md:col-span-8 grid grid-cols-2 gap-3 md:gap-4">
                <div className="relative aspect-[3/4] overflow-hidden col-span-1">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pPerfumero%20verde-iOleJCJSFq08ZRptSHx4YV35pmsk1v.jpg"
                    alt="Lampara verde opalina sobre tela de rayas"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden col-span-1 mt-8 md:mt-16">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pJaume%20Orfila-zQdb019FyUwNnn8lqQFXc0p7Imb60T.jpg"
                    alt="Bote de porcelana con flores sobre tela roja"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden col-span-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6MrSZxMwR5Wyn1ZXcaSr9UxuJvfchI.jpg"
                    alt="Interior de la tienda Mignon"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
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
