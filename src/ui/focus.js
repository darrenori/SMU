export function trapFocus(container) {
  const selector = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
  const onKeydown = (event) => {
    if (event.key !== "Tab") return;
    const nodes = [...container.querySelectorAll(selector)].filter((node) => !node.hidden);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  container.addEventListener("keydown", onKeydown);
  return () => container.removeEventListener("keydown", onKeydown);
}

export function restoreFocusAfter(trigger, action) {
  action();
  return () => trigger?.focus();
}
