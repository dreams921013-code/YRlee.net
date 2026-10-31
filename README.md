# Environmental Energy Material Laboratory Website v13 — 관리자 편집 버전

## 사용법
1. VS Code → File → Open Folder에서 전체 폴더를 선택합니다.
2. Live Server로 `admin.html`을 실행합니다. 별도 계정이나 서버 없이 이 PC에서 편집 가능합니다.
3. 왼쪽 메뉴에서 Home, Research Area, Activities, Professor, Members, Alumni, Journal, Patent, Gallery, News, Contact를 선택합니다.
4. 사진 업로드, 텍스트 입력, 항목 추가·삭제 후 **초안 저장**을 클릭합니다. 초안은 해당 브라우저의 로컬 저장소에 저장됩니다.
5. **미리보기** 버튼으로 변경된 화면을 확인합니다 (주소에 `?admin-preview=1`이 붙습니다).
6. 작업을 마치면 **게시용 data.js 다운로드**를 누릅니다. 다운받은 `data.js`를 홈페이지 폴더의 기존 `data.js`에 덮어씌웁니다.
7. Live Server에서 홈페이지를 새로고침합니다. 인터넷 게시 사이트는 수정된 파일을 다시 배포해야 반영됩니다.

## 매우 중요한 안내
- **이것은 로컬 콘텐츠 편집기입니다.** 진짜 로그인/권한 관리, 원격 자동 업로드, 온라인 DB가 포함된 서버형 관리자 시스템은 아닙니다.
- `admin.html`을 공개 GitHub Pages 저장소에 업로드하지 마세요. (편집기 자체에 보안 인증은 없습니다.)
- 브라우저 데이터를 지우면 임시 초안이 사라질 수 있습니다. `data.js` 파일을 자주 다운로드해 백업하세요.
- 업로드 사진은 WebP/JPEG로 리사이즈되어 `data.js`에 포함됩니다. 사진이 많으면 용량이 커질 수 있습니다.
- 이미 발행된 사이트를 온라인에서 로그인하고 수정/저장하고 싶다면 Firebase/Supabase 등의 인증·저장소·배포 백엔드가 추가로 필요합니다.
- 논문 50편은 제공된 목록에서 유지하였고, DOI 검증은 이 단계에서 하지 않았습니다.
- 연구원/졸업생의 개인정보 및 실험 사진은 공개 허가를 받은 후 게시하세요.
