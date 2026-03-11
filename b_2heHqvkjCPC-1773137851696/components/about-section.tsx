import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="bg-[#2c2420] text-[#fffdf8]">
      {/* Full width image with gradient */}
      <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vU1ibqBrPdVovGBld7VAGWSS9SH6Q2.jpg"
          alt="Interior de Mignon - El colmado dels objectes trobats"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/20 via-transparent to-[#2c2420]" />
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-20 pb-20 md:pb-28 -mt-16 md:-mt-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#b3dfe0] block mb-5">
            Sobre nosaltres
          </span>

          {/* Title */}
          <h2 className="font-serif italic text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] mb-8">
            El colmado dels objectes trobats
          </h2>

          {/* Text */}
          <p className="text-[15px] md:text-[16px] leading-[1.9] text-[#fffdf8]/65 max-w-xl mx-auto mb-12">
            Mignon neix de la passio per rescatar objectes amb anima. Viatgem per mercats i antiquaris 
            d&apos;Europa buscant peces amb caracter que mereixen una segona oportunitat.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-12 md:gap-20 pt-8 border-t border-[#fffdf8]/10">
            <div>
              <span className="block text-[clamp(1.3rem,2.5vw,1.8rem)] font-serif italic text-[#b3dfe0]">2020</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#fffdf8]/40">Des de</span>
            </div>
            <div>
              <span className="block text-[clamp(1.3rem,2.5vw,1.8rem)] font-serif italic text-[#b3dfe0]">100%</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#fffdf8]/40">Vintage</span>
            </div>
            <div>
              <span className="block text-[clamp(1.3rem,2.5vw,1.8rem)] font-serif italic text-[#b3dfe0]">BCN</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#fffdf8]/40">Barcelona</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-10 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b3dfe0] hover:text-[#fffdf8] transition-colors"
          >
            <span>Descobrir mes</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
