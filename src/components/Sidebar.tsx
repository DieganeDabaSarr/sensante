"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const liens = [
  { nom: "Accueil", href: "/", icone: "H" },
  { nom: "Patients", href: "/patients", icone: "P" },
  { nom: "Consultations", href: "/consultations", icone: "C" },
  { nom: "Dashboard", href: "/dashboard", icone: "D" },
  { nom: "Profil", href: "/profil", icone: "U" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-teal-800 text-white min-h-screen p-4">
      <nav className="space-y-2 mt-4">
        {liens.map((lien) => {
          const actif = pathname === lien.href;
          return (
            <Link
              key={lien.href}
              href={lien.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                actif ? "bg-teal-600 font-bold" : "hover:bg-teal-700"
              }`}
            >
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-sm">
                {lien.icone}
              </span>
              {lien.nom}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}