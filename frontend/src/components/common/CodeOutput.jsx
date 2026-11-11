import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const previewPolicy =
  "default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'";

function createBrowserPreview(language, code) {
  const headContent = `<meta http-equiv="Content-Security-Policy" content="${previewPolicy}"><meta name="viewport" content="width=device-width, initial-scale=1">`;

  if (language === "css") {
    const safeStyles = code.replace(/<\/style/gi, "<\\/style");
    return `<!doctype html><html><head>${headContent}<style>body{margin:0;padding:24px;font:14px/1.5 system-ui,sans-serif;color:#172033}.page{max-width:760px;margin:auto}.card{padding:20px;border:1px solid #cbd5e1;border-radius:8px}.card-grid,.columns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:16px}.toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;border:1px solid #cbd5e1}button{padding:8px 12px}</style><style>${safeStyles}</style></head><body><main class="page"><h1>CSS browser preview</h1><section class="card"><h2>Sample card</h2><p>Preview the styles against representative content.</p><a href="#sample">Sample link</a><button type="button">Sample button</button></section><div class="card-grid"><article class="card">Grid item one</article><article class="card">Grid item two</article></div><div class="columns"><article>Main column</article><aside>Related content</aside></div><div class="toolbar"><strong>Toolbar</strong><button type="button">Action</button></div></main></body></html>`;
  }

  const source = code.replace(/^\s*<!doctype[^>]*>\s*/i, "");
  if (/<head\b[^>]*>/i.test(source)) {
    return source.replace(/<head\b[^>]*>/i, (head) => `${head}${headContent}`);
  }
  if (/<html\b[^>]*>/i.test(source)) {
    return source.replace(
      /<html\b[^>]*>/i,
      (html) => `${html}<head>${headContent}</head>`
    );
  }
  return `<!doctype html><html><head>${headContent}</head><body>${source}</body></html>`;
}

function createJavaScriptRunner(code, runId) {
  const workerSource = `
const format = (value) => {
  if (typeof value === "string") return value;
  try { return JSON.stringify(value) ?? String(value); }
  catch { return String(value); }
};
let lineCount = 0;
const print = (level, values) => {
  if (lineCount >= 50) return;
  lineCount += 1;
  self.postMessage({ type: "line", level, text: values.map(format).join(" ") });
};
console.log = (...values) => print("log", values);
console.info = (...values) => print("log", values);
console.warn = (...values) => print("warn", values);
console.error = (...values) => print("error", values);
self.onmessage = async ({ data: source }) => {
  try {
    const execute = new Function("source", '"use strict"; return (async () => {' + String.fromCharCode(10) + source + String.fromCharCode(10) + '})()');
    const result = await execute(source);
    if (typeof result !== "undefined") print("result", [result]);
  } catch (error) {
    print("error", [error && error.stack ? error.stack : String(error)]);
  }
  self.postMessage({ type: "done" });
};`;
  const safeWorkerSource = JSON.stringify(workerSource).replace(
    /</g,
    "\\u003c"
  );
  const safeCode = JSON.stringify(code).replace(/</g, "\\u003c");

  return `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; worker-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'"><script>
const runId = ${runId};
const workerSource = ${safeWorkerSource};
const worker = new Worker(URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" })));
const send = (message) => parent.postMessage({ ...message, runId }, "*");
let lineCount = 0;
const timer = setTimeout(() => {
  worker.terminate();
  send({ type: "timeout" });
}, 2500);
worker.onmessage = ({ data }) => {
  if (data.type === "line") {
    if (lineCount++ < 50) send(data);
  } else if (data.type === "done") {
    clearTimeout(timer);
    send(data);
    worker.terminate();
  }
};
worker.onerror = (event) => {
  clearTimeout(timer);
  send({ type: "line", level: "error", text: event.message || "JavaScript execution failed." });
  send({ type: "done" });
  worker.terminate();
};
worker.postMessage(${safeCode});
</script>`;
}

