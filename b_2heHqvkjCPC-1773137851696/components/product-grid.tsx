"use client"

import { products, categories, type Category } from "@/lib/products"
import { ProductCarousel } from "@/components/product-carousel"

export function ProductGrid() {
  // Group products by category
  const iluminacion = products.filter((p) => p.category === "Iluminacion")
  const ceramica = products.filter((p) => p.category === "Ceramica")
  const figuras = products.filter((p) => p.category === "Figuras")

  return (
    <section id="coleccion" className="scroll-mt-20">
      {/* Section header */}
      <div className="px-5 md:px-10 pt-16 md:pt-24 pb-4">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
            Coleccion
          </span>
          <h2 className="font-serif italic text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.9] text-foreground tracking-[-0.02em]">
            Objectes trobats
          </h2>
        </div>
      </div>

      {/* Carousels by category */}
      {iluminacion.length > 0 && (
        <ProductCarousel
          products={iluminacion}
          title="Iluminacion vintage"
          subtitle="Lamparas unicas"
          direction="left"
          speed={0.4}
        />
      )}

      {ceramica.length > 0 && (
        <ProductCarousel
          products={ceramica}
          title="Ceramica artesanal"
          subtitle="Piezas de coleccion"
          direction="right"
          speed={0.35}
        />
      )}

      {figuras.length > 0 && (
        <ProductCarousel
          products={figuras}
          title="Figuras decorativas"
          subtitle="Detalles con caracter"
          direction="left"
          speed={0.45}
        />
      )}

      {/* All products carousel */}
      <div className="border-t border-border mt-8">
        <ProductCarousel
          products={products}
          title="Todas las piezas"
          subtitle="Descubre todo"
          direction="right"
          speed={0.3}
        />
      </div>
    </section>
  )
}
