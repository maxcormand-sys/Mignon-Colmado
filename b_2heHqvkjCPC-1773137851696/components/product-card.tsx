"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Plus } from "lucide-react"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const hasAlt = product.imageAlt && product.imageAlt !== product.image
  const currentImage = hasAlt && isHovered ? product.imageAlt : product.image

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with colored border on hover */}
      <div
        className="relative aspect-[3/4] overflow-hidden transition-shadow duration-500"
        style={{
          boxShadow: isHovered ? `0 0 0 3px ${product.color}` : '0 0 0 0px transparent',
        }}
      >
        <Image
          src={currentImage!}
          alt={product.name}
          fill
          className={`transition-all duration-700 ease-out object-cover ${
            isHovered ? "scale-[1.04]" : "scale-100"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />

        {/* Color dot indicator */}
        <div
          className="absolute top-3 left-3 h-3 w-3 rounded-full border-2 border-background/80"
          style={{ backgroundColor: product.color }}
          aria-hidden="true"
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
            className={`absolute bottom-3 right-3 flex items-center gap-2 bg-foreground text-background px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer hover:bg-secondary hover:text-secondary-foreground ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            aria-label={`Anadir ${product.name} al carrito`}
          >
            <Plus className="h-3 w-3" strokeWidth={2.5} />
            Anadir
          </button>
        )}
      </div>

      {/* Product info */}
      <div className="flex items-start justify-between pt-3 gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {product.category}
          </span>
          <h3 className="text-[13px] font-medium text-foreground leading-tight">
            {product.name}
          </h3>
        </div>
        <span className="text-[14px] font-bold text-foreground tabular-nums flex-shrink-0">
          {product.price}&euro;
        </span>
      </div>
    </article>
  )
}
