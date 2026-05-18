# Online Live Polling System

A real-time polling application allowing an audience to vote for nominees while providing an admin dashboard to visualize the live results.

## Architecture

Built with modern scalability and maintainability in mind (SOLID & DRY principles):
- **Frontend**: Angular 15, optimized with a multi-stage Docker build served via Nginx. Features premium UI and bidirectional socket communication.
- **Backend**: Node.js & Express, utilizing Socket.io for instantaneous bidirectional data flow.
- **Database**: MongoDB Cloud (Mongoose ODM) ensuring atomic operations and persistence.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.
- Git (optional, if cloning).

## Quick Start (Docker)

The easiest way to spin up the entire stack is using Docker Compose. This ensures zero environment conflicts.

1. Open your terminal at the root directory of this project (where `docker-compose.yml` is located).
2. Run the following command:
   ```bash
   docker-compose up --build -d
   ```
3. Once the containers are running:
   - **Audience Voting Page**: Visit [http://localhost](http://localhost)
   - **Admin Dashboard**: Visit [http://localhost/dashboard](http://localhost/dashboard)

*Note: The backend runs internally on port 3000 and is automatically connected via Socket.io.*

## Manual Setup (Without Docker)

If you prefer to run the application locally without Docker:

### 1. Backend Setup
```bash
cd be
npm install
node index.js
```
*The backend will run on `http://localhost:3000`.*

### 2. Frontend Setup
Open a new terminal window:
```bash
cd fe/poll_fe
npm install
npm start
```
*The frontend will run on `http://localhost:4200`. Navigate to `http://localhost:4200` to view the app.*