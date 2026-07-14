import { element } from "./dom.js";

export function messageElement(item, { onCopy } = {}) {
  const body = element("p", { text: item.text });
  const article = element("article", { className: `message ${item.role}`, "data-message-id": item.id }, [body]);
  if (item.role === "bot") {
    article.prepend(element("span", { className: "message-label", text: "IKEBOT" }));
    article.append(element("button", { className: "copy-message", type: "button", "aria-label": "Copy this response", text: "Copy", onClick: () => onCopy?.(item.text) }));
  }
  return article;
}

export function renderHistory(container, history, options = {}) {
  const fragment = document.createDocumentFragment();
  history.forEach((item) => fragment.append(messageElement(item, options)));
  container.replaceChildren(fragment);
  container.scrollTop = container.scrollHeight;
}
