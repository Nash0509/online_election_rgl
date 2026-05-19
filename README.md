# online_election_rgl

A live polling app built for elections. Users can vote for nominees and the results update in real time on the admin side.

## Tech Stack

- Angular 15 (frontend)
- Node.js + Express (backend)
- Socket.io (real-time communication)
- MongoDB Atlas (database)
- Docker + Nginx (deployment)

## Running with Docker

Make sure Docker Desktop is running, then from the root folder:

```bash
docker-compose up --build -d
```

- Voting page: http://localhost:4200
- Admin dashboard: http://localhost:4200/dashboard

## Running locally

**Backend:**
```bash
cd be
npm install
node index.js
```

**Frontend** (new terminal):
```bash
cd fe/poll_fe
npm install
npm start
```

Frontend runs on port 4200, backend on port 3000.
