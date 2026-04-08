'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

async function serverFetch(path: string, token: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? 'API error')
  }
  return res.json()
}

export async function getSubscriptionAction() {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Не авторизован')
  return serverFetch('/subscription', session.access_token)
}

export async function applyReferralAction(code: string) {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Не авторизован')
  return serverFetch('/referral/apply', session.access_token, {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
}
