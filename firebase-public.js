/* Firestore-driven pages, compatible with the original v13 HTML/CSS/JS.
   First load reads Firestore; subsequent cloud changes refresh the open page. */
import {firebaseConfig,isConfigured} from './firebase-config.js';
const load=(src)=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error(src+' 파일을 불러오지 못했습니다.'));document.head.append(s);});
(async()=>{
 try{
  await load('data.js');
  const preview=new URLSearchParams(location.search).get('admin-preview')==='1';
  if(preview){
    try{const d=JSON.parse(localStorage.getItem('eem-admin-draft-firebase-v14')||'null');if(d&&typeof d==='object')Object.assign(window.siteData,d)}catch(err){console.warn('미리보기 초안 읽기 실패',err)}
  }else if(isConfigured){
    try{
      const [{initializeApp},{getFirestore,doc,getDoc,onSnapshot}] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js')
      ]);
      const db=getFirestore(initializeApp(firebaseConfig));
      const documentRef=doc(db,'publicSite','content');
      const snapshot=await getDoc(documentRef);
      if(snapshot.exists()&&snapshot.data()?.data){Object.assign(window.siteData,snapshot.data().data)}
      // Keep a public page open and it will refresh itself when an administrator publishes.
      let initial=true;let known=JSON.stringify(snapshot.exists()?snapshot.data()?.data:null);
      onSnapshot(documentRef,next=>{
        const fresh=JSON.stringify(next.exists()?next.data()?.data:null);
        if(initial){initial=false;return}
        if(fresh!==known){known=fresh;location.reload()}
      },error=>console.warn('실시간 데이터 연결 오류:',error.code||error.message));
    }catch(error){console.warn('Firestore 초기 읽기 실패: 기본 data.js 사용',error.code||error.message)}
  }
  await load('app.js');
  await load('content-render.js');
  if(document.body.dataset.page==='members.html'||document.body.dataset.page==='alumni.html')await load('people.js');
 }catch(error){console.error('홈페이지 시작 실패:',error);document.body.insertAdjacentHTML('afterbegin','<div role="alert" style="padding:12px;background:#fff2df;color:#6a3321">페이지 스크립트를 시작하지 못했습니다. 개발자 도구 콘솔을 확인해 주세요.</div>')}
})();
