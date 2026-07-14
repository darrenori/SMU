export function bindShortcuts({ input, onExport, onClear, onTools, onLibrary }) {
  const handler = (event) => {
    const modifier = event.ctrlKey || event.metaKey;
    if (modifier && event.key.toLowerCase() === "k") { event.preventDefault(); input?.focus(); }
    if (modifier && event.shiftKey && event.key.toLowerCase() === "e") { event.preventDefault(); onExport?.(); }
    if (modifier && event.shiftKey && event.key.toLowerCase() === "backspace") { event.preventDefault(); onClear?.(); }
    if (event.altKey && event.key === "2") { event.preventDefault(); onTools?.(); }
    if (event.altKey && event.key === "3") { event.preventDefault(); onLibrary?.(); }
  };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}
