let timeout;

export function showToast(message, { duration = 2200, tone = "neutral" } = {}) {
  let toast = document.querySelector("#ikebot-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ikebot-toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }
  toast.dataset.tone = tone;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(timeout);
  timeout = window.setTimeout(() => { toast.hidden = true; }, duration);
}
