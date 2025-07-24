import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ceyopueguqklwwdjkvcf.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNleW9wdWVndXFrbHd3ZGprdmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTkzOTcsImV4cCI6MjA2ODg3NTM5N30.TTcny-JLGh7NxglQKmHwU5LCs3C6pmeZXwu7jvJQD-o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SweepstakesEntry {
  id?: string
  first_name: string
  last_name: string
  phone_number: string
  entry_date?: string
  created_at?: string
  updated_at?: string
  ip_address?: string
  user_agent?: string
  entry_source?: string
  is_winner?: boolean
  notes?: string
}
