document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* ---------- Hero image slider ---------- */
  const slides = document.querySelectorAll('#heroSlider .slide');
  const dotsContainer = document.getElementById('sliderDots');
  let current = 0;
  let sliderTimer;
  let dots = [];

  if (dotsContainer && slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); });
      dotsContainer.appendChild(dot);
    });
    dots = Array.from(dotsContainer.children);
  }

  function goToSlide(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }
  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }
  function startAutoplay() { stopAutoplay(); sliderTimer = setInterval(nextSlide, 4500); }
  function stopAutoplay() { clearInterval(sliderTimer); }

  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
  if (slides.length) startAutoplay();

  /* ---------- Stat counters ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Accessibility: font size controls ---------- */
  const FONT_STEPS = [15, 16, 17, 18, 19, 20];
  const BASE_INDEX = 1; // 16px = default
  let fontIndex = BASE_INDEX;

  function applyFontSize() {
    document.documentElement.style.fontSize = FONT_STEPS[fontIndex] + 'px';
  }

  document.getElementById('fontInc').addEventListener('click', () => {
    fontIndex = Math.min(fontIndex + 1, FONT_STEPS.length - 1);
    applyFontSize();
  });
  document.getElementById('fontDec').addEventListener('click', () => {
    fontIndex = Math.max(fontIndex - 1, 0);
    applyFontSize();
  });
  document.getElementById('fontReset').addEventListener('click', () => {
    fontIndex = BASE_INDEX;
    applyFontSize();
  });

  /* ---------- Accessibility: high contrast toggle ---------- */
  const contrastBtn = document.getElementById('contrastToggle');
  contrastBtn.addEventListener('click', () => {
    const isOn = document.body.classList.toggle('high-contrast');
    contrastBtn.setAttribute('aria-pressed', isOn);
  });

  /* ---------- Language toggle (placeholder — no Tamil content yet) ---------- */
  document.getElementById('langToggle').addEventListener('click', () => {
    alert('Tamil translation is not available yet. This control is a placeholder for when localized content is added.');
  });

});
