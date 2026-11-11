import { codeSamples } from "../../data/codeSamples";
import CodeBlock from "../common/CodeBlock";

const sectionClass = "border-b border-slate-200 pb-6 dark:border-slate-800";
const stepClass =
  "text-xs font-bold tracking-widest text-teal-800 dark:text-teal-300";
const titleClass = "mb-2 mt-2 text-lg font-bold text-slate-950 dark:text-white";
const bodyClass = "text-sm leading-6 text-slate-600 dark:text-slate-300";

export default function ApiGuide() {
  return (
    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
      <div className="space-y-5">
        <div className="flex gap-3 rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-950 dark:bg-cyan-950/40">
          <div>
            <strong className="text-sm text-slate-950 dark:text-white">
              One configured client. Consistent requests.
            </strong>
            <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
              Use an Axios instance to centralize the base URL, timeouts, auth
              headers, and error handling.
            </p>
          </div>
        </div>
        <section className={sectionClass}>
          <span className={stepClass}>01 / SET UP</span>
          <h2 className={titleClass}>Create a reusable Axios client</h2>
          <p className={bodyClass}>
            Keep API configuration in one module, then import the client
            wherever you need data.
          </p>
          <div className="mt-3">
            <CodeBlock
              code={codeSamples.axios}
              copyKey="axios"
              language="javascript"
            />
          </div>
        </section>
        <section className={sectionClass}>
          <span className={stepClass}>02 / REQUEST LIFECYCLE</span>
          <h2 className={titleClass}>Make requests, handle states</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              [
                "1",
                "Loading",
                "Set an explicit loading state before the request.",
              ],
              ["2", "Success", "Read the response data and update your UI."],
              ["3", "Error", "Show a useful message; prompt again after 401."],
            ].map(([number, title, copy]) => (
              <div
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                key={number}
              >
                <span className="mb-2 grid size-6 place-items-center rounded-md bg-teal-100 text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                  {number}
                </span>
                <b className="text-sm text-slate-900 dark:text-white">
                  {title}
                </b>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {copy}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-100 p-3 font-mono text-xs leading-6 text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            try &#123; const &#123; data &#125; = await api.get("/projects");
            &#125;
            <br />
            catch (error) &#123; setError(getMessage(error)); &#125;
          </div>
        </section>
        <section>
          <span className={stepClass}>03 / BEST PRACTICES</span>
          <h2 className={titleClass}>Keep your client reliable</h2>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {[
              ["Set a timeout", "Prevent requests from hanging forever."],
              ["Normalize errors", "Make server messages easy to display."],
              ["Use HTTPS", "Protect tokens and data in transit."],
              [
                "Use a shared API client",
                "Reuse a base URL and auth interceptors.",
              ],
            ].map(([title, copy]) => (
              <div
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                key={title}
              >
                <b className="text-sm text-slate-900 dark:text-white">
                  {title}
                </b>
                <span className="block mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {copy}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <aside className="space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 mt-2 text-sm font-bold text-slate-900 dark:text-white">
            Demo endpoints
          </h3>
          {[
            ["GET", "/api/health"],
            ["POST", "/api/auth/login"],
            ["GET", "/api/auth/me"],
            ["GET", "/api/projects"],
          ].map(([method, path]) => (
            <div className="my-3 flex items-center gap-2" key={path}>
              <span
                className={`rounded px-2 py-1 font-mono text-[11px] font-bold ${method === "POST" ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200" : "bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-200"}`}
              >
                {method}
              </span>
              <code className="text-xs text-slate-700 dark:text-slate-200">
                {path}
              </code>
            </div>
          ))}
          <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:text-slate-400">
            Login is public. Current-user and project endpoints require a valid
            JWT.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 mt-2 text-sm font-bold text-slate-900 dark:text-white">
            Axios quick tips
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {[
              "Use params for query strings",
              "Use AbortController for cleanup",
              "Never log access tokens",
              "Keep secrets off the client",
            ].map((item) => (
              <li className="flex gap-2" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
