import {
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  Command,
  FileInput,
  Heading,
  LayoutPanelTop,
  List,
  Navigation,
  PanelBottom,
  PanelLeft,
  Pencil,
  Plus,
  Sparkles,
  SquareMousePointer,
  TableProperties,
  Trash2,
  TriangleAlert,
  UserRound,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../data/navigation";
import {
  useCurrentPage,
  useNavigateToSection,
} from "../../hooks/useAppNavigation";
import {
  addCustomConcept,
  deleteCustomConcept,
  setExpandedTechnology,
} from "../../store/appSlice";

const defaultUiLibraryItems = [
  "Buttons",
  "Card",
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

const defaultHtmlTopics = [
  "HTML Document Structure",
  "Basic HTML Page Tags",
  "HTML Text Formatting",
  "HTML Tables",
  "HTML Images",
  "HTML Links",
  "HTML Lists",
  "HTML Forms",
  "HTML5 New Input Elements",
  "HTML Layout",
  "Video in HTML Page",
  "Audio in HTML Page",
  "Adding CSS to HTML",
  "Adding JavaScript to HTML",
];

const uiLibrarySnippetStorageKey = "devspace-ui-library-code-snippets";
const customConceptsStorageKey = "devspace-custom-concepts";

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

const uiLibraryIcons = {
  Buttons: SquareMousePointer,
  Card: LayoutPanelTop,
  Headers: Heading,
  Footer: PanelBottom,
  Lists: List,
  Form: FileInput,
  Table: TableProperties,
  Badges: BadgeCheck,
  Alerts: TriangleAlert,
  Modal: PanelLeft,
  Tabs: Navigation,
  Navbar: Navigation,
  Sidebar: PanelLeft,
  Avatar: UserRound,
  Hero: Sparkles,
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToSection = useNavigateToSection();
  const { section, selectedConceptIndex, topics } = useCurrentPage();
  const expandedTechnology = useSelector(
    (state) => state.app.expandedTechnology
  );
  const sidebarOpen = useSelector((state) => state.app.sidebarOpen);
  const technologyTopics = topics;
  const [technologiesOpen, setTechnologiesOpen] = useState(true);
  const [uiLibraryOpen, setUiLibraryOpen] = useState(true);
  const [htmlEditingIndex, setHtmlEditingIndex] = useState(null);
  const [htmlEditDraft, setHtmlEditDraft] = useState("");
  const [htmlTopics, setHtmlTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("devspace-html-topics");
      return saved ? JSON.parse(saved) : defaultHtmlTopics;
    } catch {
      return defaultHtmlTopics;
    }
  });
  const [uiLibraryItems, setUiLibraryItems] = useState(() => {
    try {
      const saved = localStorage.getItem("devspace-ui-library-items");
      return saved ? JSON.parse(saved) : defaultUiLibraryItems;
    } catch {
      return defaultUiLibraryItems;
    }
  });
  const [uiLibraryEditingIndex, setUiLibraryEditingIndex] = useState(null);
  const [uiLibraryEditDraft, setUiLibraryEditDraft] = useState("");
  const customConcepts = useSelector((state) => state.app.customConcepts);
  const previousSection = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "devspace-ui-library-items",
      JSON.stringify(uiLibraryItems)
    );
  }, [uiLibraryItems]);

  useEffect(() => {
    try {
      const savedSnippets = JSON.parse(
        localStorage.getItem(uiLibrarySnippetStorageKey) || "{}"
      );

      uiLibraryItems.forEach((item) => {
        if (!savedSnippets[item]) {
          savedSnippets[item] = buildStarterSnippet(item);
        }
      });

      Object.keys(savedSnippets).forEach((item) => {
        if (!uiLibraryItems.includes(item)) {
          delete savedSnippets[item];
        }
      });

      localStorage.setItem(
        uiLibrarySnippetStorageKey,
        JSON.stringify(savedSnippets)
      );
    } catch {
      // Ignore malformed browser storage.
    }
  }, [uiLibraryItems]);

  useEffect(() => {
    if (previousSection.current !== section) {
      previousSection.current = section;
      dispatch(setExpandedTechnology(section));
    }
  }, [dispatch, section]);

  function toggleTechnology(label) {
    const nextTechnology = expandedTechnology === label ? null : label;
    dispatch(setExpandedTechnology(nextTechnology));
    if (nextTechnology && section !== label) {
      navigateToSection(label);
    }
  }

  function addUiLibraryItem() {
    const nextName = window.prompt("Add a new component name", "New component");
    const trimmed = nextName?.trim();
    if (!trimmed || uiLibraryItems.includes(trimmed)) return;

    setUiLibraryItems((current) => [...current, trimmed]);
    try {
      const savedSnippets = JSON.parse(
        localStorage.getItem(uiLibrarySnippetStorageKey) || "{}"
      );
      savedSnippets[trimmed] = buildStarterSnippet(trimmed);
      localStorage.setItem(
        uiLibrarySnippetStorageKey,
        JSON.stringify(savedSnippets)
      );
    } catch {
      // Ignore malformed browser storage.
    }
    navigate(
      `${navigation.COMPONENTS.path}?component=${encodeURIComponent(trimmed)}`
    );
  }

  return (
    <aside
      className={`z-30 flex w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 py-5 transition-all duration-300 ease-in-out dark:border-[#202633] dark:bg-[#080c15] sm:sticky sm:top-0 sm:h-screen ${sidebarOpen ? "" : "hidden opacity-0 pointer-events-none"}`}
    >
      <div className="mb-7 flex h-12 items-center gap-3 border-b border-slate-200 px-1.5 pb-4 dark:border-slate-800">
        <div className="grid size-9 place-items-center rounded-lg bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950">
          <Command size={18} />
        </div>
        <div className="flex flex-1 flex-col">
          <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Devspace
          </strong>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Technology guides
          </span>
        </div>
        <ChevronDown size={16} className="text-slate-500" />
      </div>
      <nav className="flex flex-col gap-1" aria-label="Main navigation">
        <button
          type="button"
          onClick={() => setTechnologiesOpen((open) => !open)}
          className="mb-1 mt-2 flex items-center justify-between rounded-md px-2 py-1 text-left text-[11px] font-bold tracking-[0.14em] text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#111722]"
          aria-expanded={technologiesOpen}
        >
          <span>TECHNOLOGIES</span>
          {technologiesOpen ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </button>
        {technologiesOpen &&
          technologyTopics.map(({ label, path, icon: Icon, concepts }) => {
            const expanded = expandedTechnology === label;

            return (
              <div key={path}>
                <button
                  aria-expanded={expanded}
                  className={`flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold transition ${expanded ? "bg-emerald-50 text-emerald-900 dark:bg-[#151b26] dark:text-emerald-200" : "text-slate-700 hover:bg-emerald-100 dark:text-slate-300 dark:hover:bg-[#111722]"}`}
                  onClick={() => toggleTechnology(label)}
                  type="button"
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span className="flex-1">{label}</span>
                  {expanded ? (
                    <ChevronDown size={15} />
                  ) : (
                    <ChevronRight size={15} />
                  )}
                </button>
                {expanded && (
                  <div
                    aria-label={`${label} concepts`}
                    className="ml-5 mt-1 flex flex-col gap-0.5 border-l border-slate-200 pl-2 dark:border-slate-800"
                    role="group"
                  >
                    {label === "HTML" ? (
                      <>
                        {htmlTopics.map((title, index) => {
                          const isEditing = htmlEditingIndex === index;

                          function saveHtmlTopic() {
                            const next = htmlEditDraft.trim();
                            if (!next || next === title) {
                              setHtmlEditingIndex(null);
                              return;
                            }
                            const nextTopics = [...htmlTopics];
                            nextTopics[index] = next;
                            setHtmlTopics(nextTopics);
                            try {
                              localStorage.setItem(
                                "devspace-html-topics",
                                JSON.stringify(nextTopics)
                              );
                            } catch {
                              // Ignore malformed browser storage.
                            }
                            setHtmlEditingIndex(null);
                          }

                          return (
                            <div
                              key={title}
                              className="cursor-pointer flex items-center gap-2 rounded-md px-2 py-2.5 text-sm leading-5 transition"
                              onClick={() =>
                                !isEditing && navigateToSection(label, index)
                              }
                            >
                              {isEditing ? (
                                <input
                                  autoFocus
                                  defaultValue={title}
                                  value={htmlEditDraft}
                                  onChange={(e) =>
                                    setHtmlEditDraft(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && saveHtmlTopic()
                                  }
                                  onBlur={saveHtmlTopic}
                                  className="flex-1 w-0 min-w-0 bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                                  placeholder={title}
                                />
                              ) : (
                                <>
                                  <span className="flex-1 truncate">
                                    {title}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setHtmlEditingIndex(index);
                                      setHtmlEditDraft(title);
                                    }}
                                    className="rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                                    aria-label={`Edit ${title}`}
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        window.confirm(
                                          `Delete HTML topic "${title}"?`
                                        )
                                      ) {
                                        const nextTopics = htmlTopics.filter(
                                          (_, i) => i !== index
                                        );
                                        setHtmlTopics(nextTopics);
                                        try {
                                          localStorage.setItem(
                                            "devspace-html-topics",
                                            JSON.stringify(nextTopics)
                                          );
                                        } catch {
                                          // Ignore malformed browser storage.
                                        }
                                        if (htmlEditingIndex === index) {
                                          setHtmlEditingIndex(null);
                                        }
                                      }
                                    }}
                                    className="rounded-md p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                                    aria-label={`Delete ${title}`}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          );
                        })}
                        {customConcepts[label]?.map((title, index) => {
                          const actualIndex = htmlTopics.length + index;

                          function saveCustomHtmlTopic() {
                            const next = htmlEditDraft.trim();
                            if (!next || next === title) {
                              setHtmlEditingIndex(null);
                              return;
                            }
                            const nextCustom = [
                              ...(customConcepts[label] || []),
                            ];
                            nextCustom[actualIndex - htmlTopics.length] = next;
                            setCustomConcepts({
                              ...customConcepts,
                              [label]: nextCustom,
                            });
                            setHtmlEditingIndex(null);
                          }

                          const isEditing = htmlEditingIndex === actualIndex;

                          return (
                            <div
                              key={title}
                              className="cursor-pointer flex items-center gap-2 rounded-md px-2 py-2.5 text-sm leading-5 transition"
                              onClick={() =>
                                !isEditing &&
                                navigateToSection(label, actualIndex)
                              }
                            >
                              {isEditing ? (
                                <input
                                  autoFocus
                                  defaultValue={title}
                                  value={htmlEditDraft}
                                  onChange={(e) =>
                                    setHtmlEditDraft(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && saveCustomHtmlTopic()
                                  }
                                  onBlur={saveCustomHtmlTopic}
                                  className="flex-1 w-0 min-w-0 bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                                  placeholder={title}
                                />
                              ) : (
                                <>
                                  <span className="flex-1 truncate">
                                    {title}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setHtmlEditingIndex(actualIndex);
                                      setHtmlEditDraft(title);
                                    }}
                                    className="rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                                    aria-label={`Edit ${title}`}
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        window.confirm(
                                          `Delete custom HTML concept "${title}"?`
                                        )
                                      ) {
                                        const nextCustom = [
                                          ...(customConcepts[label] || []),
                                        ];
                                        nextCustom.splice(index, 1);
                                        dispatch(
                                          deleteCustomConcept({
                                            label,
                                            title,
                                          })
                                        );
                                        setCustomConcepts({
                                          ...customConcepts,
                                          [label]: nextCustom,
                                        });
                                        if (htmlEditingIndex === actualIndex) {
                                          setHtmlEditingIndex(null);
                                        }
                                      }
                                    }}
                                    className="rounded-md p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                                    aria-label={`Delete ${title}`}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => {
                            const nextName = window.prompt(
                              "Add a new HTML topic",
                              "New topic"
                            );
                            const trimmed = nextName?.trim();
                            if (
                              !trimmed ||
                              htmlTopics.includes(trimmed) ||
                              (customConcepts[label] || []).includes(trimmed)
                            ) {
                              return;
                            }
                            dispatch(
                              addCustomConcept({ label, title: trimmed })
                            );
                            const newIndex =
                              htmlTopics.length +
                              (customConcepts[label] || []).length;
                            setHtmlEditingIndex(newIndex);
                            setHtmlEditDraft(trimmed);
                            navigateToSection(label, newIndex);
                          }}
                          className="flex min-h-9 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-[#111722]"
                        >
                          <Plus size={14} className="shrink-0" />
                          <span>Add New</span>
                        </button>
                      </>
                    ) : (
                      <>
                        {concepts.map(({ title }, index) => (
                          <div className="flex items-center gap-1.5">
                            <button
                              aria-current={
                                selectedConceptIndex === index
                                  ? "page"
                                  : undefined
                              }
                              className={`flex-1 rounded-md px-2 py-2.5 text-left text-sm leading-5 transition ${
                                selectedConceptIndex === index
                                  ? "border-l-2 border-emerald-500 bg-emerald-50 font-semibold text-emerald-800 dark:border-emerald-400 dark:bg-[#151b26] dark:text-slate-50"
                                  : "border-l-2 border-transparent text-slate-600 hover:bg-emerald-100 dark:text-slate-400 dark:hover:bg-[#111722]"
                              }`}
                              key={title}
                              onClick={() => navigateToSection(label, index)}
                              type="button"
                            >
                              {title}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHtmlEditingIndex(
                                  concepts.length > index ? index : null
                                );
                              }}
                              className="rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                              aria-label={`Edit ${title}`}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  window.confirm(
                                    `Delete ${label} concept "${title}"?`
                                  )
                                ) {
                                  dispatch(
                                    deleteCustomConcept({
                                      label,
                                      title,
                                    })
                                  );
                                }
                              }}
                              className="rounded-md p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                              aria-label={`Delete ${title}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        {customConcepts[label]?.map((title, index) => (
                          <div className="flex items-center gap-1.5">
                            <button
                              aria-current={
                                selectedConceptIndex === concepts.length + index
                                  ? "page"
                                  : undefined
                              }
                              className={`rounded-md px-2 py-2.5 text-left text-sm leading-5 transition ${
                                selectedConceptIndex === concepts.length + index
                                  ? "border-l-2 border-emerald-500 bg-emerald-50 font-semibold text-emerald-800 dark:border-emerald-400 dark:bg-[#151b26] dark:text-slate-50"
                                  : "border-l-2 border-transparent text-slate-600 hover:bg-emerald-100 dark:text-slate-400 dark:hover:bg-[#111722]"
                              }`}
                              key={title}
                              onClick={() =>
                                navigateToSection(
                                  label,
                                  concepts.length + index
                                )
                              }
                              type="button"
                            >
                              {title}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                              aria-label={`Edit ${title}`}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  window.confirm(
                                    `Delete custom ${label} concept "${title}"?`
                                  )
                                ) {
                                  dispatch(
                                    deleteCustomConcept({
                                      label,
                                      title,
                                    })
                                  );
                                }
                              }}
                              className="rounded-md p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                              aria-label={`Delete ${title}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const nextName = window.prompt(
                              `Add a new ${label} concept`,
                              "New concept"
                            );
                            const trimmed = nextName?.trim();
                            if (
                              !trimmed ||
                              concepts.some((c) => c.title === trimmed) ||
                              (customConcepts[label] || []).includes(trimmed)
                            ) {
                              return;
                            }
                            const newCustom = [
                              ...(customConcepts[label] || []),
                              trimmed,
                            ];
                            dispatch(
                              addCustomConcept({ label, title: trimmed })
                            );
                            const newIndex =
                              concepts.length + newCustom.length - 1;
                            navigateToSection(label, newIndex);
                          }}
                          className="flex min-h-9 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-[#111722]"
                        >
                          <Plus size={14} className="shrink-0" />
                          <span>Add New</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
          <div className="mb-1 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setUiLibraryOpen((open) => !open)}
              className="flex flex-1 items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] font-bold tracking-[0.14em] text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-[#111722]"
              aria-expanded={uiLibraryOpen}
            >
              <span>UI LIBRARY</span>
              {uiLibraryOpen ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          </div>

          {uiLibraryOpen && (
            <div className="flex flex-col gap-0.5">
              {uiLibraryItems.map((item, index) => {
                const Icon = uiLibraryIcons[item] ?? Sparkles;
                const isEditing = uiLibraryEditingIndex === index;

                function saveUiLibraryItem() {
                  const next = uiLibraryEditDraft.trim();
                  if (!next || next === item) {
                    setUiLibraryEditingIndex(null);
                    return;
                  }
                  const nextItems = [...uiLibraryItems];
                  nextItems[index] = next;
                  setUiLibraryItems(nextItems);
                  try {
                    localStorage.setItem(
                      "devspace-ui-library-items",
                      JSON.stringify(nextItems)
                    );
                  } catch {
                    // Ignore malformed browser storage.
                  }
                  setUiLibraryEditingIndex(null);
                }

                return (
                  <div
                    key={item}
                    className="cursor-pointer flex items-center gap-2 rounded-md px-2 py-2.5 text-sm leading-5 transition hover:bg-emerald-100 dark:hover:bg-[#111722]"
                    onClick={() =>
                      !isEditing &&
                      navigate(
                        `${navigation.COMPONENTS.path}?component=${encodeURIComponent(item)}`
                      )
                    }
                  >
                    {isEditing ? (
                      <input
                        autoFocus
                        defaultValue={item}
                        value={uiLibraryEditDraft}
                        onChange={(e) => setUiLibraryEditDraft(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && saveUiLibraryItem()
                        }
                        onBlur={saveUiLibraryItem}
                        className="flex-1 w-0 min-w-0 bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                        placeholder={item}
                      />
                    ) : (
                      <>
                        <Icon size={14} className="shrink-0" />
                        <span className="flex-1 truncate">{item}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUiLibraryEditingIndex(index);
                            setUiLibraryEditDraft(item);
                          }}
                          className="rounded-md p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                          aria-label={`Edit ${item}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                `Delete UI library item "${item}"?`
                              )
                            ) {
                              const nextItems = uiLibraryItems.filter(
                                (_, i) => i !== index
                              );
                              setUiLibraryItems(nextItems);
                              try {
                                localStorage.setItem(
                                  "devspace-ui-library-items",
                                  JSON.stringify(nextItems)
                                );
                              } catch {
                                // Ignore malformed browser storage.
                              }
                              if (uiLibraryEditingIndex === index) {
                                setUiLibraryEditingIndex(null);
                              }
                            }
                          }}
                          className="rounded-md p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                          aria-label={`Delete ${item}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addUiLibraryItem}
                className="flex min-h-9 w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-[#111722]"
              >
                <Plus size={14} className="shrink-0" />
                <span>Add New</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
