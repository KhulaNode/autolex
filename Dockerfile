FROM node:24-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG SITE_URL=http://localhost:3000
ARG BUSINESS_EMAIL=info@autolex.co.za
ARG BUSINESS_WHATSAPP=27730572188
ARG FACEBOOK_URL
ARG INSTAGRAM_URL
ARG WEEKDAY_OPEN=08:00
ARG WEEKDAY_CLOSE=16:30
ENV SITE_URL=$SITE_URL BUSINESS_EMAIL=$BUSINESS_EMAIL BUSINESS_WHATSAPP=$BUSINESS_WHATSAPP \
    FACEBOOK_URL=$FACEBOOK_URL INSTAGRAM_URL=$INSTAGRAM_URL \
    WEEKDAY_OPEN=$WEEKDAY_OPEN WEEKDAY_CLOSE=$WEEKDAY_CLOSE
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 --ingroup nodejs nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
