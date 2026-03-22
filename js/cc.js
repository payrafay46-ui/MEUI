/* ===================== CONTROL CENTER ===================== */
const cc         = $('control-center');
const ccPanel    = $('cc-panel');
const ccBackdrop = $('cc-backdrop');

let ccState       = ''; // '' | 'mini' | 'full'
let ccSwipeStartY = 0;

/* Swipe down dari gesture-top → buka mini */
const gestureTop = $('gesture-top');
gestureTop.addEventListener('touchstart', e => {
  ccSwipeStartY = e.touches[0].clientY;
}, { passive: true });

gestureTop.addEventListener('touchend', e => {
  if (STATE.screen !== 'home' || STATE.settingsOpen) return;
  const dy = e.changedTouches[0].clientY - ccSwipeStartY;
  if (dy > 30) openCCMini();
}, { passive: true });

/* Click gesture-top (desktop) → buka mini */
gestureTop.addEventListener('click', () => {
  if (STATE.screen !== 'home' || STATE.settingsOpen) return;
  if (ccState === '') openCCMini();
});

/* ── DRAG PANEL untuk expand / collapse ──
   Drag ke bawah dari mini → full
   Drag ke atas  dari full → mini
   Drag ke atas  dari mini → tutup
*/
let ccDragStartY     = 0;
let ccDragStartState = '';
let ccIsDragging     = false;
const CC_DRAG_THRESHOLD = 48;

ccPanel.addEventListener('touchstart', e => {
  ccDragStartY     = e.touches[0].clientY;
  ccDragStartState = ccState;
  ccIsDragging     = false;
}, { passive: true });

ccPanel.addEventListener('touchmove', e => {
  if (Math.abs(e.touches[0].clientY - ccDragStartY) > 8) ccIsDragging = true;
}, { passive: true });

ccPanel.addEventListener('touchend', e => {
  if (!ccIsDragging) return;
  const dy = e.changedTouches[0].clientY - ccDragStartY;

  if (ccDragStartState === 'mini') {
    if (dy > CC_DRAG_THRESHOLD)       openCCFull();
    else if (dy < -CC_DRAG_THRESHOLD) closeCC();
  } else if (ccDragStartState === 'full') {
    if (dy < -CC_DRAG_THRESHOLD)      openCCMini();
  }
  ccIsDragging = false;
}, { passive: true });

/* Klik backdrop = tutup */
ccBackdrop.addEventListener('click', closeCC);

/* Desktop: klik pill = toggle mini/full */
$('cc-pill').addEventListener('click', () => {
  if      (ccState === 'mini') openCCFull();
  else if (ccState === 'full') openCCMini();
});

function openCCMini() {
  cc.classList.remove('full');
  cc.classList.add('mini');
  cc.style.pointerEvents = 'all';
  ccState = 'mini';
  STATE.ccOpen = true;
}
function openCCFull() {
  cc.classList.add('mini', 'full');
  cc.style.pointerEvents = 'all';
  ccState = 'full';
  STATE.ccOpen = true;
}
function closeCC() {
  cc.classList.remove('mini', 'full');
  cc.style.pointerEvents = 'none';
  ccState = '';
  STATE.ccOpen = false;
}

/* Toggle quick tiles */
$$('.cc-qtile').forEach(tile => {
  tile.addEventListener('click', () => {
    tile.classList.toggle('on');
    showToast(`${tile.querySelector('.cq-label').textContent} ${tile.classList.contains('on') ? 'On' : 'Off'}`);
  });
});

/* Toggle secondary tiles */
$$('.cc-stile').forEach(tile => {
  tile.addEventListener('click', () => {
    tile.classList.toggle('on');
    showToast(`${tile.querySelector('.cc-stile-lbl').textContent} ${tile.classList.contains('on') ? 'On' : 'Off'}`);
  });
});
