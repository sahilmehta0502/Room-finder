'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const supabase = getSupabaseClient()

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) alert(error.message)
    else {
      alert('Check your email for login link')
      router.push('/')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 w-full"
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white p-2 w-full"
        >
          Send OTP
        </button>
      </div>
    </div>
  )
}
