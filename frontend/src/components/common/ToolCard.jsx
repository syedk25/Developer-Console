import { ArrowUpRight } from "lucide-react";

const iconTones = {
  purple:
    "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  blue: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  green: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  orange: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

export default function ToolCard({ icon, tone, tag, title, text, onClick }) {
  return (
    <button
      className="group min-h-40 rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-500 hover:bg-emerald-50/20 hover:shadow-md hover:shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700 dark:hover:shadow-black/20
    "
      onClick={onClick}
    >
      <div
        className={`mb-4 grid size-10 place-items-center rounded-lg ${iconTones[tone]}`}
      >
        {icon}
      </div>
      <div className="text-[11px] font-semibold tracking-widest text-slate-500 dark:text-slate-400">
        {tag}
      </div>
      <h3 className="mt-1 flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
        <ArrowUpRight
          size={16}
          className="text-slate-400 transition group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
        />
      </h3>
      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
        {text}
      </p>
    </button>
  );
}
