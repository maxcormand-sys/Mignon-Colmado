"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-[200vh]">
      {/* Video background - fixed */}
      <div className="fixed top-0 left-0 right-0 h-screen z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mignon_%20Spot%20_%20Horiz%20%281%29%20%281%29-s5HtSlhWAX09d3hRsaV90ycXhUDjQq.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#2c2420]/30" />
      </div>

      {/* Fixed logo and tagline - stays centered during scroll */}
      <div className="fixed top-0 left-0 right-0 h-screen z-30 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-0 md:gap-1">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-3JKidEghwvs0m1RG08AhgRXPs4rDzj.png"
            alt="Mignon"
            width={400}
            height={100}
            className="w-[200px] md:w-[400px] h-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(0,0,0,0.5))' }}
            priority
          />
          <span 
            className="font-serif italic text-[11px] text-[#fffdf8]/90 tracking-[0.08em] text-center md:hidden w-[200px]"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
          >
            Ara botiga online, descobreix-nos
          </span>
          <span 
            className="font-serif italic text-[16px] text-[#fffdf8]/90 tracking-[0.12em] text-center hidden md:block w-[400px] whitespace-nowrap"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
          >
            Ara online, descobreix els nostres tresors
          </span>
        </div>
      </div>

      {/* Shop interior image - scrolls up from bottom with soft gradient edge */}
      <div className="absolute top-[100vh] left-0 right-0 h-screen z-20">
        <div 
          className="relative w-full h-full"
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1-XzPFS5AXf7q2JS2khuuwsw3lZquOdY.jpg"
            alt="Interior de la tienda Mignon con ceramica, lamparas y objetos vintage"
            fill
            className="object-cover"
          />
          {/* Warm dark overlay */}
          <div className="absolute inset-0 bg-[#2c2420]/45" />
        </div>
      </div>
    </section>
  )
}
