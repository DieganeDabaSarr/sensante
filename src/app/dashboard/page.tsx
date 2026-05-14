"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
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
  evolutionUrgences: { mois: string; total: number; urgent: number }[];
  top5Diagnostics: { diagnostic: string; total: number }[];
  dernieresAlertes: {
    id: number;
    patient: string;
    region: string;
    diagnostic: string | null;
    confiance: number | null;
    date: string;
  }[];
  casUrgents: { patient: string; niveau: string; statut: string; region: string }[];
}

const COULEURS_PIE = [
  "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"
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

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>

      {/* Ligne 1 : KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard titre="Patients" valeur={stats.kpi.totalPatients} unite="enregistrés" couleur="border-blue-500" />
        <StatCard titre="Consultations" valeur={stats.kpi.totalConsultations} unite="au total" couleur="border-green-500" />
        <StatCard titre="Diagnostics IA" valeur={stats.kpi.consultationsTerminees} unite="terminés" couleur="border-indigo-500" />
        <StatCard titre="Alertes" valeur={stats.kpi.alertesUrgentes} unite="urgentes" couleur="border-rose-500" />
      </div>

      {/* Ligne 2 : Graphiques (2 colonnes) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Consultations par mois</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.parMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Évolution des urgences</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.evolutionUrgences}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="urgent" stroke="#EF4444" name="Urgent" strokeWidth={2} />
              <Line type="monotone" dataKey="total" stroke="#6B7280" name="Total" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Nombre de consultations urgentes par mois</p>
        </div>
      </div>

      {/* Ligne 3 : Top 5 + Cas urgents (2 colonnes) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Top 5 des diagnostics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.top5Diagnostics} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="diagnostic" />
              <Tooltip />
              <Bar dataKey="total" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Les 5 pathologies les plus détectées par l'IA</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">🚨 Cas urgents non traités</h2>
          {stats.casUrgents.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun cas urgent pour le moment.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Patient</th>
                    <th className="text-left py-2">Région</th>
                    <th className="text-left py-2">Niveau</th>
                    <th className="text-left py-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.casUrgents.map((c, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{c.patient}</td>
                      <td className="py-2 text-gray-500">{c.region}</td>
                      <td className="py-2"><span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">{c.niveau}</span></td>
                      <td className="py-2"><span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">{c.statut}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Ligne 4 : Camembert + Derniers diagnostics (2 colonnes) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Patients par région</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stats.parRegion} dataKey="total" nameKey="region" cx="50%" cy="50%" outerRadius={90} label>
                {stats.parRegion.map((_, i) => (
                  <Cell key={i} fill={COULEURS_PIE[i % COULEURS_PIE.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Derniers diagnostics IA</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {stats.dernieresAlertes.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800">{a.patient}</p>
                  <p className="text-sm text-gray-500">{a.region} — {new Date(a.date).toLocaleDateString("fr-FR")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">{a.diagnostic ? a.diagnostic.substring(0, 40) + "..." : "En attente"}</p>
                  <p className="text-xs text-gray-500">Confiance : {a.confiance}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

