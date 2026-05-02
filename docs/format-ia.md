# Format des données — Préparation Lab IA (v0.5)

> Ce document décrit comment les symptômes sont stockés dans la base de données

---

## Modèle Consultation — champs liés à l'IA

| Champ | Type | Description |
|---|---|---|
| `symptomes` | JSON | Tableau de symptômes saisis par l'agent |
| `diagnosticIa` | String (nullable) | Pré-diagnostic retourné par Groq — vide jusqu'au Lab IA |
| `confiance` | Float (nullable) | Pourcentage de confiance du diagnostic — vide jusqu'au Lab IA |
| `statut` | String | `en_attente` jusqu'à ce que l'IA réponde, puis `termine` |

---

## Format JSON d'une consultation complète

Voici un exemple de ce que retourne `GET /api/consultations` après le Lab v0.4 :

\```json
{
  "id": 1,
  "date": "2025-10-14T10:30:00.000Z",
  "symptomes": ["Fièvre", "Toux", "Fatigue"],
  "diagnosticIa": null,
  "confiance": null,
  "statut": "en_attente",
  "notes": "Patient se plaint de fièvre depuis 3 jours",
  "patientId": 3,
  "userId": 2,
  "patient": {
    "id": 3,
    "nom": "Sow",
    "prenom": "Aminata",
    "region": "Dakar"
  }
}
\```

---

## Liste des symptômes disponibles

\```ts
const SYMPTOMES_DISPONIBLES = [
  "Fièvre", "Toux", "Maux de tête",
  "Fatigue", "Diarrhée", "Vomissements",
  "Douleur abdominale", "Éruption cutanée",
  "Frissons", "Douleur thoracique",
  "Essoufflement", "Vertiges",
];
\```

---

## Ce que `src/lib/groq.ts` devra faire (Lab IA — v0.5)

1. Recevoir le tableau `symptomes` d'une consultation
2. Construire un prompt pour l'API Groq (Llama 3)
3. Envoyer la requête à Groq
4. Retourner `diagnosticIa` et `confiance`

### Exemple d'appel prévu

\```ts
const resultat = await analyserSymptomes(["Fièvre", "Toux", "Fatigue"]);
// { diagnosticIa: "Paludisme probable", confiance: 87 }
\```

### Exemple de prompt envoyé à Groq

\```
Tu es un assistant médical de pré-diagnostic.
Un agent de santé a relevé les symptômes suivants : Fièvre, Toux, Fatigue.
Propose un pré-diagnostic et un pourcentage de confiance.
Réponds uniquement en JSON : { "diagnostic": "...", "confiance": 85 }
\```

---

## Flux complet prévu après le Lab IA (v0.5)

\```
Agent coche les symptômes
        ↓
POST /api/consultations — symptomes stockés en JSON
        ↓
src/lib/groq.ts — envoi à Groq (Llama 3)
        ↓
Groq retourne diagnosticIa + confiance
        ↓
statut passe à "termine"
        ↓
Page consultations affiche le diagnostic
\```

---