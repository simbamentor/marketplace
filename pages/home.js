import { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import router from 'next/router'

export default function Home () {
  const [session] = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [])

  return (
    <main>
      <div>
        <h1> Protected Page | Home </h1>
      </div>
    </main>
  )
}
