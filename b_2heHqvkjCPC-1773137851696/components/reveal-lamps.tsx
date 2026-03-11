"use client"

import { useState, useRef, useEffect, useCallback } from "react"
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
  const timersRef = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({})
  const lastClickRef = useRef<{ [key: number]: number }>({})

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer))
    }
  }, [])

  const handleInteraction = useCallback((id: number) => {
    // Debounce: ignore clicks within 300ms
    const now = Date.now()
    if (lastClickRef.current[id] && now - lastClickRef.current[id] < 300) {
      return
    }
    lastClickRef.current[id] = now

    // Clear existing timer
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
    }

    // Turn on
    setActiveStates(prev => ({ ...prev, [id]: true }))

    // Auto turn off after 2.5s
    timersRef.current[id] = setTimeout(() => {
      setActiveStates(prev => ({ ...prev, [id]: false }))
      delete timersRef.current[id]
    }, 2500)
  }, [])

  const handleMouseEnter = useCallback((id: number) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
    }
    setActiveStates(prev => ({ ...prev, [id]: true }))
  }, [])

  const handleMouseLeave = useCallback((id: number) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id])
    }
    setActiveStates(prev => ({ ...prev, [id]: false }))
  }, [])

  return (
    <section className="relative">
      <div className="bg-background px-6 pt-6 md:pt-8 pb-8 md:pb-10 text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-3 px-4 py-1.5 border border-border rounded-full">
          Descobreix
        </span>
        <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] text-foreground tracking-[-0.02em]">
          Prem per encendre
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-8 pb-12">
        {lamps.map((lamp) => (
          <div
            key={lamp.id}
            className="relative aspect-[4/5] cursor-pointer overflow-hidden"
            onClick={() => handleInteraction(lamp.id)}
            onMouseEnter={() => handleMouseEnter(lamp.id)}
            onMouseLeave={() => handleMouseLeave(lamp.id)}
            style={{ userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
          >
            <Image
              src={lamp.background}
              alt="Background"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ${
                activeStates[lamp.id] ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />
            
            <Image
              src={lamp.withLamp}
              alt={lamp.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ${
                activeStates[lamp.id] ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />

            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
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
