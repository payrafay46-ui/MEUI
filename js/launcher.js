/* ===================== APP LAUNCH SYSTEM ===================== */
const launcher   = $('app-launcher');
const phoneShell = $('phone-shell');
let   currentApp  = null;
let   isAnimating = false;

const APP_META = {
  phone:      { bg: 'linear-gradient(140deg,#065F46,#10B981)', icon: '📞', label: 'Phone' },
  messages:   { bg: 'linear-gradient(140deg,#1D4ED8,#3B82F6)', icon: '💬', label: 'Messages' },
  camera:     { bg: 'linear-gradient(140deg,#374151,#6B7280)', icon: '📷', label: 'Camera' },
  gallery:    { bg: 'linear-gradient(140deg,#B45309,#F59E0B)', icon: '🖼️', label: 'Gallery' },
  browser:    { bg: 'linear-gradient(140deg,#1D4ED8,#3B82F6)', icon: '🌐', label: 'Browser' },
  maps:       { bg: 'linear-gradient(140deg,#0F766E,#2DD4BF)', icon: '🗺️', label: 'Maps' },
  music:      { bg: 'linear-gradient(140deg,#6D28D9,#8B5CF6)', icon: '🎵', label: 'Music' },
  calendar:   { bg: 'linear-gradient(140deg,#DC2626,#EF4444)', icon: '📅', label: 'Calendar' },
  mail:       { bg: 'linear-gradient(140deg,#3730A3,#6366F1)', icon: '📧', label: 'Mail' },
  notes:      { bg: 'linear-gradient(140deg,#92400E,#FCD34D)', icon: '📝', label: 'Notes' },
  clock:      { bg: 'linear-gradient(140deg,#1F2937,#374151)', icon: '🕐', label: 'Clock' },
  calculator: { bg: 'linear-gradient(140deg,#1F2937,#374151)', icon: '🧮', label: 'Calculator' },
  files:      { bg: 'linear-gradient(140deg,#3F6212,#84CC16)', icon: '📁', label: 'Files' },
  weather:    { bg: 'linear-gradient(140deg,#0F766E,#2DD4BF)', icon: '⛅', label: 'Weather' },
  scanner:    { bg: 'linear-gradient(140deg,#9D174D,#EC4899)', icon: '🔍', label: 'Scanner' },
  settings:   { bg: 'linear-gradient(140deg,#374151,#6B7280)', icon: '⚙️',  label: 'Settings' },
  magisk:     { bg: 'linear-gradient(140deg,#1a1a1a,#2d2d2d)', icon: '▲',  label: 'Magisk' },
  owl:        { bg: 'linear-gradient(140deg,#1c1a2e,#2e2060)', icon: '🦉',  label: 'Owl' },
  kernelsu:   { bg: 'linear-gradient(140deg,#0a1628,#1a3a6e)', icon: '⊞',  label: 'KernelSU' },
  termux:     { bg: 'linear-gradient(140deg,#0d1117,#1f2937)', icon: '❯_', label: 'Termux' },
  adb:        { bg: 'linear-gradient(140deg,#1a0a2e,#3b1a6b)', icon: '⚡',  label: 'ADB' },
  xposed:     { bg: 'linear-gradient(140deg,#1a1200,#4a3500)',  icon: '🔩', label: 'LSPosed' },
  playstore:  { bg: 'linear-gradient(140deg,#1a3a1a,#1a7a3a)',  icon: '▶',  label: 'Play Store' },
  youtube:    { bg: 'linear-gradient(140deg,#1a0000,#cc0000)',   icon: '▶',  label: 'YouTube' },
  google:     { bg: 'linear-gradient(140deg,#1a1a3a,#4285f4)',   icon: 'G',  label: 'Google' },
  minecraft:  { bg: 'linear-gradient(140deg,#2d4a1a,#4a7a2a)',   icon: '⛏', label: 'Minecraft' },
};

