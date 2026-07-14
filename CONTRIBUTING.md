# Contributing

Contributions should preserve IKEBOT's local-first, deterministic design.

## Development

```bash
npm install
npm run release:check
```

Use Node.js 22.12 or the version in `.nvmrc`.

## Principles

1. Do not add remote scripts, analytics or silent network requests.
2. Do not request a Chrome permission unless the feature cannot work without it and the privacy impact is documented.
3. Keep workflow output deterministic and reviewable.
4. Phrase legal content as preparation support, never as legal advice.
5. Add tests for core logic and update relevant documentation.
6. Preserve keyboard access, visible focus and reduced-motion support.

## Commit style

Use an imperative subject that explains the user-visible or architectural change. Keep unrelated changes in separate commits.
