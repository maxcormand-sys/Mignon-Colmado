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
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mignon_%20Spot%20_%20Horiz%20%281%29%20%281%29-OHZ5X1gsDjrshSFYwP6FAfZfUe6PfO.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-5">
        {/* Centered title with text shadow for readability */}
        <div className="text-center">
          <h1 
            className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1] text-[#fffdf8] tracking-[-0.02em]"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.4), 0 4px 40px rgba(0,0,0,0.2)'
            }}
          >
            <span className="italic">Objectes</span>
            <br />
            amb vida
          </h1>
        </div>
      </div>

      {/* Bottom arrow to scroll */}
      <div className="relative pb-8 flex justify-center">
        <Link
          href="#coleccion"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#fffdf8]/40 text-[#fffdf8] hover:bg-[#fffdf8] hover:text-[#2c2420] transition-all"
          aria-label="Ver coleccion"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
