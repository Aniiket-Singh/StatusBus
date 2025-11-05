
FROM oven/bun:1-slim AS dependencies

WORKDIR /app

COPY package.json bun.lock ./
# COPY apps/fe/package.json ./apps/fe/
# need to copy package.json of all apps and packages to create exactly identical bun.lock in the monorepo root dir
COPY apps/api/package.json ./apps/api/
COPY apps/consumer/package.json ./apps/consumer/
COPY apps/fe/package.json ./apps/fe/
COPY apps/producer/package.json ./apps/producer/
COPY apps/tests/package.json ./apps/tests/

COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/redisq/package.json ./packages/redisq/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/store/package.json ./packages/store/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN bun install --frozen-lockfile

# ----------------------------------------------------

ARG NEXT_PUBLIC_BACKEND_URL=https://api.statusbus.byaniket.online
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

FROM dependencies AS builder
# COPY . .
COPY turbo.json .
COPY apps/fe ./apps/fe
RUN bun run build --filter fe

# ----------------------------------------------------

FROM oven/bun:1-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/apps/fe ./apps/fe
COPY --from=builder /app/node_modules ./node_modules 

WORKDIR /app/apps/fe
CMD ["bun", "run", "start"]
EXPOSE 3000