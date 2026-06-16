import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/admin"
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="Vira Lata Club"
              width={50}
              height={50}
              className="rounded-full"
            />

            <h1 className="text-2xl font-extrabold">
              <span className="text-[#0f4fb6]">
                VIRA LATA
              </span>{" "}
              <span className="text-[#f58220]">
                CLUB
              </span>
            </h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-medium text-slate-600 hover:text-[#0f4fb6]"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/animals"
              className="font-medium text-slate-600 hover:text-[#0f4fb6]"
            >
              Animais
            </Link>

            <Link
              href="/"
              target="_blank"
              className="
                rounded-xl
                bg-[#f58220]
                px-4
                py-2
                font-semibold
                text-white
              "
            >
              Ver Site
            </Link>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}