/* ============================================================
   js/state.js — СОСТОЯНИЕ И SRS-АЛГОРИТМ
   Отвечает за: хранение прогресса в localStorage,
   алгоритм интервального повторения (SM-2).
   Меняй здесь интервалы и логику оценки.
============================================================ */

let state = {
  cards: {},         // id -> {interval, nextReview, easiness, reps, fails}
  streak: 0,
  lastStudy: null,
  totalReviews: 0,
  correctReviews: 0,
};

function loadState() {
  try {
    const s = localStorage.getItem('lezgi_state_v2');
    if (s) state = { ...state, ...JSON.parse(s) };
  } catch(e) {}
}

function saveState() {
  localStorage.setItem('lezgi_state_v2', JSON.stringify(state));
}

function getCardData(id) {
  if (!state.cards[id]) {
    state.cards[id] = { interval: 1, nextReview: 0, easiness: 2.5, reps: 0, fails: 0 };
  }
  return state.cards[id];
}

function isDue(id) {
  return getCardData(id).nextReview <= Date.now();
}

function getDueWords() {
  return WORDS.filter(w => isDue(w.id));
}

// SM-2 inspired: quality 0=снова, 1=трудно, 2=хорошо, 3=легко
function srsUpdate(id, quality) {
  const c = getCardData(id);
  const now = Date.now();
  c.reps++;
  state.totalReviews++;

  if (quality === 0) {
    c.fails++;
    c.interval = 1;
    c.nextReview = now + 60 * 1000;           // повтор через 1 минуту
  } else if (quality === 1) {
    c.interval = 1;
    c.nextReview = now + 86400000;             // 1 день
    state.correctReviews++;
  } else if (quality === 2) {
    c.interval = Math.max(c.interval * c.easiness, 3);
    c.easiness = Math.max(1.3, c.easiness + 0.1);
    c.nextReview = now + c.interval * 86400000;
    state.correctReviews++;
  } else {
    c.interval = Math.max(c.interval * c.easiness * 1.3, 7);
    c.easiness = Math.min(3.0, c.easiness + 0.2);
    c.nextReview = now + c.interval * 86400000;
    state.correctReviews++;
  }

  // streak
  const today = new Date().toDateString();
  if (state.lastStudy !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streak = (state.lastStudy === yesterday) ? state.streak + 1 : 1;
    state.lastStudy = today;
  }
  saveState();
}

function resetProgress() {
  state = { cards: {}, streak: 0, lastStudy: null, totalReviews: 0, correctReviews: 0 };
  saveState();
  updateHomeStats();
  renderStats();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
