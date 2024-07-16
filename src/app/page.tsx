
'use client'
import { useRouter } from 'next/navigation'
export default function HomePage() {
  const router = useRouter()
  router.replace('/photoshow' + window.location.search)
  return <div id="home-page">Welcome!</div>
}
