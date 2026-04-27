# Plan du Dashboard - SénSanté

**Auteur :** Le Pilote
**Date :** Avril 2026

## Objectif
Le dashboard est la page d'accueil de l'application. Il doit donner une vue d'ensemble rapide de l'activité et alerter sur les situations critiques.

## Métriques proposées

### 1. Indicateurs clés (cartes StatCard)
| Métrique | Source de données | Rafraîchissement |
|----------|-------------------|-------------------|
| Nombre total de patients | Table `Patient` | À chaque chargement |
| Consultations aujourd'hui | Table `Consultation` (date = aujourd'hui) | En temps réel |
| Alertes IA urgentes | Table `Consultation` avec `statut = "urgent"` | À chaque chargement |
| Agents actifs | Table `User` avec `role = "AGENT"` | À chaque connexion |

### 2. Graphiques envisagés
- **Évolution des patients** : courbe des inscriptions par mois (derniers 12 mois)
- **Répartition par région** : diagramme circulaire ou barres
- **Consultations par statut** : proportion `en_attente` / `terminé`

### 3. Alertes et notifications
- Dernières alertes IA non traitées (avec lien direct vers la consultation)
- Patients sans consultation depuis plus de 6 mois

### 4. Composition de la page
┌──────────────────────────────────────────────────┐
│ En-tête : Tableau de bord │
├──────────────────────────────────────────────────┤
│ [Carte 1] [Carte 2] [Carte 3] [Carte 4] │
├──────────────────────────────────────────────────┤
│ Dernières alertes IA Consultations récentes│
├──────────────────────────────────────────────────┤
│ Graphique : Évolution des patients │
├──────────────────────────────────────────────────┤
│ Graphique : Répartition par région │
└──────────────────────────────────────────────────┘


## 5. Endpoints API nécessaires

| Endpoint | Méthode | Retourne |
|----------|---------|----------|
| `/api/dashboard/stats` | GET | { totalPatients, consultationsJour, alertesUrgentes, agentsActifs } |
| `/api/dashboard/evolution` | GET | [{ mois, total }] |
| `/api/dashboard/repartition` | GET | [{ region, nombre }] |
| `/api/dashboard/alertes` | GET | [ { patient, diagnostic, confiance } ] |

## 6. Composants à réutiliser

- `StatCard` → pour les 4 métriques
- `AlerteIA` → pour la liste des alertes
- `ConsultationCard` → pour les consultations récentes

## 7. Priorités

1. Métriques clés (4 cartes)
2. Liste des dernières alertes
3. Graphiques (lab dédié plus tard)
