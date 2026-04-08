import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a14',
}

export const metadata: Metadata = {
  title: {
    default: 'Crystal Voice — Голосовой ввод текста',
    template: '%s | Crystal Voice',
  },
  description:
    'Crystal Voice — умный голосовой ввод для Windows и Mac. Говори — текст вставляется в любое приложение мгновенно.',
  keywords: ['голосовой ввод', 'voice typer', 'whisper', 'диктовка', 'speech to text'],
  openGraph: {
    title: 'Crystal Voice — Голосовой ввод текста',
    description: 'Голосовой ввод текста для Windows и Mac. Нажми хоткей — говори — текст вставляется сам.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
