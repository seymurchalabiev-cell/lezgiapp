/* ============================================================
   js/wordlist.js — ЭКРАН СЛОВАРЯ
   Два режима: учебные слова (curated) и полный словарь (33k).
   Поиск работает по обоим источникам.
============================================================ */

let wordFilter   = { cat: 'all', search: '' };
let dictTab      = 'curated';   // 'curated' | 'full'
let dictPage     = 0;
const DICT_PAGE_SIZE = 100;

function switchDictTab(tab) {
  dictTab = tab;
  dictPage = 0;
  document.querySelectorAll('.dict-tab').forEach((b, i) =>
    b.classList.toggle('active', ['curated', 'full'][i] === tab)
  );
  const catRow = document.getElementById('word-cats');
  catRow.style.display = tab === 'curated' ? 'flex' : 'none';
  renderWordList();
}

function renderWordList() {
  if (dictTab === 'curated') renderCuratedList();
  else renderFullDict();
}

// ── УЧЕБНЫЕ СЛОВА ────────────────────────────────────────────
function renderCuratedList() {
  renderCategoryTabs('word-cats', wordFilter.cat, cat => {
    wordFilter.cat = cat;
    renderCuratedList();
  });

  let words = [...WORDS];
  if (wordFilter.cat !== 'all') words = words.filter(w => w.cat === wordFilter.cat);
  if (wordFilter.search) {
    const q = wordFilter.search.toLowerCase();
    words = words.filter(w => w.lz.toLowerCase().includes(q) || w.ru.toLowerCase().includes(q));
  }

  document.getElementById('word-count-label').textContent = `Найдено: ${words.length} слов`;
  document.getElementById('dict-load-more').style.display = 'none';

  const grid = document.getElementById('wordlist-grid');
  grid.innerHTML = '';
  words.forEach(w => {
    const el = document.createElement('div');
    el.className = 'word-item';
    el.innerHTML = `
      <div class="wi-lezgi">${w.lz}</div>
      <div class="wi-ipa">${w.ipa || ''}</div>
      <div class="wi-ru">${w.ru}</div>
      <div class="wi-cat">${w.cat}</div>`;
    grid.appendChild(el);
  });
}

// ── ПОЛНЫЙ СЛОВАРЬ (33k) ────────────────────────────────────
function renderFullDict() {
  const q = (wordFilter.search || '').toLowerCase();
  let words = DICTIONARY;
  if (q) words = DICTIONARY.filter(e =>
    e.ru.toLowerCase().includes(q) || e.lz.toLowerCase().includes(q)
  );

  const total  = words.length;
  const page   = words.slice(0, (dictPage + 1) * DICT_PAGE_SIZE);
  const hasMore = page.length < total;

  document.getElementById('word-count-label').textContent =
    q ? `Найдено: ${total} слов` : `Все слова: ${total}`;
  document.getElementById('dict-load-more').style.display = hasMore ? 'block' : 'none';

  const grid = document.getElementById('wordlist-grid');
  grid.innerHTML = '';
  page.forEach(e => {
    const el = document.createElement('div');
    el.className = 'dict-item';
    el.innerHTML = `
      <div class="dict-ru">${e.ru}</div>
      <div class="dict-lz">${e.lz}</div>`;
    grid.appendChild(el);
  });
}

function loadMoreDictWords() {
  dictPage++;
  renderFullDict();
  // scroll to button area
  document.getElementById('dict-load-more').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function filterWords() {
  wordFilter.search = document.getElementById('word-search').value;
  dictPage = 0;
  renderWordList();
}
