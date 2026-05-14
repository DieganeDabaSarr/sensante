"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

interface Stats {
  kpi: {
    totalPatients: number;
    totalConsultations: number;
    consultationsTerminees: number;
    alertesUrgentes: number;
  };
  parRegion: { region: string; total: number }[];
  parMois: { mois: string; total: number }[];
  urgencesParMois: { mois: string; total: number }[];
  topDiagnostics: { nom: string; total: number }[];
  dernieresAlertes: {
    id: number;
    patient: string;
    region: string;
    diagnostic: string | null;
    confiance: number | null;
    date: string;
  }[];
}

const COULEURS_PIE = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-500">Chargement du dashboard...</p>;
  }

  if (!stats || !stats.kpi) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tableau de bord
      </h1>

      {/* Zone 1 : KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          titre="Patients"
          valeur={stats.kpi.totalPatients}
          unite="enregistrés"
          couleur="border-gray-600"
        />
        <StatCard
          titre="Consultations"
          valeur={stats.kpi.totalConsultations}
          unite="au total"
          couleur="border-gray-600"
        />
        <StatCard
          titre="Diagnostics IA"
          valeur={stats.kpi.consultationsTerminees}
          unite="terminés"
          couleur="border-purple-500"
        />
        <StatCard
          titre="Alertes"
          valeur={stats.kpi.alertesUrgentes}
          unite="urgentes"
          couleur="border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Zone 2 : Graphique barres */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Consultations par mois
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.parMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#E65100" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Zone 3 : Camembert régions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Patients par région
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.parRegion}
                dataKey="total"
                nameKey="region"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {stats.parRegion.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COULEURS_PIE[i % COULEURS_PIE.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone 4 : Évolution urgences + Top diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Évolution des urgences
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.urgencesParMois ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Top 5 des diagnostics IA
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.topDiagnostics ?? []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="nom" width={100} />
              <Tooltip />
              <Bar dataKey="total" fill="#7C3AED" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone 5 : Dernières alertes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Derniers diagnostics IA
        </h2>
        <div className="space-y-3">
          {stats.dernieresAlertes.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
            >
              <div>
                <p className="font-semibold text-gray-800">{a.patient}</p>
                <p className="text-sm text-gray-500">
                  {a.region} — {new Date(a.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-700">
                  {a.diagnostic
                    ? a.diagnostic.length > 60
                      ? a.diagnostic.substring(0, 60) + "..."
                      : a.diagnostic
                    : "En attente"}
                </p>
                <p className="text-xs text-gray-500">
                  Confiance : {a.confiance}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
