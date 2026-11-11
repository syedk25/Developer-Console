import {
  ArrowRight,
  Check,
  CircleHelp,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { codeSamples } from "../../data/codeSamples";
import CodeBlock from "../common/CodeBlock";

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";
const stepClass =
  "text-xs font-bold tracking-widest text-teal-800 dark:text-teal-300";

export default function JwtGuide() {
  const checks = [
    [
      "Use a strong secret",
      "Generate it with openssl rand -base64 32 and store it outside source control.",
    ],
    [
      "Keep access tokens short-lived",
      "Use refresh-token rotation and revoke sessions when needed.",
    ],
    [
      "Choose safe browser storage",
      "Prefer Secure, HttpOnly, SameSite cookies for browser sessions; mitigate CSRF.",
    ],
    [
      "Always use HTTPS",
      "Never send credentials or bearer tokens over plaintext transport.",
    ],
    [
      "Validate inputs and rate-limit login",
      "Use generic auth errors and monitor suspicious attempts.",
    ],
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
      <div className="space-y-5">
        <div className="flex gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-950 dark:bg-teal-950/40">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
            <ShieldCheck size={20} />
          </span>
          <div>
            <strong className="text-sm text-slate-950 dark:text-white">
              JWTs are signed, not encrypted.
            </strong>
            <p className="mt-1 text-sm leading-5 text-slate-700 dark:text-slate-300">
              Anyone holding a token can read its payload. Never put passwords,
              secrets, or private data in JWT claims.
            </p>
          </div>
        </div>
        <section className={cardClass}>
          <span className={stepClass}>01 / THE FLOW</span>
          <h2 className="mb-4 mt-2 text-lg font-bold text-slate-950 dark:text-white">
            Issue and verify tokens on the server
          </h2>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className="grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300">
                <LockKeyhole size={19} />
              </span>
              <b className="text-sm text-slate-900 dark:text-white">
                Authenticate
              </b>
              <small className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                Check credentials against BCrypt hashes in MySQL.
              </small>
            </div>
            <ArrowRight size={17} className="hidden text-slate-400 sm:block" />
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className="grid size-10 place-items-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                <Fingerprint size={19} />
              </span>
              <b className="text-sm text-slate-900 dark:text-white">Issue</b>
              <small className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                Spring Boot signs a short-lived access token.
              </small>
            </div>
            <ArrowRight size={17} className="hidden text-slate-400 sm:block" />
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className="grid size-10 place-items-center rounded-xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                <ShieldCheck size={19} />
              </span>
              <b className="text-sm text-slate-900 dark:text-white">Verify</b>
              <small className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                Spring Security checks signature and expiry.
              </small>
            </div>
          </div>
        </section>
        <section>
          <span className={stepClass}>02 / SPRING SECURITY</span>
          <h2 className="mb-2 mt-2 text-lg font-bold text-slate-950 dark:text-white">
            Verify tokens on protected routes
          </h2>
          <p className="mb-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Use a base64-encoded random secret with at least 256 bits. JJWT
            verifies signature and expiration while parsing.
          </p>
          <CodeBlock code={codeSamples.jwt} copyKey="jwt" language="java" />
        </section>
        <section>
          <span className={stepClass}>03 / PROTECT</span>
          <h2 className="mb-3 mt-2 text-lg font-bold text-slate-950 dark:text-white">
            Production security checklist
          </h2>
          <div className="space-y-2">
            {checks.map(([title, detail]) => (
              <div
                className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                key={title}
              >
                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-teal-700 dark:text-teal-300"
                />
                <span>
                  <b className="block text-sm text-slate-900 dark:text-white">
                    {title}
                  </b>
                  <small className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {detail}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <aside className="space-y-3">
        <div className={cardClass}>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Terminal size={16} className="text-teal-700 dark:text-teal-300" />
            Environment variables
          </h3>
          <div className="space-y-2">
            {[
              "JWT_SECRET=base64-encoded-random-secret",
              "JWT_EXPIRES_IN_SECONDS=900",
              "MYSQL_DATABASE=devspace",
            ].map((item) => (
              <code
                className="block break-all rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                key={item}
              >
                {item}
              </code>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Never commit real secrets. See <code>backend/.env.example</code>.
          </p>
        </div>
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-950 dark:bg-amber-950/40">
          <CircleHelp
            size={18}
            className="shrink-0 text-amber-800 dark:text-amber-300"
          />
          <div>
            <strong className="text-sm text-slate-900 dark:text-white">
              Demo account
            </strong>
            <p className="mt-1 text-sm leading-5 text-slate-700 dark:text-slate-300">
              The API seeds its configured demo user in MySQL with a BCrypt
              password hash. Add rate limiting before production.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
