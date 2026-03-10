"use client"

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const textMobileRef = useRef<HTMLSpanElement>(null)
  const textDesktopRef = useRef<HTMLSpanElement>(null)

  // Easing function for smoother progression
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

  const updateStyles = useCallback((progress: number) => {
    // Apply easing for smoother feel
    const easedProgress = easeOutCubic(progress)
    const colorProgress = easeInOutQuad(progress)
    
    // Blur starts subtle, then accelerates (0 to 25px)
    const blurAmount = easedProgress * 25
    
    // Overlay fades in smoothly
    const overlayOpacity = easedProgress * 0.95
    
    // Update video blur directly via ref (no re-render)
    if (videoRef.current) {
      videoRef.current.style.filter = `blur(${blurAmount}px)`
    }
    
    // Update overlay opacity
    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(overlayOpacity)
    }
    
    // Logo invert and shadow
    if (logoRef.current) {
      const shadowOpacity = Math.max(0, 0.7 * (1 - colorProgress))
      const shadowSize = Math.max(0, 20 * (1 - colorProgress))
      logoRef.current.style.filter = `invert(${colorProgress}) drop-shadow(0 0 ${shadowSize}px rgba(0,0,0,${shadowOpacity}))`
    }
    
    // Text color transition - interpolate RGB values
    const textOpacity = 0.9
    const r = Math.round(255 + (44 - 255) * colorProgress)
    const g = Math.round(253 + (36 - 253) * colorProgress)
    const b = Math.round(248 + (32 - 248) * colorProgress)
    const textColor = `rgba(${r},${g},${b},${textOpacity})`
    const shadowStrength = 1 - colorProgress
    const textShadow = shadowStrength > 0.1 
      ? `0 2px ${10 * shadowStrength}px rgba(0,0,0,${0.8 * shadowStrength}), 0 4px ${20 * shadowStrength}px rgba(0,0,0,${0.6 * shadowStrength})`
      : 'none'
    
    if (textMobileRef.current) {
      textMobileRef.current.style.color = textColor
      textMobileRef.current.style.textShadow = textShadow
    }
    if (textDesktopRef.current) {
      textDesktopRef.current.style.color = textColor
      textDesktopRef.current.style.textShadow = textShadow
    }
  }, [])

  useEffect(() => {
    let rafId: number
    let lastProgress = -1
    let lastTime = 0

    const handleScroll = () => {
      const now = Date.now()
      // Throttle to 60fps (16ms)
      if (now - lastTime < 16) return
      lastTime = now

      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      
      // Only update if progress changed significantly
      if (Math.abs(progress - lastProgress) > 0.001) {
        lastProgress = progress
        rafId = requestAnimationFrame(() => updateStyles(progress))
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [updateStyles])

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      {/* Video background - sticky */}
      <div className="sticky top-0 h-screen z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover will-change-[filter]"
          style={{ transform: 'scale(1.1)' }}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%232c2420' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mignon_%20Spot%20_%20Horiz%20%281%29%20%281%29-s5HtSlhWAX09d3hRsaV90ycXhUDjQq.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#2c2420]/20" />
        
        {/* Turquoise overlay that fades in */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-[#b3dfe0] will-change-opacity"
          style={{ opacity: 0 }}
        />
        
        {/* Logo and tagline - centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-0 md:gap-1">
            <Image
              ref={logoRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-3JKidEghwvs0m1RG08AhgRXPs4rDzj.png"
              alt="Mignon"
              width={400}
              height={100}
              className="w-[200px] md:w-[400px] h-auto will-change-[filter]"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <span 
              ref={textMobileRef}
              className="font-serif italic text-[11px] tracking-[0.08em] text-center md:hidden w-[200px]"
              style={{ color: 'rgba(255,253,248,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
            >
              Ara botiga online, descobreix-nos
            </span>
            <span 
              ref={textDesktopRef}
              className="font-serif italic text-[16px] tracking-[0.12em] text-center hidden md:block w-[400px] whitespace-nowrap"
              style={{ color: 'rgba(255,253,248,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
            >
              Ara online, descobreix els nostres tresors
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
