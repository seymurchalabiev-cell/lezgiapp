/* ============================================================
   js/quiz.js — РЕЖИМЫ «ВЫБОР ОТВЕТА» И «ВВОД»
   Меняй здесь логику тестовых режимов.
============================================================ */

// MULTIPLE CHOICE
function renderMultipleChoice(w) {
  document.getElementById('mc-word').textContent  = w.lz;
  document.getElementById('mc-ipa').textContent   = w.ipa || '';
  document.getElementById('mc-feedback').className = 'feedback-msg';

  const pool = WORDS.filter(x => x.id !== w.id);
  const distractors = shuffle(pool).slice(0, 3).map(x => x.ru);
  const options = shuffle([w.ru, ...distractors]);

  const cont = document.getElementById('mc-options');
  cont.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'mc-option';
    btn.textContent = opt;
    btn.onclick = () => checkMC(opt, w.ru, btn);
    cont.appendChild(btn);
  });
}

function checkMC(chosen, correct, btn) {
  document.querySelectorAll('.mc-option').forEach(o => {
    o.classList.add('disabled');
    if (o.textContent === correct) o.classList.add('correct');
  });
  const fb = document.getElementById('mc-feedback');
  if (chosen === correct) {
    btn.classList.add('correct');
    srsUpdate(session.words[session.index].id, 2);
    fb.textContent = '✓ Правильно!';
    fb.className = 'feedback-msg correct';
    setTimeout(() => { session.index++; renderCurrentCard(); }, 800);
  } else {
    btn.classList.add('wrong');
    srsUpdate(session.words[session.index].id, 0);
    fb.textContent = `✗ Неверно. Правильно: ${correct}`;
    fb.className = 'feedback-msg wrong';
    setTimeout(() => { session.index++; renderCurrentCard(); }, 1200);
  }
}

// TYPING
function renderTyping(w) {
  document.getElementById('ty-word').textContent = w.lz;
  document.getElementById('ty-ipa').textContent  = w.ipa || '';
  const inp = document.getElementById('ty-input');
  inp.value = '';
  inp.className = 'typing-input';
  document.getElementById('ty-feedback').className = 'feedback-msg';
  document.getElementById('ty-next').style.display = 'none';
  inp.focus();
  inp.onkeydown = (e) => { if (e.key === 'Enter') checkTyping(); };
}

function checkTyping() {
  const w = session.words[session.index];
  const inp = document.getElementById('ty-input');
  const val = inp.value.trim().toLowerCase();
  if (!val) return;

  const correct = w.ru.toLowerCase().split('/')[0].trim();
  const isCorrect = val === correct || w.ru.toLowerCase().split('/').some(x => x.trim() === val);
  const fb = document.getElementById('ty-feedback');

  if (isCorrect) {
    inp.className = 'typing-input correct';
    srsUpdate(w.id, 2);
    fb.textContent = '✓ Правильно!';
    fb.className = 'feedback-msg correct';
    setTimeout(() => { session.index++; renderCurrentCard(); }, 800);
  } else {
    inp.className = 'typing-input wrong';
    inp.classList.add('shake');
    setTimeout(() => inp.classList.remove('shake'), 300);
    srsUpdate(w.id, 0);
    fb.textContent = `✗ Неверно. Правильно: ${w.ru}`;
    fb.className = 'feedback-msg wrong';
    document.getElementById('ty-next').style.display = 'flex';
  }
}
