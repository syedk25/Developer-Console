# Deployment Guide

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- Java 21 (for local backend development)
- Node.js 20+ (for local frontend development)
- MySQL 8.0 (if not using Docker)

---

## Option 1: Docker Compose (Recommended)

This builds and runs MySQL, backend, and frontend together.

### 1. Configure environment variables

Copy the example environment file or set variables directly:

```bash
# .env (optional)
MYSQL_ROOT_PASSWORD=change-me
MYSQL_PASSWORD=change-me
MYSQL_DATABASE=developer_console
MYSQL_USER=developer
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN_SECONDS=900
DEMO_USERNAME=demo
DEMO_PASSWORD=change-me
CLIENT_ORIGIN=http://localhost
VITE_API_BASE_URL=http://localhost/api
```

### 2. Start all services

```bash
docker compose up -d --build
```

### 3. Access the application

- Frontend: http://localhost
- Backend API: http://localhost:8080/api

### 4. Stop services

```bash
docker compose down
```

### 5. Reset database

```bash
docker compose down -v
docker compose up -d --build
```

---

## Option 2: Local Development

### Backend

```bash
cd backend

# Configure application.properties (already done)
# Export required env vars
export MYSQL_PASSWORD=12344321
export JWT_SECRET=/Be/2qiFeoXEnY3i9eFPfDqOEQ9kMsM9ezU/x8ZQz9k=

# Run
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api` to `http://localhost:8080`.

---

## Production Checklist

- [ ] Set a strong `JWT_SECRET` (use `openssl rand -base64 32`)
- [ ] Change `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD`
- [ ] Change `DEMO_PASSWORD`
- [ ] Set `CLIENT_ORIGIN` to your production frontend URL
- [ ] Set `MYSQL_HOST` to your production database host
- [ ] Ensure MySQL is accessible from the backend container
- [ ] Use a reverse proxy (nginx/Traefik) with TLS termination
- [ ] Configure database backups
- [ ] Set resource limits in docker-compose for production

---

## Project Structure

```
.
├── docker-compose.yml          # Multi-service orchestration
├── backend/
│   ├── Dockerfile              # Spring Boot container image
│   ├── .gitignore
│   └── pom.xml                 # Maven build
├── frontend/
│   ├── Dockerfile              # Vite + nginx container image
│   ├── nginx.conf              # SPA fallback + API proxy
│   ├── .gitignore
│   └── package.json
└── DEPLOYMENT.md               # This file
```
