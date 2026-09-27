/* ============================================================
   메인 페이지(index.html) 전용 스크립트
   ─ 헤더/푸터는 common.js 가 담당합니다.
   ─ 이 파일은 슬라이드/퀵버튼/상담진/협력기관띠/둘러보기/지도 담당.
   ============================================================ */
const $ = (id) => document.getElementById(id);

/* ---------- 메인 슬라이드 ---------- */
(function(){
  const wrap = $('slides');
  if(!wrap) return;
  wrap.innerHTML = SITE.slides.map((s,i)=>`
    <div class="slide ${i===0?'active':''}" data-i="${i}">
      ${s.image
        ? `<img class="slide-bg" src="images/${s.image}" alt=""
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
           <div class="slide-noimg" style="display:none">센터 이미지 (준비 중)</div>`
        : `<div class="slide-noimg" style="display:flex">센터 이미지 ${i+1} (준비 중)</div>`}
      <div class="slide-overlay"></div>
      <div class="slide-text ${s.align||'center'}">
        ${s.title?`<h2>${s.title}</h2>`:''}
        ${s.sub?`<p>${s.sub}</p>`:''}
      </div>
    </div>`).join('');

  const slides = [...wrap.querySelectorAll('.slide')];
  const dotsWrap = $('slideDots');
  dotsWrap.innerHTML = slides.map((_,i)=>`<button data-i="${i}" class="${i===0?'on':''}"></button>`).join('');
  const dots = [...dotsWrap.querySelectorAll('button')];
  let cur = 0, timer;
  function go(n){
    cur = (n + slides.length) % slides.length;
    slides.forEach((s,i)=>s.classList.toggle('active', i===cur));
    dots.forEach((d,i)=>d.classList.toggle('on', i===cur));
  }
  function next(){ go(cur+1); }
  function reset(){ if(SITE.slideAutoSec>0){ clearInterval(timer); timer=setInterval(next, SITE.slideAutoSec*1000);} }
  $('slideNext').onclick = ()=>{ next(); reset(); };
  $('slidePrev').onclick = ()=>{ go(cur-1); reset(); };
  dots.forEach(d=> d.onclick = ()=>{ go(+d.dataset.i); reset(); });
  if(slides.length>1) reset();
  else { $('slideNext').style.display='none'; $('slidePrev').style.display='none'; dotsWrap.style.display='none'; }
})();

/* ---------- 3개 퀵버튼 ---------- */
(function(){
  $('quickGrid').innerHTML = SITE.quickButtons.map((b,i)=>`
    <div class="quick-card" data-action="${b.action}" data-i="${i}">
      <h3>${b.label}</h3>
      <p>${b.desc||''}</p>
      <div class="arrow">→</div>
    </div>`).join('');
  $('quickGrid').querySelectorAll('.quick-card').forEach(card=>{
    card.onclick = ()=>{
      const a = card.dataset.action;
      if(a==='counselor') location.href='pages/counselor.html';
      else if(a==='tour') openTour();
      else if(a==='apply') window.open(SITE.applyForm,'_blank');
      else if(a && a.startsWith('http')) window.open(a,'_blank');
    };
  });
})();

/* ---------- 상담진 소개 ---------- */
function setText(id, txt){ const el=$(id); if(el) el.textContent = txt; }
setText('cName', SITE.counselor.name);
setText('cRole', SITE.counselor.title);
setText('cPhil', SITE.counselor.philosophy);
$('cCareer').innerHTML = buildCareerHTML(SITE.counselor);
if(SITE.counselor.photo){
  $('portrait').innerHTML = `<img src="images/${SITE.counselor.photo}" alt="${SITE.counselor.name}">`;
}

/* ---------- 함께하는 기관 흐르는 띠 (끊김 없는 무한 루프) ----------
   같은 묶음(pset)을 화면 폭보다 넉넉히 복제해 두고, CSS 애니메이션으로
   묶음 하나 길이만큼 흘려보낸 뒤 처음으로 돌아가 이음새가 보이지 않게 합니다.
   (마우스를 올리거나 키보드로 선택하면 멈춥니다) */
