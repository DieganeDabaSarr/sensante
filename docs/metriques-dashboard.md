# Métriques du Dashboard - SénSanté

**Auteur :** Le Pilote
**Date :** [date du jour]

## Métriques liées à l'IA

| Métrique | Description | Source de données |
|----------|-------------|-------------------|
| Nombre total de diagnostics IA | Comptage des consultations avec diagnostic terminé | Table `Consultation` |
| Taux d'urgence | Proportion de diagnostics classés "urgent" | Champ `urgence` (ou niveau de confiance bas) |
| Diagnostics par région | Répartition des diagnostics par région du patient | Jointure `Consultation` + `Patient` |
| Confiance moyenne | Moyenne des scores de confiance des diagnostics | Champ `confiance` |

## Graphiques proposés

- Évolution des diagnostics IA dans le temps (par jour/semaine/mois)
- Répartition des niveaux d'urgence (faible / moyen / urgent) sous forme de camembert
- Top 5 des pathologies détectées (si exploitable via le diagnostic textuel)

## Indicateurs complémentaires

- Temps moyen d'obtention d'un diagnostic (performance API)
- Nombre de diagnostics en attente (consultations sans IA encore lancée)

## Remarques

Le disclaimer médical doit toujours accompagner l'affichage des résultats IA.
