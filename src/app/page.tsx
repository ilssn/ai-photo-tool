
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
export default function HomePage() {
  const router = useRouter()
	useEffect(() => {
		router.replace('/photoshow' + window.location.search)
	}, [router]);
  return <div id="home-page">Welcome!</div>
}
