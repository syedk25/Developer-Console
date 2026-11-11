# Devspace Developer Console

A full-stack developer workbench with a React + JSX frontend and a Java Spring Boot REST API backed by MySQL. Browse reusable UI patterns, explore Axios usage, learn JWT security, and try the authenticated API.

## Requirements

- Node.js 20+
- Java 21+
- Maven 3.8+
- MySQL 8+

## Run locally

1. Create a MySQL database and application user (change the password to your own):

   ```sql
   CREATE DATABASE devspace CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
   CREATE USER 'devspace'@'localhost' IDENTIFIED BY 'choose-a-local-password';
   GRANT ALL PRIVILEGES ON devspace.* TO 'devspace'@'localhost';
   ```

2. Configure backend credentials and generate a signing key:

   ```bash
   cp ../backend/.env.example ../backend/.env
   openssl rand -base64 32
   ```

   Edit `../backend/.env`: set your MySQL password, paste the generated key as `JWT_SECRET`, and choose a demo password.

3. Install frontend dependencies from this `frontend` directory:

   ```bash
   npm install
   ```

4. Start Spring Boot in one terminal:

   ```bash
   npm run dev:api
   ```

5. Start the frontend in a second terminal:

   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` to Spring Boot on port `8080`. Spring Boot creates the JPA tables and inserts the demo user and sample projects on first startup. The default username is `demo`; use the password configured as `DEMO_PASSWORD`.

## Included features

- JSX component workbench: headers, button variants, forms, status tags, and alerts.
- Axios client with a shared base URL, timeout, in-memory bearer token interceptor, and normalized errors.
- Spring Boot API with health, login, current-user, and MySQL-backed projects endpoints.
- Spring Security stateless JWT authentication, bcrypt password hashing, and protected routes.
- Persistent demo user and project data through Spring Data JPA and MySQL.
- Tailwind CSS utilities, a teal/cyan color palette, light/dark themes, and full-stack reference pages.

## Frontend source layout

- `src/App.jsx` defines routes and the shared page shell.
- `src/store/store.js` creates the Redux Toolkit store; `src/main.jsx` provides it to the app.
- `src/store/appSlice.js` defines shared state, reducers, async API/storage thunks, and memoized topic selectors.
- `src/hooks/useAppNavigation.js` derives the current section and provides route navigation without passing callbacks through pages.
- `src/components/layout/` contains the sidebar, topbar, page heading, and Redux-backed status toast.
- `src/components/pages/` contains pages that select the shared state they need with `useSelector` and dispatch actions directly.
- `src/components/common/` contains reusable UI such as Redux-backed code blocks and toolkit cards.
- `src/data/` contains navigation metadata, lesson content, and code examples.
- `src/api.js` configures the shared Axios client.

## Shared state flow

Use `useSelector((state) => state.app.someValue)` to read shared state and `useDispatch()` to send an action. Keep synchronous state changes in the slice reducers; use the exported async thunks for API requests and browser storage. Route details stay in React Router and are derived by `useCurrentPage()` instead of being duplicated in Redux.

## Demo API

| Method | Route             | Auth         |
| ------ | ----------------- | ------------ |
| `GET`  | `/api/health`     | No           |
| `POST` | `/api/auth/login` | No           |
| `GET`  | `/api/auth/me`    | Bearer token |
| `GET`  | `/api/projects`   | Bearer token |

Login accepts `{ "username": "demo", "password": "<DEMO_PASSWORD>" }` and returns a short-lived access token.

## Build

```bash
npm run build
mvn -f ../backend/pom.xml test
```

The backend uses Hibernate schema update for this starter. For production, use managed secrets, HTTPS, database migrations, login rate limiting, refresh-token rotation, monitoring, and an appropriate cookie/CSRF strategy for browser sessions. Never commit `backend/.env` or put secrets in frontend code.
