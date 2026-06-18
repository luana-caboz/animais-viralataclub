import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="
          rounded-xl
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
  );
}