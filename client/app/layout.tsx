import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Metadata } from 'next'

const inter = Inter({subsets: ['latin'] })

// Title and description are used e.g. for search engines and social media
const title =
  'Vitality Vibe'
const description =
  'Vitality Vibe is a software product aimed at creating a healthier and more productive lifestyle for its users.'

// Metedata
export const metadata: Metadata = {
  title,
  description,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}