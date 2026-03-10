import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartSheet } from "@/components/cart-sheet"
import { MarqueeBand } from "@/components/marquee-band"

export const metadata = {
  title: "Nosotros -- Mignon",
  description:
    "Conoce Mignon, el colmado dels objectes trobats en Barcelona.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero with store image */}
        <section className="relative min-h-[70vh] flex flex-col justify-end">
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2-VRWAbu0DXPBLpj6jwk016sJwBppf6j.jpg"
              alt="Interior de la tienda Mignon"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#2c2420]/40" />
          </div>
          <div className="relative px-5 md:px-10 pb-8 md:pb-12 pt-28">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#fffdf8]/50 block mb-3">
              Sobre nosotros
            </span>
            <h1 className="font-serif italic text-[clamp(3rem,9vw,7rem)] leading-[0.85] text-[#fffdf8] tracking-[-0.03em]">
              El Colmado
            </h1>
          </div>
          <div className="relative flex h-1.5">
            <div className="flex-1 bg-secondary" />
            <div className="flex-1 bg-accent" />
            <div className="flex-1 bg-chart-3" />
            <div className="flex-1 bg-chart-4" />
          </div>
        </section>

        {/* Story */}
        <section className="px-5 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5 flex flex-col gap-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                La historia
              </span>
              <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[0.92] text-foreground tracking-[-0.02em]">
                Un espacio
                <br />
                para lo bonito
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col gap-5">
              <p className="text-[14px] leading-relaxed text-foreground/70">
                Mignon es un colmado de objetos encontrados en Barcelona. Nace de la pasion por
                el diseno vintage y la creencia de que las cosas bonitas merecen una segunda
                oportunidad. Recorremos mercados, ferias y rincones de toda Europa buscando
                piezas que tengan algo especial: lamparas con caracter, ceramica con historia,
                textiles con alma.
              </p>
              <p className="text-[14px] leading-relaxed text-foreground/70">
                Cada objeto que entra en el colmado es revisado y cuidado para que pueda
                encontrar un nuevo hogar donde ser querido. No buscamos la perfeccion sino
                la autenticidad, ese encanto imperfecto que solo el paso del tiempo puede dar.
              </p>
            </div>
          </div>
        </section>

        {/* Image row */}
        <section className="px-5 md:px-10 pb-16 md:pb-24">
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pLampara%20azul%20flexo-twd06uCsmLgf2MFNLR1YJ7AwtqMYnk.jpg"
                alt="Flexo azul vintage sobre tela estampada"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pTazas%20cafe%CC%81%20barro-bqOpoI83j0KmOJ2LyronIbIqymKalT.jpg"
                alt="Tazas de cafe de barro apiladas"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/p001A9125-drOvlQBg3mJSGTWXFZUzwS293uTIhV.jpg"
                alt="Figura vintage de jinete a caballo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted">
          <div className="px-5 md:px-10 py-16 md:py-24">
            <div className="flex flex-col gap-3 mb-12">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                Lo que nos mueve
              </span>
              <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[0.92] text-foreground tracking-[-0.02em]">
                Tres pilares
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  num: "01",
                  title: "Curar con carino",
                  text: "Cada pieza es elegida a mano por su diseno, calidad y esa chispa que la hace diferente. Viajamos por toda Europa para encontrarlas.",
                  color: "bg-secondary",
                },
                {
                  num: "02",
                  title: "Dar nueva vida",
                  text: "Revisamos, limpiamos y restauramos cada objeto. Queremos que llegue a tu casa listo para ser disfrutado, como el primer dia.",
                  color: "bg-accent",
                },
                {
                  num: "03",
                  title: "Consumir mejor",
                  text: "Elegir vintage es elegir bien. Reutilizar objetos hermosos en lugar de comprar nuevos es nuestra forma de cuidar el planeta.",
                  color: "bg-chart-4",
                },
              ].map((value) => (
                <div key={value.num} className="flex flex-col gap-4">
                  <div className={`h-1 w-12 ${value.color}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {value.num}
                  </span>
                  <h3 className="text-[15px] font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Store photo full width */}
        <section className="relative aspect-[16/7] md:aspect-[16/5]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6MrSZxMwR5Wyn1ZXcaSr9UxuJvfchI.jpg"
            alt="Rincon de la tienda Mignon con ropa y lamparas vintage"
            fill
            className="object-cover"
          />
        </section>

        {/* CTA */}
        <section className="bg-accent">
          <div className="px-5 md:px-10 py-14 md:py-20 flex flex-col items-center text-center gap-6">
            <h2 className="font-serif italic text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] text-accent-foreground tracking-[-0.02em]">
              Pasa a conocernos
            </h2>
            <div className="flex flex-col gap-1 text-[12px] text-accent-foreground/70">
              <span>C/ Diluvi, 11 -- Barcelona</span>
              <span>De martes a sabado</span>
            </div>
            <Link
              href="/#coleccion"
              className="bg-accent-foreground text-accent px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
            >
              Ver la coleccion
            </Link>
          </div>
        </section>

        <MarqueeBand />
      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
