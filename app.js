'use strict';
const make = (tag, text, className) => { const el=document.createElement(tag);if(text!==null && text!==undefined)el.textContent=String(text);if(className)el.className=className;return el; };
const data = typeof siteData==='object' ? siteData : {news:[],journals:[],patents:[]};
const sortedNews = [...(data.news||[])].filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(n.date||'')).sort((a,b)=>b.date.localeCompare(a.date));
const sortedJournals = [...(data.journals||[])].sort((a,b)=>Number(b.year||0)-Number(a.year||0) || Number(b.number||0)-Number(a.number||0));
const sortedPatents = [...(data.patents||[])].sort((a,b)=>Number(b.year||0)-Number(a.year||0));
function addEmpty(target,message){target.append(make('div',message,'empty'))}
function newsCard(item){const card=make('article',null,'news-card');const time=make('time',item.date);time.dateTime=item.date;card.append(time,make('strong',item.title||'제목 없음'));if(item.description)card.append(make('p',item.description));if(item.url && /^https?:\/\//i.test(item.url)){const a=make('a','자세히 보기 →');a.href=item.url;if(/^https?:\/\//.test(item.url)){a.target='_blank';a.rel='noopener noreferrer'}card.append(a)}return card;}
function renderNews(id,limit){const el=document.getElementById(id);if(!el)return;el.replaceChildren();const items=limit?sortedNews.slice(0,limit):sortedNews;if(!items.length){addEmpty(el,'등록된 연구실 소식이 없습니다. data.js에 새 소식을 추가하면 날짜 최신순으로 표시됩니다.');return;}items.forEach(x=>el.append(newsCard(x)));}
function pubRow(item){const row=make('article',null,'data-row');row.append(make('span',item.year||'—','year'));const info=make('div');if(item.url && /^https?:\/\//i.test(item.url)){const titleLink=make('a',item.title||'제목 없음','v13-publication-link');titleLink.href=item.url;titleLink.target='_blank';titleLink.rel='noopener noreferrer';info.append(titleLink)}else info.append(make('strong',item.title||'제목 없음'));const meta=[item.authors,item.source,item.meta].filter(Boolean).join(' · ');if(meta)info.append(make('p',meta));row.append(info);if(item.url && /^https?:\/\//i.test(item.url)){const a=make('a','원문 보기 →');a.href=item.url;if(/^https?:\/\//.test(item.url)){a.target='_blank';a.rel='noopener noreferrer'}row.append(a)}return row;}
function renderPubs(id,items,type){const el=document.getElementById(id);if(!el)return;el.replaceChildren();if(!items.length){addEmpty(el,`등록된 ${type}이(가) 없습니다. 공개 가능한 정보를 확인한 뒤 업데이트합니다.`);return;}items.forEach(x=>el.append(pubRow(x)));}
// Journal: year-grouped publications with original numbering, author metadata, and search.
function renderJournal(journals){
 const el=document.getElementById('journalList');if(!el)return;
 const input=document.getElementById('publicationSearch');
 const count=document.getElementById('publicationCount');
 const years=document.getElementById('publicationYears');
 const allYears=[...new Set(journals.map(x=>Number(x.year)).filter(Boolean))];
 function draw(){
  const query=(input?.value||'').trim().toLocaleLowerCase();
  const visible=journals.filter(p=>[p.year,p.number,p.title,p.authors,p.source].some(val=>String(val||'').toLocaleLowerCase().includes(query)));
  el.replaceChildren();if(count)count.textContent=`${visible.length} / ${journals.length} publications`;
  if(!visible.length){addEmpty(el,'일치하는 논문이 없습니다. 다른 제목, 저자, 연도를 입력해 주세요.');return}
  for(const yr of [...new Set(visible.map(x=>Number(x.year)))]){
   const group=make('section',null,'journal-year-group');group.id=`journal-year-${yr}`;
   const header=make('div',null,'journal-year-head');
   header.append(make('h2',String(yr),'journal-year-title'),make('span',`${visible.filter(x=>Number(x.year)===yr).length} papers`,'journal-year-count'));
   group.append(header);
   visible.filter(x=>Number(x.year)===yr).forEach(pub=>{
    const row=make('article',null,'journal-entry');
    const num=make('div',pub.number?`${pub.number}.`:'•','journal-number');
    const content=make('div',null,'journal-entry-body');
    const heading=make('h3',null,'journal-paper-title');
    if(pub.url && /^https?:\/\//.test(pub.url)){
     const a=make('a',pub.title);a.href=pub.url;a.target='_blank';a.rel='noopener noreferrer';heading.append(a);
    }else{heading.textContent=pub.title||'제목 없음'}
    content.append(heading);
    if(pub.authors)content.append(make('p',pub.authors,'journal-authors'));
    if(pub.source)content.append(make('p',pub.source,'journal-source'));
    row.append(num,content);group.append(row);
   });
   el.append(group);
  }
 }
 if(years){years.replaceChildren();allYears.forEach(yr=>{const a=make('a',String(yr),'journal-year-link');a.href=`#journal-year-${yr}`;years.append(a)});}
 input?.addEventListener('input',draw);
 draw();
}
function renderFeatured(){const target=document.getElementById('featuredPublications');if(!target)return;target.replaceChildren();if(!sortedJournals.length){target.append(make('div','대표 논문 영역 · 실제 논문을 등록하면 최신 항목 4개가 이곳에 표시됩니다.','featured-empty'));return;}sortedJournals.slice(0,4).forEach(p=>{const card=make('a',null,'featured-card');card.href=(p.url && /^https?:\/\//i.test(p.url))?p.url:'journal.html';if(p.url && /^https?:\/\//.test(p.url)){card.target='_blank';card.rel='noopener noreferrer'}card.append(make('small',`${p.year||''} · ${(p.source||'JOURNAL').split(',')[0].toUpperCase()}`),make('strong',p.title||'논문 제목'));target.append(card)});}
// Research Area: one entry in data.js -> one numbered research block. New items are numbered automatically.
function renderResearchAreas(){
  const target=document.getElementById('researchAreaList');
  if(!target)return;
  target.replaceChildren();
  const areas=data.researchAreas||[];
  if(!areas.length){
    const empty=make('div',null,'wrap');
    addEmpty(empty,'등록된 연구 분야가 없습니다. data.js에서 researchAreas를 추가해 주세요.');
    target.append(empty);
    return;
  }
  areas.forEach((item,index)=>{
    const section=make('section',null,'research-detail');
    const wrap=make('div',null,'wrap detail-grid');
    const lead=make('div',null,'detail-lead');
    const heading=make('div',null,'detail-heading');
    heading.append(make('span',String(index+1).padStart(2,'0'),'detail-num'));
    heading.append(make('h2',item.title||'연구 제목','detail-title'));
    lead.append(heading);
    if(item.image){
      const figure=make('figure',null,'research-photo-frame');
      const img=make('img');
      img.src=item.image;
      img.alt=item.imageAlt||`${item.title||'연구 분야'} 이미지`;
      img.loading='eager';
      img.decoding='async';
      figure.append(img);
      if(item.caption){figure.append(make('figcaption',item.caption));}
      lead.append(figure);
    }
    const content=make('div',null,'detail-content');
    (item.paragraphs||[]).forEach(p=>content.append(make('p',p)));
    if(item.note)content.append(make('div',item.note,'detail-note'));
    wrap.append(lead,content);
    section.append(wrap);
    target.append(section);
  });
}
renderResearchAreas();
renderNews('homeNews',4);renderNews('allNews',0);renderJournal(sortedJournals);renderPubs('patentList',sortedPatents,'특허');renderFeatured();
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
// 메뉴: 제목 클릭 → 새 HTML 페이지로 이동, 화살표 클릭 → 하위 메뉴 표시.
document.querySelectorAll('.drop-toggle').forEach(button=>{button.addEventListener('click',e=>{e.stopPropagation();const parent=button.closest('.nav-item');const opening=!parent.classList.contains('open');document.querySelectorAll('.nav-item.open').forEach(n=>{n.classList.remove('open');n.querySelector('.drop-toggle')?.setAttribute('aria-expanded','false')});parent.classList.toggle('open',opening);button.setAttribute('aria-expanded',String(opening));});});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-item.has-drop'))document.querySelectorAll('.nav-item.open').forEach(n=>{n.classList.remove('open');n.querySelector('.drop-toggle')?.setAttribute('aria-expanded','false')})});
const mobileButton=document.getElementById('mobileButton');const mobileNav=document.getElementById('mobileNav');if(mobileButton&&mobileNav){mobileButton.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');mobileButton.setAttribute('aria-expanded',String(open));mobileButton.textContent=open?'✕':'☰'});}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.nav-item.open').forEach(n=>n.classList.remove('open'));if(mobileNav)mobileNav.classList.remove('open');if(mobileButton){mobileButton.setAttribute('aria-expanded','false');mobileButton.textContent='☰'}}});
const destinations=[['Home','홈페이지 메인','index.html'],['Research Areas','연구 분야 MOF CO2 수분 흡착','research.html'],['Research Activities','연구 활동 연구 프로젝트','research-activities.html'],['Professor','연구 책임자 이유리 교수','professor.html'],['Members','연구실 구성원 대학원생','members.html'],['Alumni','졸업생','alumni.html'],['Team','연구원 및 구성원','team.html'],['Publication','논문 및 특허','publication.html'],['Journal','학술 논문','journal.html'],['Patent','특허','patent.html'],['Gallery','연구실 사진','gallery.html'],['News','소식','news.html'],['Contact','연락처','contact.html'],...sortedNews.map(x=>[x.title,x.description||'News','news.html']),...sortedJournals.map(x=>[x.title,x.source||'Journal','journal.html']),...sortedPatents.map(x=>[x.title,x.meta||'Patent','patent.html'])];
const dialog=document.getElementById('searchDialog');const input=document.getElementById('siteSearch');const results=document.getElementById('searchResults');function renderSearch(){if(!results)return;results.replaceChildren();const q=input.value.trim().toLocaleLowerCase();const matches=destinations.filter(x=>!q||`${x[0]} ${x[1]}`.toLocaleLowerCase().includes(q));if(!matches.length){results.append(make('p','검색 결과가 없습니다.'));return;}matches.forEach(([label,desc,url])=>{const a=make('a');a.href=url;a.append(make('strong',label),make('small',desc));results.append(a)});}
document.getElementById('searchOpen')?.addEventListener('click',()=>{if(dialog&&!dialog.open){dialog.showModal();input.value='';renderSearch();input.focus()}});document.getElementById('searchClose')?.addEventListener('click',()=>dialog.close());input?.addEventListener('input',renderSearch);dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
