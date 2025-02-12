FROM node:18-alpine
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN yarn build

EXPOSE 3000

# 환경변수로 개발/프로덕션 모드 구분
ENV NODE_ENV=production
CMD ["yarn", "start"]
