# Lumi API - Backend 🛡️

Le moteur backend de l'écosystème **Lumi**, fournissant une API REST sécurisée et performante.

## ✨ Fonctionnalités

- **Authentification** : Gestion des utilisateurs et sessions via JWT.
- **Gestion Produits** : API complète pour le catalogue de produits.
- **Système de Commandes** : Logique métier pour la création et le suivi des commandes.
- **Gestion Catégories** : Organisation dynamique du catalogue.
- **Base de Données** : Interaction avec PostgreSQL via Prisma ORM.

## 🛠️ Stack Technique

- **Runtime** : Node.js
- **Framework** : Express
- **ORM** : Prisma
- **Base de Données** : PostgreSQL (Neon)
- **Déploiement** : Vercel Serverless

## 🚀 Installation

1. **Dépendances**
   ```sh
   cd lumi-api
   npm install
   ```

2. **Configuration**
   Créez un fichier `.env` :
   ```env
   DATABASE_URL="votre_url_postgresql"
   JWT_SECRET="votre_secret_jwt"
   PORT=3000
   ```

3. **Base de Données**
   Générez le client Prisma :
   ```sh
   npx prisma generate
   ```

4. **Lancement**
   ```sh
   npm start
   ```

## 🛣️ Routes Principales

- `/auth` : Inscription et Connexion
- `/products` : Consultation et modification des produits
- `/orders` : Gestion des commandes
- `/admin` : Statistiques et configurations protégées

---
Powered by **Strive**.
