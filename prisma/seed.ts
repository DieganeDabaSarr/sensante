import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = 1;

  const patients = await prisma.patient.createMany({
    data: [
      { nom: "Diallo", prenom: "Aissatou", dateNaissance: new Date("1990-03-15"), sexe: "F", region: "Dakar", telephone: "771234501" },
      { nom: "Ndiaye", prenom: "Ousmane", dateNaissance: new Date("1978-07-22"), sexe: "M", region: "Saint-Louis", telephone: "772345602" },
      { nom: "Sow", prenom: "Mariama", dateNaissance: new Date("2005-01-10"), sexe: "F", region: "Ziguinchor", telephone: "773456703" },
      { nom: "Ba", prenom: "Amadou", dateNaissance: new Date("1965-11-30"), sexe: "M", region: "Kaolack", telephone: "774567804" },
      { nom: "Fall", prenom: "Rokhaya", dateNaissance: new Date("1995-06-08"), sexe: "F", region: "Louga", telephone: "775678905" },
      { nom: "Cissé", prenom: "Mamadou", dateNaissance: new Date("1988-09-17"), sexe: "M", region: "Kolda", telephone: "776789006" },
      { nom: "Gaye", prenom: "Fatou", dateNaissance: new Date("2000-04-25"), sexe: "F", region: "Diourbel", telephone: "777890107" },
      { nom: "Sarr", prenom: "Ibou", dateNaissance: new Date("1972-12-03"), sexe: "M", region: "Kédougou", telephone: "778901208" },
    ],
    skipDuplicates: true,
  });

  const allPatients = await prisma.patient.findMany({
    where: {
      nom: { in: ["Diallo", "Ndiaye", "Sow", "Ba", "Fall", "Cissé", "Gaye", "Sarr", "Faye", "Mbaye"] },
    },
  });

  const find = (prenom: string) => allPatients.find((p) => p.prenom === prenom)!;

  const consultations = [
    {
      patientId: find("Aissatou")?.id,
      date: new Date("2026-01-12"),
      symptoms: ["fièvre", "frissons", "maux de tête", "fatigue"],
      diagnosticIa: "Suspicion de paludisme simple. La combinaison fièvre, frissons et maux de tête est très évocatrice. Une dengue ne peut être exclue.",
      confiance: 82,
      urgence: "urgent",
      recommandation: "Réaliser un TDR paludisme immédiatement. Si positif, traitement à l'artémisinine selon protocole national.",
      statut: "termine",
      notes: "Patiente revenue de zone forestière.",
    },
    {
      patientId: find("Ousmane")?.id,
      date: new Date("2026-01-28"),
      symptoms: ["toux chronique", "sueurs nocturnes", "perte de poids", "fatigue"],
      diagnosticIa: "Suspicion de tuberculose pulmonaire. Les symptômes persistants dépassant 2 semaines avec sueurs nocturnes et amaigrissement sont caractéristiques.",
      confiance: 78,
      urgence: "urgent",
      recommandation: "Référer immédiatement au centre de santé de district pour examen BAAR des crachats et radiographie thoracique.",
      statut: "termine",
      notes: "Toux depuis plus de 3 semaines.",
    },
    {
      patientId: find("Mariama")?.id,
      date: new Date("2026-02-05"),
      symptoms: ["diarrhée", "vomissements", "douleur abdominale", "fièvre légère"],
      diagnosticIa: "Gastro-entérite aiguë probable. Symptômes digestifs typiques sans signe de gravité immédiat. Une typhoïde doit être surveillée si fièvre persiste.",
      confiance: 70,
      urgence: "moyen",
      recommandation: "Réhydratation orale intensive. Surveiller les selles pendant 48h. Si fièvre > 38.5°C persistante, référer pour bilan sanguin.",
      statut: "termine",
      notes: null,
    },
    {
      patientId: find("Amadou")?.id,
      date: new Date("2026-02-18"),
      symptoms: ["douleur thoracique", "essoufflement", "toux"],
      diagnosticIa: "Infection respiratoire basse probable. Les symptômes évoquent une pneumonie ou bronchite. Risque accru chez patient de 60 ans.",
      confiance: 65,
      urgence: "urgent",
      recommandation: "Ausculter les poumons. Référer en urgence au médecin si crépitements présents ou saturation < 95%. Antibiothérapie à envisager.",
      statut: "termine",
      notes: "Patient âgé, antécédents respiratoires.",
    },
    {
      patientId: find("Rokhaya")?.id,
      date: new Date("2026-02-25"),
      symptoms: ["fatigue", "vertiges", "essoufflement à l'effort", "pâleur"],
      diagnosticIa: "Anémie probable. La triade fatigue-vertiges-essoufflement avec pâleur cutanée est hautement évocatrice d'une anémie, fréquente chez la femme en âge de procréer.",
      confiance: 75,
      urgence: "moyen",
      recommandation: "Réaliser un test d'hémoglobine (HemoCue si disponible). Si Hb < 10g/dL, supplémentation en fer et acide folique immédiate.",
      statut: "termine",
      notes: null,
    },
    {
      patientId: find("Mamadou")?.id,
      date: new Date("2026-03-08"),
      symptoms: ["fièvre brutale", "douleurs articulaires", "éruption cutanée", "maux de tête"],
      diagnosticIa: "Suspicion de dengue. La fièvre brutale associée à des arthralgies intenses et une éruption cutanée est le tableau classique de la dengue.",
      confiance: 80,
      urgence: "urgent",
      recommandation: "Isoler le patient des moustiques. Paracétamol uniquement (pas d'aspirine). Référer pour numération plaquettaire en urgence.",
      statut: "termine",
      notes: "Zone à risque dengue confirmée.",
    },
    {
      patientId: find("Fatou")?.id,
      date: new Date("2026-03-20"),
      symptoms: ["fièvre progressive", "douleur abdominale", "constipation", "maux de tête"],
      diagnosticIa: "Suspicion de fièvre typhoïde. La fièvre progressive en plateau avec douleurs abdominales et ralentissement du transit est caractéristique.",
      confiance: 72,
      urgence: "moyen",
      recommandation: "Prélèvement pour hémoculture si possible. Traitement empirique à l'azithromycine selon protocole. Surveillance hydrique stricte.",
      statut: "termine",
      notes: null,
    },
    {
      patientId: find("Ibou")?.id,
      date: new Date("2026-04-03"),
      symptoms: ["maux de tête intenses", "fièvre élevée", "raideur de la nuque", "vomissements"],
      diagnosticIa: "ALERTE : Suspicion de méningite bactérienne. La triade maux de tête intenses, fièvre et raideur de nuque constitue une urgence médicale absolue.",
      confiance: 90,
      urgence: "urgent",
      recommandation: "ÉVACUATION IMMÉDIATE vers l'hôpital le plus proche. Ne pas attendre. Contacter le médecin de district maintenant.",
      statut: "termine",
      notes: "Patient transféré en urgence.",
    },
    {
      patientId: find("Aissatou")?.id,
      date: new Date("2026-04-15"),
      symptoms: ["toux légère", "rhume", "fatigue légère"],
      diagnosticIa: "Infection respiratoire haute bénigne probable. Tableau clinique d'un simple rhume sans signe de gravité.",
      confiance: 85,
      urgence: "faible",
      recommandation: "Repos, hydratation abondante, paracétamol si fièvre. Consulter si symptômes persistent plus de 7 jours.",
      statut: "termine",
      notes: null,
    },
    {
      patientId: find("Mariama")?.id,
      date: new Date("2026-04-28"),
      symptoms: ["fièvre", "frissons", "sudation", "fatigue intense"],
      diagnosticIa: "Récidive palustre probable. Antécédent de zone à risque et tableau clinique compatible avec paludisme.",
      confiance: 77,
      urgence: "urgent",
      recommandation: "TDR immédiat. Si positif, traitement ACT de première ligne selon poids. Surveillance rapprochée pendant 48h.",
      statut: "termine",
      notes: null,
    },
  ];

  for (const c of consultations) {
    if (!c.patientId) continue;
    await prisma.consultation.create({
      data: {
        patientId: c.patientId,
        userId,
        date: c.date,
        symptoms: c.symptoms,
        diagnosticIa: c.diagnosticIa,
        confiance: c.confiance,
        urgence: c.urgence,
        recommandation: c.recommandation,
        statut: c.statut,
        notes: c.notes,
      },
    });
  }

  console.log(`✓ ${patients.count} patients ajoutés`);
  console.log(`✓ ${consultations.length} consultations créées`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
