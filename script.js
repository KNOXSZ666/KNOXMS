/* =============================================
   PORTFOLIO — script.js
   ============================================= */

// ── 1. HEADER: đổ bóng khi cuộn ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 2px 30px rgba(0,212,255,.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ── 2. BURGER MENU (mobile) ──
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('mobile-open');
  // Khóa cuộn khi menu mở
  document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
});

// Đóng menu khi bấm vào link
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('mobile-open');
    document.body.style.overflow = '';
  });
});

// ── 3. SCROLL REVEAL (hiện phần tử khi cuộn) ──
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay nhỏ theo thứ tự để tạo hiệu ứng dàn trải
      entry.target.style.transitionDelay = (i % 4) * 0.12 + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── 4. SKILL BAR ANIMATION ──
const skillFills = document.querySelectorAll('.skill__fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.dataset.level; // lấy % từ data-level
      entry.target.style.width = level + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(bar => skillObserver.observe(bar));

// ── 5. TYPEWRITER (hiệu ứng đánh chữ) ──
const roles = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
];

const typeEl  = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Đang gõ thêm chữ
    typeEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Dừng 1.5s rồi xóa
      setTimeout(() => { isDeleting = true; type(); }, 1500);
      return;
    }
  } else {
    // Đang xóa chữ
    typeEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  // Tốc độ gõ / xóa
  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

// Bắt đầu sau 1 giây
setTimeout(type, 1000);