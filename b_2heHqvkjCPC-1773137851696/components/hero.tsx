"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative">
      {/* Sticky logo container - stays fixed while scrolling through hero sections */}
      <div className="sticky top-0 h-screen pointer-events-none z-20 flex items-center justify-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-3JKidEghwvs0m1RG08AhgRXPs4rDzj.png"
          alt="Mignon"
          width={400}
          height={100}
          className="w-[280px] md:w-[400px] h-auto"
          priority
        />
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

      {/* Two images section */}
      <div className="relative h-screen grid grid-cols-2">
        <div className="relative h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pLa%CC%81mpara%20Bescano%CC%81%20jarron-u9CweYS5zfbDA33HBzA5QyuffXvvsd.jpg"
            alt="Lampara roja con globo blanco y jarron rojo"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pCenicero%20naranja%20delantal-QRlutnpAfr66kkmLM9QnAlb0R8NXrX.jpg"
            alt="Cenicero naranja sobre tela de rayas"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
