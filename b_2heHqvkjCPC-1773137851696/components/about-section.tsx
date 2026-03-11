import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="bg-[#fffdf8]">
      {/* Image */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vxBKEFByDT7wtCnVJyaGbjDDuUei8J.jpg"
          alt="Interior de la tienda Mignon amb objectes vintage"
          fill
          className="object-cover"
          sizes="100vw"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 py-16 md:py-24 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-4">
          El Colmado
        </span>
        
        <h2 className="font-serif italic text-[clamp(1.8rem,4vw,2.8rem)] text-foreground tracking-[-0.02em] mb-8">
          Objectes amb historia
        </h2>
        
        <div className="space-y-5 text-[14px] md:text-[15px] leading-relaxed text-foreground/70">
          <p>
            Mignon neix de la passio per rescatar objectes oblidats i donar-los una nova vida. 
            Cada peca que trobaras a la nostra botiga ha estat seleccionada amb cura en mercats 
            i antiquaris de tota Europa.
          </p>
          
          <p>
            Creiem en la bellesa de l&apos;imperfecte, en la qualitat dels materials d&apos;abans 
            i en el valor de les coses que perduren. Els nostres objectes no son simplement 
            decoracio — son fragments d&apos;histories passades que esperen formar part de la teva.
          </p>
          
          <p>
            Des del nostre petit colmado al cor de Barcelona, volem compartir amb tu 
            el plaer de descobrir peces uniques que no trobaras enlloc mes.
          </p>
        </div>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 bg-[#2c2420] text-[#fffdf8] text-[10px] font-medium uppercase tracking-[0.15em] rounded-full hover:bg-[#3d332d] transition-colors"
        >
          Coneixer-nos
        </Link>
      </div>
    </section>
  )
}
