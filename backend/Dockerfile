FROM node:20-alpine AS build

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/work_journal?schema=public
ENV FRONTEND_URL=http://localhost:5173

RUN apk add --no-cache openssl

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 5000

CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]
