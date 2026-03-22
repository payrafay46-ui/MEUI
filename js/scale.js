/* ===================== RESPONSIVE SCALE ===================== */
/*
  Bingkai ponsel tetap terlihat di layar kecil (mobile tanpa desktop mode).
  Teknik: scale transform pada #phone-shell via CSS transform.
  #phone-shell-wrap ukurannya mengikuti hasil scale,
  sehingga tidak ada overflow atau duplikasi visual.
*/
(function initScale() {
  const shell = document.getElementById('phone-shell');
  const wrap  = document.getElementById('phone-shell-wrap');
  if (!shell || !wrap) return;

  function applyScale() {
    const style = getComputedStyle(document.documentElement);
    const pw    = parseFloat(style.getPropertyValue('--phone-w')) || 390;
    const ph    = parseFloat(style.getPropertyValue('--phone-h')) || 844;
    const vw    = window.innerWidth;
    const vh    = window.innerHeight;

    // 24px padding di setiap sisi agar bingkai tidak mepet tepi layar
    const scaleW = (vw - 48) / pw;
    const scaleH = (vh - 48) / ph;
    const scale  = Math.min(scaleW, scaleH, 1); // max 1x, tidak perbesar

    shell.style.transform       = `scale(${scale})`;
    shell.style.transformOrigin = 'top left';
    wrap.style.width            = `${pw  * scale}px`;
    wrap.style.height           = `${ph * scale}px`;
    wrap.style.position         = 'relative';
  }

  applyScale();
  window.addEventListener('resize', applyScale);
})();
