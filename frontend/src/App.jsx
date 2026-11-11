import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import PageHeader from "./components/layout/PageHeader";
import Sidebar from "./components/layout/Sidebar";
import StatusToast from "./components/layout/StatusToast";
import ApiGuide from "./components/pages/ApiGuide";
import ComponentsPage from "./components/pages/ComponentsPage";
import JwtGuide from "./components/pages/JwtGuide";
import Login from "./components/pages/Login";
import Overview from "./components/pages/Overview";
import StackGuide from "./components/pages/StackGuide";
import TechnologyPage from "./components/pages/TechnologyPage";
import { navigation } from "./data/navigation";
import { selectCustomizedTopics } from "./store/appSlice";

export default function App() {
  const reduxTheme = useSelector((state) => state.app.theme);
  const customizedTopics = useSelector(selectCustomizedTopics);
  const accessToken = useSelector((state) => state.app.accessToken);

  useEffect(() => {
    document.documentElement.dataset.theme = reduxTheme;
    window.localStorage.setItem("devspace-theme-v2", reduxTheme);
  }, [reduxTheme]);

  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased dark:bg-[#05070d] dark:text-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />
        <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <PageHeader />

          <Routes>
            <Route
              path="/"
              element={<Navigate to={customizedTopics[0].path} replace />}
            />
            <Route path={navigation.OVERVIEW.path} element={<Overview />} />
            {customizedTopics.map((topic) => (
              <Route
                key={topic.path}
                path={topic.path}
                element={<TechnologyPage />}
              />
            ))}
            <Route
              path={navigation.COMPONENTS.path}
              element={<ComponentsPage />}
            />
            <Route path={navigation.API.path} element={<ApiGuide />} />
            <Route path={navigation.JWT.path} element={<JwtGuide />} />
            <Route path={navigation.STACK.path} element={<StackGuide />} />
            <Route
              path="*"
              element={<Navigate to={navigation.OVERVIEW.path} replace />}
            />
          </Routes>

          <StatusToast />
        </section>
      </main>
    </div>
  );
}
