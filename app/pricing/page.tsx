import type { Metadata } from 'next'
import PricingClient from './PricingClient'

export const metadata: Metadata = {
  title: 'Тарифы',
  description: 'Выбери подходящий тариф Crystal Voice — Free, Старт или Pro. Зарабатывай кристаллы через реферальную программу.',
}

export default function PricingPage() {
  return <PricingClient />
}
