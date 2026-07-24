import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";
import { AdminHeader } from "@/modules/admin/components";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const cookieStore = await cookies();

  const sessionLimit = cookieStore.get("admin_session_limit");
  
  if (!sessionLimit) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <AdminHeader />

      {children}
    </div>
  );
}