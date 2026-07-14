# Testing

Run the complete release check:

```bash
npm run release:check
```

This performs:

- JavaScript syntax checks;
- Manifest V3 policy checks;
- local HTML asset-link checks;
- deterministic core unit tests;
- a production Vite build; and
- Chrome extension assembly.

For manual extension testing, load `extension-dist` through `chrome://extensions`, exercise each tab, close and reopen the popup to test persistence, export a transcript, switch themes and complete the keyboard checklist in `docs/accessibility.md`.
