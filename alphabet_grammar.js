/* ============================================================
   data/alphabet_grammar.js — ДАННЫЕ АЛФАВИТА И ГРАММАТИКИ
   Редактируй здесь буквы и грамматические темы.
============================================================ */

const ALPHABET = [
  {up:'А',  lo:'а',  sound:'a',                   special:false, audio:'sounds/a.mp3',   words:['атун','ам','абур']},
  {up:'Б',  lo:'б',  sound:'b',                   special:false, audio:'sounds/b.mp3',   words:['буба','ктаб']},
  {up:'В',  lo:'в',  sound:'v',                   special:false, audio:'sounds/v.mp3',   words:['вун','вах','вацI','вад']},
  {up:'Г',  lo:'г',  sound:'g',                   special:false, audio:'sounds/g.mp3',   words:['гада','гьава']},
  {up:'Гъ', lo:'гъ', sound:'ʁ (гортанный г)',     special:true,  audio:'sounds/gh.mp3',  words:['гъил','рагъ','дагъ']},
  {up:'Гь', lo:'гь', sound:'h (придыхательный)',  special:true,  audio:'sounds/ghh.mp3', words:['гьава','жегьил']},
  {up:'Д',  lo:'д',  sound:'d',                   special:false, audio:'sounds/d.mp3',   words:['диде','дагъ']},
  {up:'Е',  lo:'е',  sound:'ye/e',                special:false, audio:'sounds/ye.mp3',  words:[]},
  {up:'Ж',  lo:'ж',  sound:'ж',                   special:false, audio:'sounds/zh.mp3',  words:['жегьил']},
  {up:'З',  lo:'з',  sound:'z',                   special:false, audio:'sounds/z.mp3',   words:['зун']},
  {up:'И',  lo:'и',  sound:'i',                   special:false, audio:'sounds/i.mp3',   words:['ирид','ктаб']},
  {up:'Й',  lo:'й',  sound:'j',                   special:false, audio:'sounds/j.mp3',   words:['йикъ','йиф']},
  {up:'К',  lo:'к',  sound:'k',                   special:false, audio:'sounds/k.mp3',   words:['кас','кар','ктаб']},
  {up:'КI', lo:'кI', sound:"k' (абруптив)",       special:true,  audio:'sounds/ki.mp3',  words:['кIвал','кIам','кIелун','кIуьд']},
  {up:'Къ', lo:'къ', sound:'q (увулярный)',        special:true,  audio:'sounds/kh.mp3',  words:['кьвед','кьуд','кьил','йикъ']},
  {up:'Кь', lo:'кь', sound:"q' (фарингализ.)",    special:true,  audio:'sounds/khy.mp3', words:['кьвед']},
  {up:'Л',  lo:'л',  sound:'l',                   special:false, audio:'sounds/l.mp3',   words:[]},
  {up:'М',  lo:'м',  sound:'m',                   special:false, audio:'sounds/m.mp3',   words:['муьжуьд']},
  {up:'Н',  lo:'н',  sound:'n',                   special:false, audio:'sounds/n.mp3',   words:[]},
  {up:'О',  lo:'о',  sound:'o',                   special:false, audio:'sounds/o.mp3',   words:[]},
  {up:'П',  lo:'п',  sound:'p',                   special:false, audio:'sounds/p.mp3',   words:['пуд']},
  {up:'ПI', lo:'пI', sound:"p' (абруптив)",       special:true,  audio:'sounds/pi.mp3',  words:[]},
  {up:'Р',  lo:'р',  sound:'r',                   special:false, audio:'sounds/r.mp3',   words:['рагъ','руш','ругуд']},
  {up:'С',  lo:'с',  sound:'s',                   special:false, audio:'sounds/s.mp3',   words:['сад','стха']},
  {up:'Т',  lo:'т',  sound:'t',                   special:false, audio:'sounds/t.mp3',   words:['вахт']},
  {up:'ТI', lo:'тI', sound:"t' (абруптив)",       special:true,  audio:'sounds/ti.mp3',  words:['стIал']},
  {up:'У',  lo:'у',  sound:'u',                   special:false, audio:'sounds/u.mp3',   words:['ругуд']},
  {up:'Уь', lo:'уь', sound:'ü (передний)',        special:true,  audio:'sounds/uy.mp3',  words:['куьн','хуьр','муьжуьд']},
  {up:'Ф',  lo:'ф',  sound:'f',                   special:false, audio:'sounds/f.mp3',   words:['фин']},
  {up:'Х',  lo:'х',  sound:'x (задн. х)',         special:false, audio:'sounds/x.mp3',   words:['хва','хъсан']},
  {up:'Хъ', lo:'хъ', sound:'χ (увулярный х)',     special:true,  audio:'sounds/xh.mp3',  words:['хъсан']},
  {up:'Хь', lo:'хь', sound:'ħ (фарингальный)',    special:true,  audio:'sounds/xhy.mp3', words:['хьуьл']},
  {up:'Ц',  lo:'ц',  sound:'ts',                  special:false, audio:'sounds/ts.mp3',  words:['цав','цIуд']},
  {up:'ЦI', lo:'цI', sound:"ts' (абруптив)",      special:true,  audio:'sounds/tsi.mp3', words:['цIуд','цIай','цIифе']},
  {up:'Ч',  lo:'ч',  sound:'tʃ',                  special:false, audio:'sounds/ch.mp3',  words:['ччар','чун']},
  {up:'ЧI', lo:'чI', sound:"tʃ' (абруптив)",      special:true,  audio:'sounds/chi.mp3', words:['чIехи']},
  {up:'Ш',  lo:'ш',  sound:'ʃ',                   special:false, audio:'sounds/sh.mp3',  words:['шегьер']},
  {up:'Щ',  lo:'щ',  sound:'ʃtʃ',                 special:false, audio:'sounds/sht.mp3', words:[]},
  {up:'Ъ',  lo:'ъ',  sound:'(смягчение/сигнал)',  special:false, audio:'sounds/tvz.mp3', words:['йикъ']},
  {up:'Ы',  lo:'ы',  sound:'ы',                   special:false, audio:'sounds/y.mp3',   words:[]},
  {up:'Ь',  lo:'ь',  sound:'(мягкий знак)',       special:false, audio:'sounds/mz.mp3',  words:[]},
  {up:'Э',  lo:'э',  sound:'e',                   special:false, audio:'sounds/e.mp3',   words:[]},
  {up:'Ю',  lo:'ю',  sound:'yu',                  special:false, audio:'sounds/yu.mp3',  words:[]},
  {up:'Я',  lo:'я',  sound:'ya',                  special:false, audio:'sounds/ya.mp3',  words:[]}
];

