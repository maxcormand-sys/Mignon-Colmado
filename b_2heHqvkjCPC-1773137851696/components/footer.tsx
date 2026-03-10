import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-[#b3dfe0] text-[#2c2420]">
        {/* Main footer content */}
        <div className="px-5 md:px-10 pt-14 md:pt-20 pb-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-6">
            {/* Left: brand + tagline */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-kHfGQ8DV6knTZ6CAfqSvZj6Hg6MeG1.png"
                alt="Mignon"
                width={120}
                height={30}
                className="w-[100px] md:w-[120px] invert"
                style={{ width: 'auto', height: 'auto' }}
              />
              <p className="font-serif italic text-lg md:text-xl text-[#2c2420]/60 max-w-[280px] leading-snug">
                El Colmado dels Objectes Trobats
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-8 w-8 overflow-hidden relative flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201-OX5mRAmNLb4WFPqha31K2hpoD3lai6.png"
                    alt="Mignon logo"
                    width={32}
                    height={32}
                    className="object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <span className="text-[11px] text-[#2c2420]/60">@mignoncolmado</span>
              </div>
            </div>

            {/* Middle: navigation */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c2420]/50">
                Navegar
              </span>
              <nav className="flex flex-col gap-2.5">
                <Link
                  href="/"
                  className="text-[13px] text-[#2c2420]/80 hover:text-[#2c2420] transition-colors"
                >
                  Tienda
                </Link>
                <Link
                  href="/about"
                  className="text-[13px] text-[#2c2420]/80 hover:text-[#2c2420] transition-colors"
                >
                  Nosotros
                </Link>
                <Link
                  href="/#coleccion"
                  className="text-[13px] text-[#2c2420]/80 hover:text-[#2c2420] transition-colors"
                >
                  Coleccion
                </Link>
              </nav>
            </div>

            {/* Right: contact */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c2420]/50">
                Visita el colmado
              </span>
              <div className="flex flex-col gap-2.5 text-[13px] text-[#2c2420]/80">
                <span>C/ Diluvi, 11</span>
                <span>Barcelona</span>
                <span className="mt-1">hola@mignoncolmado.com</span>
              </div>
              <div className="flex flex-col gap-1 mt-3 text-[11px] text-[#2c2420]/50">
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
