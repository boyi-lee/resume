// ── Spotlight ──
document.addEventListener('mousemove', e => {
  document.getElementById('spotlight').style.setProperty('--x', e.clientX+'px');
  document.getElementById('spotlight').style.setProperty('--y', e.clientY+'px');
});

// ── Theme ──
// 讀取系統偏好作為預設值
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = localStorage.getItem('theme')
  ? localStorage.getItem('theme') === 'dark'
  : prefersDark;

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = isDark ? '☀' : '☾';
}

function toggleTheme(){
  isDark = !isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  applyTheme();
}

// 初始化主題
applyTheme();

// 監聽系統主題變更（當使用者未手動設定時跟隨）
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    isDark = e.matches;
    applyTheme();
  }
});

// ── Language ──
let isZH = true;
function toggleLang(){
  isZH = !isZH;
  const lang = isZH ? 'zh' : 'en';
  document.querySelectorAll('[data-zh]').forEach(el => {
    el.textContent = el.getAttribute('data-'+lang) || el.textContent;
  });
  document.getElementById('langBtn').textContent = isZH ? 'EN' : '中';
  document.documentElement.lang = isZH ? 'zh-TW' : 'en';
}

// ── Active nav on scroll ──
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

let raf = false;
window.addEventListener('scroll', () => {
  if (raf) return;
  raf = true;
  requestAnimationFrame(() => {
    let current = '';
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40;
    if (atBottom) {
      current = sections[sections.length - 1].id;
    } else {
      sections.forEach(s => {
        if (s.getBoundingClientRect().top <= 150) current = s.id;
      });
    }
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.section === current);
    });
    raf = false;
  });
});

// ── Experience dim on hover ──
const items = document.querySelectorAll('.tl-item');
items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    items.forEach(o => { if (o !== item) o.style.opacity = '.4'; });
  });
  item.addEventListener('mouseleave', () => {
    items.forEach(o => o.style.opacity = '1');
  });
});

// ── 下載履歷 → 列印成 PDF ──
document.querySelector('.cta').addEventListener('click', e => {
  e.preventDefault();
  window.print();
});
