export const codeSamples = {
  curlLogin: `curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"username":"demo","password":"change-me"}'`,
  headers: `<header className="site-header">
  <a className="brand" href="/">Your product</a>
  <nav aria-label="Main navigation">
    <a href="/docs">Docs</a>
    <a href="/pricing">Pricing</a>
  </nav>
  <Button variant="primary">Get started</Button>
</header>`,
  buttons: `<Button variant="primary" size="md" onClick={save}>
  Save changes
</Button>
<Button variant="secondary" icon={<Plus />}>
  New project
</Button>
<Button variant="ghost" disabled>
  Unavailable
</Button>`,
  cards: `<article className="rounded-xl border bg-white p-4 shadow-sm">
  <span className="rounded-md bg-teal-100 px-2 py-1 text-xs font-semibold">
    ACTIVE
  </span>
  <h3 className="mt-3 text-base font-bold">Customer portal</h3>
  <p className="mt-1 text-sm text-slate-600">
    A short summary of this project and its current status.
  </p>
  <a className="mt-4 inline-flex items-center gap-1 font-semibold" href="/projects/1">
    View project <ArrowUpRight size={15} />
  </a>
</article>`,
  templates: `<div className="grid min-h-screen sm:grid-cols-[220px_1fr]">
  <aside className="border-r p-4">
    <a className="font-bold" href="/">Devspace</a>
    <nav aria-label="Workspace">
      <a href="/overview">Overview</a>
      <a href="/projects">Projects</a>
      <a href="/settings">Settings</a>
    </nav>
  </aside>
  <main className="p-6">
    <p className="text-sm text-teal-700">WORKSPACE / OVERVIEW</p>
    <h1 className="mt-2 text-2xl font-bold">Good morning, Jordan</h1>
    <p className="mt-2 text-slate-600">Here is your project summary.</p>
    <section className="mt-6 grid gap-4 sm:grid-cols-2">
      <ProjectSummaryCard />
      <ActivityCard />
    </section>
  </main>
</div>`,
  axios: `import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = ["Bearer", token].join(" ");
  return config;
});

const { data } = await api.get("/projects");`,
  lists: `<section>
  <h2 className="text-lg font-bold">Recent activity</h2>
  <ul className="mt-3 divide-y">
    {activities.map((activity) => (
      <li key={activity.id} className="py-3">
        <p className="font-medium">{activity.title}</p>
        <p className="mt-1 text-sm text-slate-500">{activity.detail}</p>
      </li>
    ))}
  </ul>
</section>

<ol className="mt-6 space-y-3">
  {steps.map((step, index) => (
    <li key={step.id} className="flex items-center gap-3">
      <span>{index + 1}</span>
      {step.label}
    </li>
  ))}
</ol>`,
  table: `<table className="w-full text-left text-sm">
  <caption className="mb-3 text-left">Your latest projects</caption>
  <thead>
    <tr>
      <th scope="col">Project</th>
      <th scope="col">Status</th>
      <th scope="col">Updated</th>
      <th scope="col"><span className="sr-only">Actions</span></th>
    </tr>
  </thead>
  <tbody>
    {projects.map((project) => (
      <tr key={project.id}>
        <th scope="row">{project.name}</th>
        <td>{project.status}</td>
        <td>{project.updatedAt}</td>
        <td><a href={\`/projects/\${project.id}\`}>Open</a></td>
      </tr>
    ))}
  </tbody>
</table>`,
  jwt: `SecretKey key = Keys.hmacShaKeyFor(
    Decoders.BASE64.decode(jwtSecret)
);

Claims claims = Jwts.parser()
    .verifyWith(key)
    .build()
    .parseSignedClaims(token)
    .getPayload();

// Verify the signature and expiry on every protected request.
// Keep token claims minimal and access tokens short-lived.`,
};
