FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

FROM base AS deps
COPY package*.json ./
COPY turbo.json ./
COPY apps/fe/package*.json ./apps/fe/
COPY packages/store/package*.json ./packages/store/
COPY packages/redisq/package*.json ./packages/redisq/

RUN npm ci --only=production && npm cache clean --force

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN cd packages/store && npx prisma generate

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN cd apps/fe && npm run build

# Runtime stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/fe/public ./apps/fe/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/fe/.next ./apps/fe/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/fe/package*.json ./apps/fe/

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "run", "start:fe"]