"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default function LoginPage() {
  const [state, formAction] =
    useActionState(login, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0f4fb6]">
            VIRA LATA CLUB
          </h1>

          <p className="mt-2 text-slate-500">
            Painel Administrativo
          </p>
        </div>

        {state?.error && (
          <div
            className="
              mb-4
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-3
              text-sm
              text-red-700
            "
          >
            {state.error}
          </div>
        )}

        <form
          action={formAction}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              E-mail
            </label>

            <input
              name="email"
              type="email"
              required
              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                transition
                focus:border-[#0f4fb6]
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Senha
            </label>

            <input
              name="password"
              type="password"
              required
              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                transition
                focus:border-[#0f4fb6]
              "
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton
              text="Entrar"
              loadingText="Entrando..."
            />
          </div>
        </form>
      </div>
    </main>
  );
}