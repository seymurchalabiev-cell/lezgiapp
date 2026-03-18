/* ============================================================
   js/grammar.js — ЭКРАН ГРАММАТИКИ
   Меняй здесь отображение тем.
============================================================ */

function renderGrammar() {
  const cont = document.getElementById('grammar-topics');
  cont.innerHTML = '';
  GRAMMAR.forEach(g => {
    const el = document.createElement('div');
    el.className = 'grammar-topic';
    el.innerHTML = `
      <div class="grammar-topic-header" onclick="toggleGrammar(this)">
        <h3>${g.title}</h3>
        <span class="grammar-chevron">▼</span>
      </div>
      <div class="grammar-topic-body">${g.body}</div>`;
    cont.appendChild(el);
  });
}

function toggleGrammar(header) {
  header.parentElement.classList.toggle('open');
}
