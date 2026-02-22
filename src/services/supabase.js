import { createClient } from '@supabase/supabase-js'

// Estas variables vienen de tu archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Creamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
