import Link from 'next/link'
import CrystalGem from '@/components/CrystalGem'

/* ─── HERO ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-20 sm:pb-32 px-4">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-crystal-700/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-700/8 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full bg-cyan-700/6 blur-[100px]" />
      </div>

      {/* Floating crystals */}
      <CrystalGem size={22} className="absolute top-24 left-[8%] animate-float hidden lg:block" opacity={0.5} />
      <CrystalGem size={14} className="absolute top-40 right-[10%] animate-float-slow hidden lg:block" opacity={0.35} />
      <CrystalGem size={11} className="absolute bottom-24 left-[15%] animate-float hidden lg:block" opacity={0.25} />
      <CrystalGem size={18} className="absolute bottom-20 right-[8%] animate-float-slow hidden lg:block" opacity={0.4} />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crystal-700/20 border border-crystal-600/25 text-crystal-300 text-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-crystal-400 animate-pulse" />
          Точное распознавание речи
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
          Говори.{' '}
          <span className="text-shimmer">Текст появится сам.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
          Crystal Voice распознаёт твою речь и мгновенно вставляет текст в любое приложение —
          Telegram, Word, браузер. Без копирования, без печати.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/download" className="btn-primary text-base px-8 py-3.5">
            <DownloadIcon />
            Скачать бесплатно
          </Link>
          <Link href="/pricing" className="btn-secondary text-base px-8 py-3.5">
            Посмотреть тарифы
          </Link>
        </div>

        {/* Platform badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><WindowsIcon /> Windows</span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-1.5"><MacIcon /> macOS</span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-1.5">🇷🇺 Русский язык</span>
        </div>
      </div>

      {/* Demo: active window + overlay pill */}
      <div className="relative max-w-2xl mx-auto mt-12 sm:mt-20 flex flex-col items-center gap-0">

        {/* Simulated active window — Telegram-style chat */}
        <div className="card shadow-crystal-lg overflow-hidden w-full">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-void-800/60">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <span className="ml-3 text-xs text-slate-500 font-sans">Сообщения</span>
          </div>

          {/* Chat messages */}
          <div className="px-4 pt-4 pb-2 space-y-3">
            <div className="flex justify-start">
              <div className="bg-void-600/60 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                <p className="text-xs text-slate-400 mb-1 font-medium">Аня</p>
                <p className="text-sm text-slate-200">Муся, это ты?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-crystal-700/40 border border-crystal-600/20 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                <p className="text-sm text-slate-100 leading-relaxed">
                  нет, это Патрик ⭐
                </p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-white/5 flex items-center gap-3">
            <div className="flex-1 bg-void-800/80 rounded-full px-4 py-2 text-xs text-slate-500 border border-white/5">
              Сообщение...
            </div>
            <div className="w-8 h-8 rounded-full bg-crystal-600/30 border border-crystal-500/30 flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-crystal-400">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Crystal Voice overlay pill — recording state */}
        <div className="mt-4 z-10">
          <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border"
            style={{
              background: 'linear-gradient(135deg, rgba(18,15,30,0.96), rgba(24,18,42,0.98))',
              borderColor: 'rgba(155,125,255,0.4)',
              boxShadow: '0 0 30px rgba(109,69,247,0.35), 0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {/* Shimmer border */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="absolute inset-[-1px] rounded-full animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(155,125,255,0.6) 40%, rgba(220,200,255,0.9) 50%, rgba(155,125,255,0.6) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '1px',
                }}
              />
            </div>

            {/* Left crystal */}
            <svg width="10" height="18" viewBox="0 0 14 26" fill="none" className="shrink-0" style={{animation:'pillCrystal 3s ease-in-out infinite'}}>
              <defs>
                <linearGradient id="pl" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9b7dff"/>
                  <stop offset="100%" stopColor="#b8a0ff"/>
                </linearGradient>
                <linearGradient id="pr" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ddd5ff"/>
                  <stop offset="100%" stopColor="#f5f2ff"/>
                </linearGradient>
              </defs>
              <polygon points="7,1 4,5 4,21 7,25 10,21 10,5" fill="url(#pl)" stroke="#4a3070" strokeWidth="1.1" strokeLinejoin="round"/>
              <polygon points="10,5 7,1 13,4 13,22 10,25 7,25 10,21" fill="url(#pr)" stroke="#4a3070" strokeWidth="1.1" strokeLinejoin="round"/>
              <polygon points="7,1 13,4 10,5 4,5" fill="#f5f2ff" stroke="#4a3070" strokeWidth="0.7"/>
            </svg>

            {/* Red dot */}
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />

            {/* Label */}
            <span className="text-xs font-medium text-[#c9b8ff] tracking-wide whitespace-nowrap">
              Запись...
            </span>

            {/* Right crystal */}
            <svg width="10" height="18" viewBox="0 0 14 26" fill="none" className="shrink-0" style={{animation:'pillCrystal 3s ease-in-out infinite', animationDelay:'0.5s'}}>
              <polygon points="7,1 4,5 4,21 7,25 10,21 10,5" fill="url(#pl)" stroke="#4a3070" strokeWidth="1.1" strokeLinejoin="round"/>
              <polygon points="10,5 7,1 13,4 13,22 10,25 7,25 10,21" fill="url(#pr)" stroke="#4a3070" strokeWidth="1.1" strokeLinejoin="round"/>
              <polygon points="7,1 13,4 10,5 4,5" fill="#f5f2ff" stroke="#4a3070" strokeWidth="0.7"/>
            </svg>
          </div>
        </div>

        {/* Hint below pill */}
        <p className="text-center text-xs text-slate-600 mt-3">
          Оверлей Crystal Voice — всегда поверх любого окна
        </p>
      </div>
    </section>
  )
}

