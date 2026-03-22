/* ===================== STATE ===================== */
const STATE = {
  screen: 'boot',
  pin: '1234',
  pinInput: '',
  ccOpen: false,
  settingsOpen: false,
  wallpaper: 'linear-gradient(160deg,#0D1B3E 0%,#0A0A0F 55%,#1A0A2E 100%)',
  customWpCss: null,
};

/* ===================== DOM UTILS ===================== */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const screens = {
  boot: $('boot-screen'),
  lock: $('lock-screen'),
  pin:  $('pin-screen'),
  home: $('home-screen'),
};

function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => {
    if (k === name) el.classList.remove('hidden', 'gone');
    else            el.classList.add('hidden');
  });
  STATE.screen = name;
}

/* ===================== TOAST ===================== */
let toastTimer = null;
function showToast(msg) {
  const toast = $('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
