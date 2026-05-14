interface PatientCardProps {
  nom: string;
  region: string;
  age: number;
  sexe: "M" | "F";
}

export default function PatientCard({ nom, region, age, sexe }: PatientCardProps) {
  const badgeColor = sexe === "F"
    ? "bg-pink-100 text-pink-700"
    : "bg-sky-100 text-sky-700";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sky-500">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">
          {nom}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>
          {sexe === "F" ? "Femme" : "Homme"}
        </span>
      </div>
      <p className="text-gray-600 mt-1">
        {region} - {age} ans
      </p>
    </div>
  );
}
