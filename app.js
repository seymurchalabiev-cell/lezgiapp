/* ============================================================
   js/app.js — ТОЧКА ВХОДА, НАВИГАЦИЯ
   Запускает приложение и управляет переключением экранов.
   Этот файл подключается последним.
============================================================ */

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));

  const scr = document.getElementById('screen-' + name);
  if (scr) {
    scr.classList.add('active');
    scr.classList.remove('animate-in');
    void scr.offsetWidth; // reflow
    scr.classList.add('animate-in');
  }

  const idx = ['home', 'cards', 'alphabet', 'grammar', 'words', 'stats'].indexOf(name);
  const navBtns = document.querySelectorAll('nav button');
  if (idx >= 0 && navBtns[idx]) navBtns[idx].classList.add('active');

  if (name === 'stats')  renderStats();
  if (name === 'words')  { wordFilter = { cat: 'all', search: '' }; dictPage = 0; renderWordList(); }
}

// ── INIT ─────────────────────────────────────────────────────
loadState();
renderAlphabet();
renderGrammar();
renderCategoryTabs('cat-select', 'all', cat => { session.cat = cat; loadSession(); });
updateHomeStats();
renderHomeCats();
loadSession();
