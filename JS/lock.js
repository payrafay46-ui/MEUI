/* ===================== BOOT → LOCK ===================== */
setTimeout(() => { showScreen('lock'); }, 2800);

/* ===================== LOCK SCREEN ===================== */
let touchStartY = 0;

$('lock-screen').addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

$('lock-screen').addEventListener('touchend', e => {
  if (touchStartY - e.changedTouches[0].clientY > 40) goToPIN();
}, { passive: true });

$('lock-screen').addEventListener('click', e => {
  if (e.clientY > window.innerHeight * 0.55 || e.target.closest('.lock-bottom')) {
    if (!e.target.closest('#lock-flashlight') && !e.target.closest('#lock-camera')) {
      goToPIN();
    }
  }
});

$('lock-flashlight').addEventListener('click', e => {
  e.stopPropagation();
  showToast('Flashlight toggled');
});

$('lock-camera').addEventListener('click', e => {
  e.stopPropagation();
  showToast('Camera (placeholder)');
});

function goToPIN() {
  showScreen('pin');
  resetPinInput();
}

/* ===================== PIN ===================== */
function resetPinInput() {
  STATE.pinInput = '';
  updatePinDots();
  $('pin-label').textContent = 'Enter PIN';
  $('pin-label').style.color = 'rgba(255,255,255,0.7)';
}

function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    $(`d${i}`).classList.toggle('filled', i < STATE.pinInput.length);
  }
}

$$('.pin-key[data-k]').forEach(key => {
  key.addEventListener('click', () => {
    if (STATE.pinInput.length < 4) {
      STATE.pinInput += key.dataset.k;
      updatePinDots();
      if (STATE.pinInput.length === 4) setTimeout(checkPIN, 120);
    }
  });
});

$('pin-del').addEventListener('click', () => {
  STATE.pinInput = STATE.pinInput.slice(0, -1);
  updatePinDots();
});

function checkPIN() {
  if (STATE.pinInput === STATE.pin) {
    showScreen('home');
  } else {
    $('pin-label').textContent = 'Incorrect PIN';
    $('pin-label').style.color = '#EF4444';
    $$('.pin-dot').forEach(d => d.classList.add('shake'));
    setTimeout(() => {
      $$('.pin-dot').forEach(d => d.classList.remove('shake'));
      resetPinInput();
    }, 600);
  }
}
