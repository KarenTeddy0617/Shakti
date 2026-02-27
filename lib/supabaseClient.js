import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cptsckeukhhtvqhnbyto.supabase.co"
const supabaseKey = "sb_publishable_nENrD_tuclzzepdw3u__8g__IqDK3Q8"

export const supabase = createClient(supabaseUrl, supabaseKey)