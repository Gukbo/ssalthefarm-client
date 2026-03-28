🌾 Ssal-The-Farm (쌀더팜) - Client
"오늘의 쌀먹 정보부터 게임 공략까지, 쌀더팜에서 확인하세요!" <br>
게이머들을 위한 따끈따끈하고 직관적인 정보 공유 커뮤니티입니다. <br>

🚀 프로젝트 개요
Ssal-The-Farm은 게이머들이 자유롭게 정보를 공유할 수 있는 커뮤니티 플랫폼입니다. <br>
단순한 게시판 기능을 넘어, 직관적인 UI와 안정적인 데이터 처리를 목표로 개발되었습니다.<br>

Category,Technology<br>
Framework,Next.js 15 (App Router)<br>
Language,TypeScript<br>
Styling,Tailwind CSS<br>
Data Fetching,Axios<br>
State,"React Hooks (useState, useEffect)"<br>

----
✨ 핵심 구현 기능 (CRUD)
게시글 목록 조회 (Read): 메인 페이지에서 최신 게시글을 카드 형태로 한눈에 확인.

상세 페이지 (Read): 동적 라우팅([id])을 활용해 개별 게시글의 깊이 있는 내용 제공.

게시글 작성 (Create): 제목, 내용, 게임 카테고리(LoL, 발로란트 등)를 선택해 데이터 생성.

게시글 수정 (Update): 기존 데이터를 서버에서 불러와 폼에 바인딩 후 PATCH 요청으로 부분 수정 반영.

게시글 삭제 (Delete): confirm 절차를 통한 사용자 오작동 방지 및 즉각적인 UI 반영.

반응형 GNB: Sticky 헤더와 Backdrop-blur를 적용한 세련된 내비게이션 바.


---

🔍 트러블슈팅 (Troubleshooting)
프로젝트를 진행하며 직면한 기술적 과제들과 해결 과정을 기록합니다.

1️⃣ Next.js 15 비동기 params 대응
문제: 상세 페이지 진입 시 params.id를 읽지 못해 404 에러 발생. <br>
원인: Next.js 15부터 params가 Promise 타입으로 변경되어 동기적 접근이 불가능해짐. <br>
해결: await params 로직을 적용하여 비동기적으로 데이터를 안전하게 추출 후 렌더링.<br>

2️⃣ 폴더 구조와 Dynamic Route 설계 최적화
문제: /posts/edit/8 주소와 실제 폴더 구조의 불일치로 인한 경로 이탈 발생. <br>
원인: 중첩된 동적 라우트 구조 설계 미흡. <br>
해결: app/posts/edit/[id]/page.tsx로 위계를 재편성하여 직관적인 URL 구조와 라우팅 안정성 확보.<br>

3️⃣ Interface와 API Response 데이터 불일치 해결
문제: post.gameId로 접근 시 NaN 에러 발생. <br>
원인: 실제 데이터 구조는 game: { id: 3 } 형태였으나, 인터페이스를 단순 숫자로 정의하여 데이터 수색 실패. <br>
해결: TypeScript 인터페이스를 실제 응답 객체 구조에 맞춰 수정하고, post.game?.id로 안전하게 접근하여 데이터 무결성 보장.<br>

---

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev


----

👨‍🌾 Author
Han-eum (한음) 
Developer Job Seeker

"3초 안에 이해되는 직관적인 코드를 지향합니다."
