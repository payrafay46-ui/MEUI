/* ===================== HOME PAGE SWIPE ===================== */
const pagesContainer = $('app-pages-container');
const pageDots       = $$('.page-dot');
let   currentPage    = 0;
const TOTAL_PAGES    = 2;
let   pageSwipeStartX = 0;
let   pageSwipeStartY = 0;
let   pageSwiping     = false;

function goToPage(n) {
  currentPage = Math.max(0, Math.min(TOTAL_PAGES - 1, n));
  pagesContainer.style.transform = `translateX(-${currentPage * 50}%)`;
  pageDots.forEach((d, i) => d.classList.toggle('active', i === currentPage));
}

const gridScroll = $('app-grid-scroll');

gridScroll.addEventListener('touchstart', e => {
  if (isAnimating || currentApp) return;
  pageSwipeStartX = e.touches[0].clientX;
  pageSwipeStartY = e.touches[0].clientY;
  pageSwiping     = false;
}, { passive: true });

gridScroll.addEventListener('touchmove', e => {
  if (!pageSwipeStartX) return;
  const dx = e.touches[0].clientX - pageSwipeStartX;
  const dy = e.touches[0].clientY - pageSwipeStartY;
  if (!pageSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
    pageSwiping = true;
  }
}, { passive: true });

gridScroll.addEventListener('touchend', e => {
  if (!pageSwiping) return;
  const dx = e.changedTouches[0].clientX - pageSwipeStartX;
  if (dx < -40) goToPage(currentPage + 1);
  if (dx >  40) goToPage(currentPage - 1);
  pageSwiping     = false;
  pageSwipeStartX = 0;
});

pageDots.forEach(dot => {
  dot.addEventListener('click', () => goToPage(+dot.dataset.page));
});

/* ===================== NAVBAR GESTURE ===================== */
const navbarEl = $('gesture-bottom');
let navTouchStartX = 0, navTouchStartY = 0;

navbarEl.addEventListener('touchstart', e => {
  navTouchStartX = e.touches[0].clientX;
  navTouchStartY = e.touches[0].clientY;
}, { passive: true });

navbarEl.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - navTouchStartX;
  const dy = navTouchStartY - e.changedTouches[0].clientY;
  if (dy > 30 && Math.abs(dx) < 60) {
    if (currentApp)    { closeApp(); return; }
    if (STATE.ccOpen)  { closeCC();  return; }
  }
}, { passive: true });

/* Desktop: klik navbar pill */
navbarEl.addEventListener('click', () => {
  if (currentApp)   { closeApp(); return; }
  if (STATE.ccOpen) { closeCC();  return; }
});

/* Edge swipe = Back gesture */
const phoneEl = $('phone-shell');
let edgeTouchX = 0, edgeTouchY = 0;

phoneEl.addEventListener('touchstart', e => {
  edgeTouchX = e.touches[0].clientX;
  edgeTouchY = e.touches[0].clientY;
}, { passive: true });

phoneEl.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - edgeTouchX;
  const dy = Math.abs(e.changedTouches[0].clientY - edgeTouchY);
  if (edgeTouchX < 24 && dx > 50 && dy < 80) {
    if (STATE.settingsOpen) {
      const openSub = document.querySelector('.settings-sub.open');
      if (openSub) { openSub.classList.remove('open'); return; }
      closeApp(); return;
    }
    if (currentApp) { closeApp(); return; }
  }
}, { passive: true });

/* ===================== KEYBOARD (desktop) ===================== */
document.addEventListener('keydown', e => {
  if (STATE.screen === 'pin') {
    if (e.key >= '0' && e.key <= '9' && STATE.pinInput.length < 4) {
      STATE.pinInput += e.key;
      updatePinDots();
      if (STATE.pinInput.length === 4) setTimeout(checkPIN, 120);
    }
    if (e.key === 'Backspace') {
      STATE.pinInput = STATE.pinInput.slice(0, -1);
      updatePinDots();
    }
  }
  if (STATE.screen === 'home' && !STATE.settingsOpen && !STATE.ccOpen && !currentApp) {
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    if (e.key === 'ArrowLeft')  goToPage(currentPage - 1);
  }
  if (e.key === 'Escape') {
    if (currentApp)           closeApp();
    else if (STATE.ccOpen)    closeCC();
    else if (STATE.settingsOpen) closeSettings();
  }
});
