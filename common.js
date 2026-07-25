/* ============================================================
   공통 헤더(네비게이션) + 하단 정보 바 + 푸터
   ─ 메인(index.html)과 모든 하위 페이지가 함께 사용합니다.
   ─ 이 파일은 수정할 필요 없습니다. 내용은 data.js 에서 관리됩니다.
   ============================================================ */

/* 현재 페이지가 pages 폴더 안인지 판단해서 경로 앞에 붙일 접두어 결정
   (index.html 은 '' , pages/xxx.html 은 '../') */
const IN_PAGES = location.pathname.includes('/pages/');
const ROOT = IN_PAGES ? '../' : '';

function _(id){ return document.getElementById(id); }

/* ---------- 상담사 이력 HTML 만들기 (index + 상담사 소개 페이지 공용) ---------- */
function buildCareerHTML(c){
  function list(items){ return `<ul class="career-list">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`; }
  function block(label, items){ return `<div class="prof-block"><h4 class="prof-label">${label}</h4>${list(items)}</div>`; }
  let html = '';
  if(c.highlights && c.highlights.length) html += `<ul class="career-list career-top">${c.highlights.map(i=>`<li>${i}</li>`).join('')}</ul>`;
  if(c.education && c.education.length) html += block('학력', c.education);
  if(c.licenses && c.licenses.length) html += block('자격', c.licenses);
  if(c.more && c.more.length){
    const inner = c.more.map(g=>block(g.group, g.items)).join('');
    html += `<details class="prof-toggle">
      <summary><span class="pt-txt">전체 이력 더보기</span><span class="pt-ico" aria-hidden="true">＋</span></summary>
      <div class="prof-more">${inner}</div>
    </details>`;
  }
  return html;
}

/* target(메뉴 목적지)을 실제 링크 주소로 변환 */
function resolveTarget(t){
  if(!t || t==='#') return '#';
  if(t==='apply') return SITE.applyForm;
  if(t==='blog')  return SITE.blogUrl;
  if(t==='brunch')return SITE.brunchUrl;
  if(t==='tour')  return ROOT + 'index.html#tour'; // 둘러보기: 메인으로 가서 팝업
  if(t.startsWith('http')) return t;
  return ROOT + t; // pages/xxx.html 같은 내부 경로
}

