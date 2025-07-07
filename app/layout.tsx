import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '[Claim] gag rewards',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: 'https://static.wikia.nocookie.net/growagarden/images/4/4a/Site-favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}