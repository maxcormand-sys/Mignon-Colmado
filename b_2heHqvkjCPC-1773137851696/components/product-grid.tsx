"use client"

import { useState } from "react"
import { products, categories, type Category } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todo")

  const filtered = activeCategory === "Todo"
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <section id="coleccion" className="scroll-mt-20">
      {/* Section header */}
      <div className="px-5 md:px-10 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              Coleccion
            </span>
            <h2 className="font-serif italic text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.9] text-foreground tracking-[-0.02em]">
              Objectes trobats
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/60 border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="px-5 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-[13px] text-muted-foreground">
              No hay productos en esta categoria por ahora.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
