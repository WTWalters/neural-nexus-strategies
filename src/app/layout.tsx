import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Neural Nexus Strategies',
  description: 'Neural Nexus Strategies - AI Consulting and Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} min-h-screen bg-background font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}