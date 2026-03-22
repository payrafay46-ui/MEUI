/* ===================== CONTROL CENTER ===================== */
const cc         = $('control-center');
const ccPanel    = $('cc-panel');
const ccBackdrop = $('cc-backdrop');

let ccState       = ''; // '' | 'mini' | 'full'
let ccSwipeStartY = 0;
let ccPanelDragY  = 0;

/* Swipe down dari gesture-top */
const gestureTop = $('gesture-top');
gestureTop.addEventListener('touchstart', e => {
  ccSwipeStartY = e.touches[0].clientY;
}, { passive: true });

gestureTop.addEventListener('touchend', e => {
  if (STATE.screen !== 'home' || STATE.settingsOpen) return;
  const dy = e.changedTouches[0].clientY - ccSwipeStartY;
  if (dy > 30) {
    if      (ccState === '')     openCCMini();
    else if (ccState === 'mini') openCCFull();
  }
}, { passive: true });

/* Click gesture-top (desktop) */
gestureTop.addEventListener('click', () => {
  if (STATE.screen !== 'home' || STATE.settingsOpen) return;
  if      (ccState === '')     openCCMini();
  else if (ccState === 'mini') openCCFull();
});

/* Expand / collapse btn */
$('cc-expand-btn').addEventListener('click', () => {
  if      (ccState === 'mini') openCCFull();
  else if (ccState === 'full') openCCMini();
});

/* Swipe panel ke atas = collapse / tutup */
ccPanel.addEventListener('touchstart', e => {
  ccPanelDragY = e.touches[0].clientY;
}, { passive: true });

ccPanel.addEventListener('touchend', e => {
  const dy = ccPanelDragY - e.changedTouches[0].clientY;
  if (dy > 50) {
    if      (ccState === 'full') openCCMini();
    else if (ccState === 'mini') closeCC();
  }
}, { passive: true });

/* Klik backdrop = tutup */
ccBackdrop.addEventListener('click', closeCC);

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
