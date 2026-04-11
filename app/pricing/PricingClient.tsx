'use client'

import { useState } from 'react'
import Link from 'next/link'
import CrystalGem from '@/components/CrystalGem'

function Gem({ size = 13 }: { size?: number }) {
  return <CrystalGem size={size} className="inline-block shrink-0" />
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function DimCheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const tiers = [
  {
    key: 'free',
    name: 'Free',
    subtitle: 'Попробовать',
    monthly: 0,
    yearly: 0,
    popular: false,
    highlight: false,
    features: [
      { text: '100 кристаллов (~30 мин) при старте', dim: false, gem: true },
      { text: 'Все поддерживаемые языки', dim: false },
      { text: 'Хоткей Caps Lock × 2', dim: false },
      { text: 'Windows и Mac', dim: false },
      { text: 'Реферальная программа', dim: true },
      { text: 'Email-поддержка', dim: true },
    ],
    cta: 'Скачать бесплатно',
    ctaHref: '/download',
    ctaPrimary: false,
    border: 'border-white/10',
    glow: '',
    gradient: '',
  },
  {
    key: 'start',
    name: 'Старт',
    subtitle: 'Для активных',
    monthly: 199,
    yearly: 1690,
    popular: true,
    highlight: true,
    features: [
      { text: 'Неограниченная транскрипция', dim: false },
      { text: 'Все поддерживаемые языки', dim: false },
      { text: '+200 кристаллов за каждого друга', dim: false, gem: true },
      { text: 'Реферальная программа (до 5 друзей)', dim: false },
      { text: 'Email-поддержка', dim: false },
      { text: 'Хоткей Caps Lock × 2', dim: false },
    ],
    cta: 'Начать',
    ctaHref: '/account',
    ctaPrimary: true,
    border: 'border-crystal-500/40',
    glow: 'shadow-crystal',
    gradient: 'from-crystal-700/15 via-transparent to-transparent',
  },
  {
    key: 'pro',
    name: 'Pro',
    subtitle: 'Максимум',
    monthly: 399,
    yearly: 3390,
    popular: false,
    highlight: false,
    features: [
      { text: 'Всё из тарифа Старт', dim: false },
      { text: 'Приоритетная обработка запросов', dim: false },
      { text: '+300 кристаллов за каждого друга', dim: false, gem: true },
      { text: 'Ранний доступ к новым функциям', dim: false },
      { text: 'Расширенная статистика', dim: false },
      { text: 'Приоритетная поддержка', dim: false },
    ],
    cta: 'Получить Pro',
    ctaHref: '/account',
    ctaPrimary: true,
    border: 'border-violet-500/30',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]',
    gradient: 'from-violet-700/10 via-transparent to-transparent',
  },
]

const faq = [
  {
    q: 'Что такое кристаллы?',
    a: 'Кристаллы — внутренняя валюта Crystal Voice. 100 кристаллов = ~30 минут транскрипции. Новые пользователи получают 100 кристаллов при регистрации. Дополнительные кристаллы зарабатываются через реферальную программу.',
  },
  {
    q: 'Нужна ли карта для бесплатного плана?',
    a: 'Нет. Просто скачай приложение и используй 100 кристаллов (~30 мин) без ввода каких-либо данных.',
  },
  {
    q: 'Как работает реферальная программа?',
    a: 'После регистрации ты получаешь уникальный код. Друг регистрируется с ним — вы оба получаете бонусные кристаллы, а друг — +30 дней тарифа Старт. Максимум 5 рефералов на один аккаунт.',
  },
  {
    q: 'Можно ли перейти с Старт на Pro?',
    a: 'Да, в любой момент. Неиспользованное время текущей подписки учитывается при переходе.',
  },
  {
    q: 'Мои аудиозаписи сохраняются?',
    a: 'Нет. Аудио отправляется только для транскрипции и нигде не хранится на серверах.',
  },
  {
    q: 'Какие языки поддерживаются?',
    a: 'Движок распознавания поддерживает 50+ языков. Русский стоит по умолчанию, но можно переключить на любой другой прямо в настройках.',
  },
]

