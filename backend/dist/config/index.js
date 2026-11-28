import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    admin: {
        email: process.env.ADMIN_EMAIL || 'admin@grambangla.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
    },
    supabase: {
        url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        key: process.env.SUPABASE_KEY ||
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
            process.env.SUPABASE_SERVICE_ROLE_KEY ||
            '',
    },
};
