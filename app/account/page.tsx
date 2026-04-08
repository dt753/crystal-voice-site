import dynamic from 'next/dynamic'

// Отключаем SSR полностью — страница аккаунта только клиентская
const AccountClient = dynamic(() => import('./AccountClient'), { ssr: false })

export default function AccountPage() {
  return <AccountClient />
}
