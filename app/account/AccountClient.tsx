'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { getSubscriptionAction, applyReferralAction } from '@/app/actions/subscription'
import type { User } from '@supabase/supabase-js'
import type { SubscriptionStatus } from '@/lib/supabase'

function AuthForm() {
  const supabase = createClient()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const inputClass = "w-full px-4 py-3 rounded-xl bg-void-800/80 border border-white/10 focus:border-crystal-500/60 text-white placeholder-slate-500 text-sm outline-none transition-colors"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('Неверный email или пароль')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        if (error.message.includes('already registered')) setError('Этот email уже зарегистрирован')
        else if (error.message.includes('weak') || error.message.includes('password')) setError('Пароль слишком простой. Минимум 6 символов')
        else setError('Ошибка регистрации. Попробуй ещё раз')
      } else setSuccess('Аккаунт создан! Теперь войди с теми же данными.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8">
        <div className="flex rounded-xl bg-void-800/60 p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setSuccess(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'login' ? 'bg-crystal-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Войти
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); setSuccess(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'register' ? 'bg-crystal-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Регистрация
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={inputClass}
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          {success && <p className="text-green-400 text-xs">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? '...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>
      </div>
    </div>
  )
}

function SubscriptionCard({ sub }: { sub: SubscriptionStatus }) {
  const expiresAt = sub.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Подписка</p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${sub.active ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className={`font-bold text-lg ${sub.active ? 'text-white' : 'text-slate-400'}`}>
              {sub.active ? 'Premium активен' : 'Бесплатный план'}
            </span>
          </div>
        </div>
        {sub.active && <span className="badge">✦ Premium</span>}
      </div>
      {sub.active && expiresAt && (
        <p className="text-slate-400 text-sm mb-4">
          Активна до <span className="text-crystal-300 font-medium">{expiresAt}</span>
        </p>
      )}
      {!sub.active && (
        <div className="mt-2">
          <p className="text-slate-400 text-sm mb-4">
            Переходи на Premium — неограниченная транскрипция и реферальная программа.
          </p>
          <Link href="/pricing" className="btn-primary text-sm py-2.5">
            Перейти на Premium
          </Link>
        </div>
      )}
    </div>
  )
}

function validateReferralCode(code: string): string | null {
  if (!code.trim()) return 'Введи код'
  if (code.length > 50) return 'Код слишком длинный'
  if (!/^[A-Za-z0-9_-]+$/.test(code)) return 'Код может содержать только буквы и цифры'
  return null
}

function ReferralCard({ code, onApply }: { code: string | null; onApply: (c: string) => Promise<void> }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [lastAttempt, setLastAttempt] = useState(0)

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validateReferralCode(input)
    if (validationError) { setError(validationError); return }
    if (Date.now() - lastAttempt < 3000) { setError('Подождите перед следующей попыткой'); return }
    setLastAttempt(Date.now())
    setLoading(true)
    setError(null)
    try {
      await onApply(input.trim())
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка при применении кода')
    } finally {
      setLoading(false)
    }
  }

  function copyCode() {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card p-6 space-y-6">
      {code && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Мой реферальный код</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-void-800/80 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-crystal-300 tracking-widest text-sm">
              {code}
            </div>
            <button onClick={copyCode} className="btn-secondary px-4 py-2.5 text-sm shrink-0">
              {copied ? 'Скопировано!' : 'Копировать'}
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-2">Поделись кодом — и ты, и друг получите +30 дней Premium</p>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Применить чужой код</p>
        {success ? (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <span>✓</span><span>Код применён! +30 дней Premium добавлены.</span>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Введи реферальный код"
              className="flex-1 px-4 py-2.5 rounded-xl bg-void-800/80 border border-white/10 focus:border-crystal-500/60 text-white placeholder-slate-500 text-sm outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary text-sm py-2.5 px-5 disabled:opacity-50"
            >
              {loading ? '...' : 'Применить'}
            </button>
          </form>
        )}
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </div>
    </div>
  )
}

