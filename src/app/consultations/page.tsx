// src/app/consultations/page.tsx
import ConsultationCard from "@/components/ConsultationCard";

const consultations = [
  {
    patient: "Aminata Sow",
    date: "18 mars 2025",
    symptomes: "Fièvre, toux, fatigue persistante",
    statut: "termine" as const,
  },
  {
    patient: "Ibrahima Ba",
    date: "19 mars 2025",
    symptomes: "Maux de tête, vertiges",
    statut: "en_attente" as const,
  },
  {
    patient: "Awa Diallo",
    date: "20 mars 2025",
    symptomes: "Douleurs abdominales, nausées",
    statut: "en_attente" as const,
  },
  {
    patient: "Moussa Ndiaye",
    date: "21 mars 2025",
    symptomes: "Toux sèche, difficultés respiratoires",
    statut: "termine" as const,
  },
];

export default function ConsultationsPage() {
  const terminees = consultations.filter((c) => c.statut === "termine").length;
  const enAttente = consultations.filter((c) => c.statut === "en_attente").length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Consultations</h1>
        <p className="text-gray-500 mt-1">Suivi des consultations médicales</p>
      </div>

      {/* Résumé rapide */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-teal-700">{terminees}</p>
          <p className="text-sm text-teal-600 mt-1">Terminées</p>
        </div>
        <div className="flex-1 bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{enAttente}</p>
          <p className="text-sm text-orange-500 mt-1">En attente</p>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-700">{consultations.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
      </div>

      {/* Liste des consultations */}
      <div className="space-y-4">
        {consultations.map((c, i) => (
          <ConsultationCard key={i} {...c} />
        ))}
      </div>
    </div>
  );
}
