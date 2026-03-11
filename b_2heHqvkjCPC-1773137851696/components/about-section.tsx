import Image from "next/image"

export function AboutSection() {
  return (
    <section className="bg-[#b3dfe0]/10 py-20 md:py-28">
      <div className="px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-3">
            El colmado
          </span>
          <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] text-foreground tracking-[-0.02em]">
            Sobre nosaltres
          </h2>
        </div>

        {/* Bento grid layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          
          {/* Main image - large */}
          <div className="md:col-span-7 relative h-[300px] md:h-[450px] overflow-hidden rounded-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
              alt="Interior de Mignon"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>

          {/* Right column with stacked cards */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
            {/* Quote card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl flex-1 flex items-center">
              <p className="font-serif italic text-[18px] md:text-[22px] text-foreground/80 leading-relaxed">
                &ldquo;Cada objecte te una historia que mereix ser continuada. Nosaltres els donem una nova llar.&rdquo;
              </p>
            </div>

            {/* Stats card */}
            <div className="bg-[#2c2420] p-6 md:p-8 rounded-2xl">
              <div className="flex justify-between">
                <div className="text-center">
                  <span className="block text-[28px] md:text-[36px] font-serif italic text-[#b3dfe0] leading-none">
                    2020
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 mt-2 block">
                    Des de
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[28px] md:text-[36px] font-serif italic text-[#b3dfe0] leading-none">
                    +500
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 mt-2 block">
                    Objectes
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[28px] md:text-[36px] font-serif italic text-[#b3dfe0] leading-none">
                    100%
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 mt-2 block">
                    Vintage
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text cards */}
          <div className="md:col-span-4 bg-white p-6 md:p-8 rounded-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b3dfe0] block mb-3">
              Filosofia
            </span>
            <p className="text-[14px] leading-[1.8] text-foreground/60">
              Creiem en la bellesa de l&apos;imperfecte i el valor del sostenible. Cada peca que seleccionem te caracter propi.
            </p>
          </div>

          <div className="md:col-span-4 bg-white p-6 md:p-8 rounded-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b3dfe0] block mb-3">
              Origen
            </span>
            <p className="text-[14px] leading-[1.8] text-foreground/60">
              Viatgem per mercats i antiquaris d&apos;Europa buscant objectes amb anima que mereixen una segona vida.
            </p>
          </div>

          <div className="md:col-span-4 bg-white p-6 md:p-8 rounded-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b3dfe0] block mb-3">
              Ubicacio
            </span>
            <p className="text-[14px] leading-[1.8] text-foreground/60">
              C/ Diluvi, 11 — Barcelona. Un petit colmado al cor de Gracia on cada visita es una descoberta.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
