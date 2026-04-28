# Plan IA — Intégration Groq

## Fournisseur : Groq
- Console : https://console.groq.com
- Documentation API : https://console.groq.com/docs
- Compatibilité : API compatible OpenAI

---

## Clé API

> ⚠️ Ne jamais committer la clé en clair. Utiliser une variable d'environnement.

```bash
export GROQ_API_KEY="gsk_..."
```

Ou via un fichier `.env` (ajouté dans `.gitignore`) :

```
GROQ_API_KEY=gsk_...
```

---

## Test curl (validé ✅)

```bash
curl https://api.groq.com/openai/v1/chat/completions -s \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -d '{
    "model": "openai/gpt-oss-120b",
    "messages": [{
      "role": "user",
      "content": "Please briefly explain the importance of fast AI inference."
    }]
  }'
```

### Réponse obtenue (extrait)
- **Modèle :** `openai/gpt-oss-120b`
- **Tokens utilisés :** 350 (81 prompt + 269 completion)
- **Temps total :** ~0.56s
- **Statut :** ✅ Succès

---

## Modèles disponibles sur Groq

| Modèle | Contexte | Usage recommandé |
|--------|----------|------------------|
| `llama3-8b-8192` | 8 192 tokens | Rapide, tâches simples |
| `llama3-70b-8192` | 8 192 tokens | Puissant, raisonnement |
| `mixtral-8x7b-32768` | 32 768 tokens | Contexte long |
| `openai/gpt-oss-120b` | — | Haute performance |

---

## Avantages de Groq

- **Inférence ultra-rapide** grâce aux puces LPU (Language Processing Unit)
- **API compatible OpenAI** — migration facile depuis GPT
- **Gratuit** avec limites généreuses pour les tests
- **Faible latence** pour les applications temps réel

---

## Prochaines étapes

- [ ] Stocker la clé dans `.env` et configurer `.gitignore`
- [ ] Intégrer via SDK Python (`groq`) ou JS (`groq` npm)
- [ ] Comparer les modèles selon le cas d'usage
- [ ] Mettre en place la gestion des erreurs et limites de taux
- [ ] Explorer les endpoints : embeddings, audio (Whisper)
