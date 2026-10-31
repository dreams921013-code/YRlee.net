# 환경에너지소재연구실 Firebase v14

기존 13개 공개 HTML 페이지, 50편 논문, 관리자 11개 섹션을 보존했습니다.

## 연결 형태
- GitHub Pages = 정적 홈페이지 게시 (기존 dreams921013-code.github.io/YRlee.net/ 유지)
- Firebase Auth = 이메일/비밀번호 관리자 로그인
- Cloud Firestore `publicSite/content` = 공개 홈페이지 데이터, 관리자만 수정
- Firebase Storage `site-media/` = 공개 홈페이지 사진, 관리자만 업로드
- Firebase 실시간 리스너 = 페이지를 열어둔 방문자도 새 게시본이 반영될 때 자동 새로고침

## Firebase 콘솔에서 필수 설정
1. https://console.firebase.google.com/ 접속, 새 프로젝트 만들기 (예: EEM-Lab, 고유 project ID 선택).
2. 프로젝트 설정 > Your apps > 웹 앱(</>) 추가, firebaseConfig 받기. 이 파일의 `firebase-config.js`에 붙여넣기. **개인 서비스 계정 키 JSON을 절대로 업로드하지 마세요.**
3. Authentication > Sign-in method > Email/Password 활성화. Users > Add user로 본인 관리자 계정 추가. UID를 복사해 `firebase-config.js`의 `adminUid`에 입력. 관리자 비밀번호는 코드에 입력하지 마세요.
4. Firestore Database > Create database > Production mode. Rules 탭에서 `firestore.rules` 내용 붙이되 `REPLACE_WITH_ADMIN_UID`를 본인의 UID로 교체, Publish.
5. Storage > Get started. 2026년 기준 사용을 위해 **Blaze(pay-as-you-go) 결제 계정이 필수**입니다. Storage Rules에 `storage.rules` 붙이고 동일 UID로 수정, Publish. 사용량/요금 알림 권장.
6. Authentication > Settings > Authorized domains에 `dreams921013-code.github.io` 추가. (localhost도 필요하면 추가)
7. `firebase-config.js`가 채워진 전체 폴더를 Live Server로 테스트하고, GitHub Pages 저장소에 배포. `admin.html`은 로그인/보안 규칙까지 적용 후 공개 배포 가능합니다.
8. `admin.html` 로그인 → 내용을 수정 → 사진 업로드 → 초안 저장 → **온라인 게시하기**. 첫 게시 시 기존 `data.js`에 포함된 논문 50편과 전체 데이터를 Firestore에 업로드합니다.
9. public HTML은 Firestore 데이터를 우선 로드합니다. 아직 데이터가 없는 최초 상태에서는 기존 `data.js`를 fallback으로 사용합니다.

## 보안 주의
- Firebase Web 설정(apiKey 등)은 앱 식별 구성값으로 공개되어도 되지만 보안 규칙의 관리자 UID 검사/인증이 필수입니다.
- `firestore.rules`, `storage.rules`의 예시 UID를 교체하기 전에는 관리자 기능이 작동하지 않도록 기본적으로 deny됩니다.
- 최초 관리자 로그인 후 `온라인 게시하기`를 눌러야 Firestore가 초기화됩니다.
- GitHub 저장소에 보안 설정 파일을 올릴 필요는 없습니다. `admin.html`/`admin.js`는 인증이 작동하고 규칙 배포 확인 후 올리세요.
- 사진을 업로드하면 실제 Storage에 즉시 업로드됩니다. 콘텐츠 게시를 취소하면 미사용 사진이 저장소에 남을 수 있습니다. 정리할 때 Firebase Console Storage에서 삭제할 수 있습니다.
- 로컬 초안은 해당 브라우저에 저장되며 게시할 때만 Firestore가 변경됩니다.
- 홈페이지는 Firestore 초기 읽기 실패 시 정적 `data.js`로 표시되므로 네트워크 문제는 브라우저 콘솔에서 확인하세요.
- 보안 규칙 변경·개인정보 업로드 전에는 교수님/연구실의 공개 허락을 확인하세요.
