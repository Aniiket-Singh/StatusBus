FROM oven/bun:1-alpine AS base

RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

FROM base AS deps

COPY package*.json ./
COPY bun.lock ./
COPY turbo.json ./

#api needs db access only
COPY apps/api/package*.json ./apps/api/
COPY packages/store/package*.json ./packages/store/

RUN bun install --frozen-lockfile --production

FROM base AS builder

# need shared-types and ts-config package code, maybe others too, so copying all packages for build step
COPY apps/api ./apps/api
COPY packages ./packages
COPY turbo.json ./

RUN cd packages/store && bunxx prisma generate

RUN cd apps/api && bun run build

FROM base AS runner

WORKDIR /app

# Cloud Run doesnt need it in GCP, this is apparently for local testing
RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy \
    && chmod +x cloud_sql_proxy \
    && mv cloud_sql_proxy /usr/local/bin/

# # 1001 -> non-root gid/uid (1000 for root), -S -> create sys/usr group
# RUN addgroup -S nodejs -g 1001
# RUN adduser -S apiuser -u 1001

# RUN chown -R nextjs:nodejs /app
# USER nextjs

RUN addgroup -g 1001 -S nodejs && \
    adduser -S apiuser -u 1001 -G nodejs

COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/package.json ./apps/api/
COPY --from=builder --chown=apiuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=apiuser:nodejs /app/packages ./packages

USER apiuser
EXPOSE 3001

# trying this
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["bun", "run", "apps/api/dist/index.js"]