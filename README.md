# TP Next.js SaaS

Application SaaS développée avec Next.js 16, Prisma et PostgreSQL (Neon).

## Fonctionnalités

- Authentification par email avec code OTP
- Dashboard protégé par authentification
- Interface utilisateur moderne avec Radix UI et Tailwind CSS

## Technologies

- Next.js 16
- Prisma (PostgreSQL via Neon)
- Nodemailer (envoi d'emails OTP)
- Radix UI
- Tailwind CSS

## Variables d'environnement

Configurer les variables suivantes sur Vercel :

```
DATABASE_URL=postgresql://...

GMAIL_USER=votre-email@gmail.com
GMAIL_APP_PASSWORD=votre-mot-de-passe-application
EMAIL_FROM=votre-email@gmail.com
EMAIL_FROM_NAME=Nom de votre application
```

## Déploiement

Le projet est déployé sur [Vercel](https://vercel.com).

## Contributeurs

- **Adam** - Création du projet et développement initial :
  - Configuration de Prisma avec PostgreSQL (Neon)
  - Mise en place de Nodemailer pour l'envoi d'emails
  - Création de la structure des dossiers et composants
  - Développement des pages (login, signup, dashboard, OTP)
  - Intégration de Radix UI et Tailwind CSS

- **Nayir** - Maintenance et améliorations :
  - Résolution des problèmes techniques du système OTP
  - Protection du dashboard avec hook d'authentification
  - Ajout de la vérification du mot de passe à la connexion
  - Traduction de l'interface en français
  - Nettoyage du code (suppression fichiers inutiles)
  - Ajout du bouton déconnexion fonctionnel
  - Timeout de 60s sur le renvoi de code OTP
  - Validation mot de passe (8 caractères minimum)
