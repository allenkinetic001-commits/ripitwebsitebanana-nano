import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yxrcdxvwljiiojgdxvwa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_31Nrk31xR2SkBIEPjQFSvQ_cSnC8QqU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
