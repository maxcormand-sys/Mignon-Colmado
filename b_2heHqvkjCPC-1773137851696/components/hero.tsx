"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative">
      {/* Sticky logo container - stays fixed while scrolling through hero sections */}
      <div className="sticky top-0 h-screen pointer-events-none z-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 md:gap-3">
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
            className="font-serif italic text-[12px] text-[#fffdf8]/90 tracking-wide text-center md:hidden"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
          >
            La nostra botiga, ara online
          </span>
          <span 
            className="font-serif italic text-[16px] text-[#fffdf8]/90 tracking-wide text-center hidden md:block"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
          >
            La nostra botiga de Barcelona, ara disponible online
          </span>
        </div>
      </div>

      {/* Video section - full viewport height */}
      <div className="relative h-screen -mt-screen" style={{ marginTop: '-100vh' }}>
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

      {/* Shop interior image - full width */}
      <div className="relative h-screen">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1-XzPFS5AXf7q2JS2khuuwsw3lZquOdY.jpg"
          alt="Interior de la tienda Mignon con ceramica, lamparas y objetos vintage"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}
