import { prisma } from "@/lib/prisma";
import { analyserSymptomes } from "@/lib/groq";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const { consultationId } = await request.json();

    // Récupérer la consultation avec le patient
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: { patient: true },
    });

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation introuvable" },
        { status: 404 }
      );
    }

    // Calculer l'âge
    const naissance = new Date(
      consultation.patient.dateNaissance
    );
    const age =
      new Date().getFullYear() -
      naissance.getFullYear();

    // Appeler Groq
    const resultat = await analyserSymptomes(
      {
        nom: consultation.patient.nom,
        prenom: consultation.patient.prenom,
        age,
        sexe: consultation.patient.sexe,
        region: consultation.patient.region,
      },
      consultation.symptoms as string[],
      consultation.notes
    );

    // Mettre à jour la consultation
    const updated = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        diagnosticIa: resultat.diagnostic,
        confiance: resultat.confiance,
        statut: "termine",
      },
      include: { patient: true },
    });

    return NextResponse.json({
      ...resultat,
      consultation: updated,
    });
  } catch (error) {
  console.error("ERREUR IA:", error);
  return NextResponse.json(
    { error: "Erreur lors de l'analyse IA", details: String(error) },
    { status: 500 }
  );
}
}