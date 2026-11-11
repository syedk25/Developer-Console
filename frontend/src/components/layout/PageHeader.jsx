import { fullStackTopics } from "../../data/fullStackTopics";
import { navigation } from "../../data/navigation";
import { technologyTopics } from "../../data/technologyTopics";
import {
  useCurrentPage,
  useNavigateToSection,
} from "../../hooks/useAppNavigation";

const sectionDescriptions = Object.fromEntries(
  [...Object.values(navigation), ...technologyTopics, ...fullStackTopics].map(
    ({ label, description }) => [label, description]
  )
);

export default function PageHeader() {
  const { section, selectedConcept, activeTopic } = useCurrentPage();
  const navigateToSection = useNavigateToSection();

  return (
    <div className="mb-9 flex flex-col items-start justify-between gap-5 border-b border-slate-200 pb-8 dark:border-slate-800 lg:flex-row lg:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
          <span>Documentation</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500 dark:text-slate-400">{section}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-4xl">
          {section === navigation.OVERVIEW.label
            ? "Developer console"
            : selectedConcept
              ? `${section}: ${selectedConcept}`
              : section}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {activeTopic?.description ?? sectionDescriptions[section]}
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-2 lg:w-auto">
        <button
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-[#2b3240] dark:bg-[#10151e] dark:text-slate-200 dark:hover:bg-[#171e2a] lg:flex-none"
          onClick={() => navigateToSection(navigation.STACK.label)}
        >
          View docs
        </button>
        <button
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-emerald-700 px-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 lg:flex-none"
          onClick={() => navigateToSection(navigation.API.label)}
        >
          Open API guide
        </button>
      </div>
    </div>
  );
}
