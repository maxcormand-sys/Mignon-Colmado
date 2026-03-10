"use client"

import { useState } from "react"
import Image from "next/image"

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

  const handleInteraction = (id: number, isActive: boolean) => {
    setActiveStates(prev => ({ ...prev, [id]: isActive }))
  }

  return (
    <section className="relative">
      {/* Header text */}
      <div className="bg-background px-6 py-12 md:py-16 text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-3">
          Descobreix
        </span>
        <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] text-foreground tracking-[-0.02em]">
          Prem per encendre
        </h2>
      </div>

      {/* Interactive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {lamps.map((lamp) => (
          <div
            key={lamp.id}
            className="relative aspect-[3/4] cursor-pointer overflow-hidden group"
            onTouchStart={() => handleInteraction(lamp.id, true)}
            onTouchEnd={() => handleInteraction(lamp.id, false)}
            onMouseEnter={() => handleInteraction(lamp.id, true)}
            onMouseLeave={() => handleInteraction(lamp.id, false)}
          >
            {/* Background only */}
            <Image
              src={lamp.background}
              alt="Fondo textil vintage"
              fill
              className={`object-cover transition-opacity duration-500 ${
                activeStates[lamp.id] ? "opacity-0" : "opacity-100"
              }`}
            />
            
            {/* With lamp */}
            <Image
              src={lamp.withLamp}
              alt={lamp.alt}
              fill
              className={`object-cover transition-opacity duration-500 ${
                activeStates[lamp.id] ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Hint overlay */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                activeStates[lamp.id] ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm bg-white/10">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={1.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" 
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
