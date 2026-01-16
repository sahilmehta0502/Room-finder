import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization
let supabase: SupabaseClient | null = null

export const getSupabaseClient = (): SupabaseClient => {
  if (supabase) return supabase

  // Client-side environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Instead of throwing, warn and provide placeholder for dev
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Supabase env vars missing. Using fallback placeholder values'
      )
      return createClient('https://example.supabase.co', 'example-anon-key')
    }
    throw new Error('Supabase environment variables are missing')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
  return supabase
}


console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('SUPABASE ANON KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
