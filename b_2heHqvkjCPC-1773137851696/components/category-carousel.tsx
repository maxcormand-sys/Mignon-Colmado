"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

// Filter categories for the carousel
const filterCategories = ["Iluminacio", "Ceramica", "Figures"] as const
type FilterCategory = typeof filterCategories[number]

const allItems = [
  {
    id: "lamp-blue-flex",
    category: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-EB4E5Mp41oSm7vncX8xwrKNKeil6Tk.png",
    name: "Flexo azul vintage",
  },
  {
    id: "lamp-red-globe",
    category: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7DE49C9A-64EA-421E-B422-0FEDDB317CAC-7ed9bAiA08eWNqwHKJllKOv6XbW33l.png",
    name: "Lampara globo roja",
  },
  {
    id: "lamp-blue-globe",
    category: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8258F740-097D-4B7A-845E-D1E1EE9E0D11-D7gfdmeLhcBvrIKhizymMrkCKLO0Cy.png",
    name: "Lampara globo azul",
  },
  {
    id: "lamp-green-flex",
    category: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E38CEA8D-FC2C-4D10-AF84-8EFB4F73ADAD-4AGThgxmjf9IrGpFGFl3V3IKUeicTi.png",
    name: "Flexo verde vintage",
  },
  {
    id: "ceramica-cups",
    category: "Ceramica",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6FE2A08E-2120-4443-B015-1F1DEEAE27BD-T6bmXj8tC4iKh23e9MIzZFtcxPfO5s.png",
    name: "Tazas ceramica",
  },
  {
    id: "lamp-red-ornate",
    category: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D3A3ECFC-57B0-4671-908A-994625476304-BzhIQbqWc45bbsPSgwb9hUXEE0S2kk.png",
    name: "Lampara roja ornamental",
  },
  {
    id: "lamp-red-cylinder",
    category: "Iluminacio",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BA16B0A8-7EEA-4C9F-9CC7-AA9414FDAD54-w1GfnICMpWZWp6y02uqaxOfikm4Pka.png",
    name: "Lampara cilindro roja",
  },
  {
    id: "figures-martini",
    category: "Figures",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8F5FC5CF-7857-4A31-B0C3-F9F62964FBD0-obuTJaASjUTxcOI8KEUdFleZwxgjtk.png",
    name: "Cenicero Martini",
  },
]

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Iluminacio")
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const animationRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const dragStartPosRef = useRef(0)

  const filteredItems = allItems.filter(item => item.category === activeFilter)

  // Duplicate items for infinite scroll
  const displayItems = [...filteredItems, ...filteredItems, ...filteredItems]

  // Reset scroll position when filter changes
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0
    }
  }, [activeFilter])

  // Auto-scroll animation - ALWAYS running
  const animate = useCallback(() => {
    if (!trackRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const track = trackRef.current
    const maxScroll = track.scrollWidth / 3

    // Always scroll, even when dragging (velocity will override)
    if (Math.abs(velocityRef.current) > 0.5) {
      track.scrollLeft += velocityRef.current
      velocityRef.current *= 0.95
    } else if (!isDragging) {
      track.scrollLeft += 0.7
    }

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
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const handleTouchStart = () => {
    setIsDragging(true)
    velocityRef.current = 0
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section className="pt-12 md:pt-20 pb-6 md:pb-10 bg-white">
      {/* Header */}
      <div className="px-5 md:px-10 mb-8 md:mb-12 text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4 px-4 py-1.5 border border-border rounded-full">
          Categories
        </span>
        <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] leading-[1] text-foreground tracking-tight mb-8">
          Explora per tipus
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-6 py-3 text-[10px] font-medium uppercase tracking-[0.15em] 
                rounded-full transition-all duration-300 cursor-pointer
                ${activeFilter === category 
                  ? "bg-[#b3dfe0] text-[#2c2420]" 
                  : "bg-transparent text-foreground border border-[#b3dfe0] hover:bg-[#b3dfe0]/20"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4 overflow-x-auto cursor-grab active:cursor-grabbing select-none px-5 md:px-10 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
          {displayItems.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[280px] md:w-[340px] group"
            >
              <Link
                href={`/producto/${item.id}`}
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault()
                  }
                }}
                draggable={false}
                className="block"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 ease-out pointer-events-none group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, 340px"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                {/* Product name on hover */}
                <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-serif italic text-[14px] text-foreground">{item.name}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

    </section>
  )
}
