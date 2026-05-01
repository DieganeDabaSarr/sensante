# Plan - Formulaire de Consultation

## Champs du formulaire
- Patient (liste déroulante depuis la BDD)
- Symptômes (checkboxes : Fièvre, Toux, Maux de tête, Fatigue, Diarrhée, Vomissements...)
- Notes / observations (textarea optionnel)

## Format des symptômes
Les symptômes seront stockés en JSON dans PostgreSQL :
["Fièvre", "Toux", "Fatigue"]

## Étapes prévues
1. Créer l'API Route GET + POST `/api/consultations`
2. Créer le composant `ConsultationForm.tsx` avec checkboxes
3. Créer la page `/consultations` dynamique
4. Afficher l'historique des consultations avec badges