(function(){
  const track = $('partnersTrack');
  const list = SITE.partners || [];
  if(!track || !list.length){ const band = $('partners'); if(band) band.style.display = 'none'; return; }

  const one = list.map(p=>{
    const inner = (p.logo ? `<img src="images/${p.logo}" alt="${p.label}">` : p.label)
      + (p.sub ? `<span class="partner-sub">${p.sub}</span>` : '');
    return p.url
      ? `<a class="partner-item" href="${p.url}" target="_blank" rel="noopener" title="${p.label} (새 창)">${inner}</a>`
      : `<span class="partner-item" title="${p.label}">${inner}</span>`;
  }).join('');
  track.innerHTML = `<div class="pset">${one}</div>`;
  const first = track.firstElementChild;
  const viewport = track.parentElement;
  const speed = 38;   // 초당 흐르는 거리(px). 숫자가 클수록 빨라집니다

  function build(){
    // 복제본 정리 후 다시 계산 (화면 크기가 바뀌면 로고 크기도 바뀌므로)
    while(track.children.length > 1) track.lastElementChild.remove();
    track.classList.remove('running');
    const setW = first.offsetWidth;
    if(!setW) return;
    const copies = Math.ceil(viewport.offsetWidth / setW) + 1;   // 화면 폭 + 한 묶음 이상
    for(let i = 0; i < copies; i++){
      const c = first.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');                      // 복제본은 화면낭독기·Tab 이동에서 제외
      c.querySelectorAll('a').forEach(a=> a.tabIndex = -1);
      track.appendChild(c);
    }
    track.style.setProperty('--pn', copies + 1);
    track.style.setProperty('--pdur', (setW / speed) + 's');
    track.classList.add('running');
  }

  // 로고 이미지가 다 불러와진 뒤에 폭을 재야 정확합니다
  // (로고 파일을 못 찾으면 물음표 그림 대신 기관 이름 글자로 바꿔 보여줍니다)
  function fallback(img){ if(img.isConnected) img.replaceWith(document.createTextNode(img.alt)); }
  const imgs = [...first.querySelectorAll('img')];
  Promise.all(imgs.map(img=> new Promise(r=>{
    if(img.complete){ if(!img.naturalWidth) fallback(img); return r(); }
    img.onload = r;
    img.onerror = ()=>{ fallback(img); r(); };
  }))).then(build);
  // 폭이 바뀔 때만 다시 계산 (모바일은 스크롤 중 주소창이 숨으며 높이만 바뀌는데, 그때 띠가 처음으로 튀지 않도록)
  let rt, lastW = innerWidth;
  addEventListener('resize', ()=>{
    if(innerWidth === lastW) return;
    lastW = innerWidth; clearTimeout(rt); rt = setTimeout(build, 250);
  }, {passive:true});
})();

/* ---------- 상담소 둘러보기 모달 ---------- */
let tourIdx = 0;
function openTour(){
  if(!SITE.tourPhotos.length) return;
  tourIdx = 0; showTour();
  $('tourModal').classList.add('on');
}
function showTour(){
  $('tourImg').src = 'images/' + SITE.tourPhotos[tourIdx];
  $('tourCount').textContent = `${tourIdx+1} / ${SITE.tourPhotos.length}`;
}
$('tourClose').onclick = ()=> $('tourModal').classList.remove('on');
$('tourPrev').onclick = ()=>{ tourIdx=(tourIdx-1+SITE.tourPhotos.length)%SITE.tourPhotos.length; showTour(); };
$('tourNext').onclick = ()=>{ tourIdx=(tourIdx+1)%SITE.tourPhotos.length; showTour(); };
$('tourModal').onclick = (e)=>{ if(e.target===$('tourModal')) $('tourModal').classList.remove('on'); };
// 다른 페이지에서 '둘러보기' 누르면 index.html#tour 로 오는데, 그때 자동으로 팝업 열기
if(location.hash === '#tour'){ setTimeout(openTour, 300); }

/* ---------- 오시는 길 카카오 지도 ---------- */
setText('addrLead', SITE.address);
(function(){
  const wrap = $('mapWrap');
  if(!wrap) return;
  wrap.style.height = '400px';
  wrap.innerHTML = '<div class="map-noimg">지도를 불러오는 중입니다…</div>';
  function initKakao(){
    if(!window.kakao || !kakao.maps) return false;
    kakao.maps.load(function(){
      wrap.innerHTML = '';
      let center = new kakao.maps.LatLng(37.3422,127.9202);
      const map = new kakao.maps.Map(wrap, { center: center, level: 3 });
      map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch('강원특별자치도 원주시 입춘로 45', function(r,s){
        if(s === kakao.maps.services.Status.OK){
          center = new kakao.maps.LatLng(r[0].y, r[0].x);
          map.setCenter(center);
          const m = new kakao.maps.Marker({ map: map, position: center });
          new kakao.maps.InfoWindow({ content: '<div style="padding:6px 10px;font-size:13px;white-space:nowrap">사유담심리상담센터</div>' }).open(map, m);
        }
      });
      let rt; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ map.relayout(); map.setCenter(center); }, 200); });
    });
    return true;
  }
  if(!initKakao()){
    let tries = 0;
    const t = setInterval(function(){ tries++; if(initKakao() || tries > 50) clearInterval(t); }, 100);
  }
})();
