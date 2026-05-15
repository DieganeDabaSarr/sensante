# SénSanté

Assistant de santé communautaire avec IA.

## Stack technique
- Next.js 14 (App Router)
- Tailwind CSS
- Prisma + PostgreSQL
- Groq API (Llama 3)
- NextAuth.js
- Docker Compose

## Installation
```bash
npm install
cp .env.example .env
npx prisma db push
npm run dev
```
##  Authentification

Ce projet utilise **NextAuth.js** pour gérer l'authentification des utilisateurs.

---

### Installation des dépendances

```bash
npm install next-auth bcrypt
npm install --save-dev @types/bcrypt
```

---

### Configuration des variables d'environnement

Copie le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

Ensuite remplis les variables dans ton fichier `.env` :

```env
NEXTAUTH_SECRET="ton-secret-genere-avec-openssl"
NEXTAUTH_URL="http://localhost:3000"
```
### Générer un secret aléatoire

En production, le secret doit être aléatoire. Génère-en un avec :

```bash
openssl rand -base64 32
```

Colle le résultat dans `NEXTAUTH_SECRET`.

## Version finale v1.0

### Prérequis
- Docker Desktop installé

### Lancer l'application
```bash
docker compose up --build
docker compose exec app npx prisma db push

## Équipe
Licence 3 GLSI - ESP/UCAD - 2025-2026
