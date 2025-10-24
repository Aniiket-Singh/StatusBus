
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

    FROM dependencies AS builder
# COPY . .
COPY turbo.json .
COPY apps/fe ./apps/fe
RUN bun run build --filter fe

# ----------------------------------------------------

FROM nginx:1.25-alpine AS runner

COPY --from=builder /app/apps/fe/.next /usr/share/nginx/html

COPY /apps/fe/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]