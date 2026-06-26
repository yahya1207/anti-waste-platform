# Plan de travail - Anti-Waste Platform

## 1. État actuel du projet
- La structure du projet est partiellement définie avec un backend et un frontend séparés.
- Le backend expose déjà une API simple pour gérer des paniers surprise via SQLite.
- Le frontend contient des composants de base et un client API pour consommer les endpoints.
- Le projet est encore à un stade de prototype MVP et nécessite une consolidation des différentes briques techniques.

## 2. Éléments déjà réalisés
- Initialisation du dépôt et organisation du workspace.
- Mise en place d’un backend Node.js/Express avec une API de base.
- Création d’une base SQLite en mémoire avec une table de paniers surprise.
- Ajout de routes pour créer et lister des paniers.
- Mise en place d’un frontend minimal avec une page d’accueil et un client API.
- Définition du périmètre fonctionnel du projet autour de la lutte contre le gaspillage alimentaire.

## 3. Travaux restants à réaliser
- Connecter proprement le frontend au backend via les routes API existantes.
- Définir et implémenter les modèles métier complets : utilisateurs, commerces, offres, réservations.
- Remplacer la logique de prototype par une architecture cohérente pour le MVP.
- Ajouter la gestion de l’authentification et des rôles utilisateur.
- Implémenter la création, consultation, modification et suppression des offres.
- Mettre en place les réservations avec génération de code de retrait.
- Ajouter la gestion des statuts de réservation (en attente, collectée, annulée).
- Préparer l’interface de gestion pour les commerces partenaires.
- Ajouter de la validation côté serveur et des messages d’erreur explicites.
- Mettre en place une base de données persistante plutôt qu’une base en mémoire.
- Préparer le déploiement local et éventuellement la production.

## 4. Blocages identifiés
- Le backend présente encore une logique simplifiée et non alignée avec la vision complète du produit.
- La base de données actuelle est en mémoire, ce qui empêche la persistance des données entre redémarrages.
- Le frontend et le backend doivent être harmonisés pour éviter les erreurs de communication et de routing.
- Les routes backend ne couvrent pas encore l’ensemble du parcours utilisateur attendu.
- Il manque une stratégie claire de données, de validation et de sécurité pour le MVP.

## 5. Priorités
1. Finaliser la connexion frontend-backend.
2. Stabiliser l’API et les modèles de données.
3. Implémenter les fonctionnalités métier essentielles : offres et réservations.
4. Ajouter l’authentification et la séparation des rôles.
5. Améliorer l’expérience utilisateur et la fiabilité du système.

## 6. Roadmap étape par étape

### Étape 1 : Clarifier l’architecture globale
- Définir les entités principales : utilisateur, commerce, offre, réservation.
- Choisir la structure des dossiers backend et frontend.
- Déterminer les routes API à exposer et les formats de réponse.

### Étape 2 : Mettre en place la base de données persistante
- Remplacer SQLite en mémoire par une base stable et réutilisable.
- Créer les tables nécessaires avec les relations entre entités.
- Ajouter les contraintes de validation et les index utiles.

### Étape 3 : Développer le backend métier
- Implémenter les contrôleurs pour l’authentification, les commerces, les offres et les réservations.
- Ajouter les services ou fonctions de logique métier.
- Vérifier les réponses API et gérer les erreurs proprement.

### Étape 4 : Connecter le frontend au backend
- Utiliser le client API existant pour consommer les endpoints backend.
- Rendre les pages dynamiques à partir des données API.
- Intégrer les formulaires de création et de réservation.

### Étape 5 : Ajouter l’expérience utilisateur complète
- Implémenter la navigation entre la page d’accueil, les offres et le profil.
- Afficher les informations importantes : prix initial, prix réduit, disponibilité, créneaux de collecte.
- Ajouter des états de chargement et de succès/erreur.

### Étape 6 : Sécuriser et fiabiliser le système
- Ajouter la validation des entrées utilisateur.
- Protéger les routes sensibles avec une authentification adaptée.
- Tester les principaux scénarios : publication d’offre, réservation, collecte.

### Étape 7 : Préparer la version MVP
- Vérifier la cohérence globale du parcours utilisateur.
- Corriger les bugs et améliorer la qualité du code.
- Préparer une version exécutable localement pour démonstration.

## 7. Plan de connexion entre frontend, backend, base de données et APIs
- Le frontend doit appeler les endpoints backend via l’API client configuré.
- Le backend doit recevoir les requêtes HTTP, valider les données et interagir avec la base de données.
- La base de données doit stocker les informations métier et renvoyer les résultats au backend.
- Les APIs doivent exposer des endpoints clairs pour lister, créer, mettre à jour et supprimer les ressources.
- Les échanges doivent suivre un flux simple : interface utilisateur → frontend → backend → base de données → backend → frontend.

## 8. Objectif final du sprint
- Avoir une plateforme MVP fonctionnelle permettant à un commerce de publier une offre et à un utilisateur de la réserver, puis de la récupérer.
- Garantir une base solide pour évoluer ensuite vers une expérience plus riche, avec géolocalisation, notifications et tableaux de bord avancés.