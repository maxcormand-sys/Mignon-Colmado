import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-[#b3dfe0] text-[#2c2420]">
        {/* Main footer content */}
        <div className="px-5 md:px-10 pt-8 md:pt-20 pb-6 md:pb-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-6">
            {/* Left: brand + tagline - full width on mobile */}
            <div className="col-span-2 md:col-span-5 flex flex-col gap-3 md:gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-kHfGQ8DV6knTZ6CAfqSvZj6Hg6MeG1.png"
                alt="Mignon"
                width={120}
                height={30}
                className="w-[80px] md:w-[120px] h-auto invert"
              />
              <p className="font-serif italic text-base md:text-xl text-[#2c2420]/60 max-w-[280px] leading-snug">
                El Colmado dels Objectes Trobats
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-6 w-6 md:h-8 md:w-8 overflow-hidden relative flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-OX5mRAmNLb4WFPqha31K2hpoD3lai6.png"
                    alt="Mignon logo"
                    width={32}
                    height={32}
                    className="object-contain w-6 h-6 md:w-8 md:h-8"
                  />
                </div>
                <span className="text-[10px] md:text-[11px] text-[#2c2420]/60">@mignoncolmado</span>
              </div>
            </div>

            {/* Middle: navigation - left column on mobile */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-2 md:gap-3">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c2420]/50">
                Navegar
              </span>
              <nav className="flex flex-col gap-1.5 md:gap-2.5">
                <Link
                  href="/"
                  className="text-[12px] md:text-[13px] text-[#2c2420]/80 hover:text-[#2c2420] transition-colors"
                >
                  Tienda
                </Link>
                <Link
                  href="/about"
                  className="text-[12px] md:text-[13px] text-[#2c2420]/80 hover:text-[#2c2420] transition-colors"
                >
                  Nosotros
                </Link>
                <Link
                  href="/#coleccion"
                  className="text-[12px] md:text-[13px] text-[#2c2420]/80 hover:text-[#2c2420] transition-colors"
                >
                  Coleccion
                </Link>
              </nav>
            </div>

            {/* Right: contact - right column on mobile */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-2 md:gap-3">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c2420]/50">
                Visita el colmado
              </span>
              <div className="flex flex-col gap-1 md:gap-2.5 text-[12px] md:text-[13px] text-[#2c2420]/80">
                <span>C/ Diluvi, 11</span>
                <span>Barcelona</span>
                <span className="mt-0.5 md:mt-1">hola@mignoncolmado.com</span>
              </div>
              <div className="hidden md:flex flex-col gap-1 mt-3 text-[11px] text-[#2c2420]/50">
                <span>Envios a toda Espana</span>
                <span>Recogida en tienda disponible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-5 md:px-10 py-5 border-t border-[#2c2420]/15 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-[10px] text-[#2c2420]/50 tracking-wide">
            &copy; {new Date().getFullYear()} Mignon -- Barcelona
          </p>
          <p className="text-[10px] text-[#2c2420]/50 tracking-wide">
            Objectes amb vida des de 2020
          </p>
        </div>
      </div>
    </footer>
  )
}
