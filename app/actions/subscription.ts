'use server'

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

export async function getSubscriptionAction(token: string): Promise<{ data?: unknown; error?: string }> {
  try {
    const data = await serverFetch('/subscription', token)
    return { data }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Ошибка загрузки подписки' }
  }
}

export async function applyReferralAction(token: string, code: string): Promise<{ error?: string }> {
  try {
    await serverFetch('/referral/apply', token, {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    return {}
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Ошибка при применении кода' }
  }
}
