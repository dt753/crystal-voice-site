'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import CrystalGem from './CrystalGem'
import { createClient } from '@/lib/supabase'

const nav = [
  { href: '/',         label: 'Главная' },
  { href: '/pricing',  label: 'Тарифы'  },
  { href: '/download', label: 'Скачать' },
  { href: '/docs',     label: 'Документация' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    try {
      const supabase = createClient()

      async function loadUsername(userId: string, email: string | undefined) {
        const { data } = await supabase.from('profiles').select('username').eq('id', userId).single()
        setUsername(data?.username || (email ? email.split('@')[0] : null))
      }

      supabase.auth.getUser().then(({ data }) => {
        if (data.user) loadUsername(data.user.id, data.user.email)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) loadUsername(session.user.id, session.user.email)
        else setUsername(null)
      })
      return () => subscription.unsubscribe()
    } catch {
      // Supabase not configured
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-void-900/80 backdrop-blur-xl border-b border-crystal-700/20 shadow-crystal-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <CrystalGem size={24} className="group-hover:animate-float transition-all" />
          <span className="font-semibold text-white tracking-wide">
            Crystal<span className="text-crystal-400">Voice</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? 'text-crystal-300 bg-crystal-700/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/account" className="text-sm text-slate-400 hover:text-white transition-colors">
            {username ?? 'Войти'}
          </Link>
          <Link
            href="/download"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-crystal-600 hover:bg-crystal-500 text-white transition-all duration-200 shadow-crystal-sm hover:shadow-crystal"
          >
            Скачать
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : '' }} />
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <div className="w-5 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : '' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-void-800/95 backdrop-blur-xl border-b border-crystal-700/20 px-4 pb-4">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-slate-300 hover:text-crystal-400 border-b border-white/5 last:border-0 transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block text-center py-2.5 rounded-lg bg-crystal-600 text-white font-medium text-sm"
          >
            Скачать бесплатно
          </Link>
        </div>
      )}
    </header>
  )
}
