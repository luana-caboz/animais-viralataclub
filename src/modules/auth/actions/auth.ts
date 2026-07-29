"use server";

import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  _prevState: {
    error?: string;
  } | null,
  formData: FormData
) {
  const supabase =
    await createClient();

  const email =
    formData.get("email") as string;

  const password =
    formData.get("password") as string;

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
  if (error) {
    return {
      error: "E-mail ou senha inválidos",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "admin_session_limit", "1",
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    }
  );

  redirect("/admin");
}

export async function logout() {
  const supabase =
    await createClient();

  await supabase.auth.signOut();

  const cookieStore = await cookies();

  cookieStore.delete("admin_session_limit");

  redirect("/login");
}