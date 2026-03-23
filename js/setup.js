/* ===================== SETUP WIZARD ===================== */
const SETUP_PAGES = [
  'setup-welcome',    // 0 — Sambutan awal
  'setup-language',   // 1 — Pilih bahasa
  'setup-wifi',       // 2 — Simulasi WiFi
  'setup-google',     // 3 — Simulasi login Google
  'setup-extras',     // 4 — Anything else?
  'setup-final',      // 5 — Sambutan akhir
];

let setupCurrent = 0;
let setupDone    = false;

/* Cek apakah setup sudah pernah selesai */
try {
  if (localStorage.getItem('meui_setup_done') === '1') {
    setupDone = true;
  }
} catch(e) {}

function initSetup() {
  if (setupDone) {
    /* Langsung ke lock screen kalau sudah pernah setup */
    $('setup-screen').classList.add('hidden');
    showScreen('lock');
    return;
  }

  /* Tampilkan setup screen */
  showScreen('setup');
  renderDots();
  goToSetupPage(0, false);
}

function renderDots() {
  const container = $('setup-dots');
  if (!container) return;
  container.innerHTML = '';
  SETUP_PAGES.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'setup-dot';
    container.appendChild(d);
  });
  updateDots();
}

function updateDots() {
  $$('.setup-dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i === setupCurrent)   d.classList.add('active');
    else if (i < setupCurrent) d.classList.add('done');
  });
}

function goToSetupPage(idx, animated = true) {
  const pages = $$('.setup-page');

  if (animated) {
    /* Exit current */
    const cur = $(`${SETUP_PAGES[setupCurrent]}`);
    if (cur) cur.classList.add('exit-left');
    setTimeout(() => { if (cur) { cur.classList.remove('active', 'exit-left'); } }, 420);
  } else {
    pages.forEach(p => p.classList.remove('active', 'exit-left'));
  }

  setupCurrent = idx;
  updateDots();

  /* Show back button only after first page */
  const backBtn = $('setup-back');
  if (backBtn) backBtn.style.visibility = setupCurrent === 0 ? 'hidden' : 'visible';

  /* Enter new page */
  const next = $(`${SETUP_PAGES[idx]}`);
  if (!next) return;

  if (animated) {
    next.style.transform   = 'translateX(60px)';
    next.style.opacity     = '0';
    next.style.transition  = 'none';
    next.classList.add('active');

    /* Trigger reflow */
    next.offsetHeight;

    next.style.transition  = '';
    next.style.transform   = '';
    next.style.opacity     = '';
  } else {
    next.classList.add('active');
  }

  /* Re-trigger emoji pop animation */
  const emoji = next.querySelector('.setup-emoji');
  if (emoji) {
    emoji.style.animation = 'none';
    emoji.offsetHeight;
    emoji.style.animation = '';
  }
}

function setupNext() {
  if (setupCurrent < SETUP_PAGES.length - 1) {
    goToSetupPage(setupCurrent + 1);
  } else {
    finishSetup();
  }
}

function setupBack() {
  if (setupCurrent > 0) {
    /* Reverse direction */
    const cur = $(`${SETUP_PAGES[setupCurrent]}`);
    if (cur) {
      cur.style.transition = 'opacity 0.36s cubic-bezier(.4,0,.2,1), transform 0.36s cubic-bezier(.4,0,.2,1)';
      cur.style.transform  = 'translateX(60px)';
      cur.style.opacity    = '0';
      cur.style.pointerEvents = 'none';
      setTimeout(() => {
        cur.classList.remove('active');
        cur.style.transform  = '';
        cur.style.opacity    = '';
        cur.style.transition = '';
        cur.style.pointerEvents = '';
      }, 380);
    }

    const prev = setupCurrent - 1;
    setupCurrent = prev - 1; // goToSetupPage will increment
    goToSetupPage(prev);
  }
}

function finishSetup() {
  try { localStorage.setItem('meui_setup_done', '1'); } catch(e) {}

  const setupScreen = $('setup-screen');

  /* Zoom-out satisfying exit animation */
  setupScreen.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)';
  setupScreen.style.opacity    = '0';
  setupScreen.style.transform  = 'scale(1.08)';

  setTimeout(() => {
    setupScreen.classList.add('hidden');
    setupScreen.style.transition = '';
    setupScreen.style.opacity    = '';
    setupScreen.style.transform  = '';
    showScreen('lock');
  }, 620);
}

/* ── Button bindings ── */
$('setup-next').addEventListener('click', setupNext);
$('setup-back').addEventListener('click', setupBack);

/* Language selection */
$$('.setup-lang-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    $$('.setup-lang-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

/* Extra toggles */
$$('.setup-extra-toggle').forEach(tog => {
  tog.addEventListener('click', () => tog.classList.toggle('on'));
});

/* Skip button */
const skipBtn = $('setup-skip');
if (skipBtn) skipBtn.addEventListener('click', finishSetup);

/* Init dipanggil dari lock.js setelah boot */
