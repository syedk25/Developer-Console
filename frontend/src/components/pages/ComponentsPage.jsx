import { ArrowUpRight, CodeXml, Pencil, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { useSearchParams } from "react-router-dom";
import { codeSamples } from "../../data/codeSamples";
import CodeBlock from "../common/CodeBlock";

const defaultCategories = [
  "Buttons",
  "Card",
  "Templates",
  "Headers",
  "Footer",
  "Lists",
  "Form",
  "Table",
  "Badges",
  "Alerts",
  "Modal",
  "Tabs",
  "Navbar",
  "Sidebar",
  "Avatar",
  "Hero",
];
const uiLibrarySnippetStorageKey = "devspace-ui-library-code-snippets";
const componentVariantsStorageKey = "devspace-component-variants";
const defaultButtonVariants = [
  "Primary Button",
  "Secondary Button",
  "Outline Button",
  "Ghost Button",
];
const defaultVariantsByCategory = Object.fromEntries(
  defaultCategories.map((item) => [
    item,
    item === "Buttons" ? defaultButtonVariants : ["Default"],
  ])
);
const defaultButtonSnippets = {
  "Primary Button": `<button className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white">Primary button</button>`,
  "Secondary Button": `<button className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800">Secondary button</button>`,
  "Outline Button": `<button className="rounded-lg border-2 border-teal-700 px-4 py-2 font-semibold text-teal-800">Outline button</button>`,
  "Ghost Button": `<button className="rounded-lg px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">Ghost button</button>`,
};

function getVariantStorageKey(component, variant) {
  return `${component}::${variant}`;
}

function buildStarterSnippet(label) {
  const safeName = label.replace(/[^a-zA-Z0-9]+(.)/g, (_, char) =>
    char.toUpperCase()
  );
  const componentName = safeName.charAt(0).toUpperCase() + safeName.slice(1);

  return `export function ${componentName}() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">${label}</h3>
      <p className="mt-2 text-sm text-slate-600">Custom ${label.toLowerCase()} component</p>
    </section>
  );
}`;
}

function getDefaultSnippetForCategory(category) {
  const codeKey = {
    Buttons: "buttons",
    Card: "cards",
    Templates: "templates",
    Headers: "headers",
    Footer: "buttons",
    Lists: "lists",
    Form: "buttons",
    Table: "table",
    Badges: "buttons",
    Alerts: "buttons",
    Modal: "buttons",
    Tabs: "buttons",
    Navbar: "buttons",
    Sidebar: "buttons",
    Avatar: "buttons",
    Hero: "templates",
  }[category];

  return codeSamples[codeKey] ?? buildStarterSnippet(category);
}

function buildStarterVariantSnippet(category, variant) {
  if (category === "Buttons") {
    return `<button className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white">${variant}</button>`;
  }

  return buildStarterSnippet(`${variant} ${category}`);
}

const PreviewButton = ({ children, icon, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-teal-500 dark:text-slate-950"
  >
    {icon}
    {children}
  </button>
);

const previewScope = {
  ArrowUpRight,
  Button: PreviewButton,
  Plus,
  ProjectSummaryCard: () => (
    <div className="rounded-lg border p-4">Project summary</div>
  ),
  ActivityCard: () => (
    <div className="rounded-lg border p-4">Recent activity</div>
  ),
  activities: [
    { id: 1, title: "Deployment complete", detail: "Production · just now" },
    { id: 2, title: "Project updated", detail: "Workspace · 1 hour ago" },
  ],
  steps: [
    { id: 1, label: "Configure your project" },
    { id: 2, label: "Deploy your app" },
  ],
  projects: [
    { id: 1, name: "Customer portal", status: "Active", updatedAt: "Just now" },
    {
      id: 2,
      name: "Billing service",
      status: "Building",
      updatedAt: "1 hour ago",
    },
  ],
  save: () => {},
};

function transformSnippet(code) {
  const exportedFunction = code.match(
    /^\s*export\s+function\s+([A-Za-z_$][\w$]*)/
  );

  if (exportedFunction) {
    const componentName = exportedFunction[1];
    const declaration = code.replace(/^\s*export\s+/, "");
    return `${declaration}\nrender(() => <${componentName} />);`;
  }

  return `render(() => (<>\n${code}\n</>));`;
}

const panel =
  "overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900";
const heading =
  "flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800";
const preview =
  "m-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950";
const titleClass = "text-sm font-bold text-slate-900 dark:text-slate-100";

export default function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("devspace-ui-library-items");
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });
  const [variantsByCategory, setVariantsByCategory] = useState(() => {
    try {
      const savedVariants = JSON.parse(
        localStorage.getItem(componentVariantsStorageKey) || "{}"
      );
      const savedSnippets = JSON.parse(
        localStorage.getItem(uiLibrarySnippetStorageKey) || "{}"
      );
      const variants = { ...defaultVariantsByCategory, ...savedVariants };

      Object.keys(savedSnippets).forEach((item) => {
        if (
          typeof savedSnippets[item] === "string" &&
          !savedVariants[item] &&
          !variants[item]?.includes("Custom")
        ) {
          variants[item] = [...(variants[item] ?? ["Default"]), "Custom"];
        }
      });

      return variants;
    } catch {
      return defaultVariantsByCategory;
    }
  });
  const [category, setCategory] = useState("Buttons");
  const [selectedVariant, setSelectedVariant] = useState(
    defaultButtonVariants[0]
  );
  const [customCodeSnippets, setCustomCodeSnippets] = useState(() => {
    try {
      const saved = localStorage.getItem(uiLibrarySnippetStorageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [codeDraft, setCodeDraft] = useState(
    getDefaultSnippetForCategory("Buttons")
  );
  const livePreviewRoot = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function initializePreviewUtilities() {
      const [runtimeModule, presetModule] = await Promise.all([
        import("@unocss/runtime"),
        import("@unocss/preset-wind3"),
      ]);

      if (cancelled || !livePreviewRoot.current) return;

      await runtimeModule.default({
        defaults: {
          presets: [
            presetModule.default({ important: "#component-live-preview" }),
          ],
        },
        rootElement: () => livePreviewRoot.current ?? undefined,
        observer: {
          target: () => livePreviewRoot.current ?? document.body,
          attributeFilter: ["class"],
        },
        bypassDefined: true,
      });

      if (!cancelled && livePreviewRoot.current) {
        await window.__unocss_runtime?.extractAll(livePreviewRoot.current);
      }
    }

    initializePreviewUtilities();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devspace-ui-library-items",
      JSON.stringify(categories)
    );
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(
      componentVariantsStorageKey,
      JSON.stringify(variantsByCategory)
    );
  }, [variantsByCategory]);

  useEffect(() => {
    localStorage.setItem(
      uiLibrarySnippetStorageKey,
      JSON.stringify(customCodeSnippets)
    );
  }, [customCodeSnippets]);

  useEffect(() => {
    const requestedCategory = searchParams.get("component");
    if (requestedCategory && categories.includes(requestedCategory)) {
      setCategory(requestedCategory);
      const variants = variantsByCategory[requestedCategory] ?? ["Default"];
      const requestedVariant = searchParams.get("variant");
      setSelectedVariant(
        requestedVariant && variants.includes(requestedVariant)
          ? requestedVariant
          : variants[0]
      );
    }
  }, [searchParams, categories, variantsByCategory]);

  const codeKey = {
    Buttons: "buttons",
    Card: "cards",
    Templates: "templates",
    Headers: "headers",
    Footer: "buttons",
    Lists: "lists",
    Form: "buttons",
    Table: "table",
    Badges: "buttons",
    Alerts: "buttons",
    Modal: "buttons",
    Tabs: "buttons",
    Navbar: "buttons",
    Sidebar: "buttons",
    Avatar: "buttons",
    Hero: "templates",
  }[category];

  const activeCode =
    customCodeSnippets[getVariantStorageKey(category, selectedVariant)] ??
    (selectedVariant === "Custom" ? customCodeSnippets[category] : undefined) ??
    defaultButtonSnippets[selectedVariant] ??
    codeSamples[codeKey] ??
    getDefaultSnippetForCategory(category);
  const activeLanguage = codeKey === "axios" ? "javascript" : "jsx";
  const componentVariants = variantsByCategory[category] ?? ["Default"];

  useEffect(() => {
    setCodeDraft(activeCode);
  }, [activeCode]);

  function handleSaveSnippet() {
    setCustomCodeSnippets((current) => ({
      ...current,
      [getVariantStorageKey(category, selectedVariant)]: codeDraft,
    }));
    setIsEditingCode(false);
  }

  function handleAddVariant() {
    const nextName = window.prompt(
      `Add a ${category === "Buttons" ? "button type" : "component type"}`,
      category === "Buttons" ? "New Button" : "New variant"
    );
    const trimmed = nextName?.trim();
    if (!trimmed || componentVariants.includes(trimmed)) return;

    setVariantsByCategory((current) => ({
      ...current,
      [category]: [...(current[category] ?? ["Default"]), trimmed],
    }));
    setCustomCodeSnippets((current) => ({
      ...current,
      [getVariantStorageKey(category, trimmed)]: buildStarterVariantSnippet(
        category,
        trimmed
      ),
    }));
    setSelectedVariant(trimmed);
    setSearchParams({ component: category, variant: trimmed });
    setIsEditingCode(true);
  }

  const handleEditCategory = () => {
    const nextName = window.prompt("Rename this component", category);
    const trimmed = nextName?.trim();
    if (!trimmed || trimmed === category) return;

    setCustomCodeSnippets((current) => {
      const next = { ...current };
      if (next[category]) {
        next[trimmed] = next[category];
        delete next[category];
      }
      const oldPrefix = `${category}::`;
      Object.keys(current).forEach((key) => {
        if (key.startsWith(oldPrefix)) {
          next[`${trimmed}::${key.slice(oldPrefix.length)}`] = next[key];
          delete next[key];
        }
      });
      return next;
    });

    setCategories((current) =>
      current.map((item) => (item === category ? trimmed : item))
    );
    setVariantsByCategory((current) => {
      const next = { ...current, [trimmed]: current[category] };
      delete next[category];
      return next;
    });
    setCategory(trimmed);
    setSearchParams({ component: trimmed, variant: selectedVariant });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label={`${category} variants`}
        >
          {componentVariants.map((variant) => (
            <button
              key={variant}
              id={`variant-tab-${variant.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              type="button"
              role="tab"
              aria-selected={selectedVariant === variant}
              aria-controls="component-preview"
              onClick={() => {
                setSelectedVariant(variant);
                setSearchParams({ component: category, variant });
                setIsEditingCode(false);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                selectedVariant === variant
                  ? "bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              {variant}
            </button>
          ))}
          <button
            type="button"
            onClick={handleAddVariant}
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300"
          >
            <Plus size={14} />
            Add new
          </button>
        </div>
        <button
          type="button"
          onClick={handleEditCategory}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Pencil size={14} />
          Rename {category}
        </button>
      </div>

      <section
        className={panel}
        id="component-preview"
        role="tabpanel"
        aria-labelledby={`component-tab-${category.toLowerCase()}`}
      >
        <div className={heading}>
          <h2 className={titleClass}>{category}</h2>
          <span className="text-xs text-slate-500">Live preview</span>
        </div>

        <LiveProvider
          code={isEditingCode ? codeDraft : activeCode}
          scope={previewScope}
          noInline
          transformCode={transformSnippet}
        >
          <div
            id="component-live-preview"
            ref={livePreviewRoot}
            className={preview}
          >
            <LivePreview className="min-h-10" />
          </div>
          <LiveError
            className="mx-3 mb-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-rose-300 bg-rose-50 p-3 font-mono text-xs text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            role="alert"
          />
        </LiveProvider>

        {false && (
          <>
            {category === "Buttons" && (
              <div className={`${preview} space-y-4`}>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950"
                    onClick={() => setButtonState("Primary action clicked")}
                  >
                    <Plus size={16} />
                    Primary action
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <ArrowDown size={16} />
                    Secondary
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded-lg px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Quiet action
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded-lg border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white opacity-40"
                    disabled
                  >
                    Disabled
                  </button>
                  <button
                    type="button"
                    className="grid size-10 place-items-center rounded-lg border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    aria-label="More actions"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="h-8 rounded-lg bg-teal-700 px-3 text-xs font-semibold text-white dark:bg-teal-500 dark:text-slate-950"
                  >
                    Small
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-teal-700 px-5 text-sm font-semibold text-white dark:bg-teal-500 dark:text-slate-950"
                  >
                    Large action <ArrowRight size={16} />
                  </button>
                  <span className="inline-flex items-center gap-1 text-xs text-teal-800 dark:text-teal-300">
                    <Check size={14} />
                    {buttonState}
                  </span>
                </div>
              </div>
            )}

            {category === "Card" && (
              <div className={`${preview} grid gap-3 sm:grid-cols-2`}>
                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="rounded-md bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                    ACTIVE
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    Customer portal
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
                    A project card with status, summary, and a clear next
                    action.
                  </p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-800 dark:text-teal-300"
                  >
                    View project <ArrowUpRight size={15} />
                  </button>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      API REQUESTS
                    </span>
                    <Code2
                      size={17}
                      className="text-teal-700 dark:text-teal-300"
                    />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                    24,891
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    <span className="font-semibold text-teal-700 dark:text-teal-300">
                      +12.8%
                    </span>{" "}
                    compared with last week
                  </p>
                </article>
              </div>
            )}

            {category === "Templates" && (
              <div className={preview}>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <span className="grid size-7 place-items-center rounded-lg bg-teal-700 text-white">
                        D
                      </span>
                      Devspace
                    </div>
                    <span className="text-xs text-slate-500">Workspace</span>
                  </header>
                  <div className="grid min-h-48 sm:grid-cols-[150px_1fr]">
                    <nav className="space-y-1 border-b border-slate-200 p-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:border-b-0 sm:border-r">
                      <div className="rounded-md bg-teal-50 px-2 py-2 font-semibold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                        Overview
                      </div>
                      <div className="px-2 py-2">Projects</div>
                      <div className="px-2 py-2">Settings</div>
                    </nav>
                    <main className="p-4">
                      <p className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                        WORKSPACE / OVERVIEW
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        Good morning, Jordan
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Here is what is happening with your projects.
                      </p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {["2 active projects", "All systems operational"].map(
                          (item) => (
                            <div
                              key={item}
                              className="rounded-lg border border-slate-200 p-3 text-xs font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200"
                            >
                              {item}
                            </div>
                          )
                        )}
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            )}

            {category === "Headers" && (
              <div className={`${preview} space-y-4`}>
                <header className="flex min-h-11 items-center gap-4 rounded-lg border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <span className="grid size-6 place-items-center rounded-md bg-teal-700 text-white">
                      n
                    </span>
                    northstar
                  </div>
                  <nav
                    className="hidden flex-1 items-center gap-5 text-xs text-slate-600 sm:flex dark:text-slate-300"
                    aria-label="Product navigation"
                  >
                    <span>Product</span>
                    <span>Solutions</span>
                    <span>
                      Resources <ChevronDown size={12} className="inline" />
                    </span>
                  </nav>
                  <button
                    type="button"
                    className="ml-auto inline-flex items-center gap-1 rounded-md bg-teal-700 px-3 py-2 text-xs font-semibold text-white dark:bg-teal-500 dark:text-slate-950"
                  >
                    Start free <ArrowRight size={13} />
                  </button>
                </header>
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-4 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold tracking-widest text-teal-700 dark:text-teal-300">
                      PRODUCT / OVERVIEW
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
                      Build with confidence.
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Everything your team needs to deliver better software.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 sm:inline-flex dark:border-slate-700 dark:text-slate-200"
                  >
                    Explore docs <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {category === "Lists" && (
              <div className={`${preview} grid gap-4 sm:grid-cols-2`}>
                <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className={titleClass}>Recent activity</h3>
                  <ul className="mt-3 divide-y divide-slate-200 dark:divide-slate-800">
                    {[
                      ["Deployment complete", "customer-portal · 2 min ago"],
                      ["API key created", "staging · 1 hour ago"],
                      ["Project updated", "billing-service · yesterday"],
                    ].map(([title, detail]) => (
                      <li key={title} className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{detail}</p>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className={titleClass}>Launch checklist</h3>
                  <ol className="mt-3 space-y-3">
                    {[
                      "Configure your project",
                      "Connect an environment",
                      "Deploy your app",
                    ].map((item, index) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal-100 text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            )}

            {(category === "Table" ||
              category === "Form" ||
              category === "Badges" ||
              category === "Alerts" ||
              category === "Modal" ||
              category === "Tabs" ||
              category === "Navbar" ||
              category === "Sidebar" ||
              category === "Avatar" ||
              category === "Hero" ||
              category === "Footer") && (
              <div className={`${preview} space-y-4`}>
                {category === "Table" && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                      <caption className="mb-3 text-left text-xs text-slate-500">
                        Your latest projects
                      </caption>
                      <thead>
                        <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800">
                          <th scope="col" className="px-3 py-2 font-semibold">
                            Project
                          </th>
                          <th scope="col" className="px-3 py-2 font-semibold">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-2 font-semibold">
                            Updated
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 text-right font-semibold"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {[
                          ["Customer portal", "Active", "2 min ago"],
                          ["Billing service", "Building", "1 hour ago"],
                          ["Docs website", "Active", "Yesterday"],
                        ].map(([project, status, updated]) => (
                          <tr key={project}>
                            <th
                              scope="row"
                              className="px-3 py-3 font-medium text-slate-800 dark:text-slate-200"
                            >
                              {project}
                            </th>
                            <td className="px-3 py-3">
                              <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                                {status}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-slate-600 dark:text-slate-400">
                              {updated}
                            </td>
                            <td className="px-3 py-3 text-right">
                              <button
                                type="button"
                                className="text-xs font-semibold text-teal-800 dark:text-teal-300"
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {category === "Form" && (
                  <form className="grid gap-3">
                    <div className="grid gap-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <button
                      type="button"
                      className="h-11 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white dark:bg-teal-500 dark:text-slate-950"
                    >
                      Sign in
                    </button>
                  </form>
                )}

                {category === "Badges" && (
                  <div className="flex flex-wrap gap-2">
                    {["New", "Beta", "Live", "Updated", "Team"].map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-900 dark:bg-teal-950 dark:text-teal-200"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {category === "Alerts" && (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                      Heads up: review release notes before deploying.
                    </div>
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                      Everything is healthy and running smoothly.
                    </div>
                  </div>
                )}

                {category === "Modal" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Create workspace
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Choose a template and assign the right team members to
                      start shipping.
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white dark:bg-teal-500 dark:text-slate-950"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                )}

                {category === "Tabs" && (
                  <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-3 flex gap-2 text-sm">
                      <span className="rounded-md bg-teal-700 px-3 py-1.5 font-semibold text-white dark:bg-teal-500 dark:text-slate-950">
                        Overview
                      </span>
                      <span className="rounded-md px-3 py-1.5 text-slate-600 dark:text-slate-300">
                        Activity
                      </span>
                      <span className="rounded-md px-3 py-1.5 text-slate-600 dark:text-slate-300">
                        Settings
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Track product health, billing, and team activity in one
                      place.
                    </p>
                  </div>
                )}

                {category === "Navbar" && (
                  <nav className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-bold text-slate-900 dark:text-white">
                      Devspace
                    </div>
                    <div className="hidden gap-4 text-sm text-slate-600 sm:flex dark:text-slate-300">
                      <span>Features</span>
                      <span>Pricing</span>
                      <span>Docs</span>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white dark:bg-teal-500 dark:text-slate-950"
                    >
                      Get started
                    </button>
                  </nav>
                )}

                {category === "Sidebar" && (
                  <aside className="w-full rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <div className="rounded-md bg-teal-50 px-3 py-2 font-semibold text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                        Overview
                      </div>
                      <div className="rounded-md px-3 py-2">Projects</div>
                      <div className="rounded-md px-3 py-2">Activity</div>
                      <div className="rounded-md px-3 py-2">Team</div>
                    </div>
                  </aside>
                )}

                {category === "Avatar" && (
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-full bg-teal-700 text-sm font-bold text-white dark:bg-teal-500 dark:text-slate-950">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Jordan Diaz
                      </p>
                      <p className="text-sm text-slate-500">Product designer</p>
                    </div>
                  </div>
                )}

                {category === "Hero" && (
                  <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-cyan-600 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-100">
                      Launch faster
                    </p>
                    <h3 className="mt-3 text-3xl font-bold">
                      Build the next generation of products.
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-teal-50">
                      Ship polished experiences with reusable UI pieces, motion
                      cues, and modern product patterns.
                    </p>
                    <button
                      type="button"
                      className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-teal-800"
                    >
                      Book demo
                    </button>
                  </div>
                )}

                {category === "Footer" && (
                  <footer className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span>© 2026 Devspace</span>
                      <div className="flex gap-4">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Support</span>
                      </div>
                    </div>
                  </footer>
                )}
              </div>
            )}
          </>
        )}

        <CodeBlock
          code={isEditingCode ? codeDraft : activeCode}
          copyKey={category}
          language={activeLanguage}
          isEditing={isEditingCode}
          onCodeChange={setCodeDraft}
          beforeCopy={
            <>
              <button
                type="button"
                onClick={() => setIsEditingCode((current) => !current)}
                aria-label={isEditingCode ? "Cancel code edit" : "Edit"}
                className="inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-slate-300 hover:bg-[#252b36] hover:text-white"
              >
                <CodeXml size={14} />
                {isEditingCode ? "Cancel" : "Edit"}
              </button>
              {isEditingCode && (
                <button
                  type="button"
                  onClick={handleSaveSnippet}
                  className="inline-flex items-center gap-1.5 rounded bg-emerald-600 px-2 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Save
                </button>
              )}
            </>
          }
        />
      </section>
    </div>
  );
}
