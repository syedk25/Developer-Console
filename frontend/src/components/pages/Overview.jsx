import {
  Activity,
  ArrowRight,
  Braces,
  Fingerprint,
  Globe2,
  Layers3,
  LockKeyhole,
  Package,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from "../../data/navigation";
import { useNavigateToSection } from "../../hooks/useAppNavigation";
import { loadProjects } from "../../store/appSlice";
import ToolCard from "../common/ToolCard";

export default function Overview() {
  const dispatch = useDispatch();
  const navigateToSection = useNavigateToSection();
  const token = useSelector((state) => state.app.accessToken);
  const projects = useSelector((state) => state.app.projects);
  const apiError = useSelector((state) => state.app.apiError);
  const projectsStatus = useSelector((state) => state.app.projectsStatus);
  return (
    <>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Your toolkit
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Jump into a workflow or explore a reference.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-600 dark:text-teal-300"
          onClick={() => navigateToSection(navigation.STACK.label)}
        >
          Browse all tools <ArrowRight size={16} />
        </button>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 ">
        <ToolCard
          icon={<Layers3 size={19} />}
          tone="purple"
          tag="UI LIBRARY"
          title="Component gallery"
          text="Headers, buttons, forms, alerts, and more."
          onClick={() => navigateToSection(navigation.COMPONENTS.label)}
        />
        <ToolCard
          icon={<Globe2 size={19} />}
          tone="blue"
          tag="HTTP CLIENT"
          title="API & Axios"
          text="Interceptors, request patterns, and error handling."
          onClick={() => navigateToSection(navigation.API.label)}
        />
        <ToolCard
          icon={<Fingerprint size={19} />}
          tone="green"
          tag="AUTHENTICATION"
          title="JWT security"
          text="Token lifecycle, verification, and safe storage."
          onClick={() => navigateToSection(navigation.JWT.label)}
        />
        <ToolCard
          icon={<Braces size={19} />}
          tone="orange"
          tag="ENGINEERING"
          title="Full-stack guide"
          text="A practical map from frontend through deployment."
          onClick={() => navigateToSection(navigation.STACK.label)}
        />
      </div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Live API connection
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Try an authenticated request against the Spring Boot API.
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${token ? "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-200" : "border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"}`}
        >
          <span
            className={`size-2 rounded-full ${token ? "bg-teal-500" : "bg-slate-400"}`}
          />
          {token ? "Connected" : "Not connected"}
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-teal-100 px-2 py-1 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
              GET
            </span>
            <code className="text-sm text-slate-800 dark:text-slate-100">
              /api/projects
            </code>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <LockKeyhole size={13} />
              Auth required
            </span>
          </div>
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-teal-700 px-3 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950"
            disabled={projectsStatus === "loading"}
            onClick={
              token
                ? () => dispatch(loadProjects())
                : () => navigateToSection(navigation.API.label)
            }
          >
            <Terminal size={15} />
            {token ? "Send request" : "How to connect"}
            <ArrowRight size={14} />
          </button>
        </div>
        {apiError && (
          <p className="px-4 py-2 text-sm text-rose-700 dark:text-rose-300">
            {apiError}
          </p>
        )}
        {projects.length ? (
          <div className="divide-y divide-slate-100 px-4 dark:divide-slate-800">
            {projects.map((project) => (
              <div
                className="flex min-h-12 items-center gap-3"
                key={project.id}
              >
                <span className="grid size-8 place-items-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  <Package size={16} />
                </span>
                <strong className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {project.name}
                </strong>
                <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-950 dark:text-teal-200">
                  {project.status}
                </span>
                <span className="hidden w-24 text-right text-xs text-slate-500 sm:block dark:text-slate-400">
                  {project.updated}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-20 flex-wrap items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Activity size={18} />
            </span>
            <span>
              {token
                ? "Ready when you are — send a request to load projects."
                : "Connect with the demo account to unlock this endpoint."}
            </span>
            {!token && (
              <button
                className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-teal-800 dark:text-teal-300"
                onClick={() => navigateToSection(navigation.JWT.label)}
              >
                See how auth works <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/70 p-4 dark:border-teal-950 dark:bg-teal-950/30">
        <span className="grid size-10 place-items-center rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
          <ShieldCheck size={19} />
        </span>
        <div className="min-w-52 flex-1">
          <strong className="text-sm text-slate-900 dark:text-white">
            Security-first by default
          </strong>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Tokens stay in memory, credentials are hashed, and the API verifies
            signatures and expiry.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-300"
          onClick={() => navigateToSection(navigation.JWT.label)}
        >
          Review security <ArrowRight size={15} />
        </button>
      </div>
    </>
  );
}
