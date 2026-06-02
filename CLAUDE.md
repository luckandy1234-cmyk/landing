# 밀팅 (Mealting) 랜딩 페이지 개발 지침서

## 프로젝트 개요
광화문 직장인 점심 매칭 서비스 **밀팅(Mealting)**의 랜딩 페이지.
- 서비스 소개 + 사전 신청 폼으로 구성된 단일 페이지
- Next.js 16 (App Router, Turbopack) + Tailwind CSS

---

## 인프라 (이미 완료된 설정)

### 배포
- **플랫폼**: Vercel
- **프로덕션 브랜치**: `master` (Vercel Production 브랜치가 `master`로 설정되어 있음)
- **도메인**: `mealting.co.kr` (Vercel에 연결 완료, DNS 설정 완료)
- **GitHub 저장소**: `luckandy1234-cmyk/landing`

> ⚠️ `git push origin main`은 Preview 배포만 됨. 반드시 `git push origin master`로 push해야 mealting.co.kr에 반영됨.

### 코드 → 배포 절차
```
git add .
git commit -m "커밋 메시지"
git push origin master
```
push 후 Vercel이 자동 빌드 → 1~2분 후 mealting.co.kr 반영.

### 환경 변수
- `SHEET_WEBHOOK_URL`: Google Sheets 연동 웹훅 URL (Vercel 환경 변수에 설정됨)

---

## 프로젝트 구조

```
landing/
├── app/
│   ├── layout.tsx        # 메타데이터, favicon 설정
│   ├── page.tsx          # 페이지 컴포넌트 조합
│   ├── globals.css
│   └── api/
│       └── signup/
│           └── route.ts  # 신청 폼 API (Google Sheets 웹훅으로 전달)
├── components/
│   ├── Navbar.tsx        # 상단 네비게이션
│   ├── Hero.tsx          # 첫 화면 (메인 카피, CTA 버튼)
│   ├── Problem.tsx       # 문제 제기 섹션
│   ├── HowItWorks.tsx    # 어떻게 하면 되나요 (3단계)
│   ├── Features.tsx      # 걱정 마세요 (안심 요소)
│   ├── SignupForm.tsx    # 사전 신청 폼
│   └── Footer.tsx        # 하단
└── public/
    └── icon.svg          # 파비콘 (숟가락+그릇+젓가락 아이콘, 주황 배경)
```

---

## 브랜드 / 디자인

- **브랜드 컬러**: 주황 (`orange-600` = `#EA580C`)
- **폰트**: 시스템 기본
- **스타일**: Tailwind CSS, 화이트 배경, 심플한 카드형 레이아웃

---

## 신청 폼 (SignupForm.tsx)

### 수집 필드
| 필드 | 필수 | 비고 |
|------|------|------|
| 이름 | ✅ | |
| 직군 | ✅ | 드롭다운 선택 |
| 성별 | ✅ | 남성/여성만 (기타 없음) |
| 연생 | ✅ | 예) 1995 |
| 회사명 | ✅ | |
| 근무 빌딩 | - | 선택 |
| 연락처 | ✅ | kakao_id 또는 전화번호 |
| 신청일 | ✅ | date picker |
| 동반자 | - | 이름만 입력, 본인 포함 최대 2인 |
| 하고 싶은 말 | - | 자유 입력 |

### 데이터 흐름
`SignupForm` → `POST /api/signup` → `SHEET_WEBHOOK_URL` (Google Apps Script) → Google Sheets 저장

---

## 로컬 개발

```powershell
cd "C:\Users\lucka\OneDrive\바탕 화면\mealting\landing"
npm run dev
```
접속: `http://localhost:3000`

> ⚠️ node 프로세스 충돌 시: `taskkill /F /IM node.exe` 후 재시작

---

## 파비콘

- 파일: `public/icon.svg` + `app/layout.tsx`의 `<link rel="icon">` 태그로 직접 연결
- 디자인: 주황 배경(#EA580C), 왼쪽 숟가락 / 가운데 그릇(김 오르는 모양) / 오른쪽 젓가락
- 변경 시 `?v=숫자` 쿼리 파라미터 올려서 캐시 무효화
