'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    supabase.auth.getSession()
    supabase.auth.onAuthStateChange(() => {})
  }, [])

  return <>{children}</>
}
