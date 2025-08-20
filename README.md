# Chrome Startoid

Кастомная стартовая страница для Chrome (New Tab) на React + Vite.

## Возможности

- 🕐 Реальные часы с датой
- 🔍 Умная строка поиска: Google-поиск или прямой переход по URL/домену
- 🔗 Быстрые ссылки (настраиваются в `public/quick-links.json`)
- 🎨 Градиентный минималистичный дизайн
- 📱 Адаптивная вёрстка

## Требования

- Node.js — см. версию в `.nvmrc`
- PNPM (рекомендуется) или NPM

## Быстрый старт

### Установка зависимостей

PNPM:
```bash
pnpm install
```

NPM:
```bash
npm install
```

### Режим разработки

PNPM:
```bash
pnpm dev
```

NPM:
```bash
npm run dev
```

### Сборка production

PNPM:
```bash
pnpm build
```

NPM:
```bash
npm run build
```

### Локальный предпросмотр собранной версии (опционально)

PNPM:
```bash
pnpm preview
```

NPM:
```bash
npm run preview
```

## Установка в Chrome

1. Соберите проект: `pnpm build` или `npm run build`.
2. Откройте Chrome → перейдите в `chrome://extensions/`.
3. Включите «Режим разработчика» (Developer mode).
4. Нажмите «Загрузить распакованное» (Load unpacked).
5. Укажите папку `dist` из этого проекта.
6. Откройте новую вкладку — увидите стартовую страницу.

## Структура проекта

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
│  │  ├─ SearchBar/
│  │  └─ QuickLinks.tsx
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

## Кастомизация

- **Быстрые ссылки**: отредактируйте `public/quick-links.json`.
  Пример:
  ```json
  [
    { "name": "GitHub", "url": "https://github.com", "icon": "github" },
    { "name": "YouTube", "url": "https://youtube.com", "icon": "youtube" }
  ]
  ```
  Поддерживаемые значения `icon` зависят от реализации компонента `Icon`.

- **Поисковая строка**: компонент `SearchBar` умеет определять URL и выполнять прямой переход, иначе — поиск в Google.

- **Стили и фон**: изменяйте градиенты и общий вид в `src/styles/global.css`.

- **Иконка расширения**: замените файл `public/icons/icon.svg` и обновите пути/размеры в `public/manifest.json` при необходимости.

## Технологии

- React 18 + TypeScript
- Vite
- CSS (в т.ч. CSS Modules)
- Chrome Extensions Manifest V3

## Лицензия

MIT
