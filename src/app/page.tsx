"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Stats {
  kpi: {
    totalPatients: number;
    totalConsultations: number;
    alertesUrgentes: number;
  };
}

export default function Home() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { if (d.kpi) setStats(d); });
  }, []);

  const prenom = (session?.user as any)?.prenom
    || session?.user?.name?.split(" ")[0]
    || "Docteur";

  const heure = new Date().getHours();
  const salutation =
    heure < 12 ? "Bonjour" : heure < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="space-y-8">
      {/* Bannière de bienvenue */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-2xl p-8 text-white">
        <p className="text-gray-300 text-sm mb-1">{salutation},</p>
        <h1 className="text-3xl font-bold mb-2">{prenom}</h1>
        <p className="text-gray-300">
          Bienvenue sur SénSanté
        </p>
      </div>

      {/* KPI réels */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistiques en temps réel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard
            label="Patients enregistrés"
            value={stats?.kpi.totalPatients}
            color="bg-blue-50 border-blue-200 text-blue-700"
          />
          <KpiCard
            label="Consultations totales"
            value={stats?.kpi.totalConsultations}
            color="bg-green-50 border-green-200 text-green-700"
          />
          <KpiCard
            label="Alertes IA actives"
            value={stats?.kpi.alertesUrgentes}
            color="bg-red-50 border-red-200 text-red-700"
          />
        </div>
      </div>

      {/* Raccourcis */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Accès rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Shortcut
            href="/patients"
            title="Patients"
            description="Ajouter ou consulter la liste des patients."
            bg="bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
          />
          <Shortcut
            href="/consultations"
            title="Consultations"
            description="Enregistrer une consultation et obtenir un diagnostic IA."
            bg="bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
          />
          <Shortcut
            href="/dashboard"
            title="Tableau de bord"
            description="Visualiser les statistiques et tendances épidémiques."
            bg="bg-amber-50 hover:bg-amber-100 border-amber-200"
          />
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | undefined;
  color: string;
}) {
  return (
    <div className={`rounded-xl border p-5 ${color}`}>
      <p className="text-3xl font-bold">
        {value !== undefined ? value : "—"}
      </p>
      <p className="text-sm opacity-80 mt-1">{label}</p>
    </div>
  );
}

function Shortcut({
  href,
  title,
  description,
  bg,
}: {
  href: string;
  title: string;
  description: string;
  bg: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl border p-5 flex flex-col gap-2 transition cursor-pointer ${bg}`}
    >
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
