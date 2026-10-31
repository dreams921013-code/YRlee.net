import {firebaseConfig,adminUid,isConfigured} from './firebase-config.js';
const $=id=>document.getElementById(id);const message=t=>$('loginMessage').textContent=t;
const load=src=>new Promise((ok,no)=>{let s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>no(new Error(src+' 파일을 불러오지 못했습니다.'));document.head.append(s)});
(async()=>{
 try{
  if(!isConfigured || !adminUid){message('firebase-config.js의 Firebase 설정값과 관리자 UID를 먼저 입력하세요.');return}
  const [{initializeApp},{getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut},{getFirestore,doc,getDoc,setDoc,serverTimestamp},{getStorage,ref,uploadBytes,getDownloadURL}] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js'),
    import('https://www.gstatic.com/firebasejs/13.1.0/firebase-storage.js')
  ]);
  const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app),storage=getStorage(app);
  const contentRef=doc(db,'publicSite','content');
  let editing=false;
  $('loginForm').addEventListener('submit',async event=>{event.preventDefault();const button=$('loginSubmit');button.disabled=true;message('로그인 확인 중…');try{await signInWithEmailAndPassword(auth,$('loginEmail').value,$('loginPassword').value);$('loginPassword').value=''}catch(e){message('로그인 실패: '+(e.code||e.message))}finally{button.disabled=false}});
  $('logoutButton').addEventListener('click',()=>signOut(auth));
  onAuthStateChanged(auth,async user=>{
    if(!user || user.uid!==adminUid){
      document.body.classList.remove('cloud-ready');$('loginGate').hidden=false;
      if(user && user.uid!==adminUid){message('이 계정은 관리자 UID와 일치하지 않습니다. 다른 계정으로 로그인하세요.');await signOut(auth)}else message('Firebase에 등록한 관리자 이메일과 비밀번호로 로그인하세요.');
      return;
    }
    message('권한 확인 및 연구실 데이터를 불러오는 중…');
    try{
      if(!editing){
        await load('data.js');
        const snapshot=await getDoc(contentRef);
        if(snapshot.exists()&&snapshot.data()?.data)Object.assign(window.siteData,snapshot.data().data);
        window.EEMCloud={
          async publish(data){
            if(auth.currentUser?.uid!==adminUid)throw new Error('관리자 권한이 없습니다.');
            const serialized=JSON.stringify(data);
            if(serialized.length>700000)throw new Error('콘텐츠가 너무 큽니다. 사진을 Firebase Storage로 올렸는지 확인하세요.');
            if(serialized.includes('data:image/'))throw new Error('Base64 사진은 Firestore에 게시할 수 없습니다. 사진을 다시 업로드해 주세요.');
            await setDoc(contentRef,{data:JSON.parse(serialized),schemaVersion:14,publishedAt:serverTimestamp()});
          },
          async uploadImage(blob){
            if(auth.currentUser?.uid!==adminUid)throw new Error('관리자 권한이 없습니다.');
            const key='site-media/'+Date.now()+'-'+crypto.randomUUID()+'.jpg';
            const item=ref(storage,key);
            await uploadBytes(item,blob,{contentType:'image/jpeg',cacheControl:'public,max-age=3600'});
            return await getDownloadURL(item);
          }
        };
        editing=true;await load('admin.js');
      }
      document.body.classList.add('cloud-ready');$('loginGate').hidden=true;
    }catch(e){message('관리자 초기화 실패: '+(e.code||e.message));console.error(e)}
  });
 }catch(e){message('Firebase 초기화 오류: '+(e.code||e.message));console.error(e)}
})();
