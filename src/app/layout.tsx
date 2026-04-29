import type { Metadata } from 'next';
import { Space_Grotesk, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: '地球46億年の旅 | Earth History',
  description: '地球誕生から現在まで、46億年の歴史をビジュアルで体験する',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${notoSansJP.variable}`}
    >
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
