import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="relative">
      {/* Full-width image background */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
          alt="Interior de Mignon - El colmado dels objectes trobats"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Floating quote on image */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 max-w-[280px] md:max-w-xs text-right hidden md:block">
          <p className="font-serif italic text-[14px] md:text-[16px] text-white/90 leading-relaxed drop-shadow-lg">
            &ldquo;Cada objecte te una historia que mereix ser continuada&rdquo;
          </p>
        </div>
      </div>

      {/* Content overlapping the image */}
      <div className="relative -mt-32 md:-mt-40 pb-16 md:pb-24 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Main content card */}
          <div className="bg-background/95 backdrop-blur-sm p-8 md:p-12 lg:p-16">
            {/* Small label */}
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#b3dfe0] block mb-4">
              Sobre nosaltres
            </span>
            
            {/* Main title */}
            <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-foreground tracking-[-0.02em] leading-[1.1] mb-8">
              El colmado dels<br />objectes trobats
            </h2>

            {/* Description */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10">
              <p className="text-[14px] md:text-[15px] leading-[1.9] text-foreground/60">
                Mignon neix de la passio per rescatar objectes amb anima. Viatgem per mercats i antiquaris 
                d&apos;Europa buscant peces amb caracter que mereixen una segona oportunitat.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.9] text-foreground/60">
                Des del 2020, hem convertit el nostre petit colmado de Barcelona en un refugi per a 
                aquells que creuen en la bellesa de l&apos;imperfecte i el valor del sostenible.
              </p>
            </div>

            {/* Bottom row with stats and CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 pt-8 border-t border-foreground/10">
              {/* Horizontal stats */}
              <div className="flex gap-10 md:gap-14">
                <div className="text-center">
                  <span className="block text-[32px] md:text-[40px] font-serif italic text-[#b3dfe0] leading-none">
                    +500
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 mt-1 block">
                    Objectes
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[32px] md:text-[40px] font-serif italic text-[#b3dfe0] leading-none">
                    100%
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 mt-1 block">
                    Vintage
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[32px] md:text-[40px] font-serif italic text-[#b3dfe0] leading-none">
                    BCN
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 mt-1 block">
                    Local
                  </span>
                </div>
              </div>

              {/* CTA button */}
              <Link
                href="/about"
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/70 group-hover:text-foreground transition-colors">
                  La nostra historia
                </span>
                <span className="w-10 h-10 rounded-full border border-[#b3dfe0] flex items-center justify-center group-hover:bg-[#b3dfe0] transition-colors">
                  <svg 
                    className="w-4 h-4 text-[#b3dfe0] group-hover:text-[#2c2420] transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
