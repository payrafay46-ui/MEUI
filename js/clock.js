/* ===================== CLOCK ===================== */
function pad(n) { return String(n).padStart(2, '0'); }

function updateClocks() {
  const now  = new Date();
  const h    = pad(now.getHours()), m = pad(now.getMinutes());
  const time = `${h}:${m}`;

  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const MSHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const dateLong  = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;
  const dateShort = `${DAYS[now.getDay()].slice(0,3)}, ${MSHORT[now.getMonth()]} ${now.getDate()}`;

  // Lock screen
  $('lock-time').textContent        = time;
  $('ls-time-small').textContent    = time;
  $('lock-date').textContent        = dateLong;
  // Home screen
  $('hs-time').textContent          = time;
  $('hw-time').textContent          = time;
  $('hw-date').textContent          = dateShort;
  // Control Center
  $('cc-time').textContent          = time;
  $('cc-date-str').textContent      = dateShort;
  // Display settings preview
  const dispT = $('disp-preview-time');
  if (dispT) dispT.textContent = time;
}

updateClocks();
setInterval(updateClocks, 10000);
