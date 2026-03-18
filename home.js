/* ============================================================
   js/home.js — ГЛАВНАЯ СТРАНИЦА
   Статистика, категории, сложные слова.
============================================================ */

function renderCategoryTabs(containerId, activeCat, onChange) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  cont.innerHTML = '';
  CATS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === activeCat ? ' active' : '');
    btn.textContent = cat === 'all' ? 'Все' : cat;
    btn.onclick = () => {
      session.cat = cat;
      onChange(cat);
      renderCategoryTabs(containerId, cat, onChange);
    };
    cont.appendChild(btn);
  });
}

function updateHomeStats() {
  const studied = WORDS.filter(w => getCardData(w.id).reps > 0).length;
  const due     = getDueWords().length;
  const rate    = state.totalReviews
    ? Math.round((state.correctReviews / state.totalReviews) * 100) : 0;

  document.getElementById('home-stats-display').innerHTML = `
    <div class="stat-card">
      <div class="stat-num">${studied}</div>
      <div class="stat-label">Изучено</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${due}</div>
      <div class="stat-label">К повторению</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${state.streak || 0}🔥</div>
      <div class="stat-label">Дней подряд</div>
    </div>`;
  document.getElementById('due-badge').textContent = due;

  const hw = document.getElementById('hard-words-home');
  hw.innerHTML = '';
  const hardWords = WORDS.filter(w => getCardData(w.id).fails > 1).slice(0, 5);
  if (hardWords.length === 0) {
    hw.innerHTML = '<p style="color:var(--text3);font-size:13px;">Пока нет сложных слов 🎉</p>';
  } else {
    hardWords.forEach(w => {
      const el = document.createElement('div');
      el.className = 'word-item';
      el.onclick = () => startMode('flashcard');
      el.innerHTML = `
        <div class="wi-lezgi">${w.lz}</div>
        <div class="wi-ipa">${w.ipa || ''}</div>
        <div class="wi-ru">${w.ru}</div>
        <div class="wi-cat" style="color:var(--danger);">⚠ ${getCardData(w.id).fails} ошибок</div>`;
      hw.appendChild(el);
    });
  }
}

function renderHomeCats() {
  const cont = document.getElementById('home-cats');
  cont.innerHTML = '';
  CATS.forEach(cat => {
    const count = cat === 'all' ? WORDS.length : WORDS.filter(w => w.cat === cat).length;
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `${cat === 'all' ? 'Все' : cat} <span style="opacity:0.6">${count}</span>`;
    btn.onclick = () => { session.cat = cat; startMode('flashcard'); };
    cont.appendChild(btn);
  });
}

function renderStats() {
  document.getElementById('streak-num').textContent = state.streak || 0;
  const total   = WORDS.length;
  const studied = WORDS.filter(w => getCardData(w.id).reps > 0).length;
  const rate    = state.totalReviews
    ? Math.round((state.correctReviews / state.totalReviews) * 100) : 0;
  const hard    = WORDS.filter(w => getCardData(w.id).fails > 2).length;
  const due     = getDueWords().length;

  document.getElementById('stats-grid').innerHTML = `
    <div class="big-stat">
      <div class="big-stat-num">${studied}</div>
      <div class="big-stat-label">Изучено слов</div>
      <div class="big-stat-sub">из ${total} всего</div>
    </div>
    <div class="big-stat">
      <div class="big-stat-num">${rate}%</div>
      <div class="big-stat-label">Точность</div>
      <div class="big-stat-sub">${state.correctReviews}/${state.totalReviews} ответов</div>
    </div>
    <div class="big-stat">
      <div class="big-stat-num">${hard}</div>
      <div class="big-stat-label">Сложных слов</div>
      <div class="big-stat-sub">нужно повторить</div>
    </div>
    <div class="big-stat">
      <div class="big-stat-num">${due}</div>
      <div class="big-stat-label">К повторению</div>
      <div class="big-stat-sub">ждут тебя</div>
    </div>`;

  const list = document.getElementById('word-progress-list');
  list.innerHTML = '';
  const sorted = [...WORDS].sort((a, b) =>
    (getCardData(b.id).reps || 0) - (getCardData(a.id).reps || 0)
  );
  sorted.slice(0, 15).forEach(w => {
    const cd  = getCardData(w.id);
    const lvl = Math.min(5, Math.floor(cd.reps / 2));
    const lvlLabel = ['Новое', 'Начало', 'Учится', 'Знает', 'Хорошо', 'Отлично'][lvl];
    const el = document.createElement('div');
    el.className = 'word-progress-item';
    el.innerHTML = `
      <div class="wpi-word">${w.lz}</div>
      <div class="wpi-translation">${w.ru}</div>
      <div class="wpi-level lvl-${lvl}">${lvlLabel}</div>`;
    list.appendChild(el);
  });
}
