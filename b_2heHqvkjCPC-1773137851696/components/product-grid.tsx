"use client"

import { products } from "@/lib/products"
import { ProductCarousel } from "@/components/product-carousel"

export function ProductGrid() {
  // Group products by category
  const iluminacion = products.filter((p) => p.category === "Iluminacion")
  const ceramica = products.filter((p) => p.category === "Ceramica")
  const figuras = products.filter((p) => p.category === "Figuras")
  
  // Combine smaller categories
  const decoracion = [...ceramica, ...figuras]

  return (
    <section id="coleccion" className="scroll-mt-20 py-16 md:py-24">
      {/* Main header */}
      <div className="px-5 md:px-10 mb-16 md:mb-24">
        <div className="max-w-2xl">
          <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground block mb-3">
            Nuestra coleccion
          </span>
          <h2 className="font-serif italic text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-foreground tracking-[-0.02em] mb-6">
            Objectes trobats
          </h2>
          <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed max-w-md">
            Piezas unicas de diferentes epocas, seleccionadas con cuidado en mercados de toda Europa.
          </p>
        </div>
      </div>

      {/* Featured: Iluminacion - larger cards */}
      <div className="mb-16 md:mb-24">
        <ProductCarousel
          products={iluminacion}
          title="Iluminacion"
          subtitle="Coleccion destacada"
          direction="left"
          speed={0.25}
          variant="featured"
        />
      </div>

      {/* Decoracion - default cards */}
      <div className="mb-16 md:mb-24">
        <ProductCarousel
          products={decoracion}
          title="Ceramica y figuras"
          subtitle="Detalles con caracter"
          direction="right"
          speed={0.35}
          variant="default"
        />
      </div>

      {/* All products - minimal style, faster */}
      <div className="border-t border-border pt-16 md:pt-20">
        <ProductCarousel
          products={products}
          title="Todo el catalogo"
          subtitle="Explora"
          direction="left"
          speed={0.4}
          variant="minimal"
        />
      </div>
    </section>
  )
}
