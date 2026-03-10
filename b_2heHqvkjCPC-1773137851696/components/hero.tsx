"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate blur (0 to 30px) and turquoise overlay opacity (0 to 1)
  const blurAmount = scrollProgress * 30
  const overlayOpacity = scrollProgress
  // Logo changes from white to black as we scroll
  const logoInvert = scrollProgress // 0 = white logo, 1 = inverted (black)

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      {/* Video background - sticky */}
      <div className="sticky top-0 h-screen z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: `blur(${blurAmount}px)`, transform: 'scale(1.1)' }}
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mignon_%20Spot%20_%20Horiz%20%281%29%20%281%29-s5HtSlhWAX09d3hRsaV90ycXhUDjQq.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#2c2420]/30" />
        
        {/* Turquoise overlay that fades in */}
        <div 
          className="absolute inset-0 bg-[#b3dfe0]"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Logo and tagline - centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-0 md:gap-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-3JKidEghwvs0m1RG08AhgRXPs4rDzj.png"
              alt="Mignon"
              width={400}
              height={100}
              className="w-[200px] md:w-[400px]"
              style={{ 
                height: 'auto', 
                filter: `invert(${logoInvert}) drop-shadow(0 0 ${20 * (1 - scrollProgress)}px rgba(0,0,0,${0.7 * (1 - scrollProgress)}))`,
                transition: 'filter 0.1s ease-out'
              }}
              priority
            />
            <span 
              className="font-serif italic text-[11px] tracking-[0.08em] text-center md:hidden w-[200px] transition-colors duration-100"
              style={{ 
                color: scrollProgress > 0.5 ? '#2c2420' : 'rgba(255,253,248,0.9)',
                textShadow: scrollProgress > 0.5 ? 'none' : '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)'
              }}
            >
              Ara botiga online, descobreix-nos
            </span>
            <span 
              className="font-serif italic text-[16px] tracking-[0.12em] text-center hidden md:block w-[400px] whitespace-nowrap transition-colors duration-100"
              style={{ 
                color: scrollProgress > 0.5 ? '#2c2420' : 'rgba(255,253,248,0.9)',
                textShadow: scrollProgress > 0.5 ? 'none' : '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)'
              }}
            >
              Ara online, descobreix els nostres tresors
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
