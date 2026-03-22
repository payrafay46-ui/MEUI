/* ===================== WALLPAPER SYSTEM ===================== */
const BASE = 'https://quandz24-ui.github.io/OriginOS_web/originos_data/';

const WALLPAPERS = [
  { id: 0, name: 'Abstract Blue', url: BASE + '462489103_1400206661384168_7007140902614083639_n.jpg' },
  { id: 1, name: 'Abstract 2',    url: BASE + 'wallpaper_2.png' },
  { id: 2, name: 'Abstract 3',    url: BASE + 'wallpaper_3.png' },
  { id: 3, name: 'Abstract 4',    url: BASE + 'wallpaper_4.png' },
  { id: 4, name: 'Abstract 5',    url: BASE + 'wallpaper_5.png' },
  { id: 5, name: 'Abstract 6',    url: BASE + 'wallpaper_7.png' },
  { id: 6, name: 'Abstract 7',    url: BASE + 'wallpaper_6.png' },
  { id: 7, name: 'Midnight',      url: null, css: 'linear-gradient(160deg,#0D1B3E 0%,#0A0A0F 55%,#1A0A2E 100%)' },
];

let selectedWpId  = 0;
let wpApplyTarget = 'both';

function wpToCss(wp) {
  if (STATE.customWpCss) return STATE.customWpCss;
  if (wp.url) return `url("${wp.url}") center/cover no-repeat`;
  if (wp.css) return wp.css;
  return '#0A0A0F';
}

function buildWpGrid() {
  const grid = $('wp-grid');
  if (!grid) return;
  grid.innerHTML = '';
  STATE.customWpCss = null;

  WALLPAPERS.forEach(wp => {
    const thumb = document.createElement('div');
    thumb.className    = 'wp-thumb' + (wp.id === selectedWpId ? ' selected' : '');
    thumb.dataset.wpId = wp.id;
    thumb.title        = wp.name;
    if (wp.url) {
      thumb.style.backgroundImage    = `url("${wp.url}")`;
      thumb.style.backgroundSize     = 'cover';
      thumb.style.backgroundPosition = 'center';
    } else {
      thumb.style.background = wp.css;
    }
    thumb.addEventListener('click', () => selectWpThumb(wp.id));
    grid.appendChild(thumb);
  });

  updateWpPreview(selectedWpId);
}

function selectWpThumb(id) {
  STATE.customWpCss = null;
  selectedWpId = id;
  $$('.wp-thumb').forEach(t => t.classList.toggle('selected', +t.dataset.wpId === id));
  updateWpPreview(id);
}

function updateWpPreview(id) {
  const wp     = WALLPAPERS.find(w => w.id === id);
  const screen = $('wp-preview-screen');
  if (!screen || !wp) return;
  if (wp.url) {
    screen.style.backgroundImage    = `url("${wp.url}")`;
    screen.style.backgroundSize     = 'cover';
    screen.style.backgroundPosition = 'center';
    screen.style.background         = '';
  } else if (wp.css) {
    screen.style.background      = wp.css;
    screen.style.backgroundImage = '';
  }
}

function applyWallpaper(css) {
  document.documentElement.style.setProperty('--wallpaper', css);
  STATE.wallpaper = css;
  const screen = $('wp-preview-screen');
  if (screen) {
    if (css.startsWith('url(')) {
      screen.style.backgroundImage    = css.split(' ')[0];
      screen.style.backgroundSize     = 'cover';
      screen.style.backgroundPosition = 'center';
      screen.style.background         = '';
    } else {
      screen.style.background      = css;
      screen.style.backgroundImage = '';
    }
  }
}

/* Tabs */
$$('.wp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.wp-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    wpApplyTarget = tab.dataset.target;
  });
});

/* Apply button */
const wpApplyBtn = $('wp-apply-btn');
if (wpApplyBtn) {
  wpApplyBtn.addEventListener('click', () => {
    let css;
    if (STATE.customWpCss) {
      css = STATE.customWpCss;
    } else {
      const wp = WALLPAPERS.find(w => w.id === selectedWpId);
      if (!wp) return;
      css = wpToCss(wp);
    }
    applyWallpaper(css);
    const target = wpApplyTarget === 'both' ? 'home & lock screen' : wpApplyTarget + ' screen';
    showToast(`Wallpaper applied to ${target}`);
  });
}

/* File upload */
const wpUploadBtn = $('wp-upload-btn');
const wpFileInput = $('wp-file-input');
if (wpUploadBtn && wpFileInput) {
  wpUploadBtn.addEventListener('click', () => wpFileInput.click());
  wpFileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target.result;
      STATE.customWpCss = `url("${dataUrl}") center/cover no-repeat`;
      selectedWpId = 99;
      const screen = $('wp-preview-screen');
      if (screen) {
        screen.style.backgroundImage    = `url("${dataUrl}")`;
        screen.style.backgroundSize     = 'cover';
        screen.style.backgroundPosition = 'center';
        screen.style.background         = '';
      }
      $$('.wp-thumb').forEach(t => t.classList.remove('selected'));
      showToast('Custom wallpaper loaded — tap Apply');
    };
    reader.readAsDataURL(file);
    wpFileInput.value = '';
  });
}
