# Developer Console

A full-stack developer console and component workbench built with Spring Boot, React, and Tailwind CSS. Features JWT authentication, project management, live API testing, and an interactive UI component library.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Docker Deployment](#docker-deployment)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Demo Credentials](#demo-credentials)
- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [Project Roadmap](#project-roadmap)
- [License](#license)

## Features

- **Authentication**: Stateless JWT-based auth with BCrypt password hashing
- **Project Management**: Full CRUD for developer projects with status tracking
- **Health Check**: `/api/health` endpoint for monitoring
- **Live API Console**: Authenticated API requests with response display
- **UI Component Library**: Interactive component workbench with live code preview and editing
- **Dark/Light Theme**: Theme persistence via localStorage
- **Responsive Layout**: Sidebar navigation, header bar, and collapsible panels
- **Docker Ready**: Multi-container setup with MySQL, backend, and nginx-served frontend

## Tech Stack

### Backend

- **Spring Boot 3.4.5** — Java 21 web framework
- **Spring Security** — Stateless JWT authentication with BCrypt
- **Spring Data JPA** — Data access with MySQL 8.0
- **JJWT 0.12.6** — JSON Web Token generation and validation
- **Maven** — Build and dependency management

### Frontend

- **React 18** — UI library
- **Vite 6** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS framework
- **Redux Toolkit** — State management
- **React Router DOM 7** — Client-side routing
- **Axios** — HTTP client with auth interceptors
- **Lucide React** — Icon library
- **Prism React Renderer** — Code syntax highlighting
- **React Live** — Interactive code preview
- **Unocss** — Utility-first CSS engine for component library

### Infrastructure

- **Docker & Docker Compose** — Container orchestration
- **MySQL 8.0** — Relational database
- **Nginx** — Frontend reverse proxy and static file server

## Project Structure

```
Developer Console/
├── README.md
├── docker-compose.yml
├── DEPLOYMENT.md
├── .gitignore
├── backend/
│   ├── pom.xml
│   ├── Dockerfile
│   ├── .env.example
│   ├── .gitignore
│   └── src/
│       └── main/
│           ├── java/com/devspace/console/
│           │   ├── DeveloperConsoleApplication.java
│           │   ├── DemoDataInitializer.java
│           │   ├── auth/AuthController.java
│           │   ├── health/HealthController.java
│           │   ├── project/Project.java
│           │   ├── project/ProjectController.java
│           │   ├── project/ProjectRepository.java
│           │   ├── security/JwtAuthenticationFilter.java
│           │   ├── security/JwtService.java
│           │   ├── security/SecurityConfig.java
│           │   └── user/AppUser.java
│           │   └── user/AppUserRepository.java
│           └── resources/
│               └── application.properties
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.css
    ├── Dockerfile
    ├── nginx.conf
    ├── .env.example
    ├── .gitignore
    ├── dist-server/
    │   └── index.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── api.js
    │   ├── store/
    │   │   ├── store.js
    │   │   └── appSlice.js
    │   ├── hooks/
    │   │   └── useAppNavigation.js
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── CodeBlock.jsx
    │   │   │   ├── CodeOutput.jsx
    │   │   │   └── ToolCard.jsx
    │   │   ├── layout/
    │   │   │   ├── Header.jsx
    │   │   │   ├── PageHeader.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── Sidebar.test.jsx
    │   │   │   └── StatusToast.jsx
    │   │   └── pages/
    │   │       ├── Login.jsx
    │   │       ├── Overview.jsx
    │   │       ├── TechnologyPage.jsx
    │   │       ├── StackGuide.jsx
    │   │       ├── JwtGuide.jsx
    │   │       ├── ApiGuide.jsx
    │   │       └── ComponentsPage.jsx
    │   ├── context/
    │   ├── data/
    │   │   ├── codeSamples.js
    │   │   ├── fullStackTopics.js
    │   │   ├── navigation.js
    │   │   └── technologyTopics.js
    │   └── tailwind.css
```

## Prerequisites

### For Local Development

- **Java 21+** (for backend)
- **Node.js 20+** (for frontend)
- **Maven 3.9+** (for backend builds)
- **MySQL 8.0** (if not using Docker)

### For Docker Deployment

- **Docker** and **Docker Compose**

## Getting Started

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**

   ```bash
   cd /home/syed/Projects/Developer\ Console
   ```

2. **Configure environment variables** (optional)
   Create a `.env` file at the root:

   ```bash
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

3. **Start all services**

   ```bash
   docker compose up -d --build
   ```

4. **Access the application**
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:8080`
   - MySQL: `localhost:3306`

### Option 2: Local Development

1. **Backend**

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   The backend runs on `http://localhost:8080`.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` and proxies API requests to `http://localhost:8080`.

## Docker Deployment

The `docker-compose.yml` defines three services:

| Service    | Port | Description            |
| ---------- | ---- | ---------------------- |
| `db`       | 3306 | MySQL 8.0 database     |
| `backend`  | 8080 | Spring Boot API        |
| `frontend` | 80   | Nginx-served React app |

### Commands

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild a specific service
docker compose up -d --build backend
```

## Environment Variables

### Backend (`backend/.env.example`)

| Variable                 | Default                                         | Description           |
| ------------------------ | ----------------------------------------------- | --------------------- |
| `MYSQL_HOST`             | `localhost`                                     | MySQL host            |
| `MYSQL_PORT`             | `3306`                                          | MySQL port            |
| `MYSQL_DATABASE`         | `devspace`                                      | Database name         |
| `MYSQL_USER`             | `devspace`                                      | Database user         |
| `MYSQL_PASSWORD`         | `replace-with-your-mysql-password`              | Database password     |
| `JWT_SECRET`             | `replace-with-output-of-openssl-rand-base64-32` | JWT signing secret    |
| `JWT_EXPIRES_IN_SECONDS` | `900`                                           | Token expiration time |
| `DEMO_USERNAME`          | `demo`                                          | Demo account username |
| `DEMO_PASSWORD`          | `change-this-demo-password`                     | Demo account password |

### Frontend (`frontend/.env.example`)

| Variable            | Default | Description               |
| ------------------- | ------- | ------------------------- |
| `VITE_API_BASE_URL` | `/api`  | Base URL for API requests |

### Docker Compose (`.env` at root)

| Variable                 | Default                                        | Description           |
| ------------------------ | ---------------------------------------------- | --------------------- |
| `MYSQL_ROOT_PASSWORD`    | `12344321`                                     | MySQL root password   |
| `MYSQL_PASSWORD`         | `12344321`                                     | MySQL user password   |
| `MYSQL_DATABASE`         | `developer_console`                            | Database name         |
| `MYSQL_USER`             | `root`                                         | Database user         |
| `JWT_SECRET`             | `/Be/2qiFeoXEnY3i9eFPfDqOEQ9kMsM9ezU/x8ZQz9k=` | JWT signing secret    |
| `JWT_EXPIRES_IN_SECONDS` | `900`                                          | Token expiration      |
| `DEMO_USERNAME`          | `demo`                                         | Demo username         |
| `DEMO_PASSWORD`          | `change-me`                                    | Demo password         |
| `CLIENT_ORIGIN`          | `http://localhost:5173`                        | CORS allowed origin   |
| `VITE_API_BASE_URL`      | `http://localhost:8080/api`                    | Frontend API base URL |

## API Endpoints

### Authentication

| Method | Endpoint          | Description                       | Auth Required |
| ------ | ----------------- | --------------------------------- | ------------- |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT | No            |
| `GET`  | `/api/auth/me`    | Get current user info             | Yes           |

### Health

| Method | Endpoint      | Description  | Auth Required |
| ------ | ------------- | ------------ | ------------- |
| `GET`  | `/api/health` | Health check | No            |

### Projects

| Method   | Endpoint             | Description          | Auth Required |
| -------- | -------------------- | -------------------- | ------------- |
| `GET`    | `/api/projects`      | List all projects    | Yes           |
| `GET`    | `/api/projects/{id}` | Get project by ID    | Yes           |
| `POST`   | `/api/projects`      | Create a new project | Yes           |
| `PUT`    | `/api/projects/{id}` | Update a project     | Yes           |
| `DELETE` | `/api/projects/{id}` | Delete a project     | Yes           |

### Example: Login with cURL

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"demo","password":"change-me"}'
```

### Example: Authenticated Request

```bash
curl -X GET http://localhost:8080/api/projects \
  -H 'Authorization: Bearer <your-jwt-token>'
```

## Demo Credentials

| Field    | Value       |
| -------- | ----------- |
| Username | `demo`      |
| Password | `change-me` |

The demo user is pre-seeded with three sample projects. Change the default password in production.

## Frontend Development

### Available Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173) |
| `npm run build`   | Production build                  |
| `npm run dev:api` | Start Spring Boot backend         |

### Pages

- **Login** — Sign in page with demo credentials and cURL example
- **Overview** — Live API connection status and project list
- **Technology Page** — Interactive learning concepts with code examples
- **Stack Guide** — Full-stack technology topics
- **JWT Guide** — JWT authentication explanation
- **API Guide** — API usage guide with Axios tips
- **Components Page** — UI component library with live preview

### State Management

Redux Toolkit slice (`appSlice.js`) manages:

- Authentication state (accessToken, user)
- Theme preference (light/dark)
- Sidebar collapsed state
- Custom concepts and lesson edits
- Async thunks: `login`, `logout`, `loadProjects`

## Backend Development

### Build Commands

```bash
# Compile and package (skip tests)
mvn package -DskipTests

# Run tests
mvn test

# Run the application
mvn spring-boot:run
```

### Database Schema

**AppUser** table:

- `id` — Primary key
- `username` — Unique username
- `password` — BCrypt-hashed password

**Project** table:

- `id` — Primary key
- `name` — Project name
- `status` — Project status (e.g., Active, Building)
- `updated` — Last updated timestamp

### Security

- Stateless JWT authentication
- BCrypt password encoding
- CORS configured for frontend origin
- Public endpoints: `/api/auth/login`, `/api/health`
- Protected endpoints: All `/api/auth/me`, `/api/projects/*`

## Project Roadmap

- [ ] Add Swagger/OpenAPI documentation
- [ ] Add unit and integration tests
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add project categories and tags
- [ ] Add project file attachments
- [ ] Add real-time notifications (WebSockets)
- [ ] Add user registration and role management
- [ ] Add API rate limiting

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues and feature requests, please open a GitHub issue in the repository.

---

_Built with Spring Boot 3.4.5, React 18, Vite 6, Tailwind CSS 4, and Docker._
