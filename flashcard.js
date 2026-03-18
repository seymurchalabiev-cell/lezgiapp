/* ============================================================
   js/flashcard.js — РЕЖИМ КАРТОЧЕК (SRS)
   Отвечает за: показ карточки, переворот, SRS-кнопки.
   Меняй здесь логику карточного режима.
============================================================ */

let session = {
  words: [],
  index: 0,
  mode: 'flashcard',
  cat: 'all',
  flipped: false
};

function getSessionWords(cat = 'all') {
  let pool = cat === 'all' ? [...WORDS] : WORDS.filter(w => w.cat === cat);
  pool.sort((a, b) => {
    const da = isDue(a.id), db = isDue(b.id);
    if (da && !db) return -1;
    if (!da && db) return 1;
    return (getCardData(b.id).fails || 0) - (getCardData(a.id).fails || 0);
  });
  return pool.slice(0, 20);
}

function startMode(mode) {
  session.mode = mode;
  showScreen('cards');
  setModeTab(mode);
  loadSession();
}

function switchMode(mode) {
  session.mode = mode;
  setModeTab(mode);
  loadSession();
}

function setModeTab(mode) {
  document.querySelectorAll('.mode-tab').forEach((t, i) => {
    t.classList.toggle('active', ['flashcard', 'multiple', 'typing'][i] === mode);
  });
}

function loadSession() {
  session.words = getSessionWords(session.cat);
  session.index = 0;
  session.flipped = false;
  document.getElementById('completion').classList.remove('visible');
  document.getElementById('mode-flashcard').style.display = session.mode === 'flashcard' ? 'block' : 'none';
  document.getElementById('mode-multiple').style.display  = session.mode === 'multiple'  ? 'block' : 'none';
  document.getElementById('mode-typing').style.display    = session.mode === 'typing'    ? 'block' : 'none';
  renderCurrentCard();
}

function renderCurrentCard() {
  updateProgress();
  if (session.index >= session.words.length) { showCompletion(); return; }
  const w = session.words[session.index];
  if (session.mode === 'flashcard') renderFlashcard(w);
  else if (session.mode === 'multiple') renderMultipleChoice(w);
  else renderTyping(w);
}

function updateProgress() {
  const pct = session.words.length ? (session.index / session.words.length) * 100 : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('card-counter').textContent = `${session.index} / ${session.words.length}`;
}

function renderFlashcard(w) {
  const fc = document.getElementById('the-flashcard');
  fc.classList.remove('flipped');
  session.flipped = false;
  document.getElementById('fc-word').textContent       = w.lz;
  document.getElementById('fc-ipa').textContent        = w.ipa || '';
  document.getElementById('fc-cat-tag').textContent    = w.cat;
  document.getElementById('fc-word-back').textContent  = w.lz;
  document.getElementById('fc-translation').textContent= w.ru;
  document.getElementById('fc-example').textContent    = w.ex || '';
  document.getElementById('srs-buttons').style.display = 'none';
  document.getElementById('flip-hint').style.display   = 'block';
}

function flipCard() {
  if (session.mode !== 'flashcard') return;
  const fc = document.getElementById('the-flashcard');
  fc.classList.toggle('flipped');
  session.flipped = !session.flipped;
  if (session.flipped) {
    document.getElementById('srs-buttons').style.display = 'grid';
    document.getElementById('flip-hint').style.display   = 'none';
  }
}

function srsAnswer(quality) {
  srsUpdate(session.words[session.index].id, quality);
  session.index++;
  session.flipped = false;
  renderCurrentCard();
}

function showCompletion() {
  document.getElementById('completion').classList.add('visible');
  document.getElementById('completion-text').textContent =
    `Изучено карточек: ${session.words.length} · Молодец!`;
  document.getElementById('mode-flashcard').style.display = 'none';
  document.getElementById('mode-multiple').style.display  = 'none';
  document.getElementById('mode-typing').style.display    = 'none';
  updateHomeStats();
}

function restartSession() {
  document.getElementById('completion').classList.remove('visible');
  loadSession();
}

function nextCard() {
  session.index++;
  renderCurrentCard();
}
