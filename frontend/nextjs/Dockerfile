# Stage 1: Base (공통 의존성)
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json yarn.lock 

# Stage 2: 개발 환경
FROM base AS dev
RUN yarn install --immutable
COPY . .
CMD ["yarn", "dev", "-H", "0.0.0.0"]

# Stage 3: 빌더
FROM base AS builder
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn build

# Stage 4: 프로덕션
FROM node:18-alpine AS prod
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
USER 1000
EXPOSE 3000
CMD ["yarn", "start"]
