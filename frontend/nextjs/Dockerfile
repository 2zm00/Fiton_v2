FROM node:18-bullseye AS builder

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 

# 소스 코드 복사
COPY . .

RUN yarn build

FROM node:18-bullseye
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
ENV PATH ./node_modules/.bin:$PATH
CMD ["yarn", "start"]