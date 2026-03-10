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
  variant?: "default" | "featured" | "minimal"
}

export function ProductCarousel({
  products,
  title,
  subtitle,
  direction = "left",
  speed = 0.3,
  variant = "default",
}: ProductCarouselProps) {
  const { addItem } = useCart()
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [containerCenter, setContainerCenter] = useState(0)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const velocityRef = useRef(0)

  // Duplicate for infinite effect
  const duplicatedProducts = [...products, ...products, ...products]

  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        setContainerCenter(containerRef.current.offsetWidth / 2)
      }
    }
    updateCenter()
    window.addEventListener("resize", updateCenter)
    return () => window.removeEventListener("resize", updateCenter)
  }, [])

  const animate = useCallback(() => {
    if (!trackRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    if (!isDragging && Math.abs(velocityRef.current) > 0.1) {
      positionRef.current += velocityRef.current
      velocityRef.current *= 0.95
    } else if (!isPaused && !isDragging) {
      if (direction === "left") {
        positionRef.current += speed
      } else {
        positionRef.current -= speed
      }
    }

    if (positionRef.current >= maxScroll) {
      positionRef.current = positionRef.current - maxScroll
    } else if (positionRef.current < 0) {
      positionRef.current = maxScroll + positionRef.current
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
    velocityRef.current = 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const walk = startX - x
    velocityRef.current = walk * 0.1
    positionRef.current = scrollLeft + walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollLeft(positionRef.current)
    velocityRef.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX
    const walk = startX - x
    velocityRef.current = walk * 0.1
    positionRef.current = scrollLeft + walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const cardWidth = variant === "featured" ? "w-[300px] md:w-[380px]" : variant === "minimal" ? "w-[220px] md:w-[280px]" : "w-[260px] md:w-[320px]"
  const cardGap = variant === "featured" ? "gap-6 md:gap-8" : "gap-4 md:gap-6"

  return (
    <section className="relative py-8 md:py-12">
      {/* Header with category pill */}
      <div className="px-5 md:px-10 mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          <div 
            className="h-px flex-1 bg-border"
            style={{ maxWidth: "60px" }}
          />
          <div className="flex flex-col items-center gap-2">
            {subtitle && (
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                {subtitle}
              </span>
            )}
            <h2 className="font-serif text-[clamp(1.25rem,3vw,1.75rem)] text-foreground tracking-tight">
              {title}
            </h2>
          </div>
          <div 
            className="h-px flex-1 bg-border"
            style={{ maxWidth: "60px" }}
          />
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing select-none overflow-hidden"
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
          className={`flex ${cardGap} will-change-transform px-5 md:px-10`}
        >
          {duplicatedProducts.map((product, index) => (
            <article
              key={`${product.id}-${index}`}
              className={`flex-shrink-0 ${cardWidth} group relative`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Card with number badge */}
              <div className="relative">
                {/* Product number - editorial style */}
                <div className="absolute -top-3 -left-2 z-10">
                  <span 
                    className="inline-flex items-center justify-center h-7 w-7 text-[10px] font-medium rounded-full bg-foreground text-background"
                  >
                    {String((index % products.length) + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                  <Image
                    src={
                      product.imageAlt && activeIndex === index
                        ? product.imageAlt
                        : product.image
                    }
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-700 ease-out pointer-events-none ${
                      activeIndex === index ? "scale-110" : "scale-100"
                    }`}
                    sizes="(max-width: 640px) 300px, 380px"
                    draggable={false}
                  />

                  {/* Sold overlay */}
                  {product.sold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/90">
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Vendido
                      </span>
                    </div>
                  )}

                  {/* Hover overlay with add button */}
                  {!product.sold && (
                    <div 
                      className={`absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-300 ${
                        activeIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isDragging) {
                            addItem(product)
                          }
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-[11px] font-medium uppercase tracking-[0.15em] rounded-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                        aria-label={`Anadir ${product.name} al carrito`}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Anadir
                      </button>
                    </div>
                  )}
                </div>

                {/* Product info bar */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] md:text-[14px] font-medium text-foreground leading-tight truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">
                      {product.category}
                    </p>
                  </div>
                  <div 
                    className="flex-shrink-0 px-3 py-1 rounded-full text-[12px] font-semibold"
                    style={{ 
                      backgroundColor: `${product.color}15`,
                      color: product.color 
                    }}
                  >
                    {product.price}&euro;
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Drag indicator */}
      <div className="flex justify-center mt-8 md:mt-10">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Arrastra para explorar
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
