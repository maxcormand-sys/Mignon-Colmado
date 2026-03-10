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
          className="w-[280px] md:w-[400px] h-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(0,0,0,0.5))' }}
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

      {/* First row of two images */}
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

      {/* Shop interior image - full width */}
      <div className="relative h-screen">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1-XzPFS5AXf7q2JS2khuuwsw3lZquOdY.jpg"
          alt="Interior de la tienda Mignon con ceramica, lamparas y objetos vintage"
          fill
          className="object-cover"
        />
      </div>

      {/* Second row of two images */}
      <div className="relative h-screen grid grid-cols-2">
        <div className="relative h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pJarron%20cristal%20rojo-F9UnWB1dcSaeXJ8LrIBVSsAvthMRyq.jpg"
            alt="Jarron de cristal rojo sobre tela con flores verdes y blancas"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pPlatos%20duralex%20amarillos-9of4wmhIirKKMQZDatqAoKoSS6O0wI.jpg"
            alt="Platos Duralex amarillos apilados sobre tela colorida"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
