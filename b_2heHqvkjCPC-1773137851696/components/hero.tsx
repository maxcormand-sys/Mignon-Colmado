"use client"

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
        {/* Big title - smaller on mobile, aligned left on both */}
        <div className="flex flex-col gap-2 md:gap-4 mb-4 md:mb-10 text-left mt-auto">
          <h1 className="font-serif text-[clamp(2.5rem,10vw,6rem)] leading-[0.9] text-[#fffdf8] tracking-[-0.02em]">
            <span className="italic">Objectes</span>
            <br />
            amb vida
          </h1>
          {/* Short description on mobile */}
          <p className="md:hidden text-[13px] text-[#fffdf8]/60 max-w-[85%] leading-relaxed mt-2">
            Peces uniques dels anys 60 i 70 curades amb estima a Barcelona.
          </p>
        </div>

        {/* Description - visible only on desktop */}
        <p className="hidden md:block text-[14px] text-[#fffdf8]/60 max-w-sm leading-relaxed">
          Lamparas, ceramica, textiles y pequenos tesoros de los anos 60 y 70. Cada pieza ha sido
          encontrada y curada con carino en Barcelona.
        </p>
      </div>

    </section>
  )
}
