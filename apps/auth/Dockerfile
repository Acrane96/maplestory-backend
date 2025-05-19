FROM node:18 AS builder

WORKDIR /app

COPY ../../ ./
RUN npm install
RUN npm run build auth

FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/auth ./dist/apps/auth

CMD ["node", "dist/apps/auth/main.js"]