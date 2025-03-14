import type { Metadata } from 'next'
import './globals.css'
import { LayoutProvider } from '../src/context/LayoutContext'
import ThemeRegistry from '../theme'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </LayoutProvider>
      </body>
    </html>
  )
}
