import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { default: 'Документация', template: '%s | Документация | Crystal Voice' },
}

const sidebarLinks = [
  {
    group: 'Начало работы',
    links: [
      { href: '/docs/getting-started', label: 'Быстрый старт' },
      { href: '/docs/installation', label: 'Установка' },
    ],
  },
  {
    group: 'Использование',
    links: [
      { href: '/docs/hotkeys', label: 'Горячие клавиши' },
      { href: '/docs/languages', label: 'Языки' },
      { href: '/docs/settings', label: 'Настройки' },
    ],
  },
  {
    group: 'Аккаунт',
    links: [
      { href: '/docs/subscription', label: 'Подписка' },
      { href: '/docs/referral', label: 'Реферальная программа' },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-8">
            {sidebarLinks.map(({ group, links }) => (
              <div key={group}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                  {group}
                </p>
                <ul className="space-y-1">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-crystal-300 hover:bg-crystal-700/10 transition-all"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <article className="prose prose-invert prose-crystal max-w-none">
            {children}
          </article>
        </div>
      </div>
    </div>
  )
}
