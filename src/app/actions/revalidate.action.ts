"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/modules/auth/services/admin-session.service";

export async function revalidatePathAction() {
    await requireAdmin();

    revalidatePath("/");
    revalidatePath("/admin");
}
