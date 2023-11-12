FROM docker.io/node:lts-alpine

WORKDIR /app

COPY dist/apps/dashboard/package*.json ./

RUN npm install --omit=dev

COPY dist/apps/dashboard .