function UsernameCard({ userId, supabase, onSave }: { userId: string; supabase: ReturnType<typeof createClient>; onSave: (name: string) => void }) {
  const [username, setUsername] = useState<string>('')
  const [input, setInput] = useState<string>('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    supabase.from('profiles').select('username').eq('id', userId).single()
      .then(({ data }) => {
        const name = data?.username ?? ''
        setUsername(name)
        setInput(name)
      })
  }, [userId, supabase])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) { setError('Никнейм не может быть пустым'); return }
    if (trimmed.length > 30) { setError('Максимум 30 символов'); return }
    if (!/^[A-Za-z0-9_\- а-яёА-ЯЁ]+$/.test(trimmed)) { setError('Только буквы, цифры, пробел, - и _'); return }
    setLoading(true)
    setError(null)
    const { error } = await supabase.from('profiles').update({ username: trimmed }).eq('id', userId)
    setLoading(false)
    if (error) { setError('Ошибка сохранения'); return }
    setUsername(trimmed)
    setEditing(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
    onSave(trimmed)
    window.dispatchEvent(new CustomEvent('username-updated', { detail: trimmed }))
  }

  return (
    <div className="card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Никнейм</p>
      {editing ? (
        <form onSubmit={handleSave} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={30}
            placeholder="Введи никнейм"
            className="flex-1 px-4 py-2.5 rounded-xl bg-void-800/80 border border-white/10 focus:border-crystal-500/60 text-white placeholder-slate-500 text-sm outline-none transition-colors"
          />
          <button type="submit" disabled={loading} className="btn-primary text-sm py-2.5 px-4 disabled:opacity-50">
            {loading ? '...' : 'Сохранить'}
          </button>
          <button type="button" onClick={() => { setEditing(false); setInput(username); setError(null) }} className="btn-secondary text-sm py-2.5 px-4">
            Отмена
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{username || <span className="text-slate-500 italic">не задан</span>}</span>
          <button onClick={() => setEditing(true)} className="text-xs text-slate-400 hover:text-crystal-400 transition-colors">
            Изменить
          </button>
          {success && <span className="text-green-400 text-xs">Сохранено!</span>}
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  )
}

export default function AccountClient() {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [sub, setSub] = useState<SubscriptionStatus | null>(null)
  const [subError, setSubError] = useState<string | null>(null)
  const [profileUsername, setProfileUsername] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      if (data.user) {
        supabase.from('profiles').select('username').eq('id', data.user.id).single()
          .then(({ data: p }) => setProfileUsername(p?.username ?? null))
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase.from('profiles').select('username').eq('id', session.user.id).single()
          .then(({ data: p }) => setProfileUsername(p?.username ?? null))
      } else {
        setProfileUsername(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  const loadSub = useCallback(async () => {
    if (!user) return
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const { data, error } = await getSubscriptionAction(session.access_token)
    if (error) setSubError(error)
    else if (data) setSub(data)
  }, [user, supabase.auth])

  useEffect(() => { loadSub() }, [loadSub])

  const handleApplyReferral = useCallback(async (code: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Не авторизован')
    const { error } = await applyReferralAction(session.access_token, code)
    if (error) throw new Error(error)
    await loadSub()
  }, [supabase.auth, loadSub])

  if (user === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-crystal-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="badge mb-4">Аккаунт</div>
          <h1 className="section-title mb-2">
            {user ? `Привет${profileUsername ? ', ' + profileUsername : ''}!` : 'Мой аккаунт'}
          </h1>
          {user && <p className="text-slate-500 text-sm">{user.email}</p>}
        </div>

        {!user ? (
          <AuthForm />
        ) : (
          <div className="space-y-5">
            {subError ? (
              <div className="card p-4 flex items-center justify-between gap-4">
                <p className="text-red-400 text-sm">{subError}</p>
                <button onClick={() => { setSubError(null); loadSub() }} className="text-xs text-slate-400 hover:text-white shrink-0 transition-colors">Повторить</button>
              </div>
            ) : sub ? (
              <SubscriptionCard sub={sub} />
            ) : (
              <div className="card p-6 flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-5 h-5 rounded-full border-2 border-crystal-500 border-t-transparent animate-spin shrink-0" />
                Загружаем данные подписки...
              </div>
            )}
            <UsernameCard userId={user.id} supabase={supabase} onSave={setProfileUsername} />
            {sub && <ReferralCard code={sub.referral_code} onApply={handleApplyReferral} />}
            <div className="pt-2">
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-sm text-slate-500 hover:text-red-400 transition-colors"
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
