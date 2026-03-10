import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/cart-provider'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mignon -- El Colmado dels Objectes Trobats',
  description:
    'Objetos vintage curados de los anos 60 y 70. Iluminacion, ceramica, textiles y mas. Barcelona.',
}

export const viewport: Viewport = {
  themeColor: '#b2d8d8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
