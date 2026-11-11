import {
  Atom,
  Braces,
  Cloud,
  Container,
  FlaskConical,
  GitBranch,
  Globe2,
  Workflow,
} from "lucide-react";

function lesson(title, explanation, steps, points, filename, language, code) {
  return {
    title,
    explanation,
    steps,
    points,
    exampleTitle: title,
    filename,
    language,
    code,
  };
}

export const fullStackTopics = [
  {
    label: "React",
    path: "/learn/react",
    icon: Atom,
    description: "Build interactive user interfaces from reusable components.",
    intro:
      "A beginner-to-advanced React path for building the browser side of a Java full-stack application. Learn components, props, state, forms, effects, routing, testing, accessibility, and production patterns in order. The examples use modern function components and hooks.",
    concepts: [
      lesson(
        "1. React mental model and setup",
        "React builds interfaces from components: functions that describe what should appear for the current data and state. When state changes, React renders the affected component tree and updates the DOM. Begin with a small Vite React project; keep application state and rendering declarative rather than manually editing DOM nodes.",
        [
          "Install a current Node.js LTS release and create a project with npm create vite@latest my-app -- --template react.",
          "Run npm install, then npm run dev.",
          "Open src/main.jsx and identify the root render, then inspect App.jsx.",
          "Change a heading and observe Vite's fast refresh.",
        ],
        [
          "React is a UI library; Vite is a development server and build tool.",
          "Describe the UI from data; avoid document.querySelector for ordinary React updates.",
          "Use a maintained Node.js LTS version and keep dependencies current.",
        ],
        "App.jsx",
        "JSX",
        `function App() {
           return (
             <main>
             <h1>My first React page</h1>
             <p>React renders this component into the browser.</p>
            </main>
          );
        }`
      ),
      lesson(
        "2. JSX and rendering values",
        "JSX is JavaScript syntax for describing UI. It looks like HTML but uses JavaScript rules: return one parent element (or a Fragment), use className for CSS classes, and place expressions inside braces. React escapes ordinary text values, which helps prevent markup injection. Keep conditions and transformations understandable rather than embedding complex logic in markup.",
        [
          "Return a single parent element or wrap siblings in <>...</>.",
          "Use className, htmlFor, and camelCase event/property names.",
          "Put JavaScript expressions inside curly braces.",
          "Use strings or numbers for text; do not inject untrusted HTML.",
        ],
        [
          "JSX expressions evaluate to React elements; they are not HTML strings.",
          "Components must start with an uppercase letter.",
          "A component should return a consistent UI shape for its input.",
        ],
        "Greeting.jsx",
        "JSX",
        `function Greeting({ name }) {
  const message = name ? \`Hello, \${name}\` : "Hello, learner";

  return (
    <section className="greeting">
      <h2>{message}</h2>
      <p>Welcome to React.</p>
    </section>
  );
}`
      ),
      lesson(
        "3. Components and composition",
        "Components are the building blocks of a React interface. Split a screen into pieces with clear responsibilities, then compose those pieces into a page. A component should be reusable when the same concept appears in multiple places, but avoid creating tiny components that obscure rather than clarify the interface. Keep related markup and behavior together.",
        [
          "Identify a meaningful UI region such as a header, project card, or form.",
          "Move its markup into a function component in its own file when useful.",
          "Import and render it from its parent component.",
          "Keep component names descriptive and responsibilities focused.",
        ],
        [
          "React component functions should be pure with respect to their props.",
          "Composition (putting components together) is usually preferable to deep inheritance.",
          "Share behavior through props or custom hooks when a clear reuse need appears.",
        ],
        "ProjectCard.jsx",
        "JSX",
        `function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </article>
  );
}

function ProjectList({ projects }) {
  return projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));
}`
      ),
      lesson(
        "4. Props and one-way data flow",
        "Props are inputs passed from a parent component to a child. They let a component display different data or call a parent-provided action. Treat props as read-only: when something needs to change, the component that owns the state should update it and pass the new value down. This one-way data flow makes it easier to follow where UI data comes from.",
        [
          "Choose the smallest set of inputs the child needs.",
          "Pass data and callbacks as props.",
          "Destructure props in the component signature for clarity.",
          "Keep state in the closest common parent that needs to coordinate the children.",
        ],
        [
          "Do not mutate a prop or nested data received through props.",
          "Use callback props to request a change from the state owner.",
          "Avoid passing many unrelated props through many layers; consider composition or context when that becomes a real problem.",
        ],
        "Welcome.jsx",
        "JSX",
        `function Welcome({ user, onSignOut }) {
  return (
    <header>
      <span>Welcome, {user.name}</span>
      <button onClick={onSignOut}>Sign out</button>
    </header>
  );
}`
      ),
      lesson(
        "5. State, events, and updates",
        "State is data that changes over time and affects what the component renders. useState returns the current value and a setter. Calling the setter schedules a render; it does not immediately change the variable in the current render. State updates should be immutable, and when the next value depends on the previous value, use the functional setter form.",
        [
          "Add useState for a value that changes because of user interaction or new data.",
          "Connect an event handler such as onClick or onChange.",
          "Call the setter instead of assigning directly to the state variable.",
          "Use a functional update when computing from the previous state.",
        ],
        [
          "Never mutate arrays or objects in state; create updated copies.",
          "Do not call hooks inside conditions, loops, or nested functions.",
          "Avoid storing a value in state when it can be calculated from existing props or state.",
        ],
        "Counter.jsx",
        "JSX",
        `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((current) => current + 1)}>
      Clicked {count} times
    </button>
  );
}`
      ),
      lesson(
        "6. Conditional UI and lists",
        "React lets you choose which elements to render using ordinary JavaScript conditions. Use a ternary when there are two clear alternatives and && for a simple optional section. Render collections with map and give every sibling a stable key from the data, such as a database ID. Keys help React match items when the list is inserted, removed, or reordered.",
        [
          "Represent collection data as an array of objects.",
          "Use map to turn each object into a component or element.",
          "Use the item's stable ID as key.",
          "Render explicit loading, empty, success, and error states where appropriate.",
        ],
        [
          "Do not use the array index as a key for reorderable or changing lists.",
          "Keys are for React's reconciliation and are not passed as component props.",
          "Keep empty states useful instead of showing a blank page.",
        ],
        "ProjectList.jsx",
        "JSX",
        `function ProjectList({ projects, loading }) {
  if (loading) return <p>Loading projects…</p>;
  if (projects.length === 0) return <p>No projects yet.</p>;

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}`
      ),
      lesson(
        "7. Forms and controlled inputs",
        "A controlled input gets its value from React state and notifies React through onChange. This makes validation, conditional fields, and submission behavior explicit. For forms, handle the submit event, prevent the browser's default navigation when the app handles the request, and display validation feedback close to the relevant field. Always validate on the server as well.",
        [
          "Create state for each value that must drive the UI.",
          "Set value and onChange on the input.",
          "Handle the form's onSubmit event and validate before sending.",
          "Show field errors accessibly and preserve user-entered values after a failure.",
        ],
        [
          "Give every input a visible label associated by htmlFor/id.",
          "Use the correct type and autocomplete value.",
          "Client-side validation improves usability but does not secure the API.",
        ],
        "ProjectForm.jsx",
        "JSX",
        `import { useState } from "react";

function ProjectForm({ onCreate }) {
  const [name, setName] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim() });
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="project-name">Project name</label>
      <input id="project-name" value={name}
        onChange={(event) => setName(event.target.value)} />
      <button type="submit">Create project</button>
    </form>
  );
}`
      ),
      lesson(
        "8. Effects and API requests",
        "Effects synchronize a component with an external system, such as a subscription or browser API. They are not a general place to calculate derived values or respond to a click. For data fetching, handle loading and error states and prevent stale requests from updating an unmounted or no-longer-current view. Framework data loaders or a query library may be a better fit as an app grows.",
        [
          "First ask whether the operation can happen in an event handler or during render; if so, an effect may not be needed.",
          "For a simple fetch, start it in useEffect and model loading, data, and error states.",
          "Use AbortController or cleanup logic to cancel or ignore stale requests.",
          "Handle non-2xx HTTP responses explicitly and show a useful error to users.",
        ],
        [
          "Effects run after rendering and their dependencies must include values they use.",
          "React StrictMode may run an extra setup/cleanup cycle in development to expose unsafe effects.",
          "Never place credentials or server secrets in frontend code.",
        ],
        "useProjects.js",
        "JavaScript",
        `import { useEffect, useState } from "react";

function useProjects() {
  const [state, setState] = useState({ loading: true, data: [], error: "" });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load projects");
        return response.json();
      })
      .then((data) => setState({ loading: false, data, error: "" }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setState({ loading: false, data: [], error: error.message });
        }
      });
    return () => controller.abort();
  }, []);

  return state;
}`
      ),
      lesson(
        "9. Reusable hooks and context",
        "A custom hook is a function whose name starts with use and which calls React hooks. It can share stateful behavior between components without sharing their state instance. Context provides a value to a subtree without passing it through every intermediate component; it is useful for relatively broad values such as the current user or theme. Keep context focused to avoid rerendering large parts of an app unnecessarily.",
        [
          "Extract repeated stateful behavior into a custom hook.",
          "Use context when many distant components need the same stable value.",
          "Create a provider near the part of the tree that needs the value.",
          "Keep frequently changing, unrelated state in separate contexts or another state solution.",
        ],
        [
          "Custom hooks share logic, not automatically one shared state instance.",
          "Context is dependency distribution, not a replacement for every state-management need.",
          "Always provide a clear default/error behavior when a hook requires a provider.",
        ],
        "ThemeContext.jsx",
        "JSX",
        `import { createContext, useContext } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ value, children }) {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme needs ThemeProvider");
  return theme;
}`
      ),
      lesson(
        "10. Routing and page structure",
        "A single-page application uses client-side routing to map URLs to page components without reloading the document. Routes should reflect meaningful resources and support direct links, browser history, and refreshes. Use route parameters for identifiers and query parameters for filtering or pagination. The server must serve the app entry point for frontend routes, while API paths should still reach the backend.",
        [
          "Install a router such as react-router-dom.",
          "Define routes for the major pages and a not-found page.",
          "Use links for navigation and route parameters for resource identifiers.",
          "Configure the development proxy and production server so API requests and frontend routes resolve correctly.",
        ],
        [
          "Use Link/NavLink rather than ordinary anchors for internal SPA navigation.",
          "Protect routes in the UI for user experience, but enforce authorization in Spring Boot too.",
          "Ensure browser refresh on a nested route returns the SPA entry point.",
        ],
        "AppRoutes.jsx",
        "JSX",
        `import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}`
      ),
      lesson(
        "11. Connect React to Spring Boot",
        "A React application calls Spring Boot over HTTP, usually exchanging JSON. Keep the API base URL configurable, handle loading/success/error states, and define clear request/response types (TypeScript is useful here). During development, configure a Vite proxy or backend CORS policy. Authentication and authorization remain backend responsibilities; avoid storing long-lived sensitive credentials in unsafe browser storage.",
        [
          "Agree on endpoint paths, methods, JSON fields, and error responses with the backend.",
          "Configure a Vite development proxy or a narrowly scoped backend CORS policy.",
          "Create one API client module for the base URL and common request behavior.",
          "Handle non-success statuses and display loading and error feedback.",
          "Test anonymous, authorized, and forbidden flows against the backend.",
        ],
        [
          "CORS is a browser permission policy, not authentication.",
          "Do not trust client-side role checks; Spring Boot must enforce access.",
          "Do not put database credentials, signing keys, or server secrets in the React bundle.",
        ],
        "api.js",
        "JavaScript",
        `const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getProjects(signal) {
  const response = await fetch(\`\${API_BASE}/api/projects\`, { signal });
  if (!response.ok) {
    throw new Error(\`Request failed (\${response.status})\`);
  }
  return response.json();
}`
      ),
      lesson(
        "12. Accessibility, testing, and production quality",
        "A production React interface should work with keyboard and assistive technology, communicate loading and errors, and be covered by tests. Prefer semantic HTML, labels, visible focus, and accessible names. Use React Testing Library to test what users see and do rather than component internals. Before shipping, run lint and tests, build the app, and verify the built output with realistic routes and API configuration.",
        [
          "Use semantic elements, labels, keyboard-operable controls, and visible focus states.",
          "Test a user-visible flow with React Testing Library.",
          "Run the project's lint, test, and production build scripts.",
          "Verify environment-specific API URLs and nested-route behavior in the built app.",
          "Measure performance before adding memoization or code splitting.",
        ],
        [
          "Use aria attributes only when native HTML semantics are not enough.",
          "Test behavior and accessibility states, not private implementation details.",
          "Memoization is an optimization, not a default requirement.",
        ],
        "ProjectForm.test.jsx",
        "JSX",
        `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

test("submits a project name", async () => {
  const user = userEvent.setup();
  const onCreate = vi.fn();
  render(<ProjectForm onCreate={onCreate} />);

  await user.type(screen.getByLabelText(/project name/i), "Portal");
  await user.click(screen.getByRole("button", { name: /create project/i }));

  expect(onCreate).toHaveBeenCalledWith({ name: "Portal" });
});`
      ),
    ],
  },
  {
    label: "TypeScript",
    path: "/learn/typescript",
    icon: Braces,
    description: "Add static types to React and JavaScript applications.",
    intro:
      "TypeScript is a practical core skill for modern React development. It checks JavaScript code before runtime and improves editor feedback, refactoring, and API contracts. Learn the type system gradually; use inference where it is clear and explicit types at important boundaries such as component props and backend responses.",
    concepts: [
      lesson(
        "1. Types, inference, and safe values",
        "TypeScript infers many types from assigned values and checks that operations make sense. Types are erased during compilation and do not validate network input at runtime. Start with strings, numbers, booleans, arrays, object shapes, and union types. Use unknown rather than any for data whose shape has not yet been verified.",
        [
          "Create or use a TypeScript Vite project with the React TypeScript template.",
          "Hover variables in the editor to inspect inferred types.",
          "Add explicit types where inference is unclear or a public contract matters.",
          "Run the type check and fix reported errors instead of suppressing them.",
        ],
        [
          "TypeScript types do not exist at runtime.",
          "Prefer unknown to any for untrusted data and narrow it with checks.",
          "Use strict mode and avoid blanket type assertions.",
        ],
        "values.ts",
        "TypeScript",
        `const courseName = "TypeScript";
const lessonCount = 8;
const topics: string[] = ["types", "functions", "unions"];

type Status = "loading" | "ready" | "error";
let status: Status = "loading";`
      ),
      lesson(
        "2. Interfaces, unions, and narrowing",
        "Object types describe the shape of values, and union types model values that may be one of several alternatives. Narrow a union with typeof checks, discriminant fields, or in-operator checks before using a value. A discriminated union is especially useful for UI states because each state can carry only the data that applies to it.",
        [
          "Describe stable object shapes with a type alias or interface.",
          "Represent alternatives with a union.",
          "Add a discriminant field such as status and narrow on it.",
          "Handle every branch so adding a new case reveals missing logic.",
        ],
        [
          "Types are structural: compatible object shapes can be used interchangeably.",
          "A type assertion changes the compiler's belief, not the actual runtime value.",
          "Use exhaustive checks for important state machines.",
        ],
        "result.ts",
        "TypeScript",
        `type LoadResult<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function messageFor(result: LoadResult<string[]>) {
  if (result.status === "success") return result.data.length;
  if (result.status === "error") return result.message;
  return "Loading";
}`
      ),
      lesson(
        "3. Type React component props",
        "Typing component props documents the component's public API and lets the compiler catch missing or incorrectly typed values. Type event handlers through React's event types or infer them from JSX. Use children when a component wraps other UI. Keep prop types small and intentional; do not over-model internal values that consumers should not provide.",
        [
          "Define a props type or interface above the component.",
          "Type callbacks by their inputs and return values.",
          "Use ReactNode for renderable children when the component accepts content.",
          "Let JSX infer standard input event types when possible.",
        ],
        [
          "TypeScript verifies code relationships but does not validate JSON received from the API.",
          "Prefer explicit domain types over broad Record<string, any> shapes.",
          "Use a discriminated union for mutually exclusive component modes.",
        ],
        "Button.tsx",
        "TSX",
        `import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ children, disabled = false, onClick }: ButtonProps) {
  return <button disabled={disabled} onClick={onClick}>{children}</button>;
}`
      ),
      lesson(
        "4. API types and runtime validation",
        "A TypeScript interface can describe the expected Spring Boot response, making property access safer across the app. However, the type is only a compile-time promise: malformed JSON can still arrive. Treat external data as unknown and validate it at runtime with explicit checks or a schema-validation library. Keep request and response types aligned with backend DTOs.",
        [
          "Define a TypeScript type that matches the backend response DTO.",
          "Use unknown at the network boundary before validating.",
          "Validate required fields and handle unexpected API responses.",
          "Share a schema or generate types from an OpenAPI contract when the project needs stronger synchronization.",
        ],
        [
          "Never use a type assertion as a substitute for checking untrusted API data.",
          "Keep API error responses typed as carefully as success responses.",
          "Backend validation remains authoritative even if the frontend also validates.",
        ],
        "project.ts",
        "TypeScript",
        `type Project = { id: number; name: string };

function parseProject(value: unknown): Project {
  if (
    typeof value !== "object" || value === null ||
    !("id" in value) || typeof value.id !== "number" ||
    !("name" in value) || typeof value.name !== "string"
  ) {
    throw new Error("Invalid project response");
  }
  return { id: value.id, name: value.name };
}`
      ),
      lesson(
        "5. Generics and reusable data utilities",
        "Generics let a function or type work with multiple value types while preserving the relationship between inputs and outputs. They are common in collections, API result types, and reusable hooks. Start with simple generic functions; avoid complex conditional types until a concrete problem needs them. A well-designed generic makes the caller's type more precise without requiring assertions.",
        [
          "Identify a utility that genuinely works with multiple types.",
          "Add a type parameter and connect it to the input and result.",
          "Let the caller infer the type where possible.",
          "Add tests for the runtime behavior; type checking alone does not test logic.",
        ],
        [
          "Generics preserve information that would otherwise be lost to any.",
          "Use constraints only when the implementation needs a capability.",
          "Favor straightforward types that teammates can read.",
        ],
        "identity.ts",
        "TypeScript",
        `function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

const firstName = first(["Ava", "Kai"]);
const firstId = first([101, 202]);`
      ),
    ],
  },
  {
    label: "REST APIs",
    path: "/learn/rest-apis",
    icon: Globe2,
    description:
      "Design and consume the contract between React and Spring Boot.",
    intro:
      "REST and HTTP are the contract between a React frontend and Spring Boot backend. Master resource paths, methods, status codes, JSON DTOs, validation, authentication, and API documentation before adding complex integrations.",
    concepts: [
      lesson(
        "1. HTTP and resource-oriented design",
        "An API exposes resources over HTTP. Use stable noun-based paths and let the HTTP method express the operation. GET retrieves, POST creates or initiates, PUT replaces, PATCH partially updates, and DELETE removes. A clear API gives clients predictable status codes and does not rely on hidden side effects in a read request.",
        [
          "List the resources in the product, such as users, projects, and tasks.",
          "Choose a plural URL for each collection and use IDs for individual resources.",
          "Map operations to appropriate methods and status codes.",
          "Keep read operations safe and make writes explicit.",
        ],
        [
          "GET /api/projects reads a collection; GET /api/projects/{id} reads one item.",
          "POST to a collection commonly creates a resource and returns 201 Created.",
          "Use 400 for invalid input, 401 for unauthenticated, 403 for forbidden, and 404 for missing resources.",
        ],
        "routes.txt",
        "HTTP",
        `GET    /api/projects       -> 200 OK
GET    /api/projects/42    -> 200 OK
POST   /api/projects       -> 201 Created
PATCH  /api/projects/42    -> 200 OK
DELETE /api/projects/42    -> 204 No Content`
      ),
      lesson(
        "2. JSON contracts and DTOs",
        "JSON is a common representation for API requests and responses. A DTO defines the fields and formats the API accepts or returns, independently from database entities. Document required fields, nullability, formats, and error responses. Version or evolve the contract carefully so an existing frontend does not unexpectedly break when the backend changes.",
        [
          "Define request and response DTOs in Spring Boot.",
          "Use explicit field names and consistent date/time formats.",
          "Document which properties are required and which may be absent or null.",
          "Keep persistence entities private and map them to public response types.",
        ],
        [
          "Do not return password hashes or internal database fields.",
          "Treat JSON from the network as untrusted input.",
          "Use OpenAPI to document larger APIs and generate clients when useful.",
        ],
        "create-project.json",
        "JSON",
        `{
  "name": "Developer portal",
  "description": "Internal learning project"
}

{
  "id": 42,
  "name": "Developer portal",
  "createdAt": "2026-11-08T10:00:00Z"
}`
      ),
      lesson(
        "3. Validation, errors, and pagination",
        "Clients need predictable failures as much as successful responses. Spring Boot should validate incoming data, return appropriate status codes, and use a consistent error representation. Collection endpoints should support pagination and stable ordering so clients do not need to download an unlimited result set. Avoid exposing stack traces or implementation details in production error bodies.",
        [
          "Validate input with Bean Validation in Spring Boot.",
          "Map known failures to consistent status and error-body formats.",
          "Add page, size, sort, or cursor parameters for large collections.",
          "Set limits and test empty pages, invalid filters, and missing records.",
        ],
        [
          "Client validation helps users but server validation protects the system.",
          "Do not return 200 with a success-shaped error object for a failed request.",
          "Use stable sorting so pagination does not duplicate or skip rows unexpectedly.",
        ],
        "error.json",
        "JSON",
        `{
  "status": 400,
  "error": "Validation failed",
  "fieldErrors": [
    { "field": "name", "message": "Name is required" }
  ]
}`
      ),
      lesson(
        "4. Consume an API from React",
        "React should represent request lifecycle states explicitly: loading, success, empty, and error. Centralize base URL and common headers in an API module. Check response.ok when using fetch because HTTP 404 and 500 responses still resolve as fetch promises. Cancel stale requests and never put backend secrets in public frontend environment variables.",
        [
          "Create one API module for the base URL and reusable request functions.",
          "Call requests from an event handler or a data-loading abstraction.",
          "Check HTTP status before parsing success data.",
          "Display loading, empty, and actionable error states.",
          "Cancel outdated requests when route parameters change or a component unmounts.",
        ],
        [
          "CORS is configured on the backend/development proxy, not bypassed by frontend code.",
          "Do not send a password or token to an unexpected origin.",
          "Use environment variables only for public build-time configuration.",
        ],
        "api.js",
        "JavaScript",
        `export async function requestJson(path, options = {}) {
  const response = await fetch(\`/api\${path}\`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) {
    throw new Error(\`API request failed: \${response.status}\`);
  }
  return response.status === 204 ? null : response.json();
}`
      ),
      lesson(
        "5. Authentication, CORS, and API documentation",
        "Authentication proves a caller's identity; authorization checks what that identity may do. Spring Security must enforce access on every protected operation. CORS controls which browser origins may read responses and is not an authentication mechanism. An OpenAPI description makes endpoints, schemas, and security requirements discoverable to frontend developers and API tools.",
        [
          "Choose a suitable session or token approach for the application threat model.",
          "Protect backend routes and verify resource ownership on the server.",
          "Allow only trusted frontend origins in CORS configuration.",
          "Document routes and schemas with OpenAPI and test the documented contract.",
        ],
        [
          "Never trust a hidden button or frontend route guard as authorization.",
          "Do not put long-lived sensitive tokens in unsafe storage.",
          "Use HTTPS outside local development and redact credentials from logs.",
        ],
        "security-checklist.txt",
        "Text",
        `React UI: guides the user and handles request state.
Spring Security: authenticates and authorizes every request.
CORS: allows trusted browser origins to read responses.
OpenAPI: documents the API contract for people and tools.`
      ),
    ],
  },
  {
    label: "Git & GitHub",
    path: "/learn/git",
    icon: GitBranch,
    description: "Track changes, collaborate safely, and review code.",
    intro:
      "Git is the version-control foundation for professional full-stack work. Learn clean commits, branches, conflict resolution, code review, and safe collaboration before working on a team repository.",
    concepts: [
      lesson(
        "1. Repository, working tree, and commits",
        "Git records snapshots of tracked files as commits. The working tree contains your current edits, the staging area selects changes for the next commit, and the repository stores commit history. Small focused commits are easier to review and revert. A good commit message explains the intent of the change.",
        [
          "Run git status before and after changes.",
          "Inspect edits with git diff.",
          "Stage only related files with git add.",
          "Commit a focused change with a clear message.",
        ],
        [
          "A commit is local until it is pushed to a remote.",
          "Do not stage secrets, generated output, or unrelated files.",
          "Review the staged diff before committing.",
        ],
        "terminal",
        "Shell",
        `git status
git diff
git add src/components/ProjectList.jsx
git diff --staged
git commit -m "Add project list empty state"`
      ),
      lesson(
        "2. Branches and pull requests",
        "A branch is a lightweight pointer that lets you develop a change independently. Teams use short-lived branches and pull requests to review, test, and discuss changes before merging. Keep a branch focused on one task, push it to the shared remote, and make the pull request description explain what changed and how it was verified.",
        [
          "Update your base branch before starting work.",
          "Create a descriptive feature branch.",
          "Commit and push the focused change.",
          "Open a pull request with context, screenshots when useful, and test results.",
          "Address review comments and merge using the team's convention.",
        ],
        [
          "Avoid committing directly to a protected shared branch.",
          "Keep pull requests small enough to review carefully.",
          "Do not force-push shared commits without coordinating with collaborators.",
        ],
        "terminal",
        "Shell",
        `git switch main
git pull --ff-only
git switch -c feature/project-search
# make and commit a focused change
git push -u origin feature/project-search`
      ),
      lesson(
        "3. Merge conflicts and history",
        "A merge conflict means Git cannot automatically combine edits to the same part of a file. Resolve it by understanding both changes, editing the file to the intended result, and running tests. Rebasing can create a linear local history, while merging records the integration commit; follow repository policy and do not rewrite history that others rely on.",
        [
          "Read the conflict markers and inspect the surrounding code.",
          "Decide how both intended changes should be represented.",
          "Remove conflict markers, run tests, and review the result.",
          "Mark the file resolved and complete the merge or rebase.",
        ],
        [
          "Do not choose 'ours' or 'theirs' blindly.",
          "Never resolve a conflict without checking the resulting behavior.",
          "Avoid force-pushing rewritten shared history.",
        ],
        "conflict-example.txt",
        "Text",
        `<<<<<<< current
const pageSize = 20;
=======
const pageSize = 25;
>>>>>>> incoming

// Choose the intended value, remove all markers,
// then test and commit the resolved file.`
      ),
      lesson(
        "4. Ignore rules, secrets, and team workflow",
        "A .gitignore file prevents generated files and local-only configuration from being tracked. It does not remove a file that Git already tracks. Secrets must never be committed; if one leaks into history, revoke and rotate it immediately. Consistent formatting, lint, and tests help reviewers focus on behavior rather than avoidable style differences.",
        [
          "Ignore node_modules, build output, local environment files, and IDE state as appropriate.",
          "Check git status and staged diffs for accidental credentials.",
          "Use a pull request checklist for tests, migrations, and documentation.",
          "Rotate any secret that was accidentally committed; deleting it from the latest commit is not enough.",
        ],
        [
          "Use secret managers or protected environment settings for credentials.",
          "Do not ignore source files or lockfiles without a project reason.",
          "Keep formatting and lint conventions consistent across the team.",
        ],
        ".gitignore",
        "Text",
        `node_modules/
dist/
target/
.env
.env.*
!.env.example`
      ),
    ],
  },
  {
    label: "Testing",
    path: "/learn/testing",
    icon: FlaskConical,
    description: "Verify frontend and backend behavior at the right level.",
    intro:
      "Testing gives a Java full-stack developer confidence to change code safely. Learn the testing pyramid: fast unit tests, focused integration tests, and a small set of end-to-end user journeys. Use JUnit and Spring test support on the backend, and Vitest plus Testing Library on the React frontend.",
    concepts: [
      lesson(
        "1. Testing strategy and test design",
        "A useful test describes observable behavior, has isolated setup, performs an action, and checks an outcome. Unit tests are fast and focused; integration tests verify component boundaries such as database repositories or HTTP controllers; end-to-end tests exercise a complete user flow. Choose the narrowest level that proves the requirement.",
        [
          "Write down the behavior and important edge cases before implementation.",
          "Test success, invalid input, missing data, and permission failures as appropriate.",
          "Use descriptive names that explain the scenario and expected result.",
          "Keep tests deterministic and independent of execution order.",
        ],
        [
          "Do not test private implementation details that users cannot observe.",
          "A test that only asserts the mock was called may not prove the feature works.",
          "Avoid slow end-to-end tests for logic that a small unit test can verify.",
        ],
        "test-plan.txt",
        "Text",
        `Feature: create a project
- accepts a valid name and returns the created project
- rejects a blank name with a client error
- rejects an unauthenticated request
- persists the owner and project relationship`
      ),
      lesson(
        "2. Backend unit and web-layer tests",
        "JUnit tests can verify Java business logic without starting the entire application. Spring MVC tests can exercise controllers with MockMvc and a focused application context. Mock external collaborators at clear boundaries, but use real validation and serialization where those are part of the behavior being tested.",
        [
          "Unit-test service rules using plain JUnit when possible.",
          "Use @WebMvcTest and MockMvc for controller behavior.",
          "Assert HTTP status, response fields, and validation errors.",
          "Use @SpringBootTest only when the integrated context is what you need to verify.",
        ],
        [
          "Prefer constructor-injected dependencies because they are straightforward to replace in tests.",
          "Do not mock the class whose behavior the test is meant to verify.",
          "Include authorization tests for protected endpoints.",
        ],
        "ProjectServiceTest.java",
        "Java",
        `@Test
void rejectsBlankProjectName() {
    var service = new ProjectService(repository);

    assertThrows(IllegalArgumentException.class,
        () -> service.create("  "));
}`
      ),
      lesson(
        "3. React component and interaction tests",
        "Frontend tests should resemble how a person uses the interface. Testing Library encourages queries by accessible role and name, and user-event simulates realistic interactions. Verify visible content, loading/error states, form validation, and callbacks or network behavior without relying on component internals.",
        [
          "Render the component with realistic props.",
          "Find controls by role and accessible name.",
          "Perform actions with userEvent.",
          "Assert visible outcomes and accessible feedback.",
        ],
        [
          "Prefer getByRole and getByLabelText over selectors tied to implementation.",
          "Do not use arbitrary sleeps; await the expected UI state.",
          "Test keyboard and validation behavior when they matter to the feature.",
        ],
        "LoginForm.test.jsx",
        "JSX",
        `test("shows a required message for an empty name", async () => {
  const user = userEvent.setup();
  render(<ProjectForm onCreate={vi.fn()} />);

  await user.click(screen.getByRole("button", { name: /create/i }));

  expect(screen.getByText(/name is required/i)).toBeVisible();
});`
      ),
      lesson(
        "4. Database and end-to-end tests",
        "Database behavior can differ from an in-memory substitute, especially for SQL dialects, constraints, and transactions. Use repository tests with a representative database; Testcontainers can start disposable database instances during tests. End-to-end tests should cover a few critical user journeys from browser through API, while keeping setup repeatable and test data isolated.",
        [
          "Use an isolated database/schema per test run.",
          "Test migrations against the target database engine.",
          "Use Testcontainers when database compatibility matters.",
          "Automate a small number of browser journeys such as login and project creation.",
        ],
        [
          "Never run test cleanup against production data.",
          "Avoid shared mutable test fixtures that make tests order-dependent.",
          "Run reliable tests in CI before merging.",
        ],
        "test-boundaries.txt",
        "Text",
        `Unit: service validation and business rules
Integration: Spring MVC, repository, transaction behavior
End-to-end: sign in -> create project -> see project
Every test: isolated data, deterministic setup, useful failure output`
      ),
    ],
  },
  {
    label: "Docker",
    path: "/learn/docker",
    icon: Container,
    description:
      "Package and run the React and Spring Boot stack consistently.",
    intro:
      "Docker packages an application with a predictable runtime environment. For a Java full-stack developer, learn image layers, containers, environment configuration, networking, and Compose. Start with development and test workflows; production images need additional security, size, and operational care.",
    concepts: [
      lesson(
        "1. Images, containers, and registries",
        "An image is a packaged filesystem and startup configuration; a container is a running instance of an image. Images are built from layers and can be stored in a registry. Containers should be treated as replaceable processes: persist important data in managed volumes or external services, and pass environment-specific configuration at runtime.",
        [
          "Install Docker Desktop or a supported Docker Engine.",
          "Run docker run hello-world to verify the installation.",
          "Build an image from a Dockerfile and start a container.",
          "Inspect logs, ports, and environment without assuming the container is a virtual machine.",
        ],
        [
          "Do not store passwords or tokens in image layers.",
          "Use explicit image versions and update them regularly.",
          "Container data disappears with the container unless intentionally persisted.",
        ],
        "terminal",
        "Shell",
        `docker build -t catalog-api .
docker run --rm -p 8080:8080 catalog-api
docker ps
docker logs <container-id>`
      ),
      lesson(
        "2. Containerize Spring Boot and React",
        "A Spring Boot executable JAR can run in a Java runtime image. A React application is built into static assets and can be served by a web server or platform. Multi-stage builds separate compilers from runtime images, reducing the final image and attack surface. Run as a non-root user where practical and keep logs on standard output.",
        [
          "Build the Spring Boot JAR with the project's Maven wrapper.",
          "Build the React assets with npm run build.",
          "Use multi-stage Dockerfiles to keep build tools out of runtime images.",
          "Run locally and verify ports, health, static routes, and API paths.",
        ],
        [
          "Use a supported JRE compatible with the project's Java version.",
          "Do not copy .env files, credentials, or development-only dependencies into the image.",
          "Keep the application configurable through runtime environment variables.",
        ],
        "Dockerfile",
        "Docker",
        `FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/catalog-api.jar app.jar
EXPOSE 8080
USER 10001
ENTRYPOINT ["java", "-jar", "app.jar"]`
      ),
      lesson(
        "3. Compose, networking, and persistent data",
        "Docker Compose describes related local services such as the Spring API and MySQL database. Services discover one another by Compose service name on a private network. A database needs a persistent volume for local development, and the API should wait for database readiness rather than assuming container startup means the database is ready.",
        [
          "Define API and database services in compose.yaml.",
          "Use service names as hostnames inside the Compose network.",
          "Persist database files with a named volume.",
          "Pass credentials through local ignored environment configuration and use health checks.",
        ],
        [
          "Inside a container, localhost refers to that container, not another service.",
          "A depends_on rule alone may not guarantee that the database is ready to accept connections.",
          "Use disposable local credentials only; never reuse production secrets.",
        ],
        "compose.yaml",
        "YAML",
        `services:
  db:
    image: mysql:8.4
    environment:
      MYSQL_DATABASE: app
      MYSQL_USER: app
      MYSQL_PASSWORD: local-only
      MYSQL_ROOT_PASSWORD: local-root-only
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:`
      ),
      lesson(
        "4. Secure, small, and observable images",
        "A container image is part of the software supply chain. Keep it small, update base images, scan dependencies, avoid root, and minimize included tools. Configure resource limits and health checks in the deployment platform. Do not treat a container boundary as a substitute for application authentication, network controls, or secret management.",
        [
          "Use a minimal maintained runtime base image.",
          "Run the process as a non-root user.",
          "Scan image and dependencies in CI and rebuild when security updates are needed.",
          "Configure health checks, resource limits, logs, and secret injection in the runtime platform.",
        ],
        [
          "Never bake credentials into Dockerfile ARG or ENV values.",
          "Pin and regularly update base images according to team policy.",
          "Expose only necessary ports and endpoints.",
        ],
        ".dockerignore",
        "Text",
        `node_modules
dist
target
.git
.env
.env.*
!.env.example`
      ),
    ],
  },
  {
    label: "CI/CD",
    path: "/learn/ci-cd",
    icon: Workflow,
    description: "Automate quality checks and repeatable releases.",
    intro:
      "Continuous integration and delivery automate the path from reviewed code to a deployable artifact. A modern Java full-stack pipeline should verify frontend and backend code, run tests, build immutable artifacts, scan dependencies, and promote the same artifact through environments.",
    concepts: [
      lesson(
        "1. Continuous integration fundamentals",
        "Continuous integration runs the same quality checks on every proposed change. Fast feedback helps catch broken builds, lint problems, failing tests, and unsafe dependency changes before merge. A pipeline should be reproducible, report clear failures, and use the repository's lockfiles and wrapper scripts.",
        [
          "Run frontend lint and production build.",
          "Run backend Maven tests and package the application.",
          "Cache dependencies safely to improve speed without hiding failures.",
          "Require successful checks before merging protected branches.",
        ],
        [
          "CI secrets must be scoped and unavailable to untrusted pull-request code when possible.",
          "Keep pipelines deterministic and fail explicitly when a required check fails.",
          "Do not skip tests just to make a pipeline green.",
        ],
        "ci-checks.txt",
        "Text",
        `Frontend:
  npm ci
  npm run lint
  npm run build

Backend:
  ./mvnw verify`
      ),
      lesson(
        "2. Build artifacts, releases, and environments",
        "A release should promote a known artifact rather than rebuilding different code for each environment. Keep configuration external, tag releases consistently, and use environment-specific permissions. A deployment process should support health verification and rollback to a previously working artifact.",
        [
          "Build an artifact once after tests pass.",
          "Store it in a trusted registry with an immutable version or digest.",
          "Deploy the same artifact to staging and production with different external configuration.",
          "Verify health and important user flows after deployment.",
          "Keep a rollback path and monitor the release.",
        ],
        [
          "Do not store production credentials in source files or public build variables.",
          "A successful deployment command does not prove that the app is healthy.",
          "Use database migrations that are compatible with the rollout strategy.",
        ],
        "release-flow.txt",
        "Text",
        `commit -> lint/tests -> build -> scan -> publish artifact
       -> deploy staging -> verify -> approve -> deploy production
       -> monitor -> rollback if health checks fail`
      ),
      lesson(
        "3. Secrets, permissions, and supply-chain checks",
        "CI/CD systems can access source, packages, and deployment credentials, so workflows should use least privilege. Use short-lived identity federation where supported, scope secrets to the environment, and pin third-party actions or reusable workflow dependencies according to team policy. Scan dependencies and container images, and review alerts rather than blindly accepting upgrades.",
        [
          "Give jobs only the repository permissions they need.",
          "Store credentials in protected environment/secret settings, not workflow files.",
          "Pin external workflow actions and review updates.",
          "Scan and update dependencies and container base images.",
        ],
        [
          "Never echo secrets into logs.",
          "Avoid exposing deployment secrets to untrusted contributions.",
          "Keep an auditable release history and restrict production approvals.",
        ],
        "pipeline-security.txt",
        "Text",
        `Least privilege: minimal job permissions
Secrets: protected environment storage
Dependencies: lockfiles + review + scanning
Release: approvals + audit trail + rollback`
      ),
    ],
  },
  {
    label: "Cloud fundamentals",
    path: "/learn/cloud",
    icon: Cloud,
    description: "Understand how to operate full-stack services in the cloud.",
    intro:
      "Cloud platforms provide compute, managed databases, object storage, networking, and observability. Learn the common building blocks before choosing a vendor. A production Java full-stack system needs secure identity, reliable data, controlled networking, backups, logs, health checks, and cost awareness.",
    concepts: [
      lesson(
        "1. Compute, networking, and managed services",
        "A deployed application needs compute to run, networking to receive requests, and a database or other data service. Managed services reduce operational work but still need access control, backups, monitoring, and capacity planning. Understand public versus private networking and place databases behind private access where the platform allows it.",
        [
          "Choose a runtime that supports the Java version and frontend deployment output.",
          "Separate public entry points from private application and database services.",
          "Use a managed relational database for production data when it meets the requirements.",
          "Document service dependencies and failure behavior.",
        ],
        [
          "Do not expose database ports publicly without a strong, justified design.",
          "Keep frontend static hosting and backend API origins explicit.",
          "Design for a service restart and transient network failures.",
        ],
        "architecture.txt",
        "Text",
        `Browser -> HTTPS edge/static frontend
        -> Spring Boot API
        -> private managed MySQL

Secrets -> managed secret store
Logs/metrics -> central observability service`
      ),
      lesson(
        "2. Identity, secrets, and data protection",
        "Cloud identity controls which people and workloads can access resources. Prefer workload identities and short-lived credentials over long-lived access keys. Store database passwords, signing keys, and third-party tokens in a managed secret store and grant each service only the specific secret it needs. Encrypt network traffic and plan data backup and recovery.",
        [
          "Use least-privilege roles for developers, CI, and deployed services.",
          "Use workload identity or short-lived credentials where available.",
          "Store and rotate secrets in a managed secret store.",
          "Enable TLS and establish tested backup and restore procedures.",
        ],
        [
          "Do not ship cloud credentials in React code.",
          "A backup is useful only if restore has been tested.",
          "Audit access to sensitive data and management operations.",
        ],
        "security-basics.txt",
        "Text",
        `React bundle: public configuration only
Spring Boot workload: least-privilege identity
Database credential: secret manager reference
Transport: HTTPS/TLS
Recovery: scheduled backups + restore test`
      ),
      lesson(
        "3. Reliability, observability, and cost",
        "Production readiness includes more than uptime. Logs explain events, metrics show trends, and traces connect a request across services. Health checks should distinguish whether a process is alive from whether it can serve traffic. Set alerts for user-impacting symptoms and review capacity and cost regularly. Reliability goals should match the application's importance.",
        [
          "Expose secured health checks and record useful structured logs.",
          "Track latency, error rate, traffic, and resource saturation.",
          "Trace important requests across the frontend/API/data boundary where possible.",
          "Set alerts on actionable symptoms and define who responds.",
          "Review resource use and costs after releases.",
        ],
        [
          "Never include passwords, tokens, or sensitive payloads in logs.",
          "Avoid noisy alerts that do not lead to an action.",
          "Test recovery, restore, and rollback procedures before an incident.",
        ],
        "operations-checklist.txt",
        "Text",
        `Monitor:
- request latency and error rate
- API and database health
- CPU, memory, and connection saturation
- deployment version and recent changes
- backup completion and restore readiness`
      ),
    ],
  },
];
