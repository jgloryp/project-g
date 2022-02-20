# project-g

GLOWDAYZ

requirements
docker 설치
https://docs.docker.com/desktop/mac/install/
https://docs.docker.com/desktop/windows/install/

```
docker-compose up -d --build
```

mysql
port: 11111
user: dev
pass: dev
db: dev

nest.js 설치
npm i -g @nestjs/cli

의존성 라이브러리 설치
npm i

데이터베이스 마이그레이션
npm run typeorm migration:run

실행
npm run start:dev

API 명세
http://localhost:11110/docs
