# Stage 1: Base (공통 의존성)
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/

# Stage 2: 개발 환경
FROM base AS dev
ENV NODE_ENV=development
RUN yarn install --immutable
COPY . .
CMD ["yarn", "dev", "-H", "0.0.0.0"]

# Stage 3: 빌더
FROM base AS builder
ENV NODE_ENV=production
RUN yarn install --immutable --production
COPY . .
RUN yarn build

# Stage 4: 프로덕션
FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/node_modules ./node_modules
USER 1000
EXPOSE 3000
CMD ["node", "server.js"]
