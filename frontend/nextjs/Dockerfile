FROM node:18-alpine AS builder
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN yarn build

FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000


ENV PATH /app/node_modules/.bin:$PATH
CMD ["next", "start"]
