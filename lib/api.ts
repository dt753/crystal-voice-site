const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

async function authFetch(path: string, token: string, options?: RequestInit) {
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

export async function getSubscription(token: string) {
  return authFetch('/subscription', token)
}

export async function applyReferral(token: string, code: string) {
  return authFetch('/referral/apply', token, {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
}
