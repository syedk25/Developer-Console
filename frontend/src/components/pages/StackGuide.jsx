import {
  ArrowUpRight, Braces, Database, FlaskConical, Gauge, Globe2,
  Layers3, LockKeyhole, Sparkles, Terminal,
} from "lucide-react";

const stack = [
  { icon: <Layers3 size={19} />, title: "Frontend", text: "React + JSX", detail: "Build accessible interfaces from reusable components." },
  { icon: <Globe2 size={19} />, title: "HTTP client", text: "Axios", detail: "Centralize request configuration, interceptors, and error handling." },
  { icon: <Terminal size={19} />, title: "Backend API", text: "Java + Spring Boot", detail: "Validate inputs, expose REST endpoints, and return predictable errors." },
  { icon: <LockKeyhole size={19} />, title: "Authentication", text: "JWT + BCrypt", detail: "Hash passwords, sign short-lived tokens, and protect route middleware." },
  { icon: <Database size={19} />, title: "Data layer", text: "MySQL + Spring Data JPA", detail: "Persist users and projects in MySQL with repository-based data access." },
  { icon: <FlaskConical size={19} />, title: "Quality", text: "Tests + CI", detail: "Test components, API contracts, auth boundaries, and production builds." },
  { icon: <Gauge size={19} />, title: "Operations", text: "Deploy + observe", detail: "Use HTTPS, managed secrets, health checks, structured logs, and alerts." },
];

export default function StackGuide() {
  return <>
    <div className="mb-4 flex gap-3 rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-950 dark:bg-cyan-950/40"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"><Sparkles size={20} /></span><div><strong className="text-sm text-slate-950 dark:text-white">A pragmatic full-stack blueprint</strong><p className="mt-1 text-sm leading-5 text-slate-700 dark:text-slate-300">The Spring Boot API authenticates users and reads projects from MySQL. Configure your credentials in backend/.env.</p></div></div>
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {stack.map((item, index) => <div className="flex min-h-20 items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 dark:border-slate-800 sm:gap-4" key={item.title}>
        <span className="w-6 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{String(index + 1).padStart(2, "0")}</span>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300">{item.icon}</span>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3><span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-800 dark:bg-violet-950 dark:text-violet-200">{item.text}</span></div><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">{item.detail}</p></div>
        <ArrowUpRight size={16} className="text-slate-400" />
      </div>)}
    </div>
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><Braces size={16} className="text-teal-700 dark:text-teal-300" />Next steps</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950"><span className="text-xs font-bold text-teal-800 dark:text-teal-300">01</span><b className="mt-2 block text-sm text-slate-900 dark:text-white">Harden authentication</b><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">Apply login rate limiting and refresh-token rotation.</p></div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950"><span className="text-xs font-bold text-teal-800 dark:text-teal-300">02</span><b className="mt-2 block text-sm text-slate-900 dark:text-white">Add automated tests</b><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">Cover auth failures and protected route behavior.</p></div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950"><span className="text-xs font-bold text-teal-800 dark:text-teal-300">03</span><b className="mt-2 block text-sm text-slate-900 dark:text-white">Prepare production</b><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">Configure secrets, rate limits, and observability.</p></div>
      </div>
    </div>
  </>;
}
