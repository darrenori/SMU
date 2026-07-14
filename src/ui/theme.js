import { STORAGE_KEYS } from "../core/constants.js";

export function applyTheme(theme = "system") {
  const resolved = theme === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}

export function loadTheme(storage) {
  return storage.get(STORAGE_KEYS.theme, "system");
}

export function cycleTheme(storage) {
  const current = loadTheme(storage);
  const next = current === "system" ? "light" : current === "light" ? "dark" : "system";
  storage.set(STORAGE_KEYS.theme, next);
  applyTheme(next);
  return next;
}
