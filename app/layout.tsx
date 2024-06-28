import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lora, Inconsolata } from 'next/font/google';
import { ReactNode } from 'react';
import DataContext from '@/app/_lib/DataContext';

const inter = Inter({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  subsets: ['latin'],
});

const lora = Lora({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  subsets: ['latin'],
});

const inconsolata = Inconsolata({
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inconsolata',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dictionary web app',
  description: 'Dictionary web app',
  applicationName: 'Dictionary web app',
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="hidden" lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta property="og:image" content={undefined} />
      </head>
      <body
        className={`${inter.variable} ${lora.variable} ${inconsolata.variable} mx-auto w-full overflow-x-clip bg-white transition dark:bg-[#050505]`}
      >
        <DataContext>{children}</DataContext>
      </body>
    </html>
  );
}
