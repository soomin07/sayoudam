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

  const navHtml = SITE.nav.map(g=>`
    <div class="nav-group">
      <span class="nav-title">${g.title}</span>
      <div class="nav-drop">
        ${g.items.map(it=>{
          const url = resolveTarget(it.target);
          const ext = (it.target==='apply'||it.target==='blog'||(it.target||'').startsWith('http'))
            ? ' target="_blank" rel="noopener"' : '';
          return `<a href="${url}" data-target="${it.target||''}"${ext}>${it.label}</a>`;
        }).join('')}
      </div>
    </div>`).join('');

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
  // 카테고리 제목 탭(클릭)으로 펼치기 — 터치 기기(아이패드 등)에서 hover가 안 되는 문제 해결
  host.querySelectorAll('.nav-group > .nav-title').forEach(title=>{
    title.addEventListener('click', e=>{
      const group = title.parentElement;
      const isOpen = group.classList.contains('open');
      host.querySelectorAll('.nav-group.open').forEach(g=> g.classList.remove('open'));
      if(!isOpen) group.classList.add('open');
      e.stopPropagation();
    });
  });
  // 바깥을 탭하면 열린 메뉴 닫기
  document.addEventListener('click', ()=>{
    host.querySelectorAll('.nav-group.open').forEach(g=> g.classList.remove('open'));
  });
  // 하위 링크 클릭 시 메뉴 닫기
  host.querySelectorAll('.nav-drop a').forEach(a=>{
    a.addEventListener('click', ()=>{
      _('mainnav')?.classList.remove('open');
      host.querySelectorAll('.nav-group.open').forEach(g=> g.classList.remove('open'));
    });
  });
  _('navToggle')?.addEventListener('click', ()=> _('mainnav')?.classList.toggle('open'));
}

/* ---------- 하단 정보 바 + 푸터 만들기 ---------- */
function renderFooter(){
  const host = _('siteFooter');
  if(!host) return;

  const hoursHtml = SITE.hours.map(h=>
    `<div class="cb-row"><span>${h.day}</span><span>${h.time}</span></div>`).join('');

  const sns = [
    {url:SITE.instagramUrl, label:'인스타'},
    {url:SITE.blogUrl, label:'블로그'},
    {url:SITE.youtubeUrl, label:'유튜브'},
  ].filter(s=>s.url);
  const snsHtml = sns.map(s=>
    `<a class="sns-btn" href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('');

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
  if(!hero || !SITE.heroImages || !SITE.heroImages.length) return;
  const item = SITE.heroImages[Math.floor(Math.random()*SITE.heroImages.length)];
  const src = item.src || item;                 // 문자열/객체 둘 다 허용
  const pos = item.pos || 'center 45%';
  const wash = 'linear-gradient(rgba(43,29,23,.36),rgba(43,29,23,.5))';
  hero.style.backgroundImage = `${wash},url('${ROOT}images/${src}')`;
  hero.style.backgroundPosition = pos;
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