export default function CodeOutput({ code, language, title }) {
  const normalizedLanguage = language?.toLowerCase();
  const iframeRef = useRef(null);
  const activeRunRef = useRef(null);
  const timeoutRef = useRef(null);
  const nextRunIdRef = useRef(0);
  const [runner, setRunner] = useState(null);
  const [runState, setRunState] = useState("idle");
  const [output, setOutput] = useState([]);

  useEffect(() => {
    function handleMessage(event) {
      const activeRun = activeRunRef.current;
      if (
        !activeRun ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.runId !== activeRun.id
      ) {
        return;
      }

      if (event.data.type === "line") {
        setOutput((current) => [...current, event.data]);
      } else if (event.data.type === "done") {
        window.clearTimeout(timeoutRef.current);
        activeRunRef.current = null;
        setRunState("done");
      } else if (event.data.type === "timeout") {
        setOutput((current) => [
          ...current,
          {
            level: "error",
            text: "Execution stopped after 2.5 seconds.",
          },
        ]);
        activeRunRef.current = null;
        setRunState("done");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function runJavaScript() {
    const id = nextRunIdRef.current + 1;
    nextRunIdRef.current = id;
    activeRunRef.current = { id };
    window.clearTimeout(timeoutRef.current);
    setOutput([]);
    setRunState("running");
    setRunner({ id, source: createJavaScriptRunner(code, id) });
    timeoutRef.current = window.setTimeout(() => {
      if (activeRunRef.current?.id !== id) return;
      activeRunRef.current = null;
      setRunner(null);
      setOutput([
        { level: "error", text: "Execution stopped after 3 seconds." },
      ]);
      setRunState("done");
    }, 3000);
  }

  if (normalizedLanguage === "html" || normalizedLanguage === "css") {
    return (
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-300">
          Browser preview
        </div>
        <iframe
          className="block h-80 w-full bg-white"
          sandbox=""
          srcDoc={createBrowserPreview(normalizedLanguage, code)}
          title={`${title} browser preview`}
        />
      </section>
    );
  }

  if (normalizedLanguage === "javascript") {
    return (
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex min-h-11 items-center justify-between gap-3 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              JavaScript output
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Isolated worker; DOM and network access are disabled.
            </p>
          </div>
          <button
            className="inline-flex h-8 shrink-0 items-center gap-2 rounded-md bg-emerald-700 px-3 text-xs font-semibold text-white hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60 dark:bg-emerald-500 dark:text-slate-950"
            disabled={runState === "running"}
            onClick={runJavaScript}
            type="button"
          >
            <Play size={14} />
            {runState === "running" ? "Running" : "Run code"}
          </button>
        </div>
        <div
          aria-live="polite"
          className="min-h-28 space-y-1 bg-[#10141c] p-4 font-mono text-xs leading-5 text-slate-200"
        >
          {runState === "idle" && (
            <p className="font-sans text-slate-400">
              Run the sample to see its console output.
            </p>
          )}
          {output.map((line, index) => (
            <pre
              className={`whitespace-pre-wrap wrap-break-word ${
                line.level === "error"
                  ? "text-rose-300"
                  : line.level === "warn"
                    ? "text-amber-200"
                    : line.level === "result"
                      ? "text-emerald-300"
                      : "text-slate-200"
              }`}
              key={`${index}-${line.text}`}
            >
              {line.text}
            </pre>
          ))}
          {runState === "done" && output.length === 0 && (
            <p className="font-sans text-slate-400">
              Finished with no console output or return value.
            </p>
          )}
        </div>
        {runner && (
          <iframe
            className="hidden"
            key={runner.id}
            ref={iframeRef}
            sandbox="allow-scripts"
            srcDoc={runner.source}
            title="Isolated JavaScript runner"
          />
        )}
      </section>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        No in-browser runtime for {language || "this language"}.
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
        Run this sample with its language runtime to see the actual output.
      </p>
    </div>
  );
}
