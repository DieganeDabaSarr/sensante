#  Plan Auth — Lab NextAuth (SénSanté)

##  Objectif
Mettre en place un système complet d’authentification :
- Inscription
- Connexion
- Sessions (JWT)
- Rôles (AGENT, MEDECIN, ADMIN)
- Protection des pages et API

---

## Comprendre le flux
1. Formulaire login (email + mot de passe)
2. Vérification avec NextAuth + BDD
3. Création session (JWT)
4. Accès aux pages protégées
5. Vérification du rôle

---

##  Installer les dépendances
```bash
npm install next-auth bcrypt
npm install --save-dev @types/bcrypt
