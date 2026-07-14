function matrix(rows, columns) {
  return Array.from({ length: rows + 1 }, () => new Uint32Array(columns + 1));
}

export function diffLines(before = "", after = "") {
  const left = String(before).split(/\r?\n/);
  const right = String(after).split(/\r?\n/);
  const table = matrix(left.length, right.length);
  for (let i = left.length - 1; i >= 0; i -= 1) {
    for (let j = right.length - 1; j >= 0; j -= 1) {
      table[i][j] = left[i] === right[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const output = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    if (i < left.length && j < right.length && left[i] === right[j]) { output.push({ type: "same", text: left[i] }); i += 1; j += 1; }
    else if (j < right.length && (i === left.length || table[i][j + 1] > table[i + 1][j])) { output.push({ type: "added", text: right[j] }); j += 1; }
    else { output.push({ type: "removed", text: left[i] }); i += 1; }
  }
  return output;
}

export function diffStats(changes = []) {
  return changes.reduce((stats, { type }) => ({ ...stats, [type]: stats[type] + 1 }), { same: 0, added: 0, removed: 0 });
}

export function formatDiff(changes = []) {
  const prefix = { same: "  ", added: "+ ", removed: "- " };
  return changes.map(({ type, text }) => `${prefix[type]}${text}`).join("\n");
}
