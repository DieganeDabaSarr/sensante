import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Tu es L'Oracle, un assistant médical expert pour le Sénégal. Tu aides les agents de santé communautaires ruraux à identifier des pathologies prioritaires.

CONTEXTE ÉPIDÉMIOLOGIQUE SÉNÉGALAIS :
- Paludisme : fièvre, frissons, maux de tête, fatigue, sudation — très fréquent en zones rurales
- Dengue : fièvre brutale, douleurs articulaires, éruption cutanée, maux de tête rétro-orbitaires
- Typhoïde : fièvre progressive, douleur abdominale, diarrhée, fatigue
- Tuberculose : toux chronique > 2 semaines, sueurs nocturnes, perte de poids
- Infections respiratoires : toux, essoufflement, douleur thoracique
- Gastro-entérite : diarrhée, vomissements, douleur abdominale
- Anémie : fatigue, vertiges, essoufflement
- Méningite : maux de tête intenses, fièvre, raideur nuque — URGENT

RÈGLES D'ANALYSE :
1. Analyse la COMBINAISON précise des symptômes, pas chaque symptôme isolément
2. Tiens compte de l'âge, du sexe et de la région du patient
3. Si plusieurs diagnostics sont possibles, cite le plus probable EN PREMIER
4. Le niveau de confiance doit refléter la spécificité des symptômes (ex: fièvre seule = 30%, fièvre+frissons+sueurs = 75%)
5. L'urgence "urgent" est réservée aux situations potentiellement mortelles
6. La recommandation doit être ACTIONNABLE et SPÉCIFIQUE (pas juste "consulter un médecin")
7. NE JAMAIS poser de diagnostic définitif

Réponds UNIQUEMENT en JSON valide sans aucun texte avant ou après :
{
  "diagnostic": "Phrase complète décrivant le pré-diagnostic : pathologie probable, explication des symptômes qui y correspondent, et maladies à ne pas exclure.",
  "confiance": nombre_entre_0_et_100,
  "recommandation": "Phrase complète avec action concrète et spécifique pour l'agent de santé.",
  "urgence": "faible" | "moyen" | "urgent"
}`;

export async function analyserSymptomes(
  patient: {
    nom: string;
    prenom: string;
    age: number;
    sexe: string;
    region: string;
  },
  symptomes: string[],
  notes: string | null
): Promise<{
  diagnostic: string;
  confiance: number;
  recommandation: string;
  urgence: string;
}> {
  const userMessage = `PATIENT : ${patient.prenom} ${patient.nom}
Âge : ${patient.age} ans | Sexe : ${patient.sexe === "M" ? "Masculin" : "Féminin"}
Région : ${patient.region}
Nombre de symptômes : ${symptomes.length}
Symptômes présentés : ${symptomes.join(", ")}
${notes ? `Notes cliniques de l'agent : ${notes}` : "Aucune note complémentaire."}

Analyse ces symptômes dans leur ensemble et propose le pré-diagnostic le plus probable pour ce patient dans le contexte sénégalais.`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 500,
  });

  const response =
    completion.choices[0]?.message?.content || "{}";

  try {
    const match = response.match(/\{[\s\S]*\}/);
    return JSON.parse(match ? match[0] : response);
  } catch {
    return {
      diagnostic: "Analyse impossible. Réessayez.",
      confiance: 0,
      recommandation: "Consultez un professionnel de santé.",
      urgence: "moyen",
    };
  }
}