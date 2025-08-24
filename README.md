# Chrome Startoid

Custom start page for Chrome (Vite + React).

## Features

- Smart search bar: Google search or direct navigation by URL/domain
- Quick links (configured in `public/quick-links.json`)
- Real-time clock (component `Clock`) with chrome userinfo.
- Chrome Top Sites (component `TopSites`, requires `topSites` permission)

## Requirements

- Node.js — see version in `.nvmrc`
- PNPM (recommended) or NPM

## Quick Start

### Install dependencies

PNPM:
```bash
pnpm install
```

NPM:
```bash
npm install
```

### Development

PNPM:
```bash
pnpm dev
```

NPM:
```bash
npm run dev
```

### Build for production

PNPM:
```bash
pnpm build
```

NPM:
```bash
npm run build
```

### Local preview (optional)

PNPM:
```bash
pnpm preview
```

NPM:
```bash
npm run preview
```

## Install in Chrome

1. Build the project: `pnpm build` or `npm run build`.
2. Open Chrome → go to `chrome://extensions/`.
3. Enable Developer mode.
4. Click “Load unpacked”.
5. Select the `dist` folder of this project.
6. Open a new tab — you should see the start page.

## Project structure

```
chrome-startoid/
├─ public/
│  ├─ icons/
│  │  └─ icon.svg
│  ├─ manifest.json
│  └─ quick-links.json
├─ src/
│  ├─ components/
│  │  ├─ Clock/
│  │  ├─ Icon/
│  │  ├─ QuickLinks/
│  │  ├─ SearchBar/
│  │  └─ TopSites/
│  ├─ styles/
│  │  └─ global.css
│  ├─ types/
│  │  ├─ chrome.d.ts
│  │  └─ css-modules.d.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ vite.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.json
├─ tsconfig.node.json
└─ README.md
```

## Technologies

- React 18 + TypeScript
- Vite
- CSS (including CSS Modules)
- Chrome Extensions Manifest V3

## License

MIT
