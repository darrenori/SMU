# IKEBOT

IKEBOT is a private, deterministic Chrome extension for lawyers in Singapore. It structures routine legal work inside the browser without a model, account, API key or data upload.

The original project received a prize through Singapore Management University's Legal Innovation & Technology programme. Version 2.0 develops that hackathon prototype into a tested local workspace while preserving its core idea: useful legal technology should meet lawyers where they already work.

> IKEBOT organises preparation. It does not provide legal advice, retrieve law or calculate an authoritative legal deadline. A qualified practitioner must verify every authority, date, conclusion and work product.

## Capabilities

### Nine guided workflows

- Client intake
- Singapore legal research planning
- Plain-language clause explanation
- Deadline triage
- Matter chronology
- Case briefing
- Document review
- Client correspondence
- Hearing preparation

### Offline matter tools

- Calendar-day and weekday planning-date calculator
- Chronology parsing, sorting and CSV export
- Line-by-line text comparison and draft readability inspection
- Singapore neutral citation and statutory section extraction
- Local detection and redaction of common email, phone and Singapore NRIC/FIN-like patterns
- Five-point privacy and lawyer-review checklist
- Searchable official Singapore legal starting points
- Compact legal glossary
- Local matter labels, persistent conversation history and text export
- Light, dark and system themes
- Keyboard shortcuts and reduced-motion support

## Privacy architecture

The extension requests **zero Chrome permissions** and makes **zero network requests**. It cannot read the active webpage. Matter details, conversation history, checklist progress and theme preference are stored only in the current browser profile and can be deleted through the interface.

The product site also runs the deterministic workflow engine locally. See [PRIVACY.md](PRIVACY.md) and [docs/privacy-model.md](docs/privacy-model.md) for the complete data flow.

## Run the product site

Requirements: Node.js 22.12+ (the version is recorded in `.nvmrc`).

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Install the Chrome extension

### Directly from the repository

1. Open `chrome://extensions` in Google Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this repository's root folder.
5. Pin IKEBOT and select its icon.

### From a clean extension build

```bash
npm run build:extension
```

Load the generated `extension-dist` directory through `chrome://extensions`. The build contains only the manifest, extension interface, shared runtime modules and required logo asset.

## Verify everything

```bash
npm run release:check
```

This checks syntax, the zero-permission Manifest V3 configuration, local asset links and unit tests before building both the Vercel site and Chrome extension.

Individual commands:

```bash
npm test
npm run test:coverage
npm run check
npm run build
npm run build:extension
```

## Deploy the site to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects the included Vite and output-directory settings; no environment variables are required.

Using the CLI:

```bash
npm install -g vercel
vercel
vercel --prod
```

## Project structure

```text
.
├── content/              # Original IKEBOT brand assets and demonstration media
├── docs/                 # Architecture, privacy, workflow and release documentation
├── extension/            # Chrome popup interface
├── scripts/              # Verification and extension assembly
├── src/
│   ├── core/             # Deterministic engine, privacy, date and persistence logic
│   ├── data/             # Workflows, glossary and authoritative source links
│   └── ui/               # Shared browser UI utilities
├── tests/                # Node unit tests for core behaviour
├── index.html            # Public product site
├── manifest.json         # Zero-permission Chrome Manifest V3 configuration
└── vercel.json           # Vercel deployment and security headers
```

## Commands inside IKEBOT

- `/help` lists commands
- `/intake`, `/research` and `/deadline` open specific workflows
- `/authorities` lists official research starting points
- `/privacy` explains local data handling
- `/clear` resets the conversation

See [docs/keyboard-shortcuts.md](docs/keyboard-shortcuts.md) for keyboard controls.

## Recognition

IKEBOT was recognised through Singapore Management University's Legal Innovation & Technology initiative, which promotes the thoughtful adoption of technology in legal practice. Learn more from [SMU Legal Innovation & Technology](https://law.smu.edu.sg/student-activities/student-clubs/smu-legal-innovation-and-technology-lit).

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing workflows or privacy boundaries. Report sensitive security concerns according to [SECURITY.md](SECURITY.md), never in a public issue containing confidential information.
