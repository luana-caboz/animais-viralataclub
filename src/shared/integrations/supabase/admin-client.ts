import { createClient } from "@supabase/supabase-js";

import { requireServerEnv } from "@/shared/config/env";

export const supabaseAdmin = createClient(
  requireServerEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  ),
  requireServerEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  ),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
