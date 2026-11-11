import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { codeSamples } from "../../data/codeSamples";
import { login } from "../../store/appSlice";
import CodeBlock from "../common/CodeBlock";

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiError = useSelector((state) => state.app.apiError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(login({ username, password })).unwrap();
      navigate("/overview", { replace: true });
    } catch {
      // error is already stored in Redux by the rejected action
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#05070d] text-slate-900 dark:text-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Access the developer console with your credentials.
          </p>
        </div>

        {apiError && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
            {apiError}
          </div>
        )}

        <form className={`space-y-4 ${cardClass}`}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Username
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:border-[#2b3240] dark:bg-[#10151e] dark:text-slate-200 dark:placeholder:text-slate-500"
              type="text"
              placeholder="demo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:border-[#2b3240] dark:bg-[#10151e] dark:text-slate-200 dark:placeholder:text-slate-500"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full justify-center rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-60 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="h-px bg-slate-200 flex-1 dark:bg-slate-800"></span>
          <span>Demo credentials</span>
          <span className="h-px bg-slate-200 flex-1 dark:bg-slate-800"></span>
        </div>

        <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Username:{" "}
          <code className="text-emerald-600 dark:text-emerald-400">demo</code>
        </div>

        <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Password:{" "}
          <code className="text-emerald-600 dark:text-emerald-400">
            change-me
          </code>
        </div>
      </div>

      <div className="mt-auto mb-8 text-center">
        <CodeBlock
          code={
            codeSamples.curlLogin ??
            'curl -X POST http://localhost:8080/api/auth/login -H \'Content-Type: application/json\' -d \'{"username":"demo","password":"change-me"}\''
          }
          filename="curl"
          language="shell"
        />
      </div>
    </div>
  );
}
