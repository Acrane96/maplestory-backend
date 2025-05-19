FROM node:18 AS builder

WORKDIR /app

COPY ../../ ./
RUN npm install
RUN npm run build event

FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/event ./dist/apps/event

CMD ["node", "dist/apps/event/main.js"]