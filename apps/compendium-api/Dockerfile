FROM docker.io/node:lts-alpine

WORKDIR /app

COPY dist/apps/compendium-api/package*.json ./

RUN npm install --omit=dev

COPY dist/apps/compendium-api .