
FROM oven/bun:1-slim AS dependencies

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/fe/package.json ./apps/fe/

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