import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from '../components/NavBar';
import { ThemeRegistry } from '@/components/providers/ThemeRegistry';
import { CssBaseline } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PF2e Companion',
  description: 'Companion app for managing Pathfinder 2e content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui' }}>
          <NavBar>{children}</NavBar>
        </ThemeRegistry>
      </body>
    </html>
  );
}
