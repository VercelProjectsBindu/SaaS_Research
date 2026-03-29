# SaaS Research Server

This service exposes a JSON API for the landing page content and stores the data in a segmented MySQL schema.

## Overview
- Node.js + Express backend
- MySQL (via `mysql2`) with an auto-created, segmented relational schema seeded from `data.ts` on first run

## Prerequisites
- Node.js 18+ (or compatible)
- MySQL 5.7+ / 8.0+

## Installation
1. Open a terminal and navigate to the `server` directory:

```bash
cd /home/bindu/FTPSofts/Bindu/LiveProjects/SaaS_Research/server
```

2. Install dependencies:

```bash
npm install
```

## Environment variables
Create a `.env` file or export environment variables before starting.

Example `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=saas_research
DB_PORT=3306
PORT=3001
```

Notes:
- The server will create the database `DB_NAME` and all required tables if they do not exist.
- Default credentials assume local MySQL with an accessible `root` account; use a dedicated user for production.

## Start the server

```bash
# from the server folder
node index.js

# for development with auto-reload (if you prefer):
npx nodemon index.js
```

On first run the service will seed segmented tables with data from `data.ts` if the tables are empty.

## Database schema (high level)
- `navigation` + `nav_links`
- `hero`
- `feature_cards`
- `crisis` + `crisis_issues`
- `process_steps`
- `beta` + `beta_benefits`
- `faq` + `faq_items`
- `news` + `news_articles`
- `contact` + `contact_form_fields`
- `footer` + `footer_links`

Tables are created in `db.js` (automatic migration on startup).

## API Endpoints
Base URL: `http://localhost:3001` (or `$PORT`)

- GET `/api/data`
  - Returns the full landing payload assembled from segmented tables. If DB empty, seeds from `data.ts` and returns default object.
  - Example:

```bash
curl http://localhost:3001/api/data
```

- POST `/api/data`
  - Replace the entire landing payload with a JSON body. This runs a transactional upsert that clears and repopulates segmented tables.
  - Body: full `LANDING_DATA`-shaped JSON.
  - Example:

```bash
curl -X POST http://localhost:3001/api/data \
  -H "Content-Type: application/json" \
  -d '{"navigation": {"brandName":"X","navLinks":[]}, "hero": {...}}'
```

- Segmented GET endpoints (read-only):
  - GET `/api/data/navigation` — navigation object
  - GET `/api/data/hero` — hero object
  - GET `/api/data/featureCards` — array of feature cards
  - GET `/api/data/crisis` — crisis object + issues
  - GET `/api/data/process` — array of process steps
  - GET `/api/data/beta` — beta info + benefits
  - GET `/api/data/faq` — faq title + items
  - GET `/api/data/news` — news + articles
  - GET `/api/data/contact` — contact + form fields
  - GET `/api/data/footer` — footer + links

Example (navigation):

```bash
curl http://localhost:3001/api/data/navigation
```

- Health check: GET `/health` returns `{ "status": "ok" }`.

## Behavior & Safety
- The `POST /api/data` endpoint clears and repopulates the segmented tables inside a transaction; use with care.
- For production, secure the endpoints (authentication/authorization) and use a dedicated DB user with least privilege.

## Troubleshooting
- If the server fails to connect to MySQL, verify env vars and network access, then inspect logs printed by `index.js`.
- If tables are not seeded, ensure the MySQL user has permission to `CREATE DATABASE` and `CREATE TABLE`.

## Next steps (suggested)
- Add segment-specific POST/PUT endpoints for partial updates.
- Add request validation and simple auth (API key or JWT).
- Add automated tests and a lightweight migration script if you prefer explicit migration tooling.

## Files of interest
- `index.js` — Express server and endpoints
- `db.js` — migrations, seeding, and data access helpers
- `data.ts` — default landing payload used for seeding

If you want, I can also add example curl scripts, Postman collection, or implement segment-specific update endpoints.
