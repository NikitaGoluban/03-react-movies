# 03-react-movies

Домашнє завдання модуля 3: пошук фільмів за ключовим словом через TMDB API.

React, TypeScript, Vite, Axios, React Hot Toast, CSS Modules та modern-normalize.

## Локальний запуск

1. Встановіть залежності:

   ```sh
   npm install
   ```

2. Скопіюйте `.env.example` у `.env` та вкажіть свій **API Read Access Token** із [налаштувань TMDB](https://www.themoviedb.org/settings/api):

   ```dotenv
   VITE_TMDB_TOKEN=your_api_read_access_token
   ```

   Використовуйте токен для Bearer-авторизації. Файл `.env` виключено з Git.

3. Запустіть застосунок:

   ```sh
   npm run dev
   ```

   Після зміни `.env` перезапустіть сервер Vite.

## Можливості

- Пошук через React Form Actions із перевіркою порожнього запиту.
- Галерея постерів з очищенням попередніх результатів при новому пошуку.
- Індикатор завантаження, повідомлення про помилку та сповіщення про відсутність результатів.
- Модальне вікно через `createPortal`: зображення, назва, опис, дата виходу та рейтинг.
- Закриття модального вікна кнопкою, Escape або кліком на фон; блокування й відновлення скролу.
- Керування картками з клавіатури, утримання фокуса в модалці та повернення фокуса після закриття.
- Локальне зображення-заглушка для відсутніх або недоступних постерів.
- Скасування попереднього запиту при новому пошуку й під час демонтування застосунку.

## Структура

```text
src/
  components/
    App/
    SearchBar/
    MovieGrid/
    Loader/
    ErrorMessage/
    MovieModal/
  services/movieService.ts
  types/movie.ts
  index.css
  main.tsx
```

Кожен компонент має власні `.tsx` та `.module.css`. Стилі взято з [репозиторію завдання](https://github.com/goitacademy/react-movies-styles); додано адаптацію форми й модального вікна для вузьких екранів.

## Перевірки

```sh
npm run build
npm run lint
npm run format:check
```

Для локального перегляду production-збірки:

```sh
npm run build
npm run preview
```

## Розгортання на Vercel

1. Імпортуйте [репозиторій 03-react-movies](https://github.com/NikitaGoluban/03-react-movies) у Vercel.
2. Оберіть пресет **Vite**, команду збірки `npm run build` та папку результату `dist`.
3. Додайте змінну середовища `VITE_TMDB_TOKEN` з вашим API Read Access Token для Production.
4. Виконайте розгортання. Якщо токен додано або змінено пізніше, запустіть нове розгортання.
5. Перевірте пошук і модальне вікно на живій сторінці.

Для здачі потрібні посилання на репозиторій і **production-домен із розділу Domains** у Vercel. Після останніх змін у GitHub зачекайте 5 хвилин перед відправленням роботи на перевірку, як зазначено у вимогах.
