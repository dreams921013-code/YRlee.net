/* v9 Team pages: add actual profiles in data.js, not here. */
'use strict';
(function () {
  const info = (tag, text, cls) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined && text !== null) el.textContent = String(text);
    return el;
  };
  const config = {
    memberList: [
      { id: 'postdoctoral', title: 'Postdoctoral Researchers', templates: ['POSTDOCTORAL RESEARCHER'] },
      { id: 'graduate', title: 'Graduate Students', templates: ['MS / PHD STUDENT', 'M.S. STUDENT', 'M.S. STUDENT'] },
      { id: 'undergraduate', title: 'Undergraduate Researchers', templates: ['UNDERGRADUATE RESEARCHER'] },
    ],
    alumniList: [
      { id: 'graduate', title: 'Graduate Alumni', templates: ['M.S. / PH.D. ALUMNI'] },
      { id: 'undergraduate', title: 'Undergraduate Alumni', templates: ['B.S. ALUMNI'] },
    ]
  };
  function portrait(profile, preview) {
    const frame = info('div', null, 'person-image-area');
    const placeholder = () => {
      const temp = info('div', null, 'person-image-placeholder');
      temp.setAttribute('aria-label','인물 사진 등록 예정');
      const icon = info('div','◎','person-placeholder-symbol');
      icon.setAttribute('aria-hidden','true');
      temp.append(icon,info('span','PROFILE PHOTO'),info('small','사진 등록 예정'));
      frame.replaceChildren(temp);
    };
    if (profile.photo && !preview) {
      const img = info('img', null, 'person-portrait');
      img.src = profile.photo;
      img.alt = `${profile.name || '연구실 구성원'} 프로필 사진`;
      img.loading = 'lazy';
      img.onerror = placeholder;
      frame.append(img);
    } else placeholder();
    return frame;
  }
  function card(profile, alumni, preview) {
    const article=info('article',null,'person-card'+(preview?' person-card--template':''));
    const body=info('div',null,'person-information');
    const tag=alumni ? (profile.degree || 'ALUMNI') : (profile.role || 'RESEARCH MEMBER');
    body.append(info('p',tag.toUpperCase(),'person-eyebrow'));
    body.append(info('h3', preview?'이름 입력 예정':(profile.name || '이름 입력 예정'),'person-name'));
    if (preview) body.append(info('span','입력 예시','person-example-tag'));
    const lines=alumni ? [
      profile.graduationYear ? `${profile.degree||'Degree'} · ${profile.graduationYear}` : '학위 · 졸업연도 입력 예정',
      profile.currentPosition || '졸업 후 진로 또는 현재 소속 입력 예정'
    ] : ((profile.education || []).length ? profile.education : ['학력 및 소속 정보 입력 예정']);
    const details=info('div',null,'person-details');
    lines.filter(Boolean).forEach(line=>details.append(info('p',line)));
    if (profile.research) details.append(info('p',`Research: ${profile.research}`));
    body.append(details);
    if (profile.email && !preview){
      const mail=info('a',profile.email,'person-email');
      mail.href='mailto:'+profile.email; body.append(mail);
    } else if(!alumni) body.append(info('p','이메일 입력 예정','person-email person-email--empty'));
    if (!alumni) article.append(portrait(profile,preview)); else article.classList.add("person-card--no-photo");
    article.append(body);
    return article;
  }
  function render(targetId, items, groups, alumni) {
    const target=document.getElementById(targetId);
    if (!target) return;
    target.replaceChildren();
    for (const group of groups) {
      const section=info('section',null,'people-section');
      section.id=group.id+'-'+(alumni?'alumni':'members');
      const heading=info('div',null,'people-section-heading');
      heading.append(info('h2',group.title));
      const subset=items.filter(p=>p.group===group.id && p.name && p.name.trim());
      heading.append(info('span',subset.length ? `${subset.length} ${subset.length===1?'person':'people'}` : 'FORM TEMPLATE','people-count'));
      section.append(heading);
      const cards=info('div',null,'people-cards');
      if (subset.length) {
        const sorted=alumni ? [...subset].sort((a,b)=>Number(b.graduationYear||0)-Number(a.graduationYear||0)) : subset;
        sorted.forEach(person=>cards.append(card(person,alumni,false)));
      } else {
        // Only show empty form cards until real profiles are entered into this category.
        for (const role of group.templates) cards.append(card(alumni?{degree:role}:{role},alumni,true));
      }
      section.append(cards);
      target.append(section);
    }
  }
  const data = (typeof siteData !== 'undefined') ? siteData : {};
  render('memberList',data.members||[],config.memberList,false);
  render('alumniList',data.alumni||[],config.alumniList,true);
})();