function lerp(a, b, t) { return a + (b - a) * t; }

function launchApp(iconEl, appId) {
  if (isAnimating || currentApp) return;
  const meta = APP_META[appId] || { bg: 'linear-gradient(140deg,#1F2937,#374151)', icon: '📱', label: appId };
  isAnimating = true;

  const homeScreen = $('home-screen');
  const shellRect  = phoneShell.getBoundingClientRect();
  const iconImg    = iconEl.querySelector('.app-icon-img');
  if (!iconImg) { isAnimating = false; return; }

  const iconRect = iconImg.getBoundingClientRect();
  const sL = iconRect.left - shellRect.left;
  const sT = iconRect.top  - shellRect.top;
  const sW = iconRect.width;
  const sH = iconRect.height;
  const eW = shellRect.width;
  const eH = shellRect.height;

  homeScreen.classList.add('blur-out');
  document.body.classList.add('app-open');
  iconEl.style.transform = 'scale(0.80)';
  iconEl.style.opacity   = '0.3';

  const tile = document.createElement('div');
  tile.className = 'launch-tile';
  Object.assign(tile.style, {
    left: sL+'px', top: sT+'px', width: sW+'px', height: sH+'px',
    background: meta.bg, borderRadius: '28px', opacity: '0',
  });
  launcher.appendChild(tile);

  let appScreen = null;
  if (appId !== 'settings') {
    appScreen = buildAppScreen(appId, meta);
    Object.assign(appScreen.style, { opacity: '0', transform: 'scale(1.05)', pointerEvents: 'none' });
    launcher.appendChild(appScreen);
  }

  const OPEN_DUR = 440;
  setTimeout(() => {
    iconEl.style.transition = 'transform 0.18s cubic-bezier(0.4,0,0.6,1), opacity 0.18s ease';
    iconEl.style.transform  = 'scale(0.7)';
    iconEl.style.opacity    = '0';

    tile.animate([
      { left:`${sL}px`,              top:`${sT}px`,              width:`${sW}px`,             height:`${sH}px`,            borderRadius:'28px', opacity:'0', offset:0    },
      { left:`${sL-sW*.05}px`,       top:`${sT-sH*.05}px`,       width:`${sW*1.12}px`,        height:`${sH*1.12}px`,       borderRadius:'30px', opacity:'1', offset:0.07 },
      { left:`${lerp(sL,0,.22)}px`,  top:`${lerp(sT,0,.22)}px`,  width:`${lerp(sW,eW,.30)}px`,height:`${lerp(sH,eH,.30)}px`,borderRadius:'48px',opacity:'1', offset:0.32 },
      { left:`${lerp(sL,0,.60)}px`,  top:`${lerp(sT,0,.60)}px`,  width:`${lerp(sW,eW,.72)}px`,height:`${lerp(sH,eH,.72)}px`,borderRadius:'56px',opacity:'1', offset:0.60 },
      { left:'0px',                  top:'0px',                  width:`${eW}px`,             height:`${eH}px`,            borderRadius:'0px',  opacity:'1', offset:1    },
    ], { duration: OPEN_DUR, easing: 'cubic-bezier(0.2,0,0,1)', fill: 'forwards' });

    if (appId === 'settings') {
      setTimeout(() => {
        openSettings();
        tile.style.visibility = 'hidden';
        isAnimating = false;
        currentApp  = { tile, appScreen: null, iconEl, homeScreen, sL, sT, sW, sH };
      }, OPEN_DUR + 30);
    } else {
      setTimeout(() => {
        appScreen.style.transition = 'opacity 0.20s ease, transform 0.26s cubic-bezier(0.2,0,0.08,1)';
        appScreen.style.opacity    = '1';
        appScreen.style.transform  = 'scale(1)';
      }, OPEN_DUR * 0.50);
      setTimeout(() => {
        tile.style.visibility = 'hidden';
        appScreen.style.pointerEvents = 'all';
        isAnimating = false;
        currentApp  = { tile, appScreen, iconEl, homeScreen, sL, sT, sW, sH };
      }, OPEN_DUR + 50);
    }
  }, 85);
}

