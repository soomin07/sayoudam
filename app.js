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
      if(a==='counselor') location.hash='#counselor';
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

/* ---------- 협력기관 흐르는 띠 (끊김 없는 무한 루프) ---------- */
(function(){
  const track = $('partnersTrack');
  if(!track || !SITE.partners.length) return;
  const one = SITE.partners.map(p=>{
    const inner = p.logo ? `<img src="images/${p.logo}" alt="${p.label}">` : p.label;
    return p.url
      ? `<a class="partner-item link" href="${p.url}" target="_blank" rel="noopener">${inner}</a>`
      : `<span class="partner-item">${inner}</span>`;
  }).join('');

  // 한 세트를 만들고, 화면 폭을 채우고도 남을 만큼 복제한다
  track.innerHTML = `<div class="pset">${one}</div>`;
  const container = track.parentElement;
  const first = track.querySelector('.pset');
  const setWidth = first.offsetWidth;
  if(setWidth === 0) return;
  // 화면 폭 + 한 세트만큼 여유가 생기도록 복제
  while(track.scrollWidth < container.offsetWidth + setWidth){
    track.appendChild(first.cloneNode(true));
  }
  track.appendChild(first.cloneNode(true)); // 안전 여유분 한 세트 더

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;

  const speed = 40;           // 초당 이동 픽셀
  let x = 0, last = null, paused = false;
  track.addEventListener('mouseenter', ()=> paused = true);
  track.addEventListener('mouseleave', ()=> paused = false);
  function tick(ts){
    if(last == null) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    if(!paused){
      x -= speed * dt;
      if(x <= -setWidth) x += setWidth;   // 한 세트 지나면 원위치 → 이음새 없음
      track.style.transform = `translateX(${x}px)`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
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
      const map = new kakao.maps.Map(wrap, { center: new kakao.maps.LatLng(37.3422,127.9202), level: 3 });
      map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch('강원특별자치도 원주시 입춘로 45', function(r,s){
        if(s === kakao.maps.services.Status.OK){
          const c = new kakao.maps.LatLng(r[0].y, r[0].x);
          map.setCenter(c);
          const m = new kakao.maps.Marker({ map: map, position: c });
          new kakao.maps.InfoWindow({ content: '<div style="padding:6px 10px;font-size:13px;white-space:nowrap">사유담심리상담연구소</div>' }).open(map, m);
        }
      });
    });
    return true;
  }
  if(!initKakao()){
    let tries = 0;
    const t = setInterval(function(){ tries++; if(initKakao() || tries > 50) clearInterval(t); }, 100);
  }
})();
