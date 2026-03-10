"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { products, categories, type Category } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Plus, ArrowLeft } from "lucide-react"
import { CartSheet } from "@/components/cart-sheet"

export default function CatalegPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todo")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const { addItem } = useCart()

  const filteredProducts = activeCategory === "Todo" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <>
      <CartSheet />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-foreground/5">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tornar
            </Link>
            <Link href="/" className="font-serif italic text-[20px] text-foreground">
              Mignon
            </Link>
            <div className="w-16" />
          </div>
        </header>

        {/* Hero section */}
        <section className="px-6 md:px-12 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-4">
            Col·leccio completa
          </span>
          <h1 className="font-serif italic text-[clamp(2.5rem,6vw,4rem)] text-foreground tracking-[-0.02em] mb-6">
            El nostre cataleg
          </h1>
          <p className="text-[14px] md:text-[15px] text-foreground/60 max-w-[500px] mx-auto leading-relaxed">
            Peces uniques seleccionades amb cura. Cada objecte te la seva propia historia i caracter.
          </p>
        </section>

        {/* Category filters */}
        <nav className="px-6 md:px-12 pb-8 md:pb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 text-[10px] uppercase tracking-[0.15em] rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#2c2420] text-[#fffdf8]"
                    : "bg-[#b3dfe0]/30 text-foreground/70 hover:bg-[#b3dfe0]/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        {/* Products masonry grid */}
        <section className="px-4 md:px-8 pb-24">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => {
              const isHovered = hoveredProduct === product.id
              const hasAlt = product.imageAlt && product.imageAlt !== product.image
              const currentImage = hasAlt && isHovered ? product.imageAlt : product.image
              
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
                      boxShadow: isHovered ? `0 0 0 3px ${product.color}` : '0 0 0 0px transparent',
                    }}
                  >
                    <Image
                      src={currentImage!}
                      alt={product.name}
                      fill
                      className={`object-cover transition-all duration-700 ease-out ${
                        isHovered ? "scale-[1.04]" : "scale-100"
                      }`}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Color indicator */}
                    <div
                      className="absolute top-3 left-3 h-3 w-3 rounded-full border-2 border-background/80"
                      style={{ backgroundColor: product.color }}
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
                    <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                      {product.category}
                    </span>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[12px] md:text-[13px] font-medium text-foreground leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-[13px] font-bold text-foreground tabular-nums flex-shrink-0">
                        {product.price}&euro;
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 py-16 md:py-24 bg-[#b3dfe0]/20 text-center">
          <p className="text-[13px] text-foreground/60 mb-6">
            No trobes el que busques?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c2420] text-[#fffdf8] text-[10px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-[#2c2420]/90 transition-colors"
          >
            Contacta amb nosaltres
          </Link>
        </section>
      </main>
    </>
  )
}
