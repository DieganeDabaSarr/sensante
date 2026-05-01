# Test de l'authentification - SénSanté

**Auteur :** Le Pilote
**Date :** [date du jour]

## Comptes de test créés

| Rôle | Email | Mot de passe | Statut |
|------|-------|--------------|--------|
| AGENT | agent@sensante.sn | password123 | ✅ fonctionnel |
| MEDECIN | medecin@sensante.sn | password123 | ✅ fonctionnel |
| ADMIN | admin@sensante.sn | password123 | ✅ fonctionnel |

## Tests effectués

### Inscription (/register)
- [x] Formulaire d'inscription accessible
- [x] Création d'un compte avec email unique
- [x] Redirection vers /login après succès
- [x] Message d'erreur si email déjà utilisé

### Connexion (/login)
- [x] Connexion avec credentials corrects → redirection /patients
- [x] Connexion avec mauvais mot de passe → message d'erreur
- [x] Connexion avec email inexistant → message d'erreur

### Header
- [x] Nom de l'utilisateur affiché quand connecté
- [x] Bouton "Se connecter" quand déconnecté
- [x] Bouton "Déconnexion" quand connecté

### Protection des pages
- [x] Accès à /patients uniquement si connecté
- [x] Redirection vers /login si non connecté

## Problèmes rencontrés

| Problème | Solution |
|----------|----------|
| (à compléter) | (à compléter) |

## Conclusion

L'authentification fonctionne correctement. Les comptes de test sont opérationnels.
