"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { products } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { ArrowLeft, Plus, Check, ShoppingBag } from "lucide-react"
import { CartSheet } from "@/components/cart-sheet"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem, totalItems, setIsOpen } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const [activeImage, setActiveImage] = useState<"main" | "alt">("main")

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-serif italic text-foreground mb-4">
            Producto no encontrado
          </h1>
          <Link
            href="/#coleccion"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la coleccion
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product.sold) return
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const hasAltImage = !!product.imageAlt

  return (
    <div className="min-h-screen bg-background">
      {/* Header - turquoise, floating with margins */}
      <header className="fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50">
        <div className="bg-[#b3dfe0] px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#2c2420]/70 hover:text-[#2c2420] transition-colors px-3 py-1.5 border border-[#2c2420]/20 rounded-full cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Tornar
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-Photoroom-3JKidEghwvs0m1RG08AhgRXPs4rDzj.png"
              alt="Mignon"
              width={100}
              height={33}
              className="h-auto"
              style={{ filter: 'brightness(0)', width: 'auto', maxWidth: '100px' }}
            />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5 text-[#2c2420]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2c2420] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
          {/* Image section */}
          <div className="relative bg-muted">
            <div className="sticky top-20 h-[60vh] lg:h-[calc(100vh-5rem)] relative">
              <Image
                src={activeImage === "alt" && product.imageAlt ? product.imageAlt : product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Sold overlay */}
              {product.sold && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                  <span className="text-lg font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    Vendido
                  </span>
                </div>
              )}

              {/* Image toggle */}
              {hasAltImage && !product.sold && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  <button
                    onClick={() => setActiveImage("main")}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === "main" ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt="Vista 1"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                  <button
                    onClick={() => setActiveImage("alt")}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === "alt" ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={product.imageAlt!}
                      alt="Vista 2"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info section */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-20">
            <div className="max-w-md">
              {/* Category */}
              <span 
                className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${product.color}15`,
                  color: product.color 
                }}
              >
                {product.category}
              </span>

              {/* Name */}
              <h1 className="font-serif italic text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-foreground mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span 
                  className="text-3xl font-semibold"
                  style={{ color: product.color }}
                >
                  {product.price}&euro;
                </span>
                {product.sold && (
                  <span className="text-sm text-muted-foreground line-through">
                    No disponible
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Specs */}
              <div className="border-t border-border pt-8 mb-10">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Detalles
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Categoria</dt>
                    <dd className="text-foreground font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Epoca</dt>
                    <dd className="text-foreground font-medium">Anos 60-70</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Condicion</dt>
                    <dd className="text-foreground font-medium">Excelente</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Origen</dt>
                    <dd className="text-foreground font-medium">Europa</dd>
                  </div>
                </dl>
              </div>

              {/* Add to cart button */}
              {!product.sold ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`
                    w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full
                    text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer
                    ${isAdded 
                      ? "bg-green-600 text-white" 
                      : "bg-foreground text-background hover:scale-[1.02]"
                    }
                  `}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5" />
                      Anadido al carrito
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Anadir al carrito
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full text-center py-4 text-muted-foreground text-sm">
                  Este producto ya ha sido vendido
                </div>
              )}

              {/* Shipping info */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                Envio gratuito a partir de 100&euro; | Recogida gratis en tienda
              </p>
            </div>
          </div>
        </div>
      </main>
      <CartSheet />
    </div>
  )
}
