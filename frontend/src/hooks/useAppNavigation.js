import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../data/navigation";
import { allTopics, selectCustomizedTopics } from "../store/appSlice";

const navigationItems = [...Object.values(navigation), ...allTopics];
const sectionByPath = Object.fromEntries(
  navigationItems.map(({ path, label }) => [path, label])
);
const pathBySection = Object.fromEntries(
  navigationItems.map(({ path, label }) => [label, path])
);

export function useCurrentPage() {
  const location = useLocation();
  const topics = useSelector(selectCustomizedTopics);
  const activeTopic = topics.find(({ path }) => path === location.pathname);
  const section =
    sectionByPath[location.pathname] ?? allTopics[0]?.label ?? "Documentation";
  const requestedIndex = Number(
    new URLSearchParams(location.search).get("topic")
  );
  const selectedConceptIndex =
    activeTopic &&
    Number.isInteger(requestedIndex) &&
    requestedIndex >= 0 &&
    requestedIndex < activeTopic.concepts.length
      ? requestedIndex
      : 0;

  return {
    section,
    activeTopic,
    selectedConceptIndex,
    selectedConcept: activeTopic?.concepts[selectedConceptIndex]?.title,
    topics,
  };
}

export function useNavigateToSection() {
  const navigate = useNavigate();

  return (section, conceptIndex) => {
    const path = pathBySection[section] ?? navigation.OVERVIEW.path;
    navigate(
      conceptIndex === undefined || conceptIndex === 0
        ? path
        : `${path}?topic=${conceptIndex}`
    );
  };
}
