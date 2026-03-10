"use client"

import Image from "next/image"
import { X, Minus, Plus } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"

export function CartSheet() {
  const { items, isOpen, setIsOpen, removeItem, addItem, totalPrice } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-[380px] border-l border-border p-0">
        <SheetHeader className="px-5 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[13px] font-bold uppercase tracking-[0.15em] text-foreground">
              Tu cesta
            </SheetTitle>
            <span className="text-[11px] text-muted-foreground">
              {items.length} {items.length === 1 ? "pieza" : "piezas"}
            </span>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5">
            <div className="flex flex-col items-center gap-2">
              <span className="font-serif italic text-2xl text-foreground/20">Vacio</span>
              <p className="text-[12px] text-muted-foreground text-center">
                Explora la coleccion y anade piezas que te enamoren.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-foreground text-background px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-accent transition-colors cursor-pointer"
            >
              Seguir explorando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto cart-scroll">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 px-5 py-4 border-b border-border/50"
                >
                  {/* Thumbnail with color accent */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="absolute -left-1 -top-1 h-[calc(100%+8px)] w-[calc(100%+8px)]"
                      style={{ backgroundColor: item.product.color, opacity: 0.15 }}
                    />
                    <div className="relative h-20 w-20 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[12px] font-medium text-foreground leading-tight">
                          {item.product.name}
                        </h3>
                        <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                          {item.product.category}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-accent cursor-pointer p-0.5 transition-colors"
                        aria-label="Eliminar"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (item.quantity <= 1) removeItem(item.product.id)
                          }}
                          className="flex h-6 w-6 items-center justify-center border border-border text-foreground hover:bg-muted cursor-pointer transition-colors"
                          aria-label="Quitar uno"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="text-[11px] font-bold text-foreground w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addItem(item.product)}
                          className="flex h-6 w-6 items-center justify-center border border-border text-foreground hover:bg-muted cursor-pointer transition-colors"
                          aria-label="Agregar uno"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                      <span className="text-[13px] font-bold text-foreground tabular-nums">
                        {item.product.price * item.quantity}&euro;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout footer */}
            <div className="border-t border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Total
                </span>
                <span className="text-lg font-bold text-foreground tabular-nums">
                  {totalPrice}&euro;
                </span>
              </div>
              <button className="w-full bg-accent text-accent-foreground py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground transition-colors cursor-pointer">
                Finalizar compra
              </button>
              <p className="text-[9px] text-muted-foreground text-center mt-2.5 tracking-wide">
                Envios a toda la peninsula -- Recogida en tienda
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
