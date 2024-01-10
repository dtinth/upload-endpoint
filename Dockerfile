FROM node:20-alpine
RUN corepack enable
WORKDIR /app
COPY ./package.json ./package-lock.json ./
COPY ./src ./src/
CMD ["pnpm", "start"]
