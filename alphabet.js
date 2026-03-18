/* ============================================================
   js/alphabet.js — ЭКРАН АЛФАВИТА
   Меняй здесь отображение букв и деталей.
============================================================ */

function renderAlphabet() {
  const grid = document.getElementById('alphabet-grid');
  grid.innerHTML = '';
  ALPHABET.forEach(l => {
    const el = document.createElement('div');
    el.className = 'letter-card' + (l.special ? ' special' : '');
    el.innerHTML = `
      <div class="letter-upper">${l.up}</div>
      <div class="letter-lower">${l.lo}</div>
      <div class="letter-sound">${l.sound}</div>`;
    el.onclick = () => showLetterDetail(l);
    grid.appendChild(el);
  });
}

function showLetterDetail(l) {
  const d = document.getElementById('letter-detail');
  document.getElementById('ld-letter').textContent = l.up;
  document.getElementById('ld-name').textContent   = `Буква ${l.up}`;

  const soundEl = document.getElementById('ld-sound');
  soundEl.textContent = `Произношение: [${l.sound}] `;
  const btn = document.createElement('button');
  btn.className = 'audio-btn';
  btn.textContent = '🔊';
  btn.addEventListener('click', () => playSound(l.audio || ''));
  soundEl.appendChild(btn);

  const wordsEl = document.getElementById('ld-words');
  wordsEl.innerHTML = '';
  (l.words || []).forEach(w => {
    const t = document.createElement('span');
    t.className = 'letter-word-tag';
    t.textContent = w;
    wordsEl.appendChild(t);
  });
  d.classList.add('visible');
  d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function playSound(audioSrc) {
  if (audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play().catch(() => alert('Не удалось воспроизвести аудио для этой буквы.'));
  } else {
    alert('Аудио для этой буквы пока не добавлено!');
  }
}
