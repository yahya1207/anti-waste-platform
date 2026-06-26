# Cahier des Charges - Plateforme Anti-Gaspillage Alimentaire

## 1. Présentation du Projet
L'objectif de ce projet est de développer une plateforme web de mise en relation (Marketplace) entre des professionnels des métiers de bouche ayant des invendus alimentaires et des utilisateurs finaux souhaitant les acheter à prix réduit.

### 1.1 Typologie des Commerces Cibles
* **Restaurants :** Plats du jour non vendus en fin de service (midi/soir).
* **Pâtisseries / Boulangeries :** Viennoiseries, pains et gâteaux du jour.
* **Hôtels :** Surplus des buffets de petits-déjeuners ou d'événements.
* **Rayons Frais :** Produits de supermarchés proches de leur date limite de consommation (DLC).

---

## 2. Spécifications Fonctionnelles

L'application est découpée en 3 modules principaux :

### 2.1 Module Utilisateur Final (Client)
* **Recherche & Géolocalisation :** Visualisation des commerces partenaires autour de soi via une liste dynamique et une carte interactive. Filtres par type de commerce et régime alimentaire.
* **Réservation d'un Panier :** Sélection d'un panier d'invendus, affichage du prix d'origine vs prix cassé, et validation.
* **Code de Retrait :** Génération d'un code unique sécurisé (ex: `RET-5912`) une fois le panier réservé, avec affichage des horaires de collecte.
* **Indicateurs d'Impact :** Compteur personnel d'argent économisé et d'équivalent $CO_2$ évité.

### 2.2 Module Commerce (Partenaire)
* **Gestion des Offres :** Formulaire rapide de mise en ligne d'un lot d'invendus (Titre, description, quantité disponible, prix d'origine, prix réduit, créneau horaire de récupération).
* **Validation des Retraits :** Interface simplifiée permettant de saisir le code client pour marquer le panier comme "Récupéré".
* **Suivi des Performances :** Tableau de bord affichant le chiffre d'affaires sauvé et le volume de nourriture revalorisé.

### 2.3 Module Administrateur (Gestion globale)
* Modération, validation ou suspension des fiches commerces.
* Suivi du volume global de transactions.

---

## 3. Modèle de Données (Schéma Relationnel)

Voici les quatre entités principales qui composeront la base de données :

* **`Users`** : `id`, `email`, `password_hash`, `role` (client / commerce / admin), `created_at`
* **`Businesses`** : `id`, `user_id` (FK), `name`, `type` (restaurant, patisserie, etc.), `address`, `latitude`, `longitude`, `pickup_instructions`
* **`Offers`** : `id`, `business_id` (FK), `title`, `description`, `original_price`, `discounted_price`, `quantity_available`, `pickup_start`, `pickup_end`, `status` (active / sold_out / expired)
* **`Reservations`** : `id`, `user_id` (FK), `offer_id` (FK), `quantity`, `secure_code`, `status` (pending / collected / cancelled), `created_at`

---

## 4. Parcours Utilisateur Critique (User Story)

1.  **Mise en ligne :** Une pâtisserie publie 4 paniers de "Viennoiseries du jour" à 4€ au lieu de 12€, à récupérer entre 18h30 et 19h00.
2.  **Réservation :** Un client situé à 500m voit l'offre sur son écran, clique sur "Réserver". La quantité disponible de l'offre passe instantanément de 4 à 3.
3.  **Collecte :** Le client se présente à 18h45 à la pâtisserie et présente son code `RET-1234`. Le commerçant valide le code sur son interface : la réservation passe au statut `collected`.

---

## 5. Spécifications Techniques (Stack par Défaut)

Pour maximiser la vitesse d'itération en **Vibe Coding** et limiter les conflits d'architecture (erreurs CORS, synchronisation d'API complexes), le projet s'appuie sur la **Stack Monolithe par défaut** recommandée.

| Composant | Technologie | Rôle dans le Projet |
| :--- | :--- | :--- |
| **Backend / Environnement** | **Node.js** | Moteur d'exécution côté serveur, idéal pour la rapidité d'exécution de scripts JavaScript. |
| **Framework Backend** | **Express.js** | Gestion du routage (pages web, API de réservation) et de la logique métier dans une structure centralisée. |
| **Base de Données** | **SQLite** | Base de données relationnelle embarquée (fichier unique). Évite la configuration d'un serveur tiers (Postgres/MySQL) pour le MVP et facilite le travail de l'IA. |
| **Interface / Frontend** | **HTML / Vanilla JS** | Rendu des pages côté serveur ou dynamisation légère. Moins de fichiers à gérer pour l'IA et évite l'éparpillage des contextes. |
| **Design / Framework CSS** | **TailwindCSS** | Permet de designer l'interface des paniers et des profils en écrivant les classes directement dans le code HTML. Rapidité de prototypage maximale. |

### 🛠️ Recommandation pour le Prompt de départ avec Copilot / Cursor :
> *"Nous allons coder un MVP de plateforme anti-gaspillage alimentaire. Nous utilisons la stack par défaut : un monolithe Node.js avec Express.js, une base de données SQLite, et du HTML/JS classique stylisé avec TailwindCSS. Garde le code modulaire mais simple, sans framework frontend externe."*