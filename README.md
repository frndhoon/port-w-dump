## port-w-dump

> 덤프 페이지 작업

### 개발 서버 실행 방법

> 패키지 매니저 : `pnpm`

```
pnpm install
pnpm dev
```

- `.env`는 노션 페이지에 별도 관리 (문의)

### 폴더 구조

```
src/
├── api/           # api (instance)
├── app/           # Next.js App Router
├── assets/        # 정적 리소스 - 폰트, 이미지 등
├── component/     # UI 컴포넌트 - 재사용 가능한 화면 구성요소
│   └── shadcn-ui/ # shadcn/ui 컴포넌트들
├── hook/          # react, tanstack query hook
├── lib/           # 라이브러리 설정 - 외부 라이브러리 설정
├── provider/      # 전역 상태 관리 (tanstack query provider)
├── type/          # 타입 관리
└── util/          # 헬퍼 함수 (ts)
```

- 분류 기준: 코드의 역할/타입별로 구분

### naming convention

- 파일/폴더: kebab-case (t-container.tsx)
- 컴포넌트/페이지 변수명 : PascalCase (TContainerPage)
- 변수/함수: camelCase (getUserData)
- 상수: UPPER_SNAKE_CASE (API_URL)
- 타입/인터페이스: PascalCase (UserData, ApiResponse)

### commit convention

```
{커밋 타입}: {커밋 제목}

- {설명}
- ...


Ref: {참고 링크}
```

- 커밋 타입
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `style`: 코드 포맷팅
  - `refactor`: 코드 리팩토링
  - `design`: UI 디자인 및 레이아웃 수정
  - `chore`: 작업 환경 세팅, 패키지 매니저 수정
