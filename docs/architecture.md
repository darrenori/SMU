# Architecture

IKEBOT has two browser surfaces backed by shared deterministic modules:

```text
Product site ─────┐
                  ├── src/core ── src/data
Chrome popup ─────┘       │
                          └── src/ui
```

`src/data` contains fixed workflow and reference content. `src/core` contains pure matching, formatting, privacy, date, export and persistence helpers. `src/ui` contains small DOM, theme and accessibility utilities. The product site is bundled by Vite; the extension runs native browser modules directly from the repository or packaged directory.

No server is required. Browser local storage is accessed through a defensive adapter so unavailable or corrupt storage does not stop the extension from opening.
