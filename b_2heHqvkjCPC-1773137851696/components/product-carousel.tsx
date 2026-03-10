"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Plus, ArrowRight, ArrowLeft } from "lucide-react"

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
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const velocityRef = useRef(0)

  // Duplicate for infinite effect
  const duplicatedProducts = [...products, ...products, ...products]

  const animate = useCallback(() => {
    if (!trackRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    // Apply velocity decay when dragging ends
    if (!isDragging && Math.abs(velocityRef.current) > 0.1) {
      positionRef.current += velocityRef.current
      velocityRef.current *= 0.95
    } else if (!isPaused && !isDragging) {
      // Normal auto-scroll
      if (direction === "left") {
        positionRef.current += speed
      } else {
        positionRef.current -= speed
      }
    }

    // Loop back
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

  // Card sizes based on variant
  const cardWidth = variant === "featured" ? "w-[340px] md:w-[420px]" : variant === "minimal" ? "w-[200px] md:w-[260px]" : "w-[280px] md:w-[340px]"
  const aspectRatio = variant === "featured" ? "aspect-[4/5]" : variant === "minimal" ? "aspect-[3/4]" : "aspect-[3/4]"

  return (
    <section className="relative overflow-hidden">
      {/* Header */}
      <div className="px-5 md:px-10 mb-6 md:mb-10 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          {subtitle && (
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {subtitle}
            </span>
          )}
          <h2 className="font-serif italic text-[clamp(1.5rem,3.5vw,2.4rem)] leading-[1] text-foreground tracking-[-0.01em]">
            {title}
          </h2>
        </div>
        
        {/* Navigation hint */}
        <div className="hidden md:flex items-center gap-3 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.2em]">Desliza</span>
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>

      {/* Carousel track */}
      <div
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
          className="flex gap-3 md:gap-5 will-change-transform pl-5 md:pl-10"
        >
          {duplicatedProducts.map((product, index) => (
            <article
              key={`${product.id}-${index}`}
              className={`flex-shrink-0 ${cardWidth} group relative`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Image container with editorial styling */}
              <div className={`relative ${aspectRatio} overflow-hidden bg-muted`}>
                <Image
                  src={
                    product.imageAlt && activeIndex === index
                      ? product.imageAlt
                      : product.image
                  }
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out pointer-events-none ${
                    activeIndex === index ? "scale-105" : "scale-100"
                  }`}
                  sizes={variant === "featured" ? "(max-width: 640px) 340px, 420px" : "(max-width: 640px) 280px, 340px"}
                  draggable={false}
                />

                {/* Subtle color accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundColor: product.color }}
                />

                {/* Sold overlay */}
                {product.sold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      Vendido
                    </span>
                  </div>
                )}

                {/* Quick add button */}
                {!product.sold && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!isDragging) {
                        addItem(product)
                      }
                    }}
                    className={`absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center bg-foreground text-background rounded-full transition-all duration-400 cursor-pointer hover:scale-110 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    aria-label={`Anadir ${product.name} al carrito`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Product info - minimal elegant style */}
              <div className="pt-4 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[13px] md:text-[14px] font-medium text-foreground leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-[13px] md:text-[14px] font-semibold text-foreground tabular-nums flex-shrink-0">
                    {product.price}&euro;
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {product.category}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Elegant fade edges */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
