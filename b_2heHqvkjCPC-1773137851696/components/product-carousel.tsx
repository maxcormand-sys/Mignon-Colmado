"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products"
import { categories, type Category } from "@/lib/products"

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<Category>("Todo")
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const animationRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastTimeRef = useRef(0)
  const lastXRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const dragStartPosRef = useRef(0)

  const filteredProducts = activeFilter === "Todo" 
    ? products 
    : products.filter(p => p.category === activeFilter)

  // Duplicate products for infinite scroll effect
  const displayProducts = [...filteredProducts, ...filteredProducts, ...filteredProducts]

  // Reset scroll position when filter changes
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0
    }
  }, [activeFilter])

  // Auto-scroll animation
  const animate = useCallback(() => {
    if (!trackRef.current || !isAutoScrolling || isDragging) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    // Apply velocity decay
    if (Math.abs(velocityRef.current) > 0.5) {
      track.scrollLeft += velocityRef.current
      velocityRef.current *= 0.95
    } else {
      // Auto scroll when no momentum
      track.scrollLeft += 0.5
    }

    // Loop back for infinite scroll
    if (track.scrollLeft >= maxScroll * 2) {
      track.scrollLeft = maxScroll
    } else if (track.scrollLeft <= 0) {
      track.scrollLeft = maxScroll
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [isAutoScrolling, isDragging])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoScrolling(false)
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0))
    setScrollLeft(trackRef.current?.scrollLeft || 0)
    lastXRef.current = e.pageX
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    hasDraggedRef.current = false
    dragStartPosRef.current = e.pageX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    
    const x = e.pageX - (trackRef.current.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    trackRef.current.scrollLeft = scrollLeft - walk

    // Mark as dragged if moved more than 5px
    if (Math.abs(e.pageX - dragStartPosRef.current) > 5) {
      hasDraggedRef.current = true
    }

    // Calculate velocity for momentum
    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (lastXRef.current - e.pageX) / dt * 15
    }
    lastXRef.current = e.pageX
    lastTimeRef.current = now
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setTimeout(() => setIsAutoScrolling(true), 2000)
    }
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setIsAutoScrolling(false)
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft || 0))
    setScrollLeft(trackRef.current?.scrollLeft || 0)
    lastXRef.current = e.touches[0].pageX
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return
    
    const x = e.touches[0].pageX - (trackRef.current.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    trackRef.current.scrollLeft = scrollLeft - walk

    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (lastXRef.current - e.touches[0].pageX) / dt * 15
    }
    lastXRef.current = e.touches[0].pageX
    lastTimeRef.current = now
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  // Wheel handler for trackpad - using native scroll for maximum fluidity
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleNativeWheel = (e: WheelEvent) => {
      // Let the browser handle the scroll natively for smooth trackpad
      // Only prevent default if it's a vertical scroll we want to convert to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
        e.preventDefault()
        track.scrollLeft += e.deltaY
      }
      
      setIsAutoScrolling(false)
      
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
      wheelTimeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 2500)
    }

    track.addEventListener('wheel', handleNativeWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleNativeWheel)
  }, [])

  return (
    <section id="coleccion" className="scroll-mt-20 py-12 md:py-20">
      {/* Header */}
      <div className="px-5 md:px-10 mb-10 md:mb-14 text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4 px-4 py-1.5 border border-border rounded-full">
          Coleccion
        </span>
        <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] leading-[1] text-foreground tracking-tight mb-4">
          Objectes trobats
        </h2>
        <p className="text-[14px] text-muted-foreground max-w-md mx-auto mb-8">
          Piezas unicas seleccionadas en mercados de toda Europa
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-4 md:px-6 py-2 md:py-2.5 text-[11px] md:text-[12px] font-medium uppercase tracking-[0.15em] 
                rounded-full transition-all duration-300 cursor-pointer
                ${activeFilter === category 
                  ? "bg-[#2c2420] text-[#fffdf8]" 
                  : "bg-transparent text-foreground border border-[#2c2420]/30 hover:bg-[#2c2420]/5"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => {
          if (!isDragging) setIsAutoScrolling(true)
        }}
      >
        {/* Product track */}
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none px-5 md:px-10 pb-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          
        >
          {displayProducts.map((product, index) => (
            <article
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-[280px] md:w-[340px] group"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <Link
                href={`/producto/${product.id}`}
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault()
                  }
                }}
                draggable={false}
                className="block"
              >
                {/* Image container - only photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg">
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
                    sizes="(max-width: 640px) 280px, 340px"
                    draggable={false}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />

                  {/* Sold overlay */}
                  {product.sold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Vendido
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Hide scrollbar globally for this component */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
