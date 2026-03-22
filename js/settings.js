/* ===================== SETTINGS ===================== */
const settingsScreen = $('settings-screen');

function openSettings() {
  settingsScreen.classList.add('open');
  STATE.settingsOpen = true;
  const ab = $('about-browser');
  if (ab) ab.textContent = navigator.userAgent.split(' ').slice(-2).join(' ');
}
function closeSettings() {
  settingsScreen.classList.remove('open');
  STATE.settingsOpen = false;
  closeAllSubs();
}

$('settings-close-btn').addEventListener('click', () => {
  if (currentApp) closeApp();
  else            closeSettings();
});

/* Open sub-pages */
$$('.settings-row[data-sub]').forEach(row => {
  row.addEventListener('click', () => {
    const subId = row.dataset.sub;
    const sub   = $(subId);
    if (!sub) return;
    if (subId === 'sub-placeholder') {
      $('placeholder-title').textContent = row.querySelector('.settings-row-label').textContent;
    }
    sub.classList.add('open');
    /* Lazy init wallpaper / icon controls saat sub dibuka */
    if (subId === 'sub-wallpaper')   setTimeout(buildWpGrid,       80);
    if (subId === 'sub-homescreen')  setTimeout(initIconControls,  80);
  });
});

/* Back buttons */
$$('.sub-back-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.settings-sub').classList.remove('open'));
});

function closeAllSubs() {
  $$('.settings-sub').forEach(s => s.classList.remove('open'));
}

/* Toggles */
$$('.toggle').forEach(toggle => {
  toggle.addEventListener('click', () => toggle.classList.toggle('on'));
});

/* ===================== ICON SIZE CONTROL ===================== */
const root = document.documentElement;

function initIconControls() {
  const sliderSize   = $('slider-icon-size');
  const sliderRadius = $('slider-icon-radius');
  const valSize      = $('icon-size-val');
  const valRadius    = $('icon-radius-val');
  const togLabel     = $('tog-icon-label');
  const resetBtn     = $('icon-reset-btn');
  if (!sliderSize) return;

  function applyIconSize(val) {
    root.style.setProperty('--icon-size', val + 'px');
    const fs = Math.round(val * 0.38);
    $$('.app-icon-img').forEach(el => { el.style.fontSize = fs + 'px'; });
  }
  function applyIconRadius(val) {
    const size = parseInt(getComputedStyle(root).getPropertyValue('--icon-size'));
    root.style.setProperty('--icon-radius', Math.min(val, size / 2) + 'px');
  }

  sliderSize.addEventListener('input', () => {
    const v = +sliderSize.value;
    valSize.textContent  = v + 'px';
    applyIconSize(v);
    sliderRadius.max = Math.floor(v / 2);
    applyIconRadius(+sliderRadius.value);
  });

  sliderRadius.addEventListener('input', () => {
    const v = +sliderRadius.value;
    valRadius.textContent = v + 'px';
    applyIconRadius(v);
  });

  togLabel.addEventListener('click', () => {
    togLabel.classList.toggle('on');
    const show = togLabel.classList.contains('on');
    $$('.app-icon-label').forEach(el => { el.style.display = show ? '' : 'none'; });
  });

  resetBtn.addEventListener('click', () => {
    sliderSize.value   = 60;
    sliderRadius.value = 16;
    valSize.textContent   = '60px';
    valRadius.textContent = '16px';
    applyIconSize(60);
    applyIconRadius(16);
    if (!togLabel.classList.contains('on')) togLabel.classList.add('on');
    $$('.app-icon-label').forEach(el => { el.style.display = ''; });
    showToast('Icon settings reset');
  });
}
