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
  logo: 'sayoudam_logo.jpg',  // 로고 이미지 파일명. 넣으면 왼쪽 위에 로고 + 글자 함께 표시
  phone: '010-4684-0542',
  phone2: '',            // 두 번째 번호 있으면
  email: 'bluejello@nate.com',   // 이메일
  address: '강원특별자치도 원주시 입춘로 45 엔터비즈타워 B동 1321호',
  addressBr: '강원특별자치도 원주시 입춘로 45<br>엔터비즈타워 B동 1321호', // 줄바꿈 표시용
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
    { title: '상담 서비스', items: [
        { label: '개인상담', target: 'pages/program-personal.html' },
        { label: '커플·부부상담', target: 'pages/program-couple.html' },
        { label: '청소년·부모상담', target: 'pages/program-youth.html' },
        { label: '가족상담', target: 'pages/program-family.html' },
        { label: '사진치료', target: 'pages/program-phototherapy.html' },
    ]},
    { title: '교육·집단 프로그램', items: [
        { label: '부모교육', target: 'pages/program-parent-edu.html' },
        { label: '사진 집단상담', target: 'pages/program-photo-group.html' },
        { label: 'SP 교육·집단상담', target: 'pages/program-sp.html' },
    ]},
    { title: '심리검사', items: [
        { label: '심리검사 안내', target: 'pages/program-test.html' },
    ]},
    { title: '센터소식', items: [
        { label: '공지사항', target: 'pages/notice.html' },
        { label: '자주묻는질문', target: 'pages/faq.html' },
        { label: '블로그', target: 'blog' },
    ]},
    { title: '사진갤러리', items: [
        { label: '사진 구매', target: 'pages/gallery.html' },
    ]},
  ],

  /* ---------- 상단 메인 슬라이드 (센터 이미지 3~4장) ----------
     - image: images 폴더의 사진 파일명
     - title / sub: 사진 위에 얹을 문구 (비우면 안 나옴)
     - align: 문구 위치 'center'(가운데) / 'left'(왼쪽) / 'bottom'(아래) */
  slides: [
    { image: 'main_slide1.jpg', title: '마음을 들여다보는 시간', sub: '원주 심리상담 · 사유담', align: 'center' },
    { image: 'main_slide2.jpg', title: '당신의 속도에 맞춰', sub: '편안하고 안전한 상담 공간', align: 'center' },
    { image: 'main_slide3.jpg', title: '혼자 견디지 않아도 괜찮습니다', sub: '사유담이 곁에서 함께하겠습니다', align: 'center' },
  ],
  slideAutoSec: 5,       // 자동으로 넘어가는 간격(초). 0 이면 자동넘김 끔

  /* ---------- 가운데 3개 버튼 ---------- */
  // link 종류: 'counselor'(상담진 소개로 이동), 'tour'(둘러보기 팝업), 폼주소(예약)
  quickButtons: [
    { label: '상담진 소개', desc: '전문가를 소개합니다', action: 'counselor' },
    { label: '상담소 둘러보기', desc: '공간을 미리 만나보세요', action: 'tour' },
    { label: '예약하기', desc: '상담 신청서 작성', action: 'apply' },
  ],

  /* ---------- 상담진 소개 ----------
     - highlights / education / licenses : 항상 보이는 핵심 이력
     - more : '전체 이력 더보기' 토글을 열면 나오는 상세 (그룹별) */
  counselor: {
    name: '신현자',
    title: '대표 상담사',   // 직함 (비워두면 표시 안 됨)
    photo: '',           // 상담사 사진 파일명 (images 폴더에 넣고 파일명 입력)
    philosophy: '누구에게나 마음을 돌볼 시간이 필요합니다. 충분히 이해받는 안전한 자리에서, 스스로 회복의 힘을 찾아가시도록 곁에서 함께 걷겠습니다.',

    // 항상 보이는 대표 이력
    highlights: [
      '(현) 사유담심리상담연구소 대표',
      '(현) 상지대학교 외래교수',
    ],
    // 학력 (항상 보임)
    education: [
      '교육학박사 (상담심리 전공), 상지대학교',
      '문학석사 (상담심리 전공), 상지대학교',
      '예술학사 (순수사진 전공), Academy of Art University, San Francisco, CA, USA',
    ],
    // 대표 자격 (항상 보임)
    licenses: [
      '청소년상담사 1급 (여성가족부, 국가자격)',
      '군상담심리사 1급 (대한군상담학회)',
      '상담심리사 2급 (한국상담심리학회 제2818호)',
    ],
    // 더보기(토글) 안에 접어두는 상세 이력
    more: [
      { group: '활동', items: [
          '(현) 상지대학교 교육과정 개발 위원',
          '사진과 심리의 통합적 접근으로 상담 진행 (사진치료)',
          '사진으로 개인 및 집단상담 진행',
      ]},
      { group: '학술 활동', items: [
          '한국심리학회 정회원',
          '한국상담심리학회 정회원',
          '한국상담학회 정회원',
          '한국예술치료학회 정회원',
          '한국영재교육학회 정회원',
      ]},
      { group: '그 외 자격', items: [
          '회복적정의 전문가 (회복적정의협회)',
          '감정코칭전문가 1급 수료 (HD행복연구소)',
      ]},
      { group: '주요 경력', items: [
          '상지대학교 학생심리상담센터 (2012)',
          '원주시청소년상담복지센터 (2014)',
          '송호대학교 학생심리상담센터 (2020)',
          '원주시육아종합지원센터 (2021)',
          '원주시가족센터 (2022)',
          '사유담심리상담연구소 설립 (2024)',
      ]},
    ],
  },

  /* ---------- 상담소 둘러보기 (내부 사진들) ----------
     사진 추가: 줄 하나 복사 → 파일명만 바꾸기 */
  tourPhotos: [
    'around1.jpg',
    'around2.jpg',
    'around3.jpg',
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
  hoursNote: '모든 상담은 예약제로 운영됩니다.',   // 운영시간 위에 안내되는 문구
  hours: [
    { day: '평일·주말', time: '10:00 - 20:00' },
    { day: '공휴일', time: '휴무' },
  ],

  /* ---------- 사진갤러리 (판매·전시 사진) ----------
     - buyForm: '구매 문의' 버튼을 누르면 열리는 네이버 문의 폼 주소
     - sets   : 사진 묶음(세트) 목록. 세트를 더 만들려면 { } 블록을 복사하세요.
        · name    : 세트 이름 (예: 'Q-세트')
        · badge   : 이름 옆 작은 표시 (예: '세트 전용')
        · saleNote: 판매 방식 안내 문구
        · folder  : 사진이 든 폴더
        · ext     : 확장자 (jpg)
        · count   : 사진 장수. photo01.jpg ~ photoNN.jpg 순서로 자동 표시.
                    (사진을 더 넣으면 이 숫자만 늘리면 됩니다) */
  gallery: {
    buyForm: 'https://naver.me/FKGN3DYG',
    sets: [
      {
        name: 'Q-set',
        badge: '세트 전용',
        tagPrefix: 'Q',   // 사진 왼쪽 위 번호 표시: Q-1, Q-2 ...
        saleNote: '낱장이 아닌 33장 묶음(세트)으로만 판매됩니다.',
        folder: 'images/gallery',
        ext: 'jpg',
        count: 33,
      },
      {
        name: '낱장 작품',
        badge: '개별 구매',
        tagPrefix: '낱장',   // 낱장-1, 낱장-2 ...
        saleNote: '마음에 드는 사진을 한 장 단위로 개별 구매하실 수 있습니다.',
        folder: 'images/gallery-single',   // 낱장 사진 폴더 (photo01.jpg ~ 순서)
        ext: 'jpg',
        count: 100,   // 실제 넣은 장수에 맞게 숫자만 바꾸세요
      },
    ],
  },
};
