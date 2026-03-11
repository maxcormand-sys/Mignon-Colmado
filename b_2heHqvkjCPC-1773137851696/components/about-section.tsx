import Image from "next/image"

export function AboutSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="px-5 md:px-10 max-w-6xl mx-auto">
        
        {/* Header centered */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-4">
            El colmado
          </span>
          <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] text-foreground tracking-[-0.02em]">
            Objectes amb historia propia
          </h2>
        </div>
        
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Image - larger */}
          <div className="lg:col-span-7 relative min-h-[350px] h-[350px] md:min-h-[480px] md:h-[480px] overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
              alt="Interior de Mignon"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Content - narrower */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-5 text-[14px] md:text-[15px] leading-[1.8] text-foreground/60">
              <p>
                Mignon es un petit colmado al cor de Gracia on cada objecte te una historia que mereix ser continuada. Viatgem per mercats i antiquaris d&apos;Europa buscant peces amb anima.
              </p>
              <p>
                Creiem en la bellesa de l&apos;imperfecte, en el valor del sostenible i en donar una segona vida a objectes que encara tenen molt per oferir.
              </p>
              <p className="text-foreground/40 text-[13px] pt-4">
                C/ Diluvi, 11 — Barcelona
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
