/* =============================================
   KNOX — script.js
   ============================================= */

// ── 1. HEADER: đổ bóng khi cuộn ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ── 2. BURGER MENU (mobile) ──
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('mobile-open');
    document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

// ── 3. SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: hiển thị tất cả nếu không hỗ trợ IntersectionObserver
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── 4. PAYMENT TABS ──
const payTabs = document.querySelectorAll('.pay-tab');
const payContents = document.querySelectorAll('.pay__content');

payTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    payTabs.forEach(t => t.classList.remove('active'));
    payContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const targetEl = document.getElementById('tab-' + target);
    if (targetEl) targetEl.classList.add('active');
  });
});

// ── 5. COPY TO CLIPBOARD ──
function copyText(elId, btnId) {
  const text = document.getElementById(elId)?.textContent?.trim();
  const btn  = document.getElementById(btnId);
  if (!text || !btn) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showCopied(btn)).catch(() => fallbackCopy(text, btn));
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showCopied(btn); } catch(e) {}
  document.body.removeChild(ta);
}

function showCopied(btn) {
  const orig = btn.textContent;
  btn.textContent = '✓ Copied!';
  btn.style.background = 'var(--green)';
  btn.style.color = '#fff';
  btn.style.borderColor = 'var(--green)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 1800);
}

// ── 6. SMOOTH SCROLL cho các link neo ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
