"use client";

import { logout } from "@/modules/auth/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminHeader() {
  const pathname = usePathname();

  const isDashboard = pathname === "/admin";

  const isAnimals =
    pathname?.startsWith("/admin/animals");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-wrap
          items-center
          justify-between
          gap-3
          px-4
          py-3
          md:h-20
          md:flex-nowrap
          md:px-6
        "
      >
        {/* ESQUERDA */}

        <div className="flex items-center gap-6">
          <button
            onClick={() => window.history.back()}
            className="
              text-sm
              font-medium
              text-slate-500
              transition
              hover:text-[#0f4fb6]
            "
          >
            <span className="md:hidden">←</span>

              <span className="hidden md:inline">
                ← Voltar
              </span>
            </button>
          <Link
            href="/admin"
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="Vira Lata Club"
              width={52}
              height={52}
              className="h-10 w-10 rounded-full md:h-[52px] md:w-[52px]"
            />

            <div>
              <h1 className="text-lg font-extrabold leading-none md:text-2xl">
                <span className="text-[#0f4fb6]">
                  VIRA LATA
                </span>{" "}
                <span className="text-[#f58220]">
                  CLUB
                </span>
              </h1>

              <p className="hidden text-xs text-slate-400 md:block">
                Painel Administrativo
              </p>
            </div>
          </Link>
        </div>

        {/* CENTRO */}

        <nav className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admin"
            className={`
              rounded-xl
              px-4
              py-2
              font-semibold
              transition
              ${
                isDashboard
                  ? "bg-blue-50 text-[#0f4fb6]"
                  : "text-slate-600 hover:bg-blue-50 hover:text-[#0f4fb6]"
              }
            `}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/animals"
            className={`
              rounded-xl
              px-4
              py-2
              font-semibold
              transition
              ${
                isAnimals
                  ? "bg-orange-50 text-[#f58220]"
                  : "text-slate-600 hover:bg-orange-50 hover:text-[#f58220]"
              }
            `}
          >
            Animais
          </Link>
        </nav>

        {/* DIREITA */}

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="
              rounded-xl
              bg-[#f58220]
              px-5
              py-2.5
              font-semibold
              text-white
              transition
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            Ver Site
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="
                rounded-xl
                border
                border-red-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}