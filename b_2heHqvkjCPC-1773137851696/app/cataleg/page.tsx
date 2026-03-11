"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { products } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Plus, ArrowLeft } from "lucide-react"
import { CartSheet } from "@/components/cart-sheet"

export default function CatalegPage() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const { addItem } = useCart()
  const router = useRouter()

  return (
    <>
      <CartSheet />
      <main className="min-h-screen bg-background">
        {/* Header - turquoise, floating with margins, no rounded corners */}
        <header className="sticky top-4 z-40 px-4 md:px-8">
          <div className="bg-[#b3dfe0] px-6 py-3 flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#2c2420]/70 hover:text-[#2c2420] transition-colors px-3 py-1.5 border border-[#2c2420]/20 rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Tornar
            </button>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-3JKidEghwvs0m1RG08AhgRXPs4rDzj.png"
              alt="Mignon"
              width={120}
              height={40}
              className="w-[100px] md:w-[120px] h-auto"
              style={{ filter: 'brightness(0)' }}
            />
            <div className="w-[80px]" />
          </div>
        </header>

        {/* Hero section */}
        <section className="px-6 md:px-12 pt-12 pb-8 md:pt-16 md:pb-12 text-center">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4 px-4 py-1.5 border border-border rounded-full">
            Col·leccio
          </span>
          <h1 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-foreground tracking-[-0.02em] mb-4">
            El nostre cataleg
          </h1>
          <p className="font-serif italic text-[14px] md:text-[15px] text-foreground/50 max-w-[450px] mx-auto leading-relaxed">
            Peces uniques seleccionades amb cura
          </p>
        </section>

        {/* Products masonry grid */}
        <section className="px-4 md:px-8 pb-24">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
            {products.map((product, index) => {
              const isHovered = hoveredProduct === product.id
              
              // Vary heights for masonry effect
              const heightClasses = [
                "aspect-[3/4]",
                "aspect-[4/5]",
                "aspect-square",
                "aspect-[3/4]",
                "aspect-[2/3]",
              ]
              const heightClass = heightClasses[index % heightClasses.length]

              return (
                <article
                  key={product.id}
                  className="mb-4 md:mb-6 break-inside-avoid"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div
                    className={`relative ${heightClass} overflow-hidden bg-foreground/5 transition-shadow duration-500 group cursor-pointer`}
                    style={{
                      boxShadow: isHovered ? `0 0 0 2px ${product.color}` : '0 0 0 0px transparent',
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-all duration-700 ease-out ${
                        isHovered ? "scale-[1.04]" : "scale-100"
                      }`}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Sold overlay */}
                    {product.sold && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/60">
                          Vendido
                        </span>
                      </div>
                    )}

                    {/* Add to cart button */}
                    {!product.sold && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addItem(product)
                        }}
                        className={`absolute bottom-3 right-3 flex items-center gap-2 bg-foreground text-background px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer hover:bg-[#b3dfe0] hover:text-[#2c2420] ${
                          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                        }`}
                      >
                        <Plus className="h-3 w-3" strokeWidth={2.5} />
                        Afegir
                      </button>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="pt-3 px-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif italic text-[13px] md:text-[14px] text-foreground leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-[13px] font-medium text-foreground/70 tabular-nums flex-shrink-0">
                        {product.price}&euro;
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Footer CTA - thinner */}
        <section className="px-6 py-8 md:py-10 bg-[#b3dfe0]/20 text-center">
          <p className="font-serif italic text-[13px] text-foreground/50">
            No trobes el que busques? Contacta amb nosaltres
          </p>
        </section>
      </main>
    </>
  )
}
