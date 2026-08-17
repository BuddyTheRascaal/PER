# Circuit Patrimonial

Plateforme vitrine + réseau d'affiliés pour La Défense Mondiale, construite
avec Next.js (App Router), TypeScript et Tailwind CSS v4, conformément au
brief `PER Grand Prix v1.0` (rebaptisé **Circuit Patrimonial** — voir
"Identité de marque" ci-dessous).

## Identité de marque

Le site porte deux disciplines motorsport distinctes, choisies pour rester
justes :

- **Le Circuit** — la stratégie personnelle de l'utilisateur : une course en
  solo, sa position sur la grille fiscale (`/`, `/simulateur`, `/certificat`).
- **Le Rallye Copilotes** — le réseau d'apporteurs d'affaires (`/copilotes`,
  `/espace-copilote`). En rallye, le pilote roule avec un copilote qui lit la
  feuille de route ; en circuit, il n'y en a pas. C'est la seule discipline
  où le mot « copilote » existe vraiment, d'où la distinction de vocabulaire
  dans l'UI (road book, carnet de route, classement scratch...) plutôt que
  les termes circuit (grille de départ, Grand Prix) utilisés côté simulateur.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — design system "cockpit" (sobre, données) / "livrée"
  (diagonales, couleur vive, typographie de course), voir `src/app/globals.css`
- **SQLite** (`better-sqlite3`) pour la persistence MVP — copilotes, clics,
  leads, commissions (`src/lib/db.ts`)
- Auth copilote maison : cookie de session signé HMAC (`src/lib/auth.ts`),
  mots de passe hashés avec `bcryptjs`
- `src/proxy.ts` (anciennement `middleware.ts`) : attribution des liens de
  tracking (`?ref=CODE`) et protection de `/espace-copilote`

## Pages (brief → route)

| Page brief | Route |
|---|---|
| 1. Accueil / Grille de départ | `/` |
| 2. Simulateur "La Course" | `/simulateur` |
| 3. Certificat de Performance | `/certificat` |
| 4. Programme Copilotes | `/copilotes` |
| 5. Espace Copilote | `/espace-copilote` (+ `/connexion`, `/inscription`) |
| 6. À propos | `/a-propos` |
| 7. Mentions légales | `/mentions-legales` |

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # renseigner SESSION_SECRET au minimum
npm run dev
```

La base SQLite est créée automatiquement dans `.data/` (ignorée par git) au
premier lancement — aucune configuration supplémentaire nécessaire pour tester
en local.

## Points d'intégration à finaliser avant mise en production

Le brief renvoie explicitement certains choix à préciser ; ils sont posés en
points d'extension clairs plutôt qu'en solutions figées :

- **CRM / emailing** (`src/lib/crm.ts`) — renseigner `CRM_WEBHOOK_URL` dans
  les variables d'environnement pour transmettre chaque lead capté (POST
  JSON) à l'outil retenu (HubSpot, Brevo, Salesforce...). Sans cette
  variable, les leads restent stockés localement et visibles depuis le
  dashboard copilote.
- **Mentions légales** (`/mentions-legales`) — page prête, mais les champs
  encadrés en orange (raison sociale, numéro ORIAS, RCS, adresse, contact
  DPO, hébergeur) sont des placeholders à compléter avec les informations
  réelles de la structure de courtage. Aucune donnée d'immatriculation n'a
  été inventée.
- **Barème fiscal 2026** (`src/lib/per-calculator.ts`) — le barème IR et le
  PASS 2026 n'étaient pas encore publiés au moment de l'écriture ; le
  simulateur utilise les références 2025 avec disclaimers visibles sur les
  pages concernées. À mettre à jour dès publication de la loi de finances
  2026 (une seule constante à modifier : `PASS_REFERENCE`).
- **Persistence** (`src/lib/db.ts`) — SQLite fichier, suffisant pour le MVP
  et pour les événements Cannes/Monaco. Un seul module à remplacer si une
  base managée (Postgres, etc.) est requise ensuite.
- **Kit de stand copilote** — la section `/copilotes` décrit le contenu du
  kit et route la demande vers un email de contact ; les visuels
  (kakémono, cartes de visite, bannières) restent à produire par l'équipe
  design.

## Scripts

```bash
npm run dev      # serveur de développement (Turbopack)
npm run build    # build de production + vérification TypeScript
npm run start    # sert le build de production
npm run lint     # ESLint
```
