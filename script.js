/**
 * ተክለ-ቴዎፍሎስ ሰንበት ትምህርት ቤት ይፋዊ ድረ-ገጽ
 * Client JavaScript Application - Pure, Lightweight Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  renderEthiopianCalendar();
  initYouTubeCarousel();
  initFooterYear();
});

/**
 * Official YouTube Videos from Theophilosians Media (@tekletewoflos)
 */
const YOUTUBE_VIDEOS = [
  {
    id: 'U1ajkYrGaaY',
    title: 'ራስህን | አጭር መንፈሳዊ ፊልም | በተክለ ቴዎፍሎስ ሰንበት ት/ቤት',
    duration: 'አጭር ፊልም'
  },
  {
    id: 'NFnLlOFq7ew',
    title: 'ዐርክ | መንፈሳዊ ፊልም | በተክለ ቴዎፍሎስ ሰንበት ትምህርት ቤት',
    duration: 'መንፈሳዊ ፊልም'
  },
  {
    id: 'p8lUby_3eCY',
    title: 'የኢያሪኮ መንገድ (The Street of Jericho) | መንፈሳዊ ፊልም',
    duration: 'መንፈሳዊ ፊልም'
  },
  {
    id: 'm34g3O5ebIg',
    title: 'ጊዜ ዕረፍታ | በአያት ጣፎ መካነ ብሥራት ቅዱስ ገብርኤል ሊቃውንት ወረብ',
    duration: 'ያሬዳዊ ወረብ'
  },
  {
    id: 'NqzpxcEZ_OM',
    title: 'ኦ ማርያም | የግንቦት ልደታ ወረብ እና ቸብቸቦ | ዲ/ን አቤንኤዘር ኃይለ ልዑል',
    duration: 'ወረብ'
  },
  {
    id: '5aV1bXOmIVs',
    title: 'እግዚኡ ረሰዮ | የኅዳር 12 መዝሙር | በተክለ ቴዎፍሎስ ሰንበት ትምህርት ቤት',
    duration: 'መዝሙር'
  },
  {
    id: 'td4WOdHxPE0',
    title: 'መሠረተ ዜማ | የግንቦት 11 መዝሙር | በተክለ ቴዎፍሎስ ሰንበት ት/ቤት',
    duration: 'መዝሙር'
  },
  {
    id: '1YWetbYV1j8',
    title: 'ቀዳማዊ ቴዎፍሎስ ፓትርያርክ ዘኢትዮጵያ ዐረፉ | ልዩ ዝግጅት',
    duration: 'ልዩ ዝግጅት'
  }
];

/**
 * Advanced Side-Scrolling and Auto-Rotating YouTube Carousel
 */
function initYouTubeCarousel() {
  const track = document.getElementById('yt-carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('yt-prev-btn');
  const nextBtn = document.getElementById('yt-next-btn');

  if (!track) return;

  // Render video cards
  track.innerHTML = YOUTUBE_VIDEOS.map((v) => `
    <a href="https://youtu.be/${v.id}" target="_blank" rel="noopener noreferrer" class="yt-video-card" aria-label="${v.title}">
      <div class="yt-thumb-wrap">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" class="yt-thumb-img" loading="lazy">
        <div class="yt-play-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
        <span class="yt-duration-badge">${v.duration}</span>
      </div>
      <div class="yt-card-info">
        <h4 class="yt-card-title">${v.title}</h4>
        <span class="yt-card-sub">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42c-.87.23-1.54.9-1.76 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.87.9 1.54 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42c.87-.23 1.54-.9 1.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
          ይመልከቱ
        </span>
      </div>
    </a>
  `).join('');

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = YOUTUBE_VIDEOS.map((_, i) => `
      <span class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
    `).join('');
  }

  const cardWidth = () => {
    const card = track.querySelector('.yt-video-card');
    return card ? card.offsetWidth + 15 : 235;
  };

  const updateActiveDot = () => {
    if (!dotsContainer) return;
    const scrollLeft = track.scrollLeft;
    const step = cardWidth();
    const activeIndex = Math.min(Math.round(scrollLeft / step), YOUTUBE_VIDEOS.length - 1);
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  };

  track.addEventListener('scroll', updateActiveDot, { passive: true });

  // Navigation Buttons
  prevBtn?.addEventListener('click', () => {
    stopAutoRotate();
    track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    setTimeout(startAutoRotate, 5000);
  });

  nextBtn?.addEventListener('click', () => {
    stopAutoRotate();
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    }
    setTimeout(startAutoRotate, 5000);
  });

  // Dots click navigation
  dotsContainer?.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-dot')) {
      stopAutoRotate();
      const idx = parseInt(e.target.dataset.index, 10);
      track.scrollTo({ left: idx * cardWidth(), behavior: 'smooth' });
      setTimeout(startAutoRotate, 5000);
    }
  });

  // Auto-Rotating Side Animation every 3.5 seconds
  let autoRotateTimer = null;
  function startAutoRotate() {
    stopAutoRotate();
    autoRotateTimer = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 15) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
      }
    }, 3500);
  }

  function stopAutoRotate() {
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  // Pause on hover or touch
  track.addEventListener('mouseenter', stopAutoRotate);
  track.addEventListener('mouseleave', startAutoRotate);
  track.addEventListener('touchstart', stopAutoRotate, { passive: true });
  track.addEventListener('touchend', () => setTimeout(startAutoRotate, 2500));

  startAutoRotate();
}

