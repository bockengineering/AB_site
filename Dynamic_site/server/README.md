# Dynamic Site Node Server

This directory contains the Express server powering the dynamic portion of the site. It exposes a REST API and connects to MongoDB.

## Prerequisites
- **Node.js** and **npm** installed on your machine.
- Access to a MongoDB database.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in this folder based on the provided `.env.example` and supply values for each key.
3. Start the server:
   ```bash
   npm start
   ```
   For development with automatic restarts, you can run:
   ```bash
   npm run server
   ```

The server listens on the port defined by `PORT` (defaults to `5000`).

## Environment variables
The following environment variables are required:

- `MONGODB_URI` – connection string for your MongoDB instance.
- `JWT_SECRET` – secret string used to sign JSON Web Tokens.
- `PORT` – port number on which the server should run.

### Example `.env`
See `.env.example` for a template file you can copy and modify.