export default function PricingClient() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-crystal-700/10 blur-[130px]" />
      </div>
      <CrystalGem size={18} className="absolute top-32 left-[5%] opacity-20 animate-float hidden lg:block" />
      <CrystalGem size={12} className="absolute top-48 right-[7%] opacity-15 animate-float-slow hidden lg:block" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="badge mb-4">Тарифы</div>
          <h1 className="section-title mb-4">Простые и честные цены</h1>
          <p className="section-subtitle max-w-lg mx-auto flex items-center justify-center gap-2 flex-wrap">
            Начни бесплатно с <Gem size={14} /> кристаллами. Перейди на платный тариф когда понадобится больше.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 bg-void-800/60 border border-white/10 rounded-2xl p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                !yearly ? 'bg-crystal-600 text-white shadow-crystal-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                yearly ? 'bg-crystal-600 text-white shadow-crystal-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Год
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-all ${
                yearly ? 'bg-white/20 text-white' : 'bg-green-500/20 text-green-400'
              }`}>
                −2 мес
              </span>
            </button>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => {
            const price = yearly ? tier.yearly : tier.monthly
            const perPeriod = yearly ? '/ год' : '/ месяц'

            return (
              <div
                key={tier.key}
                className={`relative card flex flex-col p-6 sm:p-8 border ${tier.border} ${tier.glow} transition-all duration-300`}
              >
                {tier.gradient && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} rounded-2xl pointer-events-none`} />
                )}
                {tier.key === 'pro' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-700/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
                )}

                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-crystal-600 text-white shadow-crystal-sm">
                      Популярный
                    </span>
                  </div>
                )}

                {tier.key === 'start' && (
                  <CrystalGem size={11} className="absolute top-4 right-4 opacity-40 animate-float" />
                )}

                <div className="relative mb-6">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
                    tier.key === 'start' ? 'text-crystal-300' :
                    tier.key === 'pro' ? 'text-violet-300' :
                    'text-slate-400'
                  }`}>
                    {tier.name}
                  </p>
                  <p className="text-slate-500 text-xs mb-3">{tier.subtitle}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl sm:text-5xl font-bold text-white">
                      {price === 0 ? '0 ₽' : `${price.toLocaleString('ru')} ₽`}
                    </span>
                    {price > 0 && (
                      <span className="text-slate-500 mb-1.5 text-sm">{perPeriod}</span>
                    )}
                    {price === 0 && (
                      <span className="text-slate-500 mb-1.5 text-sm">/ навсегда</span>
                    )}
                  </div>
                  {price > 0 && yearly && (
                    <p className="text-xs text-slate-500 mt-1">
                      {tier.key === 'start' ? (
                        <span>вместо <span className="line-through">2 388 ₽</span> — <span className="text-green-400">экономия 698 ₽</span></span>
                      ) : (
                        <span>вместо <span className="line-through">4 788 ₽</span> — <span className="text-green-400">экономия 1 398 ₽</span></span>
                      )}
                    </p>
                  )}
                  {price > 0 && !yearly && (
                    <p className="text-xs text-slate-500 mt-1">
                      или <span className={tier.key === 'start' ? 'text-crystal-400' : 'text-violet-400'}>
                        {tier.key === 'start' ? '1 690 ₽ / год' : '3 390 ₽ / год'}
                      </span> — сэкономь 2+ мес
                    </p>
                  )}
                </div>

                <ul className="relative space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f.text} className={`flex items-start gap-3 text-sm ${f.dim ? 'text-slate-600' : 'text-slate-300'}`}>
                      {f.dim ? <DimCheckIcon /> : <CheckIcon />}
                      <span className="flex items-center gap-1.5 flex-wrap">
                        {f.gem && <Gem size={12} />}
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  className={`relative w-full justify-center ${
                    tier.ctaPrimary
                      ? tier.key === 'pro'
                        ? 'btn-primary w-full flex items-center justify-center py-2.5 bg-violet-600 hover:bg-violet-500'
                        : 'btn-primary w-full justify-center'
                      : 'btn-secondary w-full justify-center'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Crystals section */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="card p-6 sm:p-8 border border-crystal-500/20">
            <div className="flex items-start gap-4">
              <CrystalGem size={32} className="shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Система кристаллов</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Кристаллы — внутренняя валюта Crystal Voice. 100 кристаллов ≈ 30 минут транскрипции.
                  Зарабатывай кристаллы через реферальную программу и используй их для дополнительного времени.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: '🎁', title: '+100 при старте', desc: 'Каждый новый пользователь' },
                    { icon: '👥', title: '+200 за друга', desc: 'Тариф Старт, до 5 рефералов' },
                    { icon: '🚀', title: '+300 за друга', desc: 'Тариф Pro, до 5 рефералов' },
                  ].map((item) => (
                    <div key={item.title} className="bg-void-800/60 rounded-xl p-4 border border-white/5">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Частые вопросы</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faq.map(({ q, a }) => (
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