const GRAMMAR = [
  {
    title: '1. Общая характеристика языка',
    body: `
<p>Лезгинский язык принадлежит к <strong>нахско-дагестанской семье</strong> языков. Это <strong>эргативный язык</strong> с порядком слов SOV (подлежащее — дополнение — сказуемое).</p>
<p>Глагол всегда стоит в <strong>конце предложения</strong>. В отличие от русского, в лезгинском нет грамматического рода (мужской/женский).</p>
<div class="example-box">
  <div class="lz">Зун кIвализ физва.</div>
  <div class="ru">Я домой иду. (букв: Я дом-к иду)</div>
</div>`
  },
  {
    title: '2. Алфавит и произношение',
    body: `
<p>Лезгинский алфавит содержит <strong>44 буквы</strong> на кириллической основе. Особенности произношения:</p>
<table class="grammar-table">
  <tr><th>Буква</th><th>Звук</th><th>Пример</th></tr>
  <tr><td class="lezgi">КI</td><td>абруптив k'</td><td class="lezgi">кIвал (дом)</td></tr>
  <tr><td class="lezgi">Гъ</td><td>увулярный ʁ</td><td class="lezgi">рагъ (солнце)</td></tr>
  <tr><td class="lezgi">Хъ</td><td>увулярный χ</td><td class="lezgi">хъсан (хороший)</td></tr>
  <tr><td class="lezgi">Уь</td><td>передний ü</td><td class="lezgi">куьн (вы)</td></tr>
</table>`
  },
  {
    title: '3. Падежная система',
    body: `
<p>Лезгинский язык имеет богатую падежную систему — около <strong>18 падежей</strong>. Основные:</p>
<table class="grammar-table">
  <tr><th>Падеж</th><th>Суффикс</th><th>Значение</th><th>Пример</th></tr>
  <tr><td>Именительный</td><td>—</td><td>подлежащее</td><td class="lezgi">кIвал (дом)</td></tr>
  <tr><td>Эргативный</td><td>-а / -и</td><td>действующее лицо</td><td class="lezgi">кIвала (дом делает)</td></tr>
  <tr><td>Родительный</td><td>-ан / -ин</td><td>принадлежность</td><td class="lezgi">кIвалан (домашний)</td></tr>
  <tr><td>Дательный</td><td>-аз / -из</td><td>кому / куда</td><td class="lezgi">кIвализ (домой, к дому)</td></tr>
</table>
<div class="example-box">
  <div class="lz">Зун кIвализ физва.</div>
  <div class="ru">Я иду домой. (кIвал+из = дом+в, директив)</div>
</div>`
  },
  {
    title: '4. Личные местоимения',
    body: `
<table class="grammar-table">
  <tr><th>Русский</th><th>Лезгинский</th><th>Притяжательное</th></tr>
  <tr><td>я</td><td class="lezgi">зун</td><td class="lezgi">зи (мой)</td></tr>
  <tr><td>ты</td><td class="lezgi">вун</td><td class="lezgi">ви (твой)</td></tr>
  <tr><td>он/она</td><td class="lezgi">ам</td><td class="lezgi">адан (его/её)</td></tr>
  <tr><td>мы</td><td class="lezgi">чун</td><td class="lezgi">чи (наш)</td></tr>
  <tr><td>вы</td><td class="lezgi">куьн</td><td class="lezgi">куьне (ваш)</td></tr>
  <tr><td>они</td><td class="lezgi">абур</td><td class="lezgi">абурун (их)</td></tr>
</table>`
  },
  {
    title: '5. Глаголы и спряжение',
    body: `
<p>Глаголы в лезгинском стоят <strong>в конце предложения</strong>. Основные времена:</p>
<table class="grammar-table">
  <tr><th>Время</th><th>Пример</th><th>Перевод</th></tr>
  <tr><td>Настоящее</td><td class="lezgi">Зун физва</td><td>Я иду (сейчас)</td></tr>
  <tr><td>Прошедшее</td><td class="lezgi">Зун фена</td><td>Я пошёл</td></tr>
  <tr><td>Будущее</td><td class="lezgi">Зун фида</td><td>Я пойду</td></tr>
</table>
<div class="example-box">
  <div class="lz">Диде аш пиширзава.</div>
  <div class="ru">Мама варит суп.</div>
</div>`
  },
  {
    title: '6. Отрицание',
    body: `
<p>Отрицание образуется суффиксом <strong>-ач</strong> или формой <strong>туш</strong>:</p>
<table class="grammar-table">
  <tr><th>Утвердительно</th><th>Отрицательно</th><th>Перевод</th></tr>
  <tr><td class="lezgi">Физва</td><td class="lezgi">Физвач</td><td>Идёт / Не идёт</td></tr>
  <tr><td class="lezgi">Ктаб ава</td><td class="lezgi">Ктаб авач</td><td>Книга есть / нет</td></tr>
  <tr><td class="lezgi">Хъсан я</td><td class="lezgi">Хъсан туш</td><td>Хороший / Не хороший</td></tr>
</table>
<div class="example-box">
  <div class="lz">Зун физвач.</div>
  <div class="ru">Я не иду.</div>
</div>`
  },
  {
    title: '7. Порядок слов (SOV)',
    body: `
<p>Стандартный порядок: <strong>Подлежащее — Дополнение — Глагол</strong>.</p>
<div class="example-box">
  <div class="lz">Зун ктаб кIелзава.</div>
  <div class="ru">Я книгу читаю.</div>
</div>
<div class="example-box">
  <div class="lz">Вун вуж я?</div>
  <div class="ru">Ты кто?</div>
</div>
<p>Вопрос образуется частицей <strong>-ни</strong> в конце:</p>
<div class="example-box">
  <div class="lz">Вун физвани?</div>
  <div class="ru">Ты идёшь?</div>
</div>`
  },
  {
    title: '8. Полезные фразы',
    body: `
<table class="grammar-table">
  <tr><th>Лезгинский</th><th>Русский</th></tr>
  <tr><td class="lezgi">Салам!</td><td>Привет!</td></tr>
  <tr><td class="lezgi">Хъсан йикъ хьурай!</td><td>Хорошего дня!</td></tr>
  <tr><td class="lezgi">Сагърай!</td><td>Спасибо! / Будь здоров!</td></tr>
  <tr><td class="lezgi">Вун вуж я?</td><td>Кто ты?</td></tr>
  <tr><td class="lezgi">Зун лезги я</td><td>Я лезгин</td></tr>
  <tr><td class="lezgi">Хъсан я</td><td>Хорошо / Ладно</td></tr>
  <tr><td class="lezgi">Гьа я</td><td>Да</td></tr>
  <tr><td class="lezgi">Яч / Туш</td><td>Нет</td></tr>
  <tr><td class="lezgi">Зун чидач</td><td>Я не знаю</td></tr>
  <tr><td class="lezgi">Зун лезгин чIал чирзава</td><td>Я учу лезгинский язык</td></tr>
</table>`
  }
];
