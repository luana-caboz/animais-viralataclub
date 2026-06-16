import Link from "next/link";

<nav className="flex items-center gap-8">
  <Link href="/admin">
    Dashboard
  </Link>

  <Link href="/admin/animals">
    Animais
  </Link>

  <Link href="/">
    Ver Site
  </Link>
</nav>