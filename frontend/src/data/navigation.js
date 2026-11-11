import { Braces, Fingerprint, Gauge, Globe2, Layers3,BookOpenCheck } from "lucide-react";
 
export const navigation = {
  OVERVIEW: {
    label: "Learn",
    path: "/learn",
    icon: BookOpenCheck,
    description:
      "Learn Full-Stack Development concepts",
  },
  OVERVIEW: {
    label: "Overview",
    path: "/overview",
    icon: Gauge,
    description:
      "One workspace for the UI patterns, API workflows, and security essentials you use every day.",
  },
  COMPONENTS: {
    label: "Components",
    path: "/components",
    icon: Layers3,
    description:
      "Production-ready interface patterns you can copy, customize, and ship.",
  },
  API: {
    label: "API & Axios",
    path: "/api",
    icon: Globe2,
    description:
      "Make resilient HTTP requests, handle errors, and keep your API client consistent.",
  },
  JWT: {
    label: "JWT security",
    path: "/jwt-security",
    icon: Fingerprint,
    description:
      "A practical guide to issuing, validating, and safely handling access tokens.",
  },
  STACK: {
    label: "Stack guide",
    path: "/stack-guide",
    icon: Braces,
    description:
      "A working map of the tools and practices behind a modern full-stack application.",
  },
};
