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
      
      const scrolled = windowHeight - rect.top
      const totalScrollable = sectionHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 5 phases for 5 elements
  // Phase 1: 0-0.2 = Image
  // Phase 2: 0.2-0.4 = Title
  // Phase 3: 0.4-0.6 = Subtitle
  // Phase 4: 0.6-0.8 = First phrase
  // Phase 5: 0.8-1 = Second phrase

  const getElementState = (startPhase: number, endPhase: number) => {
    if (scrollProgress < startPhase) {
      return { opacity: 0, y: 30 }
    } else if (scrollProgress < endPhase) {
      const phaseProgress = (scrollProgress - startPhase) / (endPhase - startPhase)
      return { 
        opacity: Math.min(1, phaseProgress * 2), 
        y: Math.max(0, 30 - phaseProgress * 30) 
      }
    } else {
      const fadeProgress = (scrollProgress - endPhase) / 0.15
      return { 
        opacity: Math.max(0, 1 - fadeProgress), 
        y: 0 
      }
    }
  }

  const image = getElementState(0, 0.2)
  const title = getElementState(0.2, 0.4)
  const subtitle = getElementState(0.4, 0.55)
  const phrase1 = getElementState(0.55, 0.7)
  const phrase2 = getElementState(0.7, 0.85)

  return (
    <section 
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "400vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Image - centered, not full screen */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-8"
          style={{ 
            opacity: image.opacity,
            transform: `translateY(${image.y}px)`
          }}
        >
          <div className="relative w-full max-w-3xl h-[60vh] overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
              alt="Interior de Mignon"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: title.opacity,
            transform: `translateY(${title.y}px)`
          }}
        >
          <div className="text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-4">
              El colmado
            </span>
            <h2 className="font-serif italic text-[clamp(2.2rem,6vw,4rem)] text-foreground tracking-[-0.02em] leading-[1.05]">
              On cada objecte<br />te historia
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: subtitle.opacity,
            transform: `translateY(${subtitle.y}px)`
          }}
        >
          <p className="font-serif italic text-[clamp(1.2rem,3vw,1.8rem)] text-foreground/70 text-center max-w-2xl leading-[1.6]">
            Un petit colmado al cor de Gracia
          </p>
        </div>

        {/* First phrase */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: phrase1.opacity,
            transform: `translateY(${phrase1.y}px)`
          }}
        >
          <p className="text-[15px] md:text-[17px] text-foreground/60 text-center max-w-lg leading-[1.9]">
            Viatgem per mercats i antiquaris d&apos;Europa buscant peces amb anima que mereixen una nova vida.
          </p>
        </div>

        {/* Second phrase */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: phrase2.opacity,
            transform: `translateY(${phrase2.y}px)`
          }}
        >
          <p className="text-[15px] md:text-[17px] text-foreground/60 text-center max-w-lg leading-[1.9]">
            Creiem en la bellesa de l&apos;imperfecte i en donar una segona oportunitat als objectes que encara tenen molt per oferir.
          </p>
        </div>

      </div>
    </section>
  )
}
