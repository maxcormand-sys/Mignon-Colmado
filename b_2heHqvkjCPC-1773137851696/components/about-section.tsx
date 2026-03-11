import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="bg-[#fffdf8] overflow-hidden">
      {/* Split layout - Image left, content right on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        
        {/* Image side */}
        <div className="relative h-[400px] lg:h-full lg:min-h-[700px] order-2 lg:order-1">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vU1ibqBrPdVovGBld7VAGWSS9SH6Q2.jpg"
            alt="Interior de la tienda Mignon amb objectes vintage"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
          
          {/* Floating quote overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 lg:bottom-12 lg:left-12 lg:right-auto lg:max-w-[280px]">
            <div className="bg-white/90 backdrop-blur-sm p-5 md:p-6">
              <p className="font-serif italic text-[15px] md:text-[17px] text-[#2c2420] leading-relaxed">
                "Cada objecte te una ànima. Nosaltres simplement els ajudem a trobar una nova llar."
              </p>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 md:py-20 order-1 lg:order-2">
          
          {/* Small decorative element */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[1px] bg-[#b3dfe0]"></div>
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40">
              Des de 2018
            </span>
          </div>
          
          <h2 className="font-serif italic text-[clamp(2rem,5vw,3.2rem)] text-foreground tracking-[-0.02em] leading-[1.1] mb-6">
            El colmado dels<br />objectes trobats
          </h2>
          
          <div className="space-y-5 text-[14px] md:text-[15px] leading-relaxed text-foreground/60 max-w-lg">
            <p>
              Mignon es un petit tresor amagat al cor de Barcelona. Un espai on el temps 
              s'atura i cada objecte explica la seva propia historia.
            </p>
            
            <p>
              Viatgem per mercats i antiquaris d'Europa buscant peces amb caracter — 
              ceramiques amb patina, llums que encara brillen, vaixella que ha vist 
              mil dinars familiars. Objectes que mereixen una segona oportunitat.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-foreground/10">
            <div>
              <span className="block text-[24px] md:text-[32px] font-serif italic text-[#b3dfe0]">01</span>
              <span className="block text-[11px] uppercase tracking-[0.1em] text-foreground/50 mt-1">Autenticitat</span>
            </div>
            <div>
              <span className="block text-[24px] md:text-[32px] font-serif italic text-[#b3dfe0]">02</span>
              <span className="block text-[11px] uppercase tracking-[0.1em] text-foreground/50 mt-1">Sostenibilitat</span>
            </div>
            <div>
              <span className="block text-[24px] md:text-[32px] font-serif italic text-[#b3dfe0]">03</span>
              <span className="block text-[11px] uppercase tracking-[0.1em] text-foreground/50 mt-1">Historia</span>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 mt-10 group w-fit"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/70 group-hover:text-foreground transition-colors">
              Descobreix mes
            </span>
            <span className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-[#b3dfe0] group-hover:border-[#b3dfe0] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50 group-hover:text-[#2c2420] transition-colors">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
