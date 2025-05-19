# [Introduction]

- 2025 메이플 집중채용 백엔드 과제

# [프로젝트 실행]

1. `.env_sample` 수정하여 `.env` 파일 생성 (`JWT_SECRET` 추가)

   ```shell
   # JWT
   JWT_SECRET=your-secret-key
   ```

2. 루트 디렉토리에서 프로젝트 실행

   ```shell
   docker-compose build
   docker-compose up
   ```

3. `ADMIN` 계정 자동 생성 (추후 관리자 계정 테스트용)

   ```shell
   ID: admin
   PW: 123123
   ```

# [API Spec]

## 서버 별 Port 구성

| Server  | Port  | Description               |
| ------- | ----- | ------------------------- |
| Gateway | 4000  | API Gateway (Entry Point) |
| Auth    | 4001  | Authentication Service    |
| Event   | 4002  | Event/Reward Service      |
| MongoDB | 27017 | Database                  |

## API 목록

| Method | Endpoint           | 서버  | 설명                      | 권한 (ADMIN 모두 가능) |
| ------ | ------------------ | ----- | ------------------------- | ---------------------- |
| POST   | /auth/register     | Auth  | 회원가입                  | Public, ALL            |
| POST   | /auth/login        | Auth  | 로그인(JWT 발급)          | Public, ALL            |
| GET    | /auth/:userId      | Auth  | 유저 정보 조회            | ALL                    |
| PATCH  | /auth/:userId      | Auth  | 유저 정보 수정            | USER                   |
| DELETE | /auth/:userId      | Auth  | 유저 삭제                 | USER                   |
| PATCH  | /auth/:userId/role | Auth  | 유저 역할(Role) 변경      | ADMIN                  |
| GET    | /event             | Event | 이벤트 전체 조회          | ALL                    |
| GET    | /event/:id         | Event | 이벤트 상세 조회          | ALL                    |
| POST   | /event             | Event | 이벤트 생성               | OPERATOR               |
| POST   | /reward            | Event | 보상 등록                 | OPERATOR               |
| GET    | /reward            | Event | 보상 전체 조회 (이벤트별) | ALL                    |
| POST   | /claim             | Event | 보상 요청                 | USER                   |
| GET    | /claim             | Event | 보상 요청 내역 조회       | ALL                    |

# [ETC]

## To Do

- 이벤트 완료 조건 검증 로직 구현

## 구현 중 겪은 고민 및 설계 의도

- **Spring MVC 아키텍처 경험 기반의 계층적 구조 설계**

  - 저는 평소 Spring(Spring MVC, Spring Boot) 환경에 익숙하여, NestJS로 개발할 때도 **controller, service 등 계층 구조**를 명확하게 분리하는 방식을 적용 해 보았습니다.

- **공통 컴포넌트/유틸리티의 재사용과 확장성 고민**
  - 확장성을 고려해 **MSA 구조**와 더불어 **공통 컴포넌트 분리, 역할별 컨트롤러/서비스 레이어 구분**에 신경을 썼습니다.
