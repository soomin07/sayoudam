/* ============================================================
   사유담심리상담연구소 — 홈페이지 내용 파일 (뼈대 버전)
   ============================================================
   ★ 이 파일만 고치면 홈페이지 내용이 바뀝니다. ★
   - 글자는 작은따옴표 ' ' 안에만
   - 줄 끝 쉼표( , ) 지우지 않기
   - 사진/로고는 images 폴더에 넣고 파일명만 적기
   ============================================================ */

const SITE = {

  /* ---------- 기본 정보 ---------- */
  centerName: '사유담심리상담연구소',
  centerNameEn: 'SAYOUDAM',
  logo: '',              // 로고 이미지 파일명 (예: 'logo.png'). 넣으면 글자 대신 로고 표시
  phone: '010-4684-0542',
  phone2: '',            // 두 번째 번호 있으면
  email: '',             // 이메일 있으면
  address: '강원특별자치도 원주시 입춘로 45 엔터비즈타워 B동 1321호',
  representative: '신현자', // 대표자명
  businessNumber: '',    // 사업자등록번호

  /* ---------- 링크 ---------- */
  applyForm: 'https://form.naver.com/response/C8w4QvU-AZjW6tp7cMgtcQ', // 예약(상담신청)
  blogUrl: 'https://blog.naver.com/sayoudam',
  instagramUrl: '',      // 인스타 주소
  youtubeUrl: '',        // 유튜브 주소

  /* ---------- 상단 카테고리 메뉴 ----------
     - title: 큰 메뉴 이름
     - items: 마우스 올리면 펼쳐지는 하위 항목들
       · label: 항목 이름
       · target: 클릭 시 이동할 곳
                 'pages/파일.html' = 그 페이지로 이동
                 'apply' = 상담신청 폼 / 'blog' = 블로그 / 'tour' = 둘러보기 팝업
     항목을 지우거나 추가하려면 { } 줄을 지우거나 복사하세요.
     새 항목을 추가하면, pages 폴더에 같은 이름의 html 파일도 만들어야 합니다.
     (부모님이 하실 일은 아니고, 필요할 때 요청하시면 됩니다) */
  nav: [
    { title: '기관 소개', items: [
        { label: '센터 소개', target: 'pages/about.html' },
    ]},
    { title: '이용안내', items: [
        { label: '운영시간', target: 'pages/hours.html' },
        { label: '예약안내', target: 'pages/reservation.html' },
        { label: '상담진행절차', target: 'pages/process.html' },
        { label: '비용안내', target: 'pages/fee.html' },
        { label: '둘러보기', target: 'tour' },
        { label: '오시는길', target: 'pages/location.html' },
    ]},
    { title: '전문가 소개', items: [
        { label: '인사말', target: 'pages/greeting.html' },
        { label: '상담사 소개', target: 'pages/counselor.html' },
    ]},
    { title: '프로그램', items: [
        { label: '개인상담', target: 'pages/program-personal.html' },
        { label: '사진치료', target: 'pages/program-phototherapy.html' },
        { label: '심리검사', target: 'pages/program-test.html' },
        { label: '집단상담', target: 'pages/program-group.html' },
    ]},
    { title: '심리검사 패키지', items: [
        { label: '검사 패키지 안내', target: 'pages/test-package.html' },
    ]},
    { title: '센터소식', items: [
        { label: '공지사항', target: 'pages/notice.html' },
        { label: '자주묻는질문', target: 'pages/faq.html' },
        { label: '블로그', target: 'blog' },
    ]},
    { title: '예약하기', items: [
        { label: '심리상담 신청', target: 'apply' },
    ]},
  ],

  /* ---------- 상단 메인 슬라이드 (센터 이미지 3~4장) ----------
     - image: images 폴더의 사진 파일명
     - title / sub: 사진 위에 얹을 문구 (비우면 안 나옴)
     - align: 문구 위치 'center'(가운데) / 'left'(왼쪽) / 'bottom'(아래) */
  slides: [
    { image: 'slide1.jpg', title: '사진 한 장에서 시작되는\n마음의 이야기', sub: '원주 사진치료 심리상담', align: 'center' },
    { image: 'slide2.jpg', title: '당신의 속도에 맞춰', sub: '편안하고 안전한 상담 공간', align: 'center' },
    { image: 'slide3.jpg', title: '', sub: '', align: 'center' },
  ],
  slideAutoSec: 5,       // 자동으로 넘어가는 간격(초). 0 이면 자동넘김 끔

  /* ---------- 가운데 3개 버튼 ---------- */
  // link 종류: 'counselor'(상담진 소개로 이동), 'tour'(둘러보기 팝업), 폼주소(예약)
  quickButtons: [
    { label: '상담진 소개', desc: '전문가를 소개합니다', action: 'counselor' },
    { label: '상담소 둘러보기', desc: '공간을 미리 만나보세요', action: 'tour' },
    { label: '예약하기', desc: '상담 신청서 작성', action: 'apply' },
  ],

  /* ---------- 상담진 소개 ---------- */
  counselor: {
    name: '신현자',
    title: '사유담심리상담연구소 대표 · 사진치료 전문강사',
    photo: '',           // 상담사 사진 파일명
    philosophy: '사진은 우리가 미처 말로 꺼내지 못한 마음을 대신 보여줍니다. 스스로의 이야기를 발견하고 따뜻하게 바라볼 수 있도록 곁에서 함께합니다.',
    career: [
      '(현) 사유담심리상담연구소 대표',
      '(현) 사진치료 전문강사',
      '※ 실제 학력·경력·자격증을 여기에 추가',
    ],
  },

  /* ---------- 상담소 둘러보기 (내부 사진들) ----------
     사진 추가: 줄 하나 복사 → 파일명만 바꾸기 */
  tourPhotos: [
    'room1.jpg',
    'room2.jpg',
    'room3.jpg',
  ],

  /* ---------- 오시는 길 ---------- */
  // 직접 만든 지도 이미지 파일명을 넣으세요
  mapImage: 'map.jpg',   // images 폴더에 지도 이미지 넣고 파일명 지정

  /* ---------- 협력/유관 기관 (흐르는 띠) ----------
     - label: 표시할 이름
     - url: 클릭 시 이동할 주소 (없으면 클릭 안 됨)
     - logo: 로고 이미지 파일명 (넣으면 글자 대신 로고. 없으면 글자로 표시) */
  partners: [
    { label: '정신건강 심리상담 바우처', url: 'https://www.bokjiro.go.kr', logo: '' },
    { label: '원주시청', url: 'https://www.wonju.go.kr', logo: '' },
    { label: '원주시청소년상담복지센터', url: '', logo: '' },
    { label: '원주시가족센터', url: '', logo: '' },
    { label: '원주시육아종합지원센터', url: '', logo: '' },
    { label: '원주교육지원청', url: '', logo: '' },
  ],

  /* ---------- 운영시간 ---------- */
  hours: [
    { day: '평일', time: '10:00 - 18:00' },
    { day: '토요일', time: '예약제 운영' },
    { day: '일요일·공휴일', time: '휴무' },
  ],
};
