"use client"

import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col">
      {/* Background: video with overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mignon_%20Spot%20_%20Horiz%20%281%29%20%281%29-s5HtSlhWAX09d3hRsaV90ycXhUDjQq.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#2c2420]/40" />
      </div>

      {/* Preload video link for faster loading */}
      <link
        rel="preload"
        as="video"
        href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mignon_%20Spot%20_%20Horiz%20%281%29%20%281%29-s5HtSlhWAX09d3hRsaV90ycXhUDjQq.mp4"
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-end px-5 pb-8 md:px-10 md:pb-12 pt-28">
        {/* Big title - smaller on mobile and positioned lower */}
        <div className="flex flex-col gap-2 md:gap-4 mb-6 md:mb-10 text-center md:text-left mt-auto">
          <span className="text-[9px] md:text-[11px] font-medium uppercase tracking-[0.3em] text-[#fffdf8]/50">
            El Colmado dels Objectes Trobats
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,10vw,6rem)] leading-[0.9] text-[#fffdf8] tracking-[-0.02em]">
            <span className="italic">Objectes</span>
            <br />
            amb vida
          </h1>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-[13px] md:text-[14px] text-[#fffdf8]/60 max-w-sm leading-relaxed">
            Lamparas, ceramica, textiles y pequenos tesoros de los anos 60 y 70. Cada pieza ha sido
            encontrada y curada con carino en Barcelona.
          </p>
          <Link
            href="#coleccion"
            className="group inline-flex items-center gap-3 self-start md:self-auto"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#fffdf8]/70 group-hover:text-[#fffdf8] transition-colors">
              Ver coleccion
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fffdf8]/30 text-[#fffdf8] group-hover:bg-[#fffdf8] group-hover:text-[#2c2420] transition-all">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

    </section>
  )
}
