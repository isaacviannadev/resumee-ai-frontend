import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resumee.ai',
  description:
    'Resumee.ai é uma plataforma de criação de resumos de vídeos gerados por inteligência artificial.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`bg-rich-black ${inter.className}`}>{children}</body>
    </html>
  );
}
