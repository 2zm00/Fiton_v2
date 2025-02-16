FROM node:18-bullseye-slim AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile 

# 소스 코드 복사
COPY . .

RUN yarn build

FROM node:18-bullseye-slim

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

ENV PATH ./node_modules/.bin:$PATH

CMD ["yarn", "start"]