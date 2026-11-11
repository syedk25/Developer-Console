import { Code2, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrentPage } from "../../hooks/useAppNavigation";
import { saveLessonEdits } from "../../store/appSlice";
import CodeBlock from "../common/CodeBlock";
import CodeOutput from "../common/CodeOutput";

export default function TechnologyPage() {
  const dispatch = useDispatch();
  const { activeTopic: topic, selectedConceptIndex: selectedIndex } =
    useCurrentPage();
  const [explanationEditing, setExplanationEditing] = useState(false);
  const [codeEditing, setCodeEditing] = useState(false);

  if (!topic) return null;

  const Icon = topic.icon || Code2;
  const concept = topic.concepts[selectedIndex] || {
    title: "",
    explanation: "",
    points: [],
    exampleTitle: "",
    filename: "",
    language: "HTML",
    code: "",
  };
  const isHtml = topic.path === "/learn/html";

  const [explanationDraft, setExplanationDraft] = useState(
    concept.explanation || ""
  );
  const [codeDraft, setCodeDraft] = useState(concept.code || "");

  async function saveInline(field, value) {
    try {
      await dispatch(
        saveLessonEdits({
          path: topic.path,
          conceptIndex: selectedIndex,
          changes: {
            concept: {
              [field]: value,
            },
          },
        })
      ).unwrap();
    } catch (error) {
      console.error(`Failed to save ${field}:`, error);
    }
  }

  return (
    <div className={isHtml ? "html-notes-page space-y-6" : "space-y-6"}>
      <section
        className={
          isHtml
            ? "overflow-hidden border-b-2 border-[#174fbd] bg-white dark:border-sky-400 dark:bg-[#0b1019]"
            : "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900"
        }
      >
        <div
          className={
            isHtml
              ? "px-0 py-3"
              : "border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-7"
          }
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300">
              {isHtml ? (
                <span className="text-xs font-bold uppercase tracking-wide text-[#174fbd] dark:text-sky-300">
                  HTML NOTES - {concept.title.toUpperCase()}
                </span>
              ) : (
                <>
                  <Icon size={20} />
                  {topic.label} learning path
                </>
              )}
            </div>
          </div>
          {!isHtml && (
            <p className="max-w-4xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              {topic.intro}
            </p>
          )}
        </div>
      </section>

      <section
        aria-live="polite"
        className={
          isHtml
            ? "border-2 border-[#3f3f3f] bg-white p-4 text-slate-950 dark:border-[#2a303c] dark:bg-[#0b1019] dark:text-slate-100 sm:p-6"
            : "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        }
      >
        <div
          className={
            isHtml ? "mb-6 text-center" : "mb-4 flex items-center gap-3"
          }
        >
          {!isHtml && (
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-base font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>
          )}
          <div className={isHtml ? "" : undefined}>
            {!isHtml && (
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {topic.label} concept
              </p>
            )}
            <h2
              className={
                isHtml
                  ? "text-3xl font-extrabold leading-tight text-[#174fbd] dark:text-sky-300"
                  : "text-2xl font-bold leading-tight text-slate-950 dark:text-white"
              }
            >
              {concept.title}
            </h2>
          </div>
        </div>
        {explanationEditing ? (
          <div className="mb-6 max-w-4xl rounded-lg border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
            <textarea
              className="w-full rounded-lg border-none bg-transparent px-3 py-2.5 font-normal leading-7 text-slate-900 outline-none dark:text-slate-100 resize-y min-h-30"
              onChange={(event) => setExplanationDraft(event.target.value)}
              value={explanationDraft}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="rounded px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                onClick={() => {
                  setExplanationDraft(concept.explanation);
                  setExplanationEditing(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded px-3 py-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                onClick={() =>
                  saveInline("explanation", explanationDraft.trim()).then(() =>
                    setExplanationEditing(false)
                  )
                }
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-6 max-w-4xl">
            <p
              className={
                isHtml
                  ? "mb-0 max-w-[calc(100%-36px)] text-base leading-7 text-slate-900 dark:text-slate-300"
                  : "max-w-[calc(100%-36px)] text-lg leading-8 text-slate-700 dark:text-slate-300"
              }
            >
              {concept.explanation}
            </p>
            <button
              className="rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition shrink-0"
              onClick={() => setExplanationEditing(true)}
              type="button"
              aria-label="Edit explanation"
            >
              <Pencil size={14} />
            </button>
          </div>
        )}
        {concept.visual === "document-structure" && (
          <figure
            aria-label="Diagram of a semantic HTML page with a header, body, three content sections, supporting aside, and footer"
            className="mx-auto mb-7 max-w-4xl border-[3px] border-[#3f3f3f] bg-white p-3 dark:border-[#2a303c] dark:bg-[#10151e] sm:p-5"
          >
            <figcaption className="mb-4 text-center text-lg font-extrabold text-[#174fbd] dark:text-sky-300 sm:text-2xl">
              How the page regions fit together
            </figcaption>
            <div className="space-y-2 bg-[#3284b7] p-2 sm:space-y-3 sm:p-4">
              <div className="flex min-h-16 items-center justify-center bg-[#155478] px-3 py-4 text-center text-lg font-bold text-white sm:min-h-20 sm:text-2xl">
                &lt;header&gt; — page introduction
              </div>
              <div className="grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(8rem,1fr)] sm:gap-3">
                <div className="space-y-2">
                  <div className="pb-2 text-base font-bold text-white sm:text-xl">
                    &lt;body&gt; — visible page content
                  </div>
                  {["Main topic", "Related topic", "More content"].map(
                    (label) => (
                      <div className="bg-[#ef9057]" key={label}>
                        <div className="bg-[#155478] px-3 py-2 text-center font-bold text-white sm:text-lg">
                          &lt;section&gt;
                        </div>
                        <div className="flex min-h-12 items-center justify-center px-3 py-2 text-center text-sm font-medium text-slate-950 sm:min-h-16 sm:text-base">
                          {label}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex min-h-24 flex-col items-center justify-center bg-[#ef9057] p-3 text-center sm:min-h-64">
                  <span className="text-lg font-bold text-white drop-shadow sm:text-2xl">
                    &lt;aside&gt;
                  </span>
                  <span className="mt-1 text-sm text-slate-950 sm:text-base">
                    Supporting information
                  </span>
                </div>
              </div>
              <div className="flex min-h-16 items-center justify-center bg-[#155478] px-3 py-4 text-center text-lg font-bold text-white sm:min-h-20 sm:text-2xl">
                &lt;footer&gt; — closing information
              </div>
            </div>
          </figure>
        )}
        {concept.steps && (
          <>
            <h3
              className={`mb-4 mt-7 text-lg font-bold ${isHtml ? "text-[#174fbd] dark:text-sky-300" : "text-slate-900 dark:text-slate-100"}`}
            >
              Step by step
            </h3>
            <ol className="space-y-4">
              {concept.steps.map((step, index) => (
                <li className="flex gap-3" key={step}>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold ${isHtml ? "bg-[#d8ebf8] text-[#174fbd] dark:bg-[#18212e] dark:text-sky-300" : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`pt-0.5 text-base leading-7 ${isHtml ? "text-slate-900 dark:text-slate-300" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </>
        )}
        <h3
          className={`mb-3 mt-7 text-lg font-bold ${
            isHtml
              ? "text-[#174fbd] dark:text-sky-300"
              : "text-slate-900 dark:text-slate-100"
          }`}
        >
          {isHtml ? "HTML concepts at a glance" : "Key points"}
        </h3>
        {isHtml ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm sm:text-base">
              <thead className="bg-[#174fbd] text-white dark:bg-[#153d66]">
                <tr>
                  <th className="px-3 py-2 font-bold">Reference</th>
                  <th className="px-3 py-2 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {concept.points.map((point, index) => (
                  <tr
                    className={
                      index % 2 === 0
                        ? "bg-[#d8ebf8] dark:bg-[#18212e]"
                        : "bg-white dark:bg-[#10151e]"
                    }
                    key={point}
                  >
                    <th className="w-1/3 px-3 py-2 align-top font-bold text-slate-950 dark:text-slate-200">
                      Guideline {index + 1}
                    </th>
                    <td className="px-3 py-2 leading-6 text-slate-950 dark:text-slate-300">
                      {point}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="space-y-3">
            {concept.points.map((point) => (
              <li
                className="flex gap-3 text-base leading-7 text-slate-700 dark:text-slate-300"
                key={point}
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-2 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
                />
                {point}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3
          className={`mb-3 text-lg font-bold ${
            isHtml
              ? "text-center text-[#174fbd] dark:text-sky-300"
              : "text-slate-900 dark:text-slate-100"
          }`}
        >
          {concept.exampleTitle ?? concept.title}
        </h3>
        <div
          className={
            isHtml
              ? "space-y-4"
              : "grid items-stretch gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(16rem,1fr)]"
          }
        >
          <div className="flex flex-col gap-2">
            <CodeBlock
              code={codeEditing ? codeDraft : concept.code}
              copyKey={`${topic.path}-${concept.title}`}
              filename={concept.filename}
              isEditing={codeEditing}
              language={concept.language}
              onCodeChange={(value) => setCodeDraft(value)}
              beforeCopy={
                codeEditing ? (
                  <>
                    <button
                      className={`rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition shrink-0`}
                      onClick={() => {
                        setCodeDraft(concept.code);
                        setCodeEditing(false);
                      }}
                      type="button"
                      aria-label="Cancel code edit"
                    >
                      <X size={14} />
                    </button>
                    <button
                      className="rounded-md px-3 py-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                      onClick={() =>
                        saveInline("code", codeDraft).then(() =>
                          setCodeEditing(false)
                        )
                      }
                      type="button"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    className={`rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition shrink-0 ml-1`}
                    onClick={() => setCodeEditing((prev) => !prev)}
                    type="button"
                    aria-label="Edit code"
                  >
                    <Pencil size={14} />
                  </button>
                )
              }
            />
          </div>
          <CodeOutput
            code={codeEditing ? codeDraft : concept.code}
            language={concept.language}
            title={concept.exampleTitle ?? concept.title}
          />
        </div>
      </section>
      {isHtml && (
        <footer className="flex justify-between border-t border-slate-300 pt-3 text-xs font-bold uppercase text-[#174fbd] dark:border-[#2a303c] dark:text-sky-300">
          <span>HTML Notes</span>
          <span>{String(selectedIndex + 1).padStart(2, "0")}</span>
        </footer>
      )}
    </div>
  );
}
