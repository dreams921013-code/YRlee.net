/* Data-driven editable sections; all strings render as text, never arbitrary HTML. */
(function(){
  'use strict';
  const d=typeof siteData==='object'?siteData:{};
  const q=x=>document.querySelector(x);
  const n=(tag,cls,txt)=>{let x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x;};
  const safeURL=s=>/^(https?:\/\/)/i.test(s||'')?s:'';
  // Support markdown bold (**text**) without interpreting HTML.
  function markdown(container,content){container.replaceChildren();String(content||'').split(/(\*\*[^*]+\*\*)/g).forEach(part=>{if(part.startsWith('**')&&part.endsWith('**'))container.append(n('strong','',part.slice(2,-2)));else container.append(document.createTextNode(part))});}
  function paragraphs(target,arr){if(!target)return;target.replaceChildren();(arr||[]).filter(Boolean).forEach(text=>{const p=n('p');markdown(p,text);target.append(p)})}
  const home=d.home||{};
  if(q('.v12-hero-deck') && home.subtitle) q('.v12-hero-deck').textContent=home.subtitle;
  if(q('.v12-hero-art img') && home.image)q('.v12-hero-art img').src=home.image;
  if(q('.v12-about-text')){
    const en=[...document.querySelectorAll('.v12-about-text p[lang="en"]')];
    const ko=[...document.querySelectorAll('.v12-about-text p[lang="ko"]')];
    if(home.en) en.forEach((el,i)=>{if(home.en[i]!=null)markdown(el,home.en[i])});
    if(home.ko) ko.forEach((el,i)=>{if(home.ko[i]!=null)markdown(el,home.ko[i])});
  }
  // The Home research tiles respond to the area editor, including future entries.
  const tileGrid=q('.v12-research-grid');if(tileGrid && (d.researchAreas||[]).length){
    tileGrid.replaceChildren();d.researchAreas.forEach((a,i)=>{
      let link=n('a','v12-research-tile');link.href='research.html';
      let top=n('span','v12-tile-top',`${String(i+1).padStart(2,'0')} / RESEARCH AREA`);link.append(top);
      link.append(n('h3','',a.title||'Research Area'));
      link.append(n('p','',a.paragraphs?.[0]||''));link.append(n('span','v12-tile-bottom','EXPLORE AREA  →'));tileGrid.append(link);
    });
  }
  const activities=q('.two-grid');if(document.body.dataset.page==='research-activities.html'&&activities){activities.replaceChildren();(d.researchActivities||[]).forEach((a,i)=>{
    const card=n('article','content-card');card.append(n('small','',a.category||`${String(i+1).padStart(2,'0')} / RESEARCH`),n('h2','',a.title||'제목 없음'),n('p','',a.description||''));
    if(a.image){const im=n('img','activity-preview');im.src=a.image;im.alt=a.title||'연구 활동 사진';card.append(im)}activities.append(card);
  });}
  const prof=d.professor||{};
  if(q('.professor-profile-card')){
    const area=q('.professor-portrait-wrap');if(area && prof.photo){area.replaceChildren();const img=n('img','professor-portrait');img.src=prof.photo;img.alt='교수 공식 사진';area.append(img)}
    const name=q('.professor-profile-name');if(name){name.replaceChildren(document.createTextNode(prof.name||'이름 입력 예정'),' ');name.append(n('span','',prof.englishName||''))}
    const aff=q('.professor-profile-affiliation');if(aff)aff.textContent=prof.affiliation||'';
    const pg=[...document.querySelectorAll('.professor-profile-group')];if(pg[0]) paragraphs(pg[0], [prof.research||'']);
    // Preserve each section heading
    if(pg[0])pg[0].prepend(n('h3','','Research Interests'));
    if(pg[1]){paragraphs(pg[1],(prof.education||[]).length?prof.education:['학력 정보 입력 예정']);pg[1].prepend(n('h3','','Education'))}
    if(pg[2]){paragraphs(pg[2],(prof.experience||[]).length?prof.experience:['경력 정보 입력 예정']);pg[2].prepend(n('h3','','Experience'))}
    const c=q('.professor-profile-contact');if(c){c.replaceChildren(n('span','','Email'));if(prof.email && /.+@.+\..+/.test(prof.email)){const a=n('a','',prof.email);a.href=`mailto:${prof.email}`;c.append(a)}else c.append(n('span','professor-profile-empty','공식 이메일 등록 예정'))}
  }
  const gallery=q('.gallery-grid');if(gallery){gallery.replaceChildren();(d.gallery||[]).forEach(item=>{
    const f=n('figure','v13-gallery-item');if(item.image){let im=n('img');im.src=item.image;im.alt=item.title||'연구실 사진';im.loading='lazy';f.append(im)}else f.append(n('div','v13-gallery-empty','사진 업로드 예정'));
    const desc=n('figcaption');desc.append(n('strong','',item.title||''));if(item.description)desc.append(n('span','',item.description));f.append(desc);gallery.append(f)
  });}
  const contact=d.contact||{};if(document.body.dataset.page==='contact.html'){
    const area=q('.contact-grid');if(area){const intro=area.querySelector('div');if(intro){intro.replaceChildren(n('h2','',contact.labName||''),n('p','',contact.englishName||''),n('p','',contact.introduction||''))}
    const dl=area.querySelector('dl');if(dl){dl.replaceChildren();[['UNIVERSITY',contact.university],['DEPARTMENT',contact.department],['LAB LOCATION',contact.location],['E-MAIL',contact.email]].forEach(([label,val])=>{dl.append(n('dt','',label),n('dd','',val||'정보 입력 예정'))})}
    }
  }
})();
