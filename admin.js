(function(){
'use strict';
const STORAGE='eem-admin-draft-firebase-v14';
const groups={postdoctoral:'Postdoctoral Researcher',graduate:'Graduate Student',undergraduate:'Undergraduate Researcher'};
const alumniGroups={graduate:'Graduate Alumni',undergraduate:'Undergraduate Alumni'};
const field=(key,label,type='text',other={})=>({key,label,type,...other});
const sections=[
 {id:'home',title:'Home',help:'메인 사진과 한·영 연구실 소개를 수정합니다.',single:true,preview:'index.html',fields:[field('subtitle','첫 화면 소개 문구','textarea'),field('image','메인 대표 사진','image'),field('en','영어 소개 (문단당 한 줄)','lines',{help:'**강조할 글씨** 형식 사용 가능'}),field('ko','한국어 소개 (문단당 한 줄)','lines',{help:'**강조할 글씨** 형식 사용 가능'})]},
 {id:'researchAreas',title:'Research Area',help:'번호는 목록 순서에 따라 자동 생성됩니다. 이미지와 설명을 자유롭게 편집하세요.',preview:'research.html',fields:[field('title','연구 분야 제목'),field('image','연구 이미지','image'),field('imageAlt','이미지 대체 설명'),field('caption','이미지 아래 캡션'),field('paragraphs','상세 연구 설명 (문단당 한 줄)','lines'),field('note','추가 설명','textarea')]},
 {id:'researchActivities',title:'Research Activities',help:'연구 활동/프로젝트를 추가·수정할 수 있습니다.',preview:'research-activities.html',fields:[field('category','상단 분류'),field('title','활동·프로젝트 제목'),field('description','활동 설명','textarea'),field('image','연구 활동 사진 (선택)','image')]},
 {id:'professor',title:'Professor',help:'교수님 소개 및 공식 사진·연락처·학력·경력을 편집합니다.',single:true,preview:'professor.html',fields:[field('photo','교수님 공식 사진','image'),field('name','이름 (국문)'),field('englishName','이름 (영문)'),field('affiliation','직위·소속','textarea'),field('research','연구 분야'),field('education','학력 (항목당 한 줄)','lines'),field('experience','경력 (항목당 한 줄)','lines'),field('email','공식 이메일','email')]},
 {id:'members',title:'Members',help:'연구원별 사진, 학력, 학위과정 및 이메일을 관리합니다.',preview:'members.html',fields:[field('group','소속 분류','select',{options:groups}),field('photo','프로필 사진','image'),field('name','이름'),field('role','학위 과정 / 직위'),field('education','학력 (항목당 한 줄)','lines'),field('research','연구 분야'),field('email','이메일','email')]},
 {id:'alumni',title:'Alumni',help:'졸업생은 사진 없이 이름, 학위, 졸업연도, 진로만 표시합니다.',preview:'alumni.html',fields:[field('group','졸업생 분류','select',{options:alumniGroups}),field('name','졸업생 이름'),field('degree','학위 (M.S. / Ph.D. / B.S.)'),field('graduationYear','졸업연도','number'),field('currentPosition','졸업 후 진로 / 현 소속','textarea')]},
 {id:'journals',title:'Journal',help:'논문 제목에 URL을 입력하면 클릭 시 논문 원문이 새 탭에서 열립니다.',preview:'journal.html',fields:[field('number','논문 번호','number'),field('year','목록 분류 연도','number'),field('title','논문 제목','textarea'),field('authors','저자','textarea'),field('source','학술지·권·호·페이지','textarea'),field('url','논문 DOI 또는 외부 링크','url',{help:'https://doi.org/.... 형식. 입력하지 않으면 일반 제목으로 표시됩니다.'})]},
 {id:'patents',title:'Patent',help:'특허 정보와 특허 상세 페이지 링크를 관리합니다.',preview:'patent.html',fields:[field('year','출원 또는 등록 연도','number'),field('title','특허 제목','textarea'),field('meta','출원번호/등록번호/발명자','textarea'),field('url','외부 특허 링크','url')]},
 {id:'gallery',title:'Gallery',help:'연구실 단체사진·학회·실험 사진을 추가 또는 삭제합니다.',preview:'gallery.html',fields:[field('image','갤러리 이미지','image'),field('title','사진 제목'),field('description','사진 설명','textarea')]},
 {id:'news',title:'News',help:'날짜가 최근인 소식부터 자동 정렬되며 Home에도 반영됩니다.',preview:'news.html',fields:[field('date','소식 날짜 (YYYY-MM-DD)','date'),field('title','소식 제목'),field('description','소식 내용','textarea'),field('url','관련 링크 (선택)','url')]},
 {id:'contact',title:'Contact',help:'연구실 주소, 소속, 이메일 등 연락처를 편집합니다.',single:true,preview:'contact.html',fields:[field('labName','국문 연구실명'),field('englishName','영문 연구실명'),field('introduction','소개·문의 안내','textarea'),field('university','대학교'),field('department','학과'),field('location','연구실 위치'),field('email','이메일')]}
];
const el=id=>document.getElementById(id);const clone=obj=>JSON.parse(JSON.stringify(obj));
const seed=clone(siteData);let draft;
try{draft=JSON.parse(localStorage.getItem(STORAGE))||clone(seed)}catch(e){draft=clone(seed)}
sections.forEach(s=>{if(s.single && (!draft[s.id]||Array.isArray(draft[s.id])))draft[s.id]=clone(seed[s.id]||{});if(!s.single&&!Array.isArray(draft[s.id]))draft[s.id]=clone(seed[s.id]||[])});
let selectedSection='home',selectedIndex=0,dirty=false;let toastTimer;
function status(t,changed=false){el('draftStatus').textContent=t;el('draftStatus').classList.toggle('dirty',changed)}
function notify(text){let e=el('toast');e.textContent=text;e.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.hidden=true,4500)}
function markDirty(){dirty=true;status('미저장 변경 있음',true)}
function saveDraft(){try{localStorage.setItem(STORAGE,JSON.stringify(draft));dirty=false;status('초안이 이 브라우저에 저장됨');notify('초안을 저장했습니다. 게시하려면 온라인 게시하기를 누르세요.');return true}catch(e){notify('저장 실패: 브라우저 저장 공간이 부족할 수 있습니다. 사진을 줄이거나 data.js를 즉시 내보내세요.');return false}}
function make(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function current(){return sections.find(s=>s.id===selectedSection)}
function currentItem(){const s=current();return s.single?draft[s.id]:draft[s.id][selectedIndex]}
function labelItem(o,i,s){if(s.id==='journals')return `${o.number||i+1}. ${o.title||'논문 제목'}`;if(s.id==='news')return `${o.date||'날짜'} · ${o.title||'소식'}`;if(s.id==='alumni')return o.name||'졸업생 이름';if(s.id==='members')return o.name||'구성원 이름';return o.title||'새 항목'}
function nav(){const target=el('adminNav');target.replaceChildren();sections.forEach(s=>{let b=make('button','nav-button'+(selectedSection===s.id?' active':''));b.type='button';b.append(make('span','',s.title));if(!s.single)b.append(make('small','',String(draft[s.id]?.length||0)));b.addEventListener('click',()=>{selectedSection=s.id;selectedIndex=0;el('listSearch').value='';render()});target.append(b)})}
function render(){const s=current();el('sectionHeading').textContent=s.title;el('sectionSub').textContent=`MANAGE / ${s.id.toUpperCase()}`;el('sectionHelp').textContent=s.help;nav();let col=el('itemColumn');col.hidden=!!s.single;document.querySelector('.editor-layout').classList.toggle('single-mode',!!s.single);let items=draft[s.id];if(!s.single){const list=el('itemList');list.replaceChildren();const filter=el('listSearch').value.trim().toLowerCase();items.forEach((item,i)=>{if(filter&&!JSON.stringify(item).toLowerCase().includes(filter))return;let b=make('button','item-option'+(i===selectedIndex?' selected':''));b.type='button';b.append(make('strong','',labelItem(item,i,s).slice(0,92)));b.append(make('small','',item.group||item.year||item.category||`항목 ${i+1}`));b.addEventListener('click',()=>{selectedIndex=i;render()});list.append(b)});if(!list.children.length)list.append(make('div','empty-message','일치하는 항목이 없습니다.'))}
 renderEditor();}
function makeField(item,f){const wrapper=make('label','field');const l=make('span','field-label',f.label);wrapper.append(l);let control;
 if(f.type==='select'){control=make('select');Object.entries(f.options||{}).forEach(([val,text])=>{const opt=make('option','',text);opt.value=val;control.append(opt)});control.value=item[f.key]||Object.keys(f.options)[0]}
 else if(['textarea','lines'].includes(f.type)){control=make('textarea');control.rows=f.type==='lines'?5:3;control.value=f.type==='lines'?(Array.isArray(item[f.key])?item[f.key].join('\n'):item[f.key]||''):(item[f.key]||'')}
 else if(f.type==='image'){
   const frame=make('div','image-tools');const prev=make('img','image-preview');if(item[f.key]){prev.src=item[f.key]}else prev.style.display='none';frame.append(prev);
   const file=make('input');file.type='file';file.accept='image/jpeg,image/png,image/webp';file.setAttribute('aria-label',f.label+' 업로드');frame.append(file);
   const actions=make('div','image-actions');const clear=make('button','btn small danger','사진 삭제');clear.type='button';clear.addEventListener('click',()=>{item[f.key]='';markDirty();renderEditor()});actions.append(clear,make('span','inline-status','JPG / PNG / WebP → Firebase Storage 업로드'));
   frame.append(actions);file.addEventListener('change',async()=>{const imageFile=file.files?.[0];if(!imageFile)return;if(imageFile.size>12*1024*1024){notify('사진은 12MB 이하로 선택해 주세요.');return;}try{const result=await resizeImage(imageFile);item[f.key]=result;markDirty();renderEditor();notify('사진을 Firebase Storage에 업로드했습니다. 온라인 게시하기를 눌러 연결하세요.')}catch(e){notify('사진 업로드 실패: Storage 설정·Blaze 요금제·보안 규칙을 확인해 주세요.')}});wrapper.append(frame);if(f.help)wrapper.append(make('small','',f.help));return wrapper;
 }
 else{control=make('input');control.type=f.type==='url'?'url':f.type==='email'?'email':f.type==='date'?'date':f.type==='number'?'number':'text';control.value=item[f.key]??'';if(f.type==='number')control.step='1';}
 control.id='field-'+f.key;control.name=f.key;
 control.addEventListener('input',()=>{item[f.key]=f.type==='lines'?control.value.split('\n').map(s=>s.trim()).filter(Boolean):f.type==='number'?(control.value===''?'':Number(control.value)):control.value;markDirty();if(['name','title','date','year','number'].includes(f.key)&&!current().single)renderItemListOnly()});
 wrapper.append(control);if(f.help)wrapper.append(make('small','',f.help));return wrapper;
}
function renderItemListOnly(){const focus=document.activeElement;const selection=focus?.selectionStart;const s=current();const list=el('itemList');list.replaceChildren();(draft[s.id]||[]).forEach((o,i)=>{const b=make('button','item-option'+(i===selectedIndex?' selected':''));b.type='button';b.append(make('strong','',labelItem(o,i,s).slice(0,92)),make('small','',o.group||o.year||o.category||`항목 ${i+1}`));b.onclick=()=>{selectedIndex=i;render()};list.append(b)});}
function renderEditor(){const s=current(),panel=el('editorPanel');panel.replaceChildren();const item=currentItem();if(!item){panel.append(make('div','empty-message','등록된 항목이 없습니다. 왼쪽에서 + 추가 버튼을 눌러주세요.'));return}
 const h=make('div','form-header');const title=make('div');title.append(make('h2','',s.single?'페이지 내용 수정':'항목 정보 편집'));if(!s.single)title.append(make('p','',`${selectedIndex+1} / ${draft[s.id].length}`));h.append(title);
 if(!s.single){const actions=make('div','row-buttons');const up=make('button','btn small','↑');up.type='button';up.title='위로 이동';up.disabled=selectedIndex===0;up.onclick=()=>{const arr=draft[s.id];[arr[selectedIndex-1],arr[selectedIndex]]=[arr[selectedIndex],arr[selectedIndex-1]];selectedIndex--;markDirty();render()};const down=make('button','btn small','↓');down.type='button';down.title='아래로 이동';down.disabled=selectedIndex>=draft[s.id].length-1;down.onclick=()=>{const arr=draft[s.id];[arr[selectedIndex+1],arr[selectedIndex]]=[arr[selectedIndex],arr[selectedIndex+1]];selectedIndex++;markDirty();render()};const del=make('button','btn small danger','삭제');del.type='button';del.onclick=()=>{if(!confirm('이 항목을 삭제하시겠습니까?'))return;draft[s.id].splice(selectedIndex,1);selectedIndex=Math.max(0,Math.min(selectedIndex,draft[s.id].length-1));markDirty();render()};actions.append(up,down,del);h.append(actions)}panel.append(h);
 if(s.id==='journals')panel.append(make('div','editor-hint','논문 제목에 링크(url)를 입력하면 클릭 가능한 제목이 됩니다. 기존 논문 50편을 수정할 수 있습니다.'));
 if(s.id==='alumni')panel.append(make('div','editor-hint','졸업생은 요청하신 대로 사진 필드가 없고, 홈페이지에서도 사진 영역이 표시되지 않습니다.'));
 s.fields.forEach(f=>panel.append(makeField(item,f)));const foot=make('div','row-buttons');const save=make('button','btn primary','이 항목까지 초안 저장');save.type='button';save.onclick=saveDraft;foot.append(save);panel.append(foot)
}
async function resizeImage(file){const url=URL.createObjectURL(file);try{const img=await new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=url});let w=img.naturalWidth,h=img.naturalHeight;const max=1200;const scale=Math.min(1,max/Math.max(w,h));w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale));const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);return await new Promise((resolve,reject)=>canvas.toBlob(async blob=>{if(!blob){reject(new Error('이미지 변환 실패'));return;}try{resolve(await window.EEMCloud.uploadImage(blob))}catch(e){reject(e)}},'image/jpeg',.78))}finally{URL.revokeObjectURL(url)}}
function download(filename,text,mime){const blob=new Blob([text],{type:mime});const link=document.createElement('a');const url=URL.createObjectURL(blob);link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
async function exportFile(){
 if(dirty&&!saveDraft())return;
 const button=el('exportButton');button.disabled=true;status('Firebase 온라인 게시 중…');
 try{
   await window.EEMCloud.publish(draft);
   status('온라인 게시 성공');
   notify('게시 완료! 공개 홈페이지와 열린 페이지에 변경 내용이 반영됩니다.');
 }catch(error){status('게시 실패');notify('Firebase 게시 실패: '+(error.code||error.message));console.error(error)}
 finally{button.disabled=false}
}

function preview(){if(dirty&&!saveDraft())return;const section=current();window.open(section.preview+'?admin-preview=1','_blank','noopener')}
function addItem(){const s=current();if(s.single)return;const item={};s.fields.forEach(f=>{item[f.key]=f.type==='lines'?[]:f.type==='number'?'':f.type==='select'?Object.keys(f.options)[0]:''});if(s.id==='journals'){item.year=new Date().getFullYear();item.number=Math.max(0,...draft.journals.map(x=>Number(x.number)||0))+1}if(s.id==='news')item.date=new Date().toISOString().slice(0,10);if(s.id==='alumni')item.graduationYear=new Date().getFullYear();draft[s.id].unshift(item);selectedIndex=0;el('listSearch').value='';markDirty();render();notify('새 항목을 추가했습니다. 값을 입력하고 초안을 저장하세요.')}
el('saveButton').onclick=saveDraft;el('exportButton').onclick=exportFile;el('previewButton').onclick=preview;el('addItem').onclick=addItem;el('listSearch').addEventListener('input',render);
el('resetButton').onclick=()=>{if(!confirm('브라우저에 저장한 모든 관리자 초안을 삭제하고 현재 data.js에 저장된 내용으로 돌아갑니다. 계속할까요?'))return;localStorage.removeItem(STORAGE);draft=clone(seed);selectedIndex=0;dirty=false;status('현재 게시 데이터 표시 중');render();notify('초안을 초기화했습니다.')};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
status(localStorage.getItem(STORAGE)?'저장된 초안 불러옴':'현재 게시 데이터 표시 중');render();
})();