function closeApp() {
  if (!currentApp || isAnimating) return;
  isAnimating = true;

  const { tile, appScreen, iconEl, homeScreen, sL, sT, sW, sH } = currentApp;
  const shellRect  = phoneShell.getBoundingClientRect();
  const eW = shellRect.width, eH = shellRect.height;
  const CLOSE_DUR = 220;

  if (STATE.settingsOpen) closeSettings();

  if (appScreen) {
    appScreen.style.transition  = 'opacity 0.10s ease, transform 0.14s cubic-bezier(0.4,0,1,1)';
    appScreen.style.opacity     = '0';
    appScreen.style.transform   = 'scale(1.04)';
    appScreen.style.pointerEvents = 'none';
  }

  setTimeout(() => {
    tile.style.visibility = '';
    tile.animate([
      { left:'0px',              top:'0px',              width:`${eW}px`,             height:`${eH}px`,            borderRadius:'0px',  opacity:'1', offset:0    },
      { left:`${lerp(sL,0,.35)}px`,top:`${lerp(sT,0,.35)}px`,width:`${lerp(sW,eW,.48)}px`,height:`${lerp(sH,eH,.48)}px`,borderRadius:'40px',opacity:'1',offset:0.40 },
      { left:`${sL}px`,          top:`${sT}px`,          width:`${sW}px`,             height:`${sH}px`,            borderRadius:'28px', opacity:'0', offset:1    },
    ], { duration: CLOSE_DUR, easing: 'cubic-bezier(0.4,0,0.8,1)', fill: 'forwards' });

    iconEl.style.transition = 'transform 0.30s cubic-bezier(0.2,0,0.1,1), opacity 0.24s ease';
    iconEl.style.transform  = 'scale(1)';
    iconEl.style.opacity    = '1';
    homeScreen.classList.remove('blur-out');
    document.body.classList.remove('app-open');

    setTimeout(() => {
      if (appScreen && appScreen.parentNode) appScreen.remove();
      if (tile.parentNode) tile.remove();
      currentApp  = null;
      isAnimating = false;
    }, CLOSE_DUR + 30);
  }, 90);
}

function buildAppScreen(appId, meta) {
  const div = document.createElement('div');
  div.className  = 'app-fullscreen';
  div.dataset.appId = appId;
  div.innerHTML = `
    <div class="app-topbar">
      <div class="app-close-btn" id="app-close-btn-live">
        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </div>
      <div class="app-name-title">${meta.label}</div>
    </div>
    <div class="app-placeholder-body">
      <div class="app-placeholder-icon" style="background:${meta.bg}">${meta.icon}</div>
      <div class="app-placeholder-name">${meta.label}</div>
      <div class="app-placeholder-sub">Placeholder app.<br>Akan dibangun di versi berikutnya.</div>
    </div>
  `;
  div.querySelector('#app-close-btn-live').addEventListener('click', () => closeApp());
  return div;
}

function bindAppIcons() {
  $$('.app-icon').forEach(icon => {
    icon.addEventListener('pointerdown', () => {
      if (isAnimating || currentApp) return;
      icon.style.transition = 'transform 0.09s cubic-bezier(0.4,0,1,1)';
      icon.style.transform  = 'scale(0.88)';
    });
    ['pointerup', 'pointerleave'].forEach(ev => icon.addEventListener(ev, () => {
      if (!currentApp && !isAnimating) {
        icon.style.transition = 'transform 0.22s cubic-bezier(0.2,0,0.1,1)';
        icon.style.transform  = 'scale(1)';
      }
    }));
    icon.addEventListener('click', () => {
      if (isAnimating || currentApp) return;
      const app = icon.dataset.app;
      if (app) launchApp(icon, app);
    });
  });
}
bindAppIcons();
