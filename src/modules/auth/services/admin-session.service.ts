import { cookies } from "next/headers";

import { createClient } from "@/shared/integrations/supabase/server-client";

export const ADMIN_SESSION_COOKIE = "admin_session_limit";

export class AuthenticationError extends Error {
  constructor() {
    super("Sessão administrativa inválida ou expirada.");
    this.name = "AuthenticationError";
  }
}

export async function getAdminUser() {
  const cookieStore = await cookies();

  if (!cookieStore.has(ADMIN_SESSION_COOKIE)) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
}

export async function requireAdmin() {
  const user = await getAdminUser();

  if (!user) {
    throw new AuthenticationError();
  }

  return user;
}

export async function canRunSync(request: Request) {
  const configuredSecret = process.env.SYNC_API_SECRET;
  const authorization = request.headers.get("authorization");

  if (
    configuredSecret &&
    authorization === `Bearer ${configuredSecret}`
  ) {
    return true;
  }

  return Boolean(await getAdminUser());
}
