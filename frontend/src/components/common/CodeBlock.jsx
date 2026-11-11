import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCopied, setStatusMessage } from "../../store/appSlice";

const languageAliases = {
  html: "markup",
  xml: "markup",
  css: "css",
  jsx: "jsx",
  javascript: "javascript",
  java: "java",
  properties: "properties",
  shell: "bash",
  sql: "sql",
};

export default function CodeBlock({
  code,
  filename = "example",
  language,
  copyKey = filename,
  beforeCopy,
  isEditing = false,
  onCodeChange,
}) {
  const dispatch = useDispatch();
  const copied = useSelector((state) => state.app.copied === copyKey);
  const grammar = languageAliases[language?.toLowerCase()] ?? "jsx";

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => dispatch(setCopied("")), 1600);
    return () => window.clearTimeout(timer);
  }, [copied, dispatch]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      dispatch(setCopied(copyKey));
    } catch {
      dispatch(
        setStatusMessage(
          "Unable to copy code. Check clipboard permissions and try again."
        )
      );
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#2a303c] bg-[#191e28] shadow-sm shadow-black/20">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-[#2a303c] bg-[#10141c] px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-rose-400" />
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="size-2 rounded-full bg-emerald-500" />
          </div>
          <span className="truncate text-sm text-slate-200">{filename}</span>
          {language && (
            <span className="hidden rounded bg-[#252b36] px-2 py-0.5 text-xs font-medium text-slate-300 sm:inline">
              {language}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {beforeCopy}
          <button
            aria-live="polite"
            className="inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-slate-300 hover:bg-[#252b36] hover:text-white"
            onClick={copyCode}
            type="button"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          aria-label={`Edit ${filename} code`}
          spellCheck={false}
          value={code}
          onChange={(event) => onCodeChange?.(event.target.value)}
          className="min-h-[280px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-slate-100 outline-none"
        />
      ) : (
        <Highlight code={code} language={grammar} theme={themes.vsDark}>
          {({ className, style, tokens, getTokenProps }) => (
            <pre
              className={`${className} overflow-x-auto whitespace-pre p-5 text-sm leading-7`}
              style={style}
            >
              <code>
                {tokens.map((line, lineIndex) => (
                  <span className="block" key={lineIndex}>
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      )}
    </div>
  );
}
