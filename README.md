# Personal Website

This repository contains a Node.js and React application used to host a personal portfolio site. The server provides API endpoints for podcasts, articles ("reads"), and other content while serving the built React client.

## Project Structure

- `client/` – React front‑end. Pages include Projects, Writing, About Me and more.
- `server/` – Express API for content pulled from Notion databases. Endpoints include:
  - `GET /api/podcasts` – list podcast episodes with notes
  - `GET /api/podcasts/:id` – detailed notes for a single episode
  - `GET /api/reads` – list articles and books
- `scripts/` – utility scripts such as database seeders

## Running Locally

1. Install dependencies and build the React client:
   ```bash
   npm run build
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

Environment variables are required for MongoDB and the Notion API. See `server/config/notion.js` for details.

## Deployment

The `start` script installs server dependencies and runs `server/server.js` which serves the built React app in production.


