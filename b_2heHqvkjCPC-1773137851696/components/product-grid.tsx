"use client"

import { products } from "@/lib/products"
import { ProductCarousel } from "@/components/product-carousel"

export function ProductGrid() {
  const iluminacion = products.filter((p) => p.category === "Iluminacion")
  const ceramica = products.filter((p) => p.category === "Ceramica")
  const figuras = products.filter((p) => p.category === "Figuras")
  const decoracion = [...ceramica, ...figuras]

  return (
    <section id="coleccion" className="scroll-mt-20 py-12 md:py-20">
      {/* Main header */}
      <div className="px-5 md:px-10 mb-12 md:mb-16 text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4 px-4 py-1.5 border border-border rounded-full">
          Coleccion
        </span>
        <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] leading-[1] text-foreground tracking-tight mb-4">
          Objectes trobats
        </h2>
        <p className="text-[14px] text-muted-foreground max-w-md mx-auto">
          Piezas unicas seleccionadas en mercados de toda Europa
        </p>
      </div>

      {/* Carousels */}
      <div className="space-y-6 md:space-y-8">
        <ProductCarousel
          products={iluminacion}
          title="Iluminacion"
          subtitle="Destacado"
          direction="left"
          speed={0.2}
          variant="featured"
        />

        <ProductCarousel
          products={decoracion}
          title="Decoracion"
          subtitle="Ceramica y figuras"
          direction="right"
          speed={0.25}
          variant="default"
        />

        <ProductCarousel
          products={products}
          title="Todo"
          subtitle="Catalogo completo"
          direction="left"
          speed={0.3}
          variant="minimal"
        />
      </div>
    </section>
  )
}