/**
 * Accurately calculates Ethiopian Date from current Gregorian Date.
 * No external heavy libraries required.
 */
function renderEthiopianCalendar() {
  const ethDateEl = document.getElementById('ethiopian-date');
  const gregDateEl = document.getElementById('gregorian-date');
  const dayNameEl = document.getElementById('day-name');
  const wengelawiEl = document.getElementById('wengelawi-name');

  if (!ethDateEl) return;

  const now = new Date();
  
  // Ethiopian Day of Week
  const daysOfWeek = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'];
  const dayOfWeekAmharic = daysOfWeek[now.getDay()];

  // Ethiopian Month Names
  const ethMonths = [
    'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ',
    'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ',
    'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን'
  ];

  // Evangelists (ወንጌላውያን)
  const evangelists = ['ዮሐንስ', 'ማቴዎስ', 'ማርቆስ', 'ሉቃስ'];

  const { year, month, date } = getEthiopianDate(now);
  const wengelawi = evangelists[year % 4];

  if (dayNameEl) dayNameEl.textContent = dayOfWeekAmharic;
  if (ethDateEl) ethDateEl.textContent = `${ethMonths[month - 1]} ${date} ቀን ${year} ዓ.ም`;
  if (wengelawiEl) wengelawiEl.textContent = `ዘመነ ${wengelawi}`;

  if (gregDateEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    gregDateEl.textContent = `(Gregorian: ${now.toLocaleDateString('en-US', options)})`;
  }
}

/**
 * Gregorian to Ethiopian Date Algorithm
 */
function getEthiopianDate(date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth(); // 0-indexed (0 = Jan, 8 = Sep)
  const gDate = date.getDate();

  // Reference Gregorian start of Ethiopian Year (Meskerem 1 = Sep 11 or Sep 12)
  const isLeapPreceding = (gYear % 4 === 3 && gMonth < 8) || (gYear % 4 === 0 && (gMonth > 8 || (gMonth === 8 && gDate >= 12)));
  const meskerem1GregDay = isLeapPreceding ? 12 : 11;

  let ethYear = gYear - 8;
  const newYearDate = new Date(gYear, 8, meskerem1GregDay);

  let diffDays = Math.floor((date - newYearDate) / (1000 * 60 * 60 * 24));

  if (diffDays >= 0) {
    ethYear = gYear - 7;
    const ethMonth = Math.floor(diffDays / 30) + 1;
    const ethDay = (diffDays % 30) + 1;
    return { year: ethYear, month: Math.min(ethMonth, 13), date: ethDay };
  } else {
    const prevNewYear = new Date(gYear - 1, 8, (gYear - 1) % 4 === 3 ? 12 : 11);
    diffDays = Math.floor((date - prevNewYear) / (1000 * 60 * 60 * 24));
    ethYear = gYear - 8;
    const ethMonth = Math.floor(diffDays / 30) + 1;
    const ethDay = (diffDays % 30) + 1;
    return { year: ethYear, month: Math.min(ethMonth, 13), date: ethDay };
  }
}

/**
 * Update Copyright Year in footer
 */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
