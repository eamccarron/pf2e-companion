import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavBar } from '../components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PF2e Companion',
  description: 'Companion app for managing Pathfinder 2e content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar>
          {children}
        </NavBar>
      </body>
    </html>
  )
}
