import { createClient } from "@supabase/supabase-js";

import { requireServerEnv } from "@/shared/config/env";

export const supabase = createClient(
  requireServerEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  ),
  requireServerEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
