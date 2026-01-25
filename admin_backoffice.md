# Spécifications Détailées du Backoffice Admin - Lumi E-commerce

Ce document fournit une description exhaustive des fonctionnalités et de l'architecture du backoffice d'administration pour la plateforme e-commerce Lumi.

---

## 1. Vue d'Ensemble du Dashboard
Le Dashboard est le centre de contrôle principal. Il affiche des indicateurs de performance clés (KPI) en temps réel.

### Widgets de Statistiques
- **Chiffre d'Affaires (CA)** : Total des ventes sur une période donnée (jour, semaine, mois).
- **Volume de Commandes** : Nombre total de commandes reçues.
- **Panier Moyen** : Valeur moyenne d'une commande.
- **Taux de Conversion** : (Nombre de commandes / Nombre de sessions).
- **Top Produits** : Liste des 5 produits les plus vendus.

### Graphiques Dynamiques
- Évolution des ventes (Ligne).
- Répartition des commandes par statut (Camembert).
- Activité en temps réel (via le tracking Kafka).

---

## 2. Gestion du Catalogue (Produits)
Interface permettant de piloter l'offre commerciale de la boutique.

### Liste des Produits
- Affichage sous forme de tableau avec filtres par catégorie, prix, et état du stock.
- Recherche textuelle rapide (nom, description).
- Indicateur visuel pour les produits en rupture de stock.

### Fiche Produit (Édition/Création)
- **Informations Générales** : Nom, description riche (HTML/Markdown), catégorie.
- **Prix** : Prix unitaire (en FCFA).
- **Inventaire** : Quantité en stock (décrémentation automatique lors des ventes).
- **Médias** : Upload d'images (stockées sur Cloudinary ou S3) avec gestion de l'image principale.
- **Statut** : Activation/Désactivation du produit sur la vitrine.

---

## 3. Gestion des Commandes
Le cœur opérationnel du backoffice.

### Liste des Commandes
- Tri par date de création (plus récent en haut).
- Filtrage par statut : `PENDING`, `CONFIRMED`, `SHIPPED`, `CANCELLED`.
- Affichage du client (Nom ou ID Invité).

### Détails d'une Commande
- **Articles** : Liste des produits achetés, quantités et prix appliqués au moment de l'achat.
- **Total** : Calcul automatique incluant les frais éventuels.
- **Coordonnées Client** : Nom, téléphone (lié à WhatsApp).
- **Historique** : Timeline des changements de statut.

### Actions Admin
- **Changement de Statut** : Passer une commande de "En attente" à "Expédiée".
- **Notifications WhatsApp** : Bouton pour renvoyer manuellement le récapitulatif WhatsApp au vendeur ou au client.
- **Annulation** : Remise en stock automatique des produits en cas d'annulation.

---

## 4. Analyse de l'Audience & Tracking (Analytics)
Exploitation des données collectées via Kafka et le modèle `Event`.

### Rapports d'Activité
- **Parcours Utilisateur** : Visualisation des pages les plus consultées (`PAGE_VIEW`).
- **Abandon de Panier** : Liste des utilisateurs (ou invités) ayant ajouté au panier (`ADD_TO_CART`) sans finaliser la commande.
- **Mots-clés Recherchés** : Suivi des recherches effectuées par les clients pour ajuster le catalogue.

### Intégration Kafka
- Flux de données en temps réel permettant de voir qui est sur le site et quelles actions sont effectuées instantanément.

---

## 5. Gestion des Utilisateurs
- Liste des clients inscrits avec leur historique d'achat.
- Gestion des rôles : Possibilité de promouvoir un utilisateur au rang d'**ADMIN**.
- Réinitialisation de mot de passe.

---

## 6. Configuration de la Boutique
- **Paramètres Généraux** : Nom de la boutique, adresse de contact, lien WhatsApp Business.
- **Catégories** : Gestion de l'arborescence des catégories (Ajout, suppression, icônes).
- **API Keys** : Gestion des clés de services tiers (Vercel, Kafka, WhatsApp API).

---

## 7. Architecture Technique (Rappel)
- **Backend** : Node.js / Express / Prisma (PostgreSQL).
- **Messagerie** : Kafka pour le tracking d'événements.
- **Sécurité** : JWT (JSON Web Token) avec persistance sécurisée.
- **Frontend Admin** : React avec Tailwind CSS pour un design responsive et moderne (Glassmorphism possible pour correspondre à la charte Lumi).

---

## 8. UX/UI - Design Principes
- **Mode Sombre Natif** : Pour un confort de travail prolongé.
- **Réactivité** : Layout optimisé pour une utilisation sur tablette et mobile lors des déplacements.
- **Feedback Immédiat** : Toasts et indicateurs de chargement sur chaque action CRUD.
- **Animations** : Utilisation de Framer Motion pour des transitions fluides entre les pages.
