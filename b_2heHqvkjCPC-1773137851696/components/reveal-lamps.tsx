"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const lamps = [
  {
    id: 1,
    background: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/F71E130B-92E3-4B1D-9CAF-8E65FB6CEB2C-80s1HsX31mbV1TcYZV9k5X34isprEf.png",
    withLamp: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0D91379E-84AA-4212-AE9D-CBC856FE175F-aM5dUURTAV9pJy16HWHQy1oOMXbuUb.png",
    alt: "Lampara flexo verde turquesa vintage",
  },
  {
    id: 2,
    background: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A206E4DD-16D8-45BD-BCB0-D289884D0AFB-AntmwMaLJMgKhfl376xavag2gt3LBs.png",
    withLamp: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FD2B8786-9682-4A59-8598-7143106A5750-Au6pWjofWB2cergM4VR5AIgfPPlOqq.png",
    alt: "Lampara globo naranja vintage",
  },
]

export function RevealLamps() {
  const [activeStates, setActiveStates] = useState<{ [key: number]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)
  const timersRef = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({})

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
      // Cleanup timers on unmount
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer))
    }
  }, [])

  const handleTouchStart = (id: number) => {
    if (!isMobile) return
    
    // Clear existing timer for this lamp if any
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
    }

    // Turn on the light immediately
    setActiveStates(prev => ({ ...prev, [id]: true }))

    // Auto-turn off after 2.5 seconds
    timersRef.current[id] = setTimeout(() => {
      setActiveStates(prev => ({ ...prev, [id]: false }))
      delete timersRef.current[id]
    }, 2500)
  }

  const handleMouseEnter = (id: number) => {
    if (isMobile) return
    setActiveStates(prev => ({ ...prev, [id]: true }))
  }

  const handleMouseLeave = (id: number) => {
    if (isMobile) return
    setActiveStates(prev => ({ ...prev, [id]: false }))
  }

  return (
    <section className="relative">
      {/* Header text */}
      <div className="bg-background px-6 py-12 md:py-16 text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-3">
          Descobreix
        </span>
        <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] text-foreground tracking-[-0.02em] mb-6">
          Prem per encendre
        </h2>
        <Link
          href="/cataleg"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#b3dfe0] text-[#2c2420] text-[10px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-[#9dd1d3] transition-colors"
        >
          Explorar col·leccio
        </Link>
      </div>

      {/* Interactive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 select-none">
        {lamps.map((lamp) => (
          <div
            key={lamp.id}
            className="relative aspect-[3/4] cursor-pointer overflow-hidden group select-none"
            onTouchStart={() => handleTouchStart(lamp.id)}
            onMouseEnter={() => handleMouseEnter(lamp.id)}
            onMouseLeave={() => handleMouseLeave(lamp.id)}
          >
            {/* Background only */}
            <Image
              src={lamp.background}
              alt="Fondo textil vintage"
              fill
              className={`object-cover transition-opacity duration-500 select-none pointer-events-none ${
                activeStates[lamp.id] ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
              draggable={false}
            />
            
            {/* With lamp */}
            <Image
              src={lamp.withLamp}
              alt={lamp.alt}
              fill
              className={`object-cover transition-opacity duration-500 select-none pointer-events-none ${
                activeStates[lamp.id] ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              draggable={false}
            />

            {/* Hint overlay */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                activeStates[lamp.id] ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2c2420] flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#fffdf8]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
