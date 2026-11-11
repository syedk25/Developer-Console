import { LogOut, Moon, PanelLeftClose, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useAppNavigation";
import { logout, toggleSidebar, toggleTheme } from "../../store/appSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.app.theme);
  const accessToken = useSelector((state) => state.app.accessToken);
  const user = useSelector((state) => state.app.user);
  const { section, selectedConcept } = useCurrentPage();

  function handleLogout() {
    dispatch(logout());
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 min-w-0 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-[#202633] dark:bg-[#05070d]/95 sm:px-7 lg:px-10">
      <div className="flex min-w-0 items-center gap-2 text-base sm:gap-3">
        <button
          className="grid size-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-emerald-800 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle sidebar"
          onClick={() => dispatch(toggleSidebar())}
        >
          <PanelLeftClose size={18} />
        </button>

        <span className="hidden text-slate-500 dark:text-slate-400 lg:inline">
          Workspace
        </span>
        <span className="hidden text-slate-400 dark:text-slate-600 lg:inline">
          /
        </span>
        <span className="truncate font-semibold text-slate-800 dark:text-slate-100">
          {section}
        </span>
        {selectedConcept && (
          <>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="truncate text-slate-600 dark:text-slate-300">
              {selectedConcept}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {accessToken && user && (
          <span className="hidden sm:inline-block sm:flex sm:items-center gap-2 px-2 py-1 rounded-md bg-slate-100 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {user.username}
          </span>
        )}
        {accessToken && (
          <button
            onClick={handleLogout}
            className="grid size-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-rose-400"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        )}
        <button
          onClick={() => dispatch(toggleTheme())}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun size={21} /> : <Moon size={21} />}
        </button>
      </div>
    </header>
  );
}