/* ─── FEATURES ───────────────────────────────────────────── */
const features = [
  {
    icon: '⚡',
    title: 'Мгновенная вставка',
    desc: 'Текст вставляется прямо в активное поле — будь то браузер, мессенджер или текстовый редактор.',
  },
  {
    icon: '🎙️',
    title: 'Двойной тап Caps Lock',
    desc: 'Простой хоткей без конфликтов. Двойной тап — старт. Ещё раз — стоп и вставка.',
  },
  {
    icon: '🌐',
    title: 'Множество языков',
    desc: 'Русский по умолчанию. Движок распознавания понимает 50+ языков — переключай прямо в настройках.',
  },
  {
    icon: '🔒',
    title: 'Приватность',
    desc: 'Аудио отправляется только для транскрипции. Мы не храним твои записи.',
  },
  {
    icon: '🖥️',
    title: 'Windows и Mac',
    desc: 'Нативное Electron-приложение. Работает системно — в любом окне.',
  },
  {
    icon: '💎',
    title: 'Crystal качество',
    desc: 'Собственный движок распознавания речи с высочайшей точностью — даже в шумной среде.',
  },
]

function Features() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <div className="badge mb-4">Возможности</div>
          <h2 className="section-title mb-4">Всё что нужно для голосового ввода</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Никаких лишних шагов. Нажал хоткей — говори — получил текст.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="card-glow p-6 group">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-semibold text-white mb-2 group-hover:text-crystal-300 transition-colors">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ──────────────────────────────────────── */
const steps = [
  { n: '01', title: 'Устанавливаешь приложение', desc: 'Скачай Crystal Voice под свою платформу. Установка занимает меньше минуты.' },
  { n: '02', title: 'Нажимаешь Caps Lock дважды', desc: 'Хоткей запускает запись. Говори — никаких кнопок "начать" в интерфейсе.' },
  { n: '03', title: 'Текст вставляется автоматически', desc: 'Как только отпускаешь — движок транскрибирует и текст появляется там, где был курсор.' },
]

function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-crystal-800/15 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <div className="badge mb-4">Как это работает</div>
          <h2 className="section-title mb-4">Три шага до первого диктанта</h2>
        </div>

        <div className="space-y-4">
          {steps.map(({ n, title, desc }, i) => (
            <div
              key={n}
              className="card-glow p-6 flex gap-6 items-start"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-crystal-700/30 border border-crystal-600/30 flex items-center justify-center font-mono text-crystal-400 font-bold text-sm">
                {n}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA BANNER ────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative card overflow-hidden p-6 sm:p-10 text-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-crystal-700/20 via-transparent to-cyan-900/10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-crystal-600/15 blur-3xl pointer-events-none" />

          {/* Corner crystals */}
          <CrystalGem size={16} className="absolute bottom-4 left-4 opacity-30 animate-float" />
          <CrystalGem size={11} className="absolute top-4 right-4 opacity-20 animate-float-slow" />

          <div className="relative">
            <div className="badge mb-4">Начни прямо сейчас</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Попробуй Crystal Voice<br />
              <span className="text-gradient">бесплатно</span>
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Установи за минуту. Работает сразу после запуска — без сложной настройки.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/download" className="btn-primary px-8 py-3.5 text-base">
                <DownloadIcon />
                Скачать приложение
              </Link>
              <Link href="/pricing" className="btn-secondary px-8 py-3.5 text-base">
                Посмотреть тарифы
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── ICONS ─────────────────────────────────────────────── */
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

function MacIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.22 1.3-2.2 3.88.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  )
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CTABanner />
    </>
  )
}
