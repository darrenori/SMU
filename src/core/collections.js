export function groupBy(items = [], selector) {
  return items.reduce((groups, item) => {
    const key = typeof selector === "function" ? selector(item) : item[selector];
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
    return groups;
  }, new Map());
}

export function stableUnique(items = [], selector = (item) => item) {
  const seen = new Set();
  return items.filter((item) => {
    const key = selector(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function partition(items = [], predicate) {
  return items.reduce((result, item) => { result[predicate(item) ? 0 : 1].push(item); return result; }, [[], []]);
}
