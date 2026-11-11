import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { api } from "../api";
import { fullStackTopics } from "../data/fullStackTopics";
import { technologyTopics } from "../data/technologyTopics";

const customizationStorageKey = "devspace-learning-customizations-v1";
const customConceptsStorageKey = "devspace-custom-concepts-v1";
const allTopics = [...technologyTopics, ...fullStackTopics];

function readTheme() {
  try {
    return window.localStorage.getItem("devspace-theme-v2") === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function readCustomizations() {
  try {
    const saved = window.localStorage.getItem(customizationStorageKey);
    const edits = saved ? JSON.parse(saved) : {};
    if (!edits || typeof edits !== "object" || Array.isArray(edits)) {
      throw new TypeError("Saved lesson customizations are invalid.");
    }
    return { edits, error: "" };
  } catch (error) {
    return {
      edits: {},
      error: `Could not read saved lesson edits: ${
        error instanceof Error ? error.message : "unknown storage error"
      }`,
    };
  }
}

function readCustomConcepts() {
  try {
    const saved = window.localStorage.getItem(customConceptsStorageKey);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function getErrorMessage(error, fallback) {
  return error instanceof Error ? error.message : fallback;
}

const savedCustomizations = readCustomizations();

export const login = createAsyncThunk(
  "app/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", { username, password });
      const { accessToken } = data;
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return { accessToken, user: data.user };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Login failed. Invalid username or password.")
      );
    }
  }
);

export const logout = createAsyncThunk(
  "app/logout",
  async (_, { dispatch }) => {
    api.defaults.headers.common["Authorization"] = undefined;
    dispatch(dismissStatusMessage());
  }
);

export const loadProjects = createAsyncThunk(
  "app/loadProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/projects");
      return data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to load projects.")
      );
    }
  }
);

export const saveLessonEdits = createAsyncThunk(
  "app/saveLessonEdits",
  async ({ path, conceptIndex, changes }, { getState, rejectWithValue }) => {
    const edits = {
      ...getState().app.contentEdits,
      [`${path}::topic`]: changes.topic,
      [`${path}::lesson::${conceptIndex}`]: changes.concept,
    };

    try {
      window.localStorage.setItem(
        customizationStorageKey,
        JSON.stringify(edits)
      );
      return edits;
    } catch (error) {
      return rejectWithValue(
        `Unable to save lesson changes: ${getErrorMessage(
          error,
          "browser storage error"
        )}`
      );
    }
  }
);

export const resetLessonEdits = createAsyncThunk(
  "app/resetLessonEdits",
  async ({ path, conceptIndex }, { getState, rejectWithValue }) => {
    const edits = { ...getState().app.contentEdits };
    delete edits[`${path}::topic`];
    delete edits[`${path}::lesson::${conceptIndex}`];

    try {
      window.localStorage.setItem(
        customizationStorageKey,
        JSON.stringify(edits)
      );
      return edits;
    } catch (error) {
      return rejectWithValue(
        `Unable to restore lesson: ${getErrorMessage(
          error,
          "browser storage error"
        )}`
      );
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    theme: readTheme(),
    sidebarOpen: true,
    expandedTechnology: null,
    copied: "",
    accessToken: null,
    user: null,
    projects: [],
    projectsStatus: "idle",
    apiError: "",
    statusMessage: savedCustomizations.error,
    contentEdits: savedCustomizations.edits,
    customConcepts: readCustomConcepts(),
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setExpandedTechnology(state, action) {
      state.expandedTechnology = action.payload;
    },
    setCopied(state, action) {
      state.copied = action.payload;
    },
    setStatusMessage(state, action) {
      state.statusMessage = action.payload;
    },
    dismissStatusMessage(state) {
      state.statusMessage = "";
    },
    addCustomConcept(state, action) {
      const { label, title } = action.payload;
      if (!state.customConcepts[label]) {
        state.customConcepts[label] = [];
      }
      if (!state.customConcepts[label].includes(title)) {
        state.customConcepts[label].push(title);
      }
      try {
        window.localStorage.setItem(
          customConceptsStorageKey,
          JSON.stringify(state.customConcepts)
        );
      } catch {
        // Ignore malformed browser storage.
      }
    },
    deleteCustomConcept(state, action) {
      const { label, title } = action.payload;
      if (state.customConcepts[label]) {
        state.customConcepts[label] = state.customConcepts[label].filter(
          (t) => t !== title
        );
      }
      try {
        window.localStorage.setItem(
          customConceptsStorageKey,
          JSON.stringify(state.customConcepts)
        );
      } catch {
        // Ignore malformed browser storage.
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.projectsStatus = "loading";
        state.apiError = "";
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.projectsStatus = "succeeded";
        state.projects = action.payload;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.projectsStatus = "failed";
        state.apiError = action.payload || "Unable to load projects.";
      })
      .addCase(saveLessonEdits.fulfilled, (state, action) => {
        state.contentEdits = action.payload;
        state.statusMessage = "Lesson changes saved in this browser.";
      })
      .addCase(saveLessonEdits.rejected, (state, action) => {
        state.statusMessage =
          action.payload || "Unable to save lesson changes.";
      })
      .addCase(resetLessonEdits.fulfilled, (state, action) => {
        state.contentEdits = action.payload;
        state.statusMessage = "Lesson restored to its original content.";
      })
      .addCase(resetLessonEdits.rejected, (state, action) => {
        state.statusMessage = action.payload || "Unable to restore lesson.";
      })
      .addCase(login.pending, (state) => {
        state.apiError = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.apiError = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.apiError = action.payload || "Login failed.";
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.apiError = "";
      });
  },
});

export const {
  addCustomConcept,
  deleteCustomConcept,
  dismissStatusMessage,
  setCopied,
  setExpandedTechnology,
  setStatusMessage,
  toggleSidebar,
  toggleTheme,
} = appSlice.actions;

const selectContentEdits = (state) => state.app.contentEdits;
const selectCustomConcepts = (state) => state.app.customConcepts;

export const selectCustomizedTopics = createSelector(
  [selectContentEdits, selectCustomConcepts],
  (edits, customConcepts) =>
    allTopics.map((topic) => {
      const topicEdits = edits[`${topic.path}::topic`] ?? {};
      const topicCustomConcepts = customConcepts[topic.label] || [];
      return {
        ...topic,
        ...topicEdits,
        concepts: [
          ...topic.concepts.map((concept, index) => ({
            ...concept,
            ...(edits[`${topic.path}::lesson::${index}`] ?? {}),
          })),
          ...topicCustomConcepts.map((title) => ({
            title,
            explanation: `Content for "${title}" — add your notes here.`,
            points: ["Add key points to describe this concept."],
            exampleTitle: title,
            filename: `${title.toLowerCase().replace(/\s+/g, "-")}.html`,
            language: topic.label === "HTML" ? "HTML" : "JavaScript",
            code: `<!-- Content for ${title} -->\n\nAdd your example code here.`,
          })),
        ],
      };
    })
);

export { allTopics };
export default appSlice.reducer;
