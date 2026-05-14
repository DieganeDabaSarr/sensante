const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const userId = 1;

  await prisma.patient.createMany({
    data: [
      { nom: "Diallo", prenom: "Aissatou", dateNaissance: new Date("1990-03-15"), sexe: "F", region: "Dakar", telephone: "771234501" },
      { nom: "Ndiaye", prenom: "Ousmane", dateNaissance: new Date("1978-07-22"), sexe: "M", region: "Saint-Louis", telephone: "772345602" },
      { nom: "Sow", prenom: "Mariama", dateNaissance: new Date("2005-01-10"), sexe: "F", region: "Ziguinchor", telephone: "773456703" },
      { nom: "Ba", prenom: "Amadou", dateNaissance: new Date("1965-11-30"), sexe: "M", region: "Kaolack", telephone: "774567804" },
      { nom: "Fall", prenom: "Rokhaya", dateNaissance: new Date("1995-06-08"), sexe: "F", region: "Louga", telephone: "775678905" },
      { nom: "Cisse", prenom: "Mamadou", dateNaissance: new Date("1988-09-17"), sexe: "M", region: "Kolda", telephone: "776789006" },
      { nom: "Gaye", prenom: "Fatou", dateNaissance: new Date("2000-04-25"), sexe: "F", region: "Diourbel", telephone: "777890107" },
      { nom: "Sarr", prenom: "Ibou", dateNaissance: new Date("1972-12-03"), sexe: "M", region: "Kedougou", telephone: "778901208" },
    ],
    skipDuplicates: true,
  });

  const allPatients = await prisma.patient.findMany();
  const find = (prenom) => allPatients.find((p) => p.prenom === prenom);

  const consultations = [
    {
      patientId: find("Aissatou")?.id,
      date: new Date("2026-01-12"),
      symptoms: ["fievre", "frissons", "maux de tete", "fatigue"],
      diagnosticIa: "Suspicion de paludisme simple. La combinaison fievre, frissons et maux de tete est tres evocatrice.",
      confiance: 82, urgence: "urgent",
      recommandation: "Realiser un TDR paludisme immediatement.",
      statut: "termine", notes: "Patiente revenue de zone forestiere.",
    },
    {
      patientId: find("Ousmane")?.id,
      date: new Date("2026-01-28"),
      symptoms: ["toux chronique", "sueurs nocturnes", "perte de poids", "fatigue"],
      diagnosticIa: "Suspicion de tuberculose pulmonaire. Les symptomes persistants avec sueurs nocturnes sont caracteristiques.",
      confiance: 78, urgence: "urgent",
      recommandation: "Referer au centre de sante pour examen BAAR.",
      statut: "termine", notes: "Toux depuis plus de 3 semaines.",
    },
    {
      patientId: find("Mariama")?.id,
      date: new Date("2026-02-05"),
      symptoms: ["diarrhee", "vomissements", "douleur abdominale", "fievre legere"],
      diagnosticIa: "Gastro-enterite aigue probable.",
      confiance: 70, urgence: "moyen",
      recommandation: "Rehydratation orale intensive.",
      statut: "termine", notes: null,
    },
    {
      patientId: find("Amadou")?.id,
      date: new Date("2026-02-18"),
      symptoms: ["douleur thoracique", "essoufflement", "toux"],
      diagnosticIa: "Infection respiratoire basse probable.",
      confiance: 65, urgence: "urgent",
      recommandation: "Ausculter les poumons, referer si crepitements.",
      statut: "termine", notes: null,
    },
    {
      patientId: find("Rokhaya")?.id,
      date: new Date("2026-02-25"),
      symptoms: ["fatigue", "vertiges", "essoufflement", "paleur"],
      diagnosticIa: "Anemie probable chez femme en age de procreer.",
      confiance: 75, urgence: "moyen",
      recommandation: "Test hemoglobine, supplementation fer.",
      statut: "termine", notes: null,
    },
    {
      patientId: find("Mamadou")?.id,
      date: new Date("2026-03-08"),
      symptoms: ["fievre brutale", "douleurs articulaires", "eruption cutanee", "maux de tete"],
      diagnosticIa: "Suspicion de dengue. Fievre brutale avec arthralgies et eruption cutanee.",
      confiance: 80, urgence: "urgent",
      recommandation: "Isoler le patient, paracetamol uniquement, NFS en urgence.",
      statut: "termine", notes: null,
    },
    {
      patientId: find("Fatou")?.id,
      date: new Date("2026-03-20"),
      symptoms: ["fievre progressive", "douleur abdominale", "constipation"],
      diagnosticIa: "Suspicion de typhoide. Fievre en plateau avec douleurs abdominales.",
      confiance: 72, urgence: "moyen",
      recommandation: "Hemoculture si possible, azithromycine selon protocole.",
      statut: "termine", notes: null,
    },
    {
      patientId: find("Ibou")?.id,
      date: new Date("2026-04-03"),
      symptoms: ["maux de tete intenses", "fievre elevee", "raideur nuque", "vomissements"],
      diagnosticIa: "Suspicion de meningite bacterienne. Urgence absolue.",
      confiance: 90, urgence: "urgent",
      recommandation: "EVACUATION IMMEDIATE vers hopital.",
      statut: "termine", notes: "Patient transfere en urgence.",
    },
    {
      patientId: find("Aissatou")?.id,
      date: new Date("2026-04-15"),
      symptoms: ["toux legere", "rhume", "fatigue legere"],
      diagnosticIa: "Infection respiratoire haute benigne.",
      confiance: 85, urgence: "faible",
      recommandation: "Repos et hydratation.",
      statut: "termine", notes: null,
    },
    {
      patientId: find("Mariama")?.id,
      date: new Date("2026-04-28"),
      symptoms: ["fievre", "frissons", "sudation", "fatigue intense"],
      diagnosticIa: "Recidive palustre probable. Tableau clinique compatible avec paludisme.",
      confiance: 77, urgence: "urgent",
      recommandation: "TDR immediat, traitement ACT si positif.",
      statut: "termine", notes: null,
    },
  ];

  for (const c of consultations) {
    if (!c.patientId) continue;
    await prisma.consultation.create({ data: { ...c, userId } });
  }

  console.log("Seed termine avec succes !");
}

main().catch(console.error).finally(() => prisma.$disconnect());
