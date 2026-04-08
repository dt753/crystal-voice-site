import type { Metadata } from 'next'
import CrystalGem from '@/components/CrystalGem'

export const metadata: Metadata = {
  title: 'Скачать',
  description: 'Скачай Crystal Voice для Windows и macOS. Последний релиз с GitHub.',
}

// Не кэшируем — всегда свежий релиз
export const revalidate = 3600 // обновлять раз в час

type GithubAsset = { name: string; browser_download_url: string }
type GithubRelease = { tag_name: string; assets: GithubAsset[] }

async function getLatestRelease(): Promise<{ version: string; winUrl: string | null; macUrl: string | null }> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    const res = await fetch('https://api.github.com/repos/dt753/Voice-Typer/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (!res.ok) throw new Error('GitHub API error')
    const data: GithubRelease = await res.json()

    const winAsset = data.assets.find(a => a.name.endsWith('.exe'))
    const macAsset = data.assets.find(a => a.name.endsWith('.dmg'))

    return {
      version: data.tag_name,
      winUrl: winAsset?.browser_download_url ?? null,
      macUrl: macAsset?.browser_download_url ?? null,
    }
  } catch {
    // Фоллбэк на прямую ссылку если API недоступен
    return {
      version: '',
      winUrl: 'https://github.com/dt753/Voice-Typer/releases/latest',
      macUrl: 'https://github.com/dt753/Voice-Typer/releases/latest',
    }
  }
}

export default async function DownloadPage() {
  const { version, winUrl, macUrl } = await getLatestRelease()

  const platforms = [
    {
      name: 'Windows',
      version: 'Windows 10 / 11',
      ext: '.exe',
      icon: <WindowsIcon />,
      href: winUrl ?? 'https://github.com/dt753/Voice-Typer/releases/latest',
      color: 'from-blue-600/20 to-blue-800/10',
      border: 'border-blue-500/25',
      glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
      note: 'x64 · Installer',
    },
    {
      name: 'macOS',
      version: 'macOS 12+',
      ext: '.dmg',
      icon: <MacIcon />,
      href: macUrl ?? 'https://github.com/dt753/Voice-Typer/releases/latest',
      color: 'from-slate-600/20 to-slate-800/10',
      border: 'border-slate-500/25',
      glow: 'hover:shadow-[0_0_30px_rgba(148,163,184,0.15)]',
      note: 'Universal (Intel + Apple Silicon)',
    },
  ]

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-crystal-700/10 blur-[120px]" />
      </div>

      <CrystalGem size={20} className="absolute top-28 left-[6%] opacity-30 animate-float hidden lg:block" />
      <CrystalGem size={13} className="absolute top-40 right-[8%] opacity-20 animate-float-slow hidden lg:block" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="badge mb-4">Скачать</div>
          <h1 className="section-title mb-4">Установи Crystal Voice</h1>
          <p className="section-subtitle max-w-lg mx-auto">
            Выбери свою платформу. Последний релиз доступен прямо с GitHub.
          </p>
          {version && (
            <p className="mt-3 text-xs text-slate-500 font-mono">
              Последняя версия: <span className="text-crystal-400">{version}</span>
            </p>
          )}
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card group relative overflow-hidden p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 cursor-pointer transition-all duration-300 ${p.glow} border ${p.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} pointer-events-none`} />

              <div className="relative flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                  {p.icon}
                </div>
                <span className="text-xs font-mono text-slate-500 bg-void-800/60 px-2.5 py-1 rounded-lg border border-white/5">
                  {p.ext}
                </span>
              </div>

              <div className="relative">
                <h2 className="text-xl font-bold text-white mb-1">{p.name}</h2>
                <p className="text-slate-400 text-sm">{p.version}</p>
                <p className="text-slate-500 text-xs mt-1">{p.note}</p>
              </div>

              <div className="relative flex items-center gap-2 mt-auto">
                <div className="btn-secondary py-2.5 flex-1 justify-center text-sm group-hover:border-white/20 transition-all">
                  <DownloadIcon />
                  Скачать для {p.name}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub releases link */}
        <div className="text-center mb-16">
          <a
            href="https://github.com/dt753/Voice-Typer/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-crystal-400 transition-colors"
          >
            <GithubIcon />
            Все версии на GitHub Releases
            <ExternalIcon />
          </a>
        </div>

        {/* Install steps */}
        <div className="card p-5 sm:p-8">
          <h2 className="font-bold text-white text-xl mb-6">Как установить</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-white flex items-center gap-1.5"><WindowsIcon /> Windows</span>
              </div>
              <ol className="space-y-2 text-sm text-slate-400">
                <li className="flex gap-2 flex-wrap"><span className="text-crystal-500 font-mono shrink-0">1.</span><span>Скачай <code className="text-crystal-300 bg-white/5 px-1 rounded break-all">Crystal-Voice-Setup.exe</code></span></li>
                <li className="flex gap-2"><span className="text-crystal-500 font-mono shrink-0">2.</span>Запусти установщик (может потребоваться разрешение SmartScreen)</li>
                <li className="flex gap-2"><span className="text-crystal-500 font-mono shrink-0">3.</span>Приложение запустится автоматически в системном трее</li>
                <li className="flex gap-2"><span className="text-crystal-500 font-mono shrink-0">4.</span>Дважды нажми Caps Lock — и говори!</li>
              </ol>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-white flex items-center gap-1.5"><MacIcon /> macOS</span>
              </div>
              <ol className="space-y-2 text-sm text-slate-400">
                <li className="flex gap-2 flex-wrap"><span className="text-crystal-500 font-mono shrink-0">1.</span><span>Скачай <code className="text-crystal-300 bg-white/5 px-1 rounded break-all">Crystal-Voice.dmg</code></span></li>
                <li className="flex gap-2"><span className="text-crystal-500 font-mono shrink-0">2.</span>Перетащи приложение в папку Applications</li>
                <li className="flex gap-2"><span className="text-crystal-500 font-mono shrink-0">3.</span>При первом запуске разреши доступ к микрофону</li>
                <li className="flex gap-2"><span className="text-crystal-500 font-mono shrink-0">4.</span>Дважды нажми Caps Lock — и говори!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-6 card p-6 flex gap-4 items-start">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <h3 className="font-semibold text-white mb-1 text-sm">Системные требования</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Windows 10+ (x64) или macOS 12+. Требуется активное интернет-соединение для транскрипции речи.
              Микрофон — встроенный или внешний.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

function MacIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.22 1.3-2.2 3.88.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  )
}
