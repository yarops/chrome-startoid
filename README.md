# Chrome Startoid

Кастомная стартовая страница для Chrome на React.

## Возможности

- 🕐 Часы в реальном времени с датой
- 🔍 Умная строка поиска (Google поиск или прямой переход по URL)
- 🔗 Быстрые ссылки на популярные сайты
- 🌤️ Виджет погоды (заглушка)
- 🎨 Красивый градиентный дизайн
- 📱 Адаптивная верстка

## Установка и запуск

### Разработка

1. Установите зависимости:
```bash
npm install
```

2. Запустите сборку в режиме разработки:
```bash
npm run dev
```

3. Или запустите dev-сервер для тестирования:
```bash
npm start
```

### Сборка для продакшена

```bash
npm run build
```

### Установка в Chrome

1. Соберите проект: `npm run build`
2. Откройте Chrome и перейдите в `chrome://extensions/`
3. Включите "Режим разработчика"
4. Нажмите "Загрузить распакованное расширение"
5. Выберите папку `dist` из проекта
6. Откройте новую вкладку - увидите вашу стартовую страницу!

## Структура проекта

```
chrome-startoid/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx      # Строка поиска
│   │   ├── QuickLinks.tsx     # Быстрые ссылки
│   │   ├── Clock.tsx          # Часы и дата
│   │   └── Weather.tsx        # Виджет погоды
│   ├── styles/
│   │   └── global.css        # Глобальные стили
│   ├── App.tsч                # Главный компонент
│   └── main.tsx              # Точка входа
├── public/
│   └── index.html            # HTML шаблон
├── icons/                    # Иконки расширения
├── manifest.json             # Манифест Chrome расширения
├── webpack.config.js         # Конфигурация Webpack
└── package.json              # Зависимости проекта
```

## Кастомизация

### Изменение быстрых ссылок

Отредактируйте массив `links` в файле `src/components/QuickLinks.tsx`:

```javascript
const [links, setLinks] = useState([
  { name: 'Ваш сайт', url: 'https://example.com', icon: '🌐' },
  // добавьте свои ссылки
]);
```

### Изменение фона

Измените градиент в файле `src/styles/global.css`:

```css
body {
  background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### Добавление API погоды

Замените заглушку в `src/components/Weather.tsx` на реальный API запрос к сервису погоды.

## Технологии

- React 18
- Webpack 5
- Babel
- CSS3 с градиентами и backdrop-filter
- Chrome Extensions API

## Лицензия

MIT# chrome-startoid
