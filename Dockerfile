FROM node:20-alpine
RUN corepack enable
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN pnpm install --frozen-lockfile
COPY ./src ./src/
CMD ["pnpm", "start"]
