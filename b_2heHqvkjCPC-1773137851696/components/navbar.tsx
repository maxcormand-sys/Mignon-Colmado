"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"

export function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-3 mt-3 md:mx-5 md:mt-4 bg-secondary border border-secondary-foreground/10 shadow-sm">
        <nav className="flex items-center justify-between px-5 py-2.5 md:px-6 md:py-3">
          {/* Left */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-secondary-foreground cursor-pointer"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/#coleccion"
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
              >
                Tienda
              </Link>
              <Link
                href="/about"
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
              >
                Nosotros
              </Link>
            </div>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-UIQ3U8VGAvlOo6L959dvN0CghA3R5C.png"
              alt="Mignon"
              width={80}
              height={20}
              className="h-4 md:h-[18px] w-auto"
              loading="eager"
              priority
            />
          </Link>

          {/* Right: Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative text-secondary-foreground/70 hover:text-secondary-foreground transition-colors cursor-pointer"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center bg-foreground text-[9px] font-bold text-background rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-foreground z-50 flex flex-col">
          <div className="flex items-center justify-between px-8 pt-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-UIQ3U8VGAvlOo6L959dvN0CghA3R5C.png"
              alt="Mignon"
              width={100}
              height={24}
              className="h-5 w-auto invert"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-background cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-background/20"
            >
              <span className="font-serif italic text-5xl text-background">Tienda</span>
              <ArrowUpRight className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-background/20"
            >
              <span className="font-serif italic text-5xl text-background">Nosotros</span>
              <ArrowUpRight className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="px-8 pb-8 flex flex-col gap-1">
            <span className="text-[11px] text-background/60 tracking-wide">
              El Colmado dels Objectes Trobats
            </span>
            <span className="text-[11px] text-background/60 tracking-wide">
              Barcelona
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
