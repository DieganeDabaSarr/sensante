import PatientCard from "@/components/PatientCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        SénSanté
      </h1>
      <p className="text-gray-600 mb-8">
        Assistant de santé communautaire avec IA
      </p>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Membres de l'équipe
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PatientCard nom="Mariama Djiba" fonction="Gardien" groupe={3} sexe="F" />
        <PatientCard nom="Mouhamed Diatta" fonction="Médecin" groupe={3} sexe="M" />
        <PatientCard nom="Emilie Seck" fonction="Pilote" groupe={3} sexe="F" />
      </div>
    </main>
   );
}
