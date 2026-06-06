# Журнал работ

Веб-приложение для учета выполненных строительных работ. Проект включает журнал записей, фильтрацию по дате, создание, редактирование и удаление записей, а также справочник видов работ.

## Стек технологий

### Frontend

- React 18
- TypeScript
- Vite
- Ant Design
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose
- Nginx для раздачи frontend build

## Структура проекта

```text
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── common/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── journal/
│   │   │   └── workTypes/
│   │   ├── routes/
│   │   └── utils/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── features/
│   │   │   ├── workLogs/
│   │   │   └── workTypes/
│   │   ├── pages/
│   │   ├── shared/
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

## Запуск через Docker

Требования:

- Docker
- Docker Compose v2

Из корня проекта выполните:

```bash
docker compose -p work-journal up -d
```

После запуска сервисы будут доступны:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Postgres: localhost:5432
```

Проверить состояние контейнеров:

```bash
docker compose -p work-journal ps
```

Посмотреть логи:

```bash
docker compose -p work-journal logs -f
```

Остановить проект:

```bash
docker compose -p work-journal down
```

Остановить проект и удалить volume PostgreSQL:

```bash
docker compose -p work-journal down -v
```

> В проекте рекомендуется использовать `-p work-journal`, чтобы Docker Compose явно получил имя проекта. Это особенно полезно, если путь к папке содержит пробелы или кириллицу.

## Запуск без Docker

Требования:

- Node.js 20+
- npm
- PostgreSQL 14+

### 1. Подготовить PostgreSQL

Создайте базу данных:

```sql
CREATE DATABASE work_journal;
```

### 2. Настроить backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

Backend будет доступен по адресу:

```text
http://localhost:5000
```

Проверка:

```bash
curl http://localhost:5000/health
```

### 3. Настроить frontend

В новом терминале:

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

## Переменные окружения

### Backend

Файл: `backend/.env`

```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/work_journal?schema=public"
FRONTEND_URL="http://localhost:5173"
```

Описание:

| Переменная | Назначение | Пример |
| --- | --- | --- |
| `PORT` | Порт Express API | `5000` |
| `DATABASE_URL` | Строка подключения Prisma к PostgreSQL | `postgresql://postgres:postgres@localhost:5432/work_journal?schema=public` |
| `FRONTEND_URL` | Origin frontend-приложения для CORS | `http://localhost:5173` |

### Frontend

Файл: `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Описание:

| Переменная | Назначение | Пример |
| --- | --- | --- |
| `VITE_API_URL` | Базовый URL backend API | `http://localhost:5000/api` |

## API

Базовый URL:

```text
http://localhost:5000/api
```

Формат успешного ответа:

```json
{
  "data": {}
}
```

Формат ошибки:

```json
{
  "message": "Описание ошибки"
}
```

### Получить журнал работ

```http
GET /api/work-logs
```

Пример:

```bash
curl http://localhost:5000/api/work-logs
```

Ответ:

```json
{
  "data": [
    {
      "id": 1,
      "workDate": "2026-06-06T00:00:00.000Z",
      "workTypeId": 1,
      "description": "Монтаж перегородок",
      "employeeName": "Иванов Иван",
      "hoursSpent": "8",
      "workType": {
        "id": 1,
        "name": "Монтаж",
        "isActive": true
      },
      "createdAt": "2026-06-06T10:00:00.000Z",
      "updatedAt": "2026-06-06T10:00:00.000Z"
    }
  ]
}
```

### Получить журнал работ по дате

```http
GET /api/work-logs?date=2026-06-06
```

Пример:

```bash
curl "http://localhost:5000/api/work-logs?date=2026-06-06"
```

### Создать запись журнала

```http
POST /api/work-logs
Content-Type: application/json
```

Пример:

```bash
curl -X POST http://localhost:5000/api/work-logs \
  -H "Content-Type: application/json" \
  -d '{
    "workDate": "2026-06-06",
    "workTypeId": 1,
    "employeeName": "Иванов Иван",
    "description": "Монтаж перегородок",
    "hoursSpent": 8
  }'
```

### Обновить запись журнала

```http
PUT /api/work-logs/:id
Content-Type: application/json
```

Пример:

```bash
curl -X PUT http://localhost:5000/api/work-logs/1 \
  -H "Content-Type: application/json" \
  -d '{
    "workDate": "2026-06-07",
    "workTypeId": 2,
    "employeeName": "Петров Петр",
    "description": "Земляные работы",
    "hoursSpent": 6.5
  }'
```

### Удалить запись журнала

```http
DELETE /api/work-logs/:id
```

Пример:

```bash
curl -X DELETE http://localhost:5000/api/work-logs/1
```

### Получить справочник видов работ

```http
GET /api/work-types
```

Пример:

```bash
curl http://localhost:5000/api/work-types
```

Только активные виды работ:

```bash
curl "http://localhost:5000/api/work-types?onlyActive=true"
```

## Модель данных

### WorkType

Справочник видов работ.

```text
id
name
description
isActive
createdAt
updatedAt
```

### JournalEntry

Запись журнала работ.

```text
id
workDate
workTypeId
description
employeeName
hoursSpent
createdAt
updatedAt
```

Связь:

```text
WorkType 1 -> N JournalEntry
```

## Полезные команды

Backend:

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:studio
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```
