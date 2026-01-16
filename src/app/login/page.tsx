'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://room-finder-silk.vercel.app',
      },
    })

    setLoading(false)

    if (error) {
      console.error(error)
      alert(error.message)
    } else {
      alert('Magic link sent. Check your email.')
      console.log('OTP response:', data)
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-black text-white p-2 w-full"
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </div>
    </div>
  )
}
