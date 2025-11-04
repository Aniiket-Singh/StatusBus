FROM oven/bun:1-slim AS builder

WORKDIR /app 

COPY ./apps/producer ./apps/producer
COPY ./packages/store ./packages/store
COPY ./packages/redisq ./packages/redisq


COPY package.json bun.lock ./

COPY apps/consumer/package.json ./apps/consumer/
COPY apps/fe/package.json ./apps/fe/
COPY apps/tests/package.json ./apps/tests/

COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# needed for prisma
RUN apt-get update -y && apt-get install -y openssl

RUN bunx prisma generate --schema=packages/store/prisma/schema.prisma

RUN bun install --frozen-lockfile --production

COPY turbo.json .
RUN cd ./apps/producer && bun run build

FROM builder AS runner

WORKDIR /app/apps/producer

EXPOSE 3001

ENV HOST=0.0.0.0
ENV PORT=3001

CMD [ "bun", "dist/index.js"]
