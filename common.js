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

  const brandInner = SITE.logo
    ? `<img src="${ROOT}images/${SITE.logo}" alt="${SITE.centerName}">`
    : `<span class="txt">${SITE.centerName}<small>${SITE.centerNameEn}</small></span>`;

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
  // 모바일 메뉴 클릭 시 닫기
  host.querySelectorAll('.nav-drop a').forEach(a=>{
    a.addEventListener('click', ()=> _('mainnav')?.classList.remove('open'));
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
          ${SITE.email?`<div style="color:#cbc6ba;margin-top:8px;font-size:.92rem">${SITE.email}</div>`:''}
        </div>
        <div class="cb-block">
          <h4>운 영 시 간</h4>
          ${hoursHtml}
        </div>
        <div class="cb-block">
          <h4>주 소</h4>
          <div style="color:#cbc6ba;font-size:.95rem;line-height:1.9">${SITE.address}</div>
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
        <p>주소: ${SITE.address}</p>
        <p>T. ${SITE.phone}${SITE.email?' | E. '+SITE.email:''}</p>
        ${SITE.businessNumber?`<p>사업자등록번호: ${SITE.businessNumber}</p>`:''}
      </div>
    </footer>`;
}

renderHeader();
renderFooter();
