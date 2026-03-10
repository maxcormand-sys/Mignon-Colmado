"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Plus } from "lucide-react"

interface ProductCarouselProps {
  products: Product[]
  title: string
  subtitle?: string
  direction?: "left" | "right"
  speed?: number
}

export function ProductCarousel({
  products,
  title,
  subtitle,
  direction = "left",
  speed = 0.5,
}: ProductCarouselProps) {
  const { addItem } = useCart()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)

  // Duplicate products for infinite scroll effect
  const duplicatedProducts = [...products, ...products, ...products]

  const animate = useCallback(() => {
    if (!trackRef.current || isPaused || isDragging) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    if (direction === "left") {
      positionRef.current += speed
      if (positionRef.current >= maxScroll) {
        positionRef.current = 0
      }
    } else {
      positionRef.current -= speed
      if (positionRef.current <= 0) {
        positionRef.current = maxScroll
      }
    }

    track.style.transform = `translateX(-${positionRef.current}px)`
    animationRef.current = requestAnimationFrame(animate)
  }, [direction, speed, isPaused, isDragging])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(positionRef.current)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const walk = (startX - x) * 1.5
    positionRef.current = scrollLeft + walk
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${positionRef.current}px)`
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollLeft(positionRef.current)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX
    const walk = (startX - x) * 1.5
    positionRef.current = scrollLeft + walk
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${positionRef.current}px)`
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      {/* Header */}
      <div className="px-5 md:px-10 mb-8 md:mb-12">
        <div className="flex flex-col gap-2">
          {subtitle && (
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              {subtitle}
            </span>
          )}
          <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.95] text-foreground tracking-[-0.02em]">
            {title}
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setIsDragging(false)
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          {duplicatedProducts.map((product, index) => (
            <article
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-[260px] md:w-[320px] group"
              onMouseEnter={() => setHoveredProduct(`${product.id}-${index}`)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image container */}
              <div
                className="relative aspect-[3/4] overflow-hidden transition-all duration-500"
                style={{
                  boxShadow:
                    hoveredProduct === `${product.id}-${index}`
                      ? `0 0 0 3px ${product.color}`
                      : "0 0 0 0px transparent",
                }}
              >
                <Image
                  src={
                    product.imageAlt &&
                    hoveredProduct === `${product.id}-${index}`
                      ? product.imageAlt
                      : product.image
                  }
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-700 ease-out pointer-events-none ${
                    hoveredProduct === `${product.id}-${index}`
                      ? "scale-[1.04]"
                      : "scale-100"
                  }`}
                  sizes="(max-width: 640px) 260px, 320px"
                  draggable={false}
                />

                {/* Color dot */}
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
                      if (!isDragging) {
                        addItem(product)
                      }
                    }}
                    className={`absolute bottom-3 right-3 flex items-center gap-2 bg-foreground text-background px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer hover:bg-secondary hover:text-secondary-foreground ${
                      hoveredProduct === `${product.id}-${index}`
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }`}
                    aria-label={`Anadir ${product.name} al carrito`}
                  >
                    <Plus className="h-3 w-3" strokeWidth={2.5} />
                    Anadir
                  </button>
                )}
              </div>

              {/* Product info */}
              <div className="flex items-start justify-between pt-4 gap-3">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                    {product.category}
                  </span>
                  <h3 className="text-[14px] font-medium text-foreground leading-tight">
                    {product.name}
                  </h3>
                </div>
                <span className="text-[15px] font-bold text-foreground tabular-nums flex-shrink-0">
                  {product.price}&euro;
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Gradient fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Drag hint */}
      <div className="px-5 md:px-10 mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px w-6 bg-border" />
        Arrastra para explorar
      </div>
    </section>
  )
}
