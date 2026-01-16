'use client'

import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

// ✅ KEEP YOUR FUNCTION NAME (NO LOGIC CHANGE)
export const getSupabaseClient = (): SupabaseClient => {
  return supabase
}
