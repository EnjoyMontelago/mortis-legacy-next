import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
  )
}

/**
 * Browser-safe client — uses the anon key, respects Row Level Security.
 * Import this in Client Components and route handlers that don't need admin access.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Server-only admin client — bypasses RLS, uses the service role key.
 * Import ONLY in server-side code (route handlers, Server Components, worker).
 * Never expose this to the browser.
 */
export function getSupabaseAdmin() {
  if (!supabaseServiceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. This function is server-only.',
    )
  }
  return createClient(supabaseUrl!, supabaseServiceKey, {
    auth: { persistSession: false },
  })
}
