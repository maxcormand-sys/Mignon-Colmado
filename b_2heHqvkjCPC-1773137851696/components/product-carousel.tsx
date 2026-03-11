"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products"

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const animationRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastTimeRef = useRef(0)
  const lastXRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const dragStartPosRef = useRef(0)

  // Duplicate products for infinite scroll effect (all products, no filter)
  const displayProducts = [...products, ...products, ...products]

  // Auto-scroll animation - ALWAYS running
  const animate = useCallback(() => {
    if (!trackRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    // Apply velocity decay or auto-scroll
    if (Math.abs(velocityRef.current) > 0.5) {
      track.scrollLeft += velocityRef.current
      velocityRef.current *= 0.95
    } else if (!isDragging) {
      // Auto scroll when no momentum - scroll in opposite direction (right to left)
      track.scrollLeft -= 0.7
    }

    // Loop back for infinite scroll
    if (track.scrollLeft >= maxScroll * 2) {
      track.scrollLeft = maxScroll
    } else if (track.scrollLeft <= 0) {
      track.scrollLeft = maxScroll
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [isDragging])

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
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  // Touch handlers - let native scroll handle it for maximum fluidity
  const handleTouchStart = () => {
    setIsDragging(true)
    velocityRef.current = 0
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Wheel handler for trackpad - using native scroll for maximum fluidity
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
    }

    track.addEventListener('wheel', handleNativeWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleNativeWheel)
  }, [])

  return (
    <section id="coleccion" className="scroll-mt-20 pt-6 md:pt-10 pb-12 md:pb-20">
      {/* Header */}
      <div className="px-5 md:px-10 mb-10 md:mb-14 text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4 px-4 py-1.5 border border-border rounded-full">
          Coleccion
        </span>
        <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] leading-[1] text-foreground tracking-tight mb-4">
          Objectes trobats
        </h2>
        <p className="text-[14px] text-muted-foreground max-w-md mx-auto mb-6">
          Piezas unicas seleccionadas en mercados de toda Europa
        </p>
        <Link
          href="/cataleg"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b3dfe0] text-[#2c2420] text-[10px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-[#9dd1d3] transition-colors"
        >
          Cataleg
        </Link>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Product track */}
        <div
          ref={trackRef}
          className="flex gap-0 overflow-x-auto cursor-grab active:cursor-grabbing select-none pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                {/* Image container - only photo, no hover change */}
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={product.image}
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



    </section>
  )
}
