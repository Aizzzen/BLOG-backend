## Описание

Backend для проекта BLOG

Технологии: Nest, Typescript, Sequelize, PostgreSQL, JWT

```bash
Количество ролей пользователя: 2 - ADMIN | USER

Функционал описан в документации при помощи Swagger
Документация REST API: http://localhost:5000/api/docs
Реализованы:
  -Регистрация / Авторизация
  -Создание / Удаление пользователя
  -Получение пользователей
  -Выдача ролей пользователям
  -Блокировка / Разблокировка пользователей
  -Создание / Получение / Удаление ролей пользователей
  -Создание / Получение / Удаление постов-записей
```

## Установка зависимостей

```bash
$ npm install
```

## Запуск приложения

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Тесты

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
