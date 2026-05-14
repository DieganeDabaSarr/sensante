import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  // KPI principaux
  const totalPatients = await prisma.patient.count();
  const totalConsultations = await prisma.consultation.count();
  const consultationsTerminees = await prisma.consultation.count({
    where: { statut: "termine" },
  });
  const alertesUrgentes = await prisma.consultation.count({
    where: {
      statut: "termine",
      confiance: { gte: 60 },
      diagnosticIa: { not: null },
    },
  });

  // Patients par région
  const parRegion = await prisma.patient.groupBy({
    by: ["region"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  // Consultations par mois (6 derniers mois)
  const sixMoisAgo = new Date();
  sixMoisAgo.setMonth(sixMoisAgo.getMonth() - 6);
  
  const consultationsRecentes = await prisma.consultation.findMany({
    where: { date: { gte: sixMoisAgo } },
    select: { date: true },
  });

  // Grouper par mois côté JS
  const parMois: Record<string, number> = {};
  const moisNoms = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Jun",
    "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc",
  ];

  consultationsRecentes.forEach((c) => {
    const d = new Date(c.date);
    const key = `${moisNoms[d.getMonth()]} ${d.getFullYear()}`;
    parMois[key] = (parMois[key] || 0) + 1;
  });

  // Urgences par mois
  const consultationsUrgentes = await prisma.consultation.findMany({
    where: { date: { gte: sixMoisAgo }, urgence: "urgent" },
    select: { date: true },
  });

  const urgencesParMois: Record<string, number> = {};
  consultationsUrgentes.forEach((c) => {
    const d = new Date(c.date);
    const key = `${moisNoms[d.getMonth()]} ${d.getFullYear()}`;
    urgencesParMois[key] = (urgencesParMois[key] || 0) + 1;
  });

  // Top 5 diagnostics
  const tousLesDiagnostics = await prisma.consultation.findMany({
    where: { diagnosticIa: { not: null } },
    select: { diagnosticIa: true },
  });

  const pathologies: Record<string, number> = {};
  const motsCles = [
    "paludisme", "tuberculose", "dengue", "typhoïde",
    "méningite", "anémie", "gastro-entérite", "respiratoire",
  ];

  tousLesDiagnostics.forEach(({ diagnosticIa }) => {
    const texte = (diagnosticIa || "").toLowerCase();
    motsCles.forEach((mot) => {
      if (texte.includes(mot)) {
        pathologies[mot] = (pathologies[mot] || 0) + 1;
      }
    });
  });

  const topDiagnostics = Object.entries(pathologies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nom, total]) => ({
      nom: nom.charAt(0).toUpperCase() + nom.slice(1),
      total,
    }));

  // Dernières alertes urgentes
  const dernieresAlertes = await prisma.consultation.findMany({
    where: {
      diagnosticIa: { not: null },
    },
    include: { patient: true },
    orderBy: { date: "desc" },
    take: 5,
  });

  return NextResponse.json({
    kpi: {
      totalPatients,
      totalConsultations,
      consultationsTerminees,
      alertesUrgentes,
    },
    parRegion: parRegion.map((r) => ({
      region: r.region,
      total: r._count.id,
    })),
    parMois: Object.entries(parMois).map(([mois, total]) => ({
      mois,
      total,
    })),
    urgencesParMois: Object.entries(urgencesParMois).map(([mois, total]) => ({
      mois,
      total,
    })),
    topDiagnostics,
    dernieresAlertes: dernieresAlertes.map((a) => ({
      id: a.id,
      patient: `${a.patient.prenom} ${a.patient.nom}`,
      region: a.patient.region,
      diagnostic: a.diagnosticIa,
      confiance: a.confiance,
      date: a.date,
    })),
  });
}
