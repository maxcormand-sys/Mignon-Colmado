export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  imageAlt?: string
  color: string
  sold?: boolean
}

export const categories = [
  "Todo",
  "Iluminacion",
  "Ceramica",
  "Figuras",
] as const

export type Category = (typeof categories)[number]

export const products: Product[] = [
  {
    id: "flexo-azul",
    name: "Flexo Azul Cielo",
    price: 85,
    category: "Iluminacion",
    description: "Lampara de escritorio flexible en azul cielo con detalles cromados. Anos 70.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pLampara%20azul%20flexo-twd06uCsmLgf2MFNLR1YJ7AwtqMYnk.jpg",
    imageAlt: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-8CxYdgvbPyWdB8o1AgEeuC5CdFnoRJ.png",
    color: "#7BBBD4",
  },
  {
    id: "globo-rojo-tallado",
    name: "Globo Rojo Tallado",
    price: 120,
    category: "Iluminacion",
    description: "Base tallada en rojo coral con globo de cristal opalino y detalles en laton. Anos 60.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pLampara%20roja%20fondo70s-u0HSmpnhOwZ3vVfJ91NZZBwiIrHgac.jpg",
    imageAlt: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D3A3ECFC-57B0-4671-908A-994625476304-wOF09rF7oZxN0K9R2c5xxko1dBmoAD.png",
    color: "#E04A3E",
  },
  {
    id: "globo-rojo-cromado",
    name: "Globo Rojo Cromado",
    price: 95,
    category: "Iluminacion",
    description: "Cuerpo rojo con acabados cromados y globo de vidrio opalino. Space age anos 70.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pLamparita%20roja%20pan%CC%83uelo%20verde-I9GMaevKHwIhAjJSZUM1JoF6qkjzTa.jpg",
    imageAlt: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7DE49C9A-64EA-421E-B422-0FEDDB317CAC-7pmT6koaQncvttfUpz9cvoYwikyd5t.png",
    color: "#E04A3E",
  },
  {
    id: "perfumero-verde",
    name: "Lampara Verde Opalina",
    price: 135,
    category: "Iluminacion",
    description: "Lampara en verde brillante con globo opalino. Forma de perfumero. Anos 70.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pPerfumero%20verde-iOleJCJSFq08ZRptSHx4YV35pmsk1v.jpg",
    color: "#4AAF5B",
  },
  {
    id: "globo-rojo-ceramica",
    name: "Globo Ceramica Roja",
    price: 110,
    category: "Iluminacion",
    description: "Ceramica roja esmaltada con globo opalino blanco. Pieza unica anos 60.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/p001A5094-ky5LYLzASE7UjvyRXMahi96aYxL7Y4.jpg",
    color: "#C44D3F",
  },
  {
    id: "tazas-cafe-barro",
    name: "Tazas Cafe Barro x3",
    price: 28,
    category: "Ceramica",
    description: "Tres tazas de cafe apilables en ceramica esmaltada marron. Estilo rustico anos 70.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pTazas%20cafe%CC%81%20barro-bqOpoI83j0KmOJ2LyronIbIqymKalT.jpg",
    color: "#6B4226",
  },
  {
    id: "bote-porcelana-flores",
    name: "Bote Porcelana Flores",
    price: 45,
    category: "Ceramica",
    description: "Porcelana blanca con motivos florales pop y tapa decorada. Anos 70.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pJaume%20Orfila-zQdb019FyUwNnn8lqQFXc0p7Imb60T.jpg",
    color: "#E04A3E",
  },
  {
    id: "jinete-vintage",
    name: "Jinete Vintage",
    price: 35,
    category: "Figuras",
    description: "Figura de jinete a caballo con sombrero rojo y traje amarillo. Coleccion anos 60.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/p001A9125-drOvlQBg3mJSGTWXFZUzwS293uTIhV.jpg",
    color: "#2E7D32",
  },
]
