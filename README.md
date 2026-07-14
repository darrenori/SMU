# IKEBOT

IKEBOT is a Chrome extension prototype created for lawyers in Singapore. It places guided legal workflows inside the browser so practitioners can structure client intake, plan legal research, explain clauses in plain language and check the inputs needed for deadline calculations without leaving the page they are working on.

The project received a prize through Singapore Management University's Legal Innovation & Technology programme. It was built around a straightforward premise: useful legal technology should meet lawyers where they already work.

> IKEBOT is a prototype and does not provide legal advice. Its output must be checked by a qualified practitioner against current, authoritative sources.

## What is included

- A responsive product site with an interactive IKEBOT demo
- An installable Manifest V3 Chrome extension
- Guided workflows for client intake, research planning, clause explanation and deadline checks
- A zero-secret Vercel deployment configuration
- Accessibility basics, responsive layouts and reduced-motion support

The current demo is intentionally deterministic. It demonstrates the interaction design without sending matter information to an external service or requiring an API key.

## Run locally

Requirements: Node.js 20.19 or newer (or Node.js 22.12+).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To test the production build:

```bash
npm run build
npm run preview
```

## Install the Chrome extension

1. Clone or download this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the repository root (the folder containing `manifest.json`).
6. Pin IKEBOT from the Extensions menu and select its icon to open the assistant.

After making extension changes, return to `chrome://extensions` and select the reload icon on the IKEBOT card.

## Deploy to Vercel

### Vercel dashboard

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Vercel will detect the included Vite configuration.
3. Deploy. No environment variables are required.

### Vercel CLI

```bash
npm install -g vercel
vercel
```

Use `vercel --prod` when the preview is ready to become the production deployment.

## Project structure

```text
.
├── content/            # IKEBOT brand assets and original demonstration media
├── extension/          # Chrome extension popup interface and behaviour
├── app.js              # Interactive website demo
├── index.css           # Product-site styling
├── index.html          # Product site
├── manifest.json       # Chrome Manifest V3 configuration
├── package.json        # Local development and production build scripts
└── vercel.json         # Vercel deployment configuration
```

## Privacy and production considerations

This version stores no conversations and makes no network requests. Before connecting it to a live model or legal-data provider, add an authenticated server-side API, obtain the necessary data licences, define retention and deletion rules, protect legally privileged or confidential information, and complete security and professional-responsibility review.

## Recognition

IKEBOT was recognised through Singapore Management University's Legal Innovation & Technology initiative, which promotes the thoughtful adoption of technology in legal practice. Learn more about [SMU Legal Innovation & Technology](https://law.smu.edu.sg/student-activities/student-clubs/smu-legal-innovation-and-technology-lit).
