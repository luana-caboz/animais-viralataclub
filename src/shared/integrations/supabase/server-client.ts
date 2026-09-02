import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { requireServerEnv } from "@/shared/config/env";

export async function createClient() {
  const cookieStore =
    await cookies();

  return createServerClient(
    requireServerEnv(
      "NEXT_PUBLIC_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    requireServerEnv(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components não podem persistir cookies. O proxy
            // renova a sessão antes da renderização quando necessário.
          }
        },
      },
    }
  );
}
