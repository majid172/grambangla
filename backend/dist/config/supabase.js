import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';
export const isSupabaseConfigured = () => {
    return Boolean(supabaseUrl &&
        supabaseKey &&
        supabaseUrl !== 'https://your-project.supabase.co' &&
        supabaseKey !== 'your-anon-or-service-role-key');
};
export const supabase = isSupabaseConfigured()
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false,
        },
    })
    : null;
if (isSupabaseConfigured()) {
    console.log('Connected to Supabase Database successfully!');
}
else {
    console.log('Supabase not yet configured in .env. Running in hybrid local storage mode.');
}
