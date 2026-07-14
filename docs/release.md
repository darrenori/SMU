# Release process

1. Update the version in `package.json`, `manifest.json` and `src/core/constants.js`.
2. Add release notes to `CHANGELOG.md`.
3. Run `npm ci` followed by `npm run release:check`.
4. Load `extension-dist` unpacked in Chrome and complete manual checks.
5. Confirm the extension requests zero permissions.
6. Inspect the packaged directory for unexpected files or secrets.
7. Deploy the Vite `dist` directory to Vercel.
8. Tag the reviewed commit only after both surfaces are verified.

The public site and extension may share a version, but they are independent artifacts.
