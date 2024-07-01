import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import './globals.css';

const myFont = localFont({
  src: '../../public/fonts/Sentient-Variable.woff2',
  display: 'swap',
  variable: '--font-sentient',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-[#FFFFE2] font-sans antialiased',
          myFont.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