/* ---------- 헤더(네비게이션) 만들기 ---------- */
function renderHeader(){
  const host = _('siteHeader');
  if(!host) return;

  const brandText = `<span class="txt">${SITE.centerName}<small>${SITE.centerNameEn}</small></span>`;
  const brandInner = SITE.logo
    ? `<img class="brand-logo" src="${ROOT}images/${SITE.logo}" alt="${SITE.centerName}">${brandText}`
    : brandText;

  const navHtml = SITE.nav.map(g=>{
    // cta 항목: 펼쳐지는 메뉴가 아니라 오른쪽에 떨어진 '버튼'
    if(g.cta){
      return `<a class="nav-cta" href="${resolveTarget(g.target)}" data-target="${g.target||''}">
        <span class="nc-txt">${g.title}</span>
        <span class="nc-arw" aria-hidden="true">→</span>
      </a>`;
    }
    return `
    <div class="nav-group">
      <span class="nav-title">${g.title}</span>
      <div class="nav-drop">
        ${(g.items||[]).map(it=>{
          const url = resolveTarget(it.target);
          const ext = (it.target==='apply'||it.target==='blog'||it.target==='brunch'||(it.target||'').startsWith('http'))
            ? ' target="_blank" rel="noopener"' : '';
          return `<a href="${url}" data-target="${it.target||''}"${ext}>${it.label}</a>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');

  host.innerHTML = `
    <header class="topbar">
      <div class="wrap topbar-top">
        <a href="${ROOT}index.html" class="brand">${brandInner}</a>
        <a class="top-apply" href="${SITE.applyForm}" target="_blank" rel="noopener">상담 예약</a>
        <button class="nav-toggle" id="navToggle" aria-label="메뉴">☰</button>
      </div>
      <nav class="mainnav" id="mainnav">
        <div class="wrap mainnav-inner">${navHtml}</div>
      </nav>
    </header>`;

  // 둘러보기 항목: 메인페이지에서는 팝업, 하위페이지에서는 메인으로 이동
  host.querySelectorAll('a[data-target="tour"]').forEach(a=>{
    a.addEventListener('click', e=>{
      if(typeof openTour === 'function' && !IN_PAGES){ e.preventDefault(); openTour(); }
    });
  });
  /* 카테고리 제목 탭(클릭)으로 펼치기 — 터치 기기(아이패드 등)에서 hover가 안 되는 문제 해결
     모바일에서는 항목 수만큼의 '실제 높이'를 재서 넣어줍니다.
     (높이를 넉넉히 잡아두면 빈 공간에서 애니메이션이 헛돌아 뚝뚝 끊겨 보입니다) */
  const isNarrow = ()=> matchMedia('(max-width:860px)').matches;
  function closeGroups(){
    host.querySelectorAll('.nav-group.open').forEach(g=>{
      g.classList.remove('open');
      const d = g.querySelector('.nav-drop');
      if(d) d.style.maxHeight = '';
    });
  }
  host.querySelectorAll('.nav-group > .nav-title').forEach(title=>{
    title.addEventListener('click', e=>{
      const group = title.parentElement;
      const isOpen = group.classList.contains('open');
      closeGroups();
      if(!isOpen){
        group.classList.add('open');
        const drop = group.querySelector('.nav-drop');
        if(drop && isNarrow()) drop.style.maxHeight = drop.scrollHeight + 'px';
      }
      e.stopPropagation();
    });
  });
  // 바깥을 탭하면 열린 메뉴 닫기
  document.addEventListener('click', closeGroups);
  // 하위 링크 클릭 시 메뉴 닫기
  host.querySelectorAll('.nav-drop a').forEach(a=>{
    a.addEventListener('click', ()=>{
      _('mainnav')?.classList.remove('open');
      closeGroups();
    });
  });
  // 화면 크기가 바뀌면 잔여 높이값 정리
  addEventListener('resize', ()=>{
    host.querySelectorAll('.nav-drop').forEach(d=>{
      if(!isNarrow()) d.style.maxHeight = '';
      else if(d.parentElement.classList.contains('open')) d.style.maxHeight = d.scrollHeight + 'px';
    });
  }, {passive:true});
  _('navToggle')?.addEventListener('click', ()=> _('mainnav')?.classList.toggle('open'));
}

/* ---------- 하단 정보 바 + 푸터 만들기 ---------- */
function renderFooter(){
  const host = _('siteFooter');
  if(!host) return;

  const hoursHtml = SITE.hours.map(h=>
    `<div class="cb-row"><span>${h.day}</span><span>${h.time}</span></div>`).join('');

  /* 채널 버튼 — mark 는 서비스를 알아보게 하는 글자 표시 (N=네이버, B=브런치) */
  const sns = [
    {url:SITE.blogUrl,      label:'블로그',       mark:'N',  cls:'sns-naver'},
    {url:SITE.brunchUrl,    label:'브런치',       mark:'B',  cls:'sns-brunch'},
    {url:SITE.instagramUrl, label:'인스타그램',   mark:'◉',  cls:''},
    {url:SITE.youtubeUrl,   label:'유튜브',       mark:'▶',  cls:''},
  ].filter(s=>s.url);
  const snsHtml = sns.map(s=>
    `<a class="sns-btn ${s.cls}" href="${s.url}" target="_blank" rel="noopener">`
    + `<span class="sns-mark">${s.mark}</span>${s.label}</a>`).join('');

  host.innerHTML = `
    <div class="contact-bar" id="contact">
      <div class="wrap contact-grid">
        <div class="cb-block">
          <h4>문 의 처</h4>
          <div class="big">${SITE.phone}</div>
          ${SITE.phone2?`<div class="big" style="font-size:1.15rem">${SITE.phone2}</div>`:''}
          ${SITE.email?`<div style="color:#cbc6ba;margin-top:10px;font-size:.92rem">E-MAIL: ${SITE.email}</div>`:''}
        </div>
        <div class="cb-block">
          <h4>운 영 시 간</h4>
          ${SITE.hoursNote?`<div class="cb-hours-note">${SITE.hoursNote}</div>`:''}
          ${hoursHtml}
        </div>
        <div class="cb-block">
          <h4>주 소</h4>
          <div style="color:#cbc6ba;font-size:.95rem;line-height:1.9">${SITE.addressBr || SITE.address}</div>
        </div>
        <div class="cb-block">
          <h4>채 널</h4>
          <div class="sns-links">${snsHtml}</div>
        </div>
      </div>
    </div>
    <footer>
      <div class="wrap foot-inner">
        <div class="fname">${SITE.centerName}${SITE.representative?' | 대표: '+SITE.representative:''}</div>
        <p>주소: ${SITE.addressBr || SITE.address}</p>
        <p>T. ${SITE.phone}${SITE.email?' | E. '+SITE.email:''}</p>
        ${SITE.businessNumber?`<p>사업자등록번호: ${SITE.businessNumber}</p>`:''}
      </div>
    </footer>`;
}

/* ---------- 하위페이지 상단 배경사진 랜덤 적용 ----------
   .page-hero.hero-photo 가 있는 페이지에서만 동작.
   들어올 때 무작위로 한 장을 골라 깔고, 보는 동안은 고정(자동으로 안 바뀜). */
function applyRandomHero(){
  const hero = document.querySelector('.page-hero.hero-photo');
  if(!hero) return;
  if(!SITE.heroImages || !SITE.heroImages.length){
    console.warn('[사유담] data.js 에 heroImages 목록이 없습니다. data.js 를 새로 올려주세요.');
    return;
  }
  const wash = 'linear-gradient(rgba(43,29,23,.36),rgba(43,29,23,.5))';
  // 무작위 순서로 시도해, 실제로 불러와지는 첫 사진을 사용합니다.
  const list = SITE.heroImages.slice().sort(()=> Math.random() - .5);

  (function tryNext(i){
    if(i >= list.length){
      // 사진을 하나도 못 찾으면 사진 없는 원래 모습으로 (글씨가 안 보이는 일 방지)
      console.warn('[사유담] 배경 사진을 찾을 수 없습니다. images/hero 폴더가 업로드되었는지 확인해 주세요.'
        + ' 확인용 주소: ' + ROOT + 'images/' + (list[0].src || list[0]));
      return;
    }
    const item = list[i];
    const src = item.src || item;               // 문자열/객체 둘 다 허용
    const pos = item.pos || 'center 45%';
    const url = ROOT + 'images/' + src;
    const probe = new Image();
    probe.onload = ()=>{
      hero.style.backgroundImage = `${wash},url('${url}')`;
      hero.style.backgroundPosition = pos;
      hero.classList.add('hero-ready');         // 사진이 확인된 뒤에만 사진용 스타일 적용
    };
    probe.onerror = ()=> tryNext(i + 1);
    probe.src = url;
  })(0);
}

/* ---------- 갤러리 입장 전환 ----------
   '사진 구매(갤러리)' 링크를 누르면, 보던 화면이 핸드폰 밝기 낮추듯
   부드럽게 어두워진 뒤 갤러리로 이동합니다. */
function initGalleryDim(){
  document.addEventListener('click', e=>{
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button!==0) return; // 새 탭 열기 등은 그대로
    let a = e.target;
    while(a && a.tagName!=='A') a = a.parentElement;
    if(!a) return;
    const href = a.getAttribute('href')||'';
    if(href.indexOf('gallery.html')===-1 || a.target==='_blank') return;
    e.preventDefault();
    const ov = document.createElement('div');
    ov.id = 'galleryDim';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#e2e1dd;opacity:0;transition:opacity .85s ease;pointer-events:none';
    document.body.appendChild(ov);
    requestAnimationFrame(()=> requestAnimationFrame(()=> ov.style.opacity='1'));
    setTimeout(()=>{ location.href = href; }, 870);
  });
  // 뒤로가기로 돌아왔을 때 어둠이 남지 않도록 제거
  window.addEventListener('pageshow', ()=>{
    const ov = document.getElementById('galleryDim');
    if(ov) ov.remove();
  });
}

/* ---------- 갤러리에서 돌아왔을 때 ----------
   어두운 화면에서 시작해, 사이트가 서서히 밝아지며 나타납니다. */
function initArriveFade(){
  let arrived = false;
  try{
    arrived = sessionStorage.getItem('sydArrive')==='1';
    if(arrived) sessionStorage.removeItem('sydArrive');
  }catch(e){}
  if(!arrived) return;
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#f6f1e8;opacity:1;transition:opacity 1.1s ease;pointer-events:none';
  document.body.appendChild(ov);
  requestAnimationFrame(()=> requestAnimationFrame(()=>{ ov.style.opacity='0'; }));
  setTimeout(()=> ov.remove(), 1300);
}

renderHeader();
renderFooter();
applyRandomHero();
initGalleryDim();
initArriveFade();
