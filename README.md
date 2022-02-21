# 1. Description

사용자, 사진을 담을 폴더, 사진, 사진의 태그, 포인트 선입/선출 및 기타 통계 등

# 2. Installation

이 프로젝트를 클론한 후에 프로젝트 디렉토리에서 아래 중 설치가 안되어 있는 것은 설치가 필요합니다.

## 2.1 node.js

node.js 버전은 크게 상관 없을 것 같습니다.

```
$ node --version
v12.14.0
```

## 2.2 docker

> docker-compose 명령 활용을 위해 설치
> https://docs.docker.com/desktop/mac/install (맥용)
> https://docs.docker.com/desktop/windows/install (윈도우용)

## 2.3 docker-compose 실행

```
$ docker-compose up -d --build
```

docker-compose 는 개발환경을 위한 MySQL 5.7 을 다음 환경정보로 실행합니다.

> host: localhost  
> port: 11111  
> user: dev  
> pass: dev  
> database: dev

## 2.4 nest.js 설치

```
$ npm i -g @nestjs/cli
```

## 2.5 의존성 라이브러리 설치

package.json 정보를 토대로 의존성 라이브러리 설치

```
$ npm i
```

## 2.6 데이터베이스 마이그레이션

전체적으로 데이터베이스 모든 테이블을 생성합니다.
사용자 두명은 미리 시딩을 해 놓았습니다.

```
$ npm run typeorm migration:run
```

# 3. Running the app

## 3.1 빌드

```
$ npm run build
```

## 3.2 실행

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 3.3 API

엔드포인트들의 테스트를 겸할 수 있도록 swagger 를 사용하였습니다.
아무 브라우져를 통해서 다음 URL을 연결합니다.

http://localhost:11110/docs

# 4. ERD

![Alt text](erd.png 'ERD')
개괄적인 모델링 내용입니다. 식별관계에 대해서는 따로 정의하지는 않았습니다.
