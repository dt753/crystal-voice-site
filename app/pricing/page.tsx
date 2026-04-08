import type { Metadata } from 'next'
import Link from 'next/link'
import CrystalGem from '@/components/CrystalGem'

export const metadata: Metadata = {
  title: 'Тарифы',
  description: 'Выбери подходящий тариф Crystal Voice. Попробуй бесплатно, затем перейди на Premium.',
}

const free = [
  'До 30 минут записи в месяц',
  'Все поддерживаемые языки',
  'Хоткей Caps Lock × 2',
  'Windows и Mac',
]

const premium = [
  'Неограниченная транскрипция',
  'Приоритетная обработка',
  'Все поддерживаемые языки',
  'Реферальная программа (+30 дней за друга)',
  'Ранний доступ к новым функциям',
  'Email-поддержка',
]

function CheckIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#a78bfa' : '#475569'}
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 relative overflow-hidden">
      {/* BG glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-crystal-700/10 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="badge mb-4">Тарифы</div>
          <h1 className="section-title mb-4">Простые и честные цены</h1>
          <p className="section-subtitle max-w-lg mx-auto">
            Начни бесплатно. Перейди на Premium когда понадобится больше.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="card p-6 sm:p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">Бесплатно</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">0 ₽</span>
                <span className="text-slate-500 mb-1.5">/ навсегда</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {free.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/download" className="btn-secondary w-full justify-center">
              Скачать бесплатно
            </Link>
          </div>

          {/* Premium */}
          <div className="relative card p-6 sm:p-8 flex flex-col border-crystal-500/40 shadow-crystal">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-crystal-700/15 via-transparent to-transparent rounded-2xl pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-16 bg-crystal-600/15 blur-2xl pointer-events-none" />

            {/* Crystal decorations */}
            <CrystalGem size={12} className="absolute top-4 right-4 opacity-40 animate-float" />

            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full text-xs font-semibold bg-crystal-600 text-white shadow-crystal-sm">
                Популярный
              </span>
            </div>

            <div className="relative mb-6">
              <p className="text-crystal-300 text-sm font-medium uppercase tracking-widest mb-2">Premium</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">299 ₽</span>
                <span className="text-slate-500 mb-1.5">/ месяц</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">или <span className="text-crystal-400">2 490 ₽ / год</span> — сэкономь 2 месяца</p>
            </div>

            <ul className="relative space-y-3 mb-8 flex-1">
              {premium.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckIcon active />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/account" className="relative btn-primary w-full justify-center animate-pulse-glow">
              Начать бесплатный период
            </Link>
          </div>
        </div>

        {/* Referral info */}
        <div className="mt-12 max-w-2xl mx-auto card p-6 flex gap-4 items-start">
          <div className="text-2xl shrink-0">🎁</div>
          <div>
            <h3 className="font-semibold text-white mb-1">Реферальная программа</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Поделись своим реферальным кодом — и ты, и твой друг получите <span className="text-crystal-300 font-medium">+30 дней Premium</span> бесплатно.
              Код доступен в разделе <Link href="/account" className="text-crystal-400 hover:underline">Аккаунт</Link>.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Частые вопросы</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: 'Нужна ли карта для бесплатного плана?',
                a: 'Нет. Просто скачай приложение и используй 30 минут в месяц без ввода каких-либо данных.',
              },
              {
                q: 'Как работает реферальная программа?',
                a: 'После регистрации ты получаешь уникальный код. Друг вводит его — оба получают +30 дней Premium. Без ограничений по количеству рефералов.',
              },
              {
                q: 'Какие языки поддерживаются?',
                a: 'Движок распознавания поддерживает 50+ языков. Русский стоит по умолчанию, но ты можешь переключить на любой другой прямо в настройках.',
              },
              {
                q: 'Мои аудиозаписи сохраняются?',
                a: 'Нет. Аудио отправляется только для транскрипции и нигде не хранится.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="card p-5">
                <p className="font-medium text-white mb-2">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
