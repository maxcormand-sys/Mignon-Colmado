import Image from "next/image"

export function AboutSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="px-5 md:px-10 max-w-7xl mx-auto">
        
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image */}
          <div className="relative h-[400px] md:h-[550px] overflow-hidden rounded-sm">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
              alt="Interior de Mignon"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-6">
              El colmado
            </span>
            
            <h2 className="font-serif italic text-[clamp(2.2rem,5vw,3.5rem)] text-foreground tracking-[-0.02em] leading-[1.1] mb-8">
              Objectes amb<br />historia propia
            </h2>
            
            <div className="space-y-6 text-[15px] leading-[1.9] text-foreground/60 mb-10">
              <p>
                Mignon es un petit colmado al cor de Gracia on cada objecte te una historia que mereix ser continuada. Viatgem per mercats i antiquaris d&apos;Europa buscant peces amb anima.
              </p>
              <p>
                Creiem en la bellesa de l&apos;imperfecte, en el valor del sostenible i en donar una segona vida a objectes que encara tenen molt per oferir.
              </p>
            </div>

            {/* Location info */}
            <div className="border-t border-foreground/10 pt-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b3dfe0] block mb-2">
                    Visita&apos;ns
                  </span>
                  <span className="text-[14px] text-foreground/70">
                    C/ Diluvi, 11 — Barcelona
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b3dfe0] block mb-2">
                    Contacte
                  </span>
                  <span className="text-[14px] text-foreground/70">
                    hola@mignoncolmado.com
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
