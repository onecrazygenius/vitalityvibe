FROM oven/bun:1.0.7-slim

WORKDIR /app

COPY package.json ./

RUN bun install

COPY . .

RUN bun run build

EXPOSE 4321

CMD ["bun", "./dist/server/entry.mjs"]