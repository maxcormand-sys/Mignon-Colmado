import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-3">
            Sobre nosaltres
          </span>
          <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] text-foreground tracking-[-0.02em]">
            El colmado dels objectes trobats
          </h2>
        </div>

        {/* Content grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
                alt="Interior de Mignon - El colmado dels objectes trobats"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text content */}
            <div className="lg:py-8">
              <p className="font-serif italic text-[clamp(1.2rem,2.5vw,1.6rem)] leading-[1.5] text-foreground/80 mb-8">
                &ldquo;Cada objecte te una historia. Nosaltres nomes els ajudem a trobar un nou capitol.&rdquo;
              </p>
              
              <div className="space-y-5 text-[14px] md:text-[15px] leading-[1.8] text-foreground/60 mb-10">
                <p>
                  Mignon neix de la passio per rescatar objectes amb anima. Viatgem per mercats i antiquaris 
                  d&apos;Europa buscant peces amb caracter que mereixen una segona oportunitat.
                </p>
                <p>
                  Des del 2020, hem convertit el nostre petit colmado de Barcelona en un refugi per a 
                  aquells que creuen en la bellesa de l&apos;imperfecte i el valor de les coses ben fetes.
                </p>
              </div>

              {/* Stats inline */}
              <div className="flex gap-8 md:gap-12 py-6 border-t border-foreground/10">
                <div>
                  <span className="block text-[clamp(1.5rem,3vw,2rem)] font-serif italic text-[#b3dfe0]">2020</span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/40">Des de</span>
                </div>
                <div>
                  <span className="block text-[clamp(1.5rem,3vw,2rem)] font-serif italic text-[#b3dfe0]">100%</span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/40">Vintage</span>
                </div>
                <div>
                  <span className="block text-[clamp(1.5rem,3vw,2rem)] font-serif italic text-[#b3dfe0]">BCN</span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/40">Barcelona</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#b3dfe0] text-[#2c2420] text-[10px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-[#9dd1d3] transition-colors"
              >
                Coneixer-nos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
