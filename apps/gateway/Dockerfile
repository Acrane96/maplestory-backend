FROM node:18 AS builder

WORKDIR /app

COPY ../../ ./
RUN npm install
RUN npm run build gateway

FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/gateway ./dist/apps/gateway

CMD ["node", "dist/apps/gateway/main.js"]