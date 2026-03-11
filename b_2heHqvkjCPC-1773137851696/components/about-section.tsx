import Image from "next/image"

export function AboutSection() {
  return (
    <section className="relative bg-background">
      {/* Full width image */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
          alt="Interior de Mignon"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent md:from-white/95 md:via-white/50" />
        
        {/* Content overlay - positioned on the left */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12 lg:px-20 max-w-xl lg:max-w-2xl">
            
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#2c2420]/50 block mb-5">
              El colmado
            </span>
            
            <h2 className="font-serif italic text-[clamp(2rem,5vw,3.2rem)] text-[#2c2420] tracking-[-0.02em] leading-[1.1] mb-6">
              On cada objecte<br />
              <span className="text-[#2c2420]/70">te historia</span>
            </h2>
            
            <p className="text-[14px] md:text-[15px] leading-[1.9] text-[#2c2420]/60 mb-4 max-w-md">
              Un petit colmado al cor de Gracia. Viatgem per mercats i antiquaris d&apos;Europa buscant peces amb anima que mereixen una nova vida.
            </p>
            
            <p className="text-[13px] text-[#2c2420]/40 tracking-wide">
              C/ Diluvi, 11 — Gracia, Barcelona
            </p>
            
          </div>
        </div>
      </div>
    </section>
  )
}
