"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: "iluminacio",
    name: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-EB4E5Mp41oSm7vncX8xwrKNKeil6Tk.png",
  },
  {
    id: "iluminacio-2",
    name: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7DE49C9A-64EA-421E-B422-0FEDDB317CAC-7ed9bAiA08eWNqwHKJllKOv6XbW33l.png",
  },
  {
    id: "iluminacio-3",
    name: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8258F740-097D-4B7A-845E-D1E1EE9E0D11-D7gfdmeLhcBvrIKhizymMrkCKLO0Cy.png",
  },
  {
    id: "iluminacio-4",
    name: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E38CEA8D-FC2C-4D10-AF84-8EFB4F73ADAD-4AGThgxmjf9IrGpFGFl3V3IKUeicTi.png",
  },
  {
    id: "ceramica",
    name: "Ceramica",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6FE2A08E-2120-4443-B015-1F1DEEAE27BD-T6bmXj8tC4iKh23e9MIzZFtcxPfO5s.png",
  },
  {
    id: "iluminacio-5",
    name: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D3A3ECFC-57B0-4671-908A-994625476304-BzhIQbqWc45bbsPSgwb9hUXEE0S2kk.png",
  },
  {
    id: "iluminacio-6",
    name: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BA16B0A8-7EEA-4C9F-9CC7-AA9414FDAD54-w1GfnICMpWZWp6y02uqaxOfikm4Pka.png",
  },
  {
    id: "figures",
    name: "Figures",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8F5FC5CF-7857-4A31-B0C3-F9F62964FBD0-obuTJaASjUTxcOI8KEUdFleZwxgjtk.png",
  },
]

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const animationRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const dragStartPosRef = useRef(0)

  // Duplicate categories for infinite scroll
  const displayCategories = [...categories, ...categories, ...categories]

  // Auto-scroll animation
  const animate = useCallback(() => {
    if (!trackRef.current || !isAutoScrolling || isDragging) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    if (Math.abs(velocityRef.current) > 0.5) {
      track.scrollLeft += velocityRef.current
      velocityRef.current *= 0.95
    } else {
      track.scrollLeft += 0.4
    }

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

    if (Math.abs(e.pageX - dragStartPosRef.current) > 5) {
      hasDraggedRef.current = true
    }

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

  const handleTouchStart = () => {
    setIsDragging(true)
    setIsAutoScrolling(false)
    velocityRef.current = 0
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsAutoScrolling(true), 2000)
  }

  return (
    <section className="py-12 md:py-20 bg-[#f5f5f0]">
      {/* Header */}
      <div className="px-5 md:px-10 mb-8 md:mb-12 text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4">
          Categories
        </span>
        <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] leading-[1] text-foreground tracking-tight">
          Explora per tipus
        </h2>
      </div>

      {/* Carousel */}
      <div 
        className="relative"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => {
          if (!isDragging) setIsAutoScrolling(true)
        }}
      >
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
          onTouchEnd={handleTouchEnd}
        >
          {displayCategories.map((category, index) => (
            <article
              key={`${category.id}-${index}`}
              className="flex-shrink-0 w-[200px] md:w-[260px] group"
            >
              <Link
                href={`/cataleg?category=${category.name.toLowerCase()}`}
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault()
                  }
                }}
                draggable={false}
                className="block"
              >
                <div className="relative aspect-square overflow-hidden bg-white rounded-lg shadow-sm">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 ease-out pointer-events-none group-hover:scale-105"
                    sizes="(max-width: 640px) 200px, 260px"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/70">
                  {category.name}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
