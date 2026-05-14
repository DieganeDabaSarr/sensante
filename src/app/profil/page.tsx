"use client";

import { useSession } from "next-auth/react";

export default function ProfilPage() {
  const { data: session } = useSession();

  if (!session) return <p className="text-gray-500">Chargement...</p>;

  const role = (session.user as any)?.role;
  const roleLabel =
    role === "ADMIN" ? "Administrateur"
    : role === "MEDECIN" ? "Médecin"
    : "Agent de santé";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon profil</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {session.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{session.user?.name}</p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Nom complet</span>
            <span className="font-medium text-gray-800">{session.user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800">{session.user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Rôle</span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
              role === "ADMIN" ? "bg-red-100 text-red-700"
              : role === "MEDECIN" ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
            }`}>
              {roleLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
