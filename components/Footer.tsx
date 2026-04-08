import Link from 'next/link'
import CrystalGem from './CrystalGem'

export default function Footer() {
  return (
    <footer className="border-t border-crystal-700/15 bg-void-900/60 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CrystalGem size={20} />
              <span className="font-semibold text-white">Crystal<span className="text-crystal-400">Voice</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Голосовой ввод текста для Windows и Mac.<br/>
              Говори — текст появится сам.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Продукт</p>
            <ul className="space-y-2">
              {[
                { href: '/download', label: 'Скачать' },
                { href: '/pricing', label: 'Тарифы' },
                { href: '/docs', label: 'Документация' },
                { href: '/account', label: 'Аккаунт' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-crystal-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials / GitHub */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Ссылки</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/dt753/Voice-Typer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-crystal-400 text-sm transition-colors"
                >
                  <GithubIcon />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dt753/Voice-Typer/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-crystal-400 text-sm transition-colors"
                >
                  Релизы
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Crystal Voice</span>
        </div>
      </div>
    </footer>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
