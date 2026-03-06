import { createClient } from "@supabase/supabase-js";

// Server-side only client (uses service role key — never expose to browser)
export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(url, key);
}
