"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      
      // Calculate progress from 0 to 1 based on scroll position
      const scrolled = windowHeight - rect.top
      const totalScrollable = sectionHeight + windowHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Phase 1: 0-0.33 = Image visible
  // Phase 2: 0.33-0.66 = Title appears, image fades
  // Phase 3: 0.66-1 = Text appears, title fades slightly

  const imageOpacity = scrollProgress < 0.25 
    ? 1 
    : Math.max(0, 1 - (scrollProgress - 0.25) * 3)
  
  const titleOpacity = scrollProgress < 0.2 
    ? 0 
    : scrollProgress > 0.65 
      ? Math.max(0.3, 1 - (scrollProgress - 0.65) * 2)
      : Math.min(1, (scrollProgress - 0.2) * 3)
  
  const titleY = scrollProgress < 0.2 
    ? 40 
    : Math.max(0, 40 - (scrollProgress - 0.2) * 100)

  const textOpacity = scrollProgress < 0.5 
    ? 0 
    : Math.min(1, (scrollProgress - 0.5) * 3)
  
  const textY = scrollProgress < 0.5 
    ? 30 
    : Math.max(0, 30 - (scrollProgress - 0.5) * 80)

  return (
    <section 
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "250vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Image layer */}
        <div 
          className="absolute inset-0 transition-opacity duration-100"
          style={{ opacity: imageOpacity }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
            alt="Interior de Mignon"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Content layer */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          
          {/* Title */}
          <div 
            className="transition-all duration-100"
            style={{ 
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`
            }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#2c2420]/50 block mb-5">
              El colmado
            </span>
            <h2 className="font-serif italic text-[clamp(2.5rem,7vw,4.5rem)] text-[#2c2420] tracking-[-0.02em] leading-[1.05]">
              On cada objecte<br />te historia
            </h2>
          </div>

          {/* Text content */}
          <div 
            className="mt-10 transition-all duration-100"
            style={{ 
              opacity: textOpacity,
              transform: `translateY(${textY}px)`
            }}
          >
            <p className="text-[15px] md:text-[16px] leading-[1.9] text-[#2c2420]/60 mb-6 max-w-lg mx-auto">
              Un petit colmado al cor de Gracia. Viatgem per mercats i antiquaris d&apos;Europa buscant peces amb anima que mereixen una nova vida.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[12px] text-[#2c2420]/40 uppercase tracking-[0.2em]">
              <span>Vintage</span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-[#b3dfe0]" />
              <span>Sostenible</span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-[#b3dfe0]" />
              <span>Barcelona</span>
            </div>
          </div>

        </div>

        {/* Background color that appears as image fades */}
        <div 
          className="absolute inset-0 bg-background -z-10"
          style={{ opacity: 1 - imageOpacity }}
        />

      </div>
    </section>
  )
}
