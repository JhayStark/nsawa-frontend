import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

const sentient = localFont({
  src: '../../public/fonts/Sentient-Variable.woff2',
  display: 'swap',
  variable: '--font-sentient',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'NSAWA',
  description:
    'Have a funeral and want to collect donations with ease Nsawa is the place for you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StoreProvider>
        <body
          className={cn(
            'min-h-screen font-sans antialiased',
            poppins.variable,
            sentient.variable
          )}
        >
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
