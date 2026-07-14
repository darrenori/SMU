export function createInitialState(overrides = {}) {
  return { activeTab: "assistant", libraryView: "sources", libraryQuery: "", busy: false, dialog: null, ...overrides };
}

export function reduceState(state, action) {
  switch (action.type) {
    case "tab/select": return { ...state, activeTab: action.tab };
    case "library/view": return { ...state, libraryView: action.view, libraryQuery: "" };
    case "library/search": return { ...state, libraryQuery: action.query };
    case "dialog/open": return { ...state, dialog: action.dialog };
    case "dialog/close": return { ...state, dialog: null };
    case "busy/set": return { ...state, busy: Boolean(action.value) };
    default: return state;
  }
}
