export function createMatter(input = {}) {
  return {
    name: String(input.name || "Untitled matter").trim().slice(0, 80),
    reference: String(input.reference || "").trim().slice(0, 40),
    client: String(input.client || "").trim().slice(0, 80),
    notes: String(input.notes || "").trim().slice(0, 2000),
    updatedAt: new Date().toISOString()
  };
}

export function matterLabel(matter = {}) {
  return [matter.reference, matter.name].filter(Boolean).join(" · ") || "Untitled matter";
}

export function matterIsEmpty(matter = {}) {
  return !matter.reference && (!matter.name || matter.name === "Untitled matter") && !matter.client && !matter.notes;
}
