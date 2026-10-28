import './style.css';
import { MINIGAMES } from './minigames.js';
import { audio } from './audio.js';

// 지역 묶음만 바꾸면 다른 시군판이 된다: public/regions/<REGION>/
const REGION = 'geumsan';
const BASE = `${import.meta.env.BASE_URL}regions/${REGION}/`;
const RULES = { turns: 12, hearts: 3, buses: 3, stamps: 4, quizSec: 15, correct: 10, minigame: 15, lapBonus: 5, finishBonus: 30 };

// 선생님 설정: 이 기기에만 저장된다 (저장이 막힌 브라우저에서는 기본값)
const SETTINGS_KEY = 'geumsan-marble-settings';
const DEFAULTS = { turns: 12, hearts: 3, quizSec: 15, minigameRate: 0.5, classMin: 0 };
const SETTING_OPTIONS = [
  { key: 'turns', label: '턴 수', options: [[8, '8턴'], [12, '12턴'], [16, '16턴']] },
  { key: 'hearts', label: '하트', options: [[3, '3개'], [5, '5개']] },
  { key: 'quizSec', label: '문제 시간', options: [[15, '15초'], [20, '20초'], [30, '30초'], [0, '제한 없음']] },
  { key: 'minigameRate', label: '미니게임', options: [[0, '끄기'], [0.5, '보통'], [0.8, '많이']] },
  { key: 'classMin', label: '수업 시간 모드', options: [[0, '끄기'], [15, '15분'], [20, '20분'], [30, '30분'], [40, '40분']] },
];
let settings = { ...DEFAULTS };
try {
  settings = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
} catch {}
function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
}
const CATEGORY = { history: '역사', people: '인물', specialty: '특산물', nature: '자연', society: '과학·사회', environment: '환경', safety: '안전' };
const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };

const $app = document.getElementById('app');
const $ = (sel) => $app.querySelector(sel);
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

let D; // board, questions, facts, nicknames
let S; // 한 판의 상태
const profile = { nickname: '', level: 'low', piece: null };

// 버튼을 새로 추가하는 화면도 자동으로 기본 클릭음을 얻는다.
document.addEventListener(
  'click',
  (e) => {
    const button = e.target.closest?.('button');
    if (!button || button.dataset.sound === 'none') return;
    audio.unlock();
    audio.startBgm();
    audio.play(button.dataset.sound || 'click');
  },
  true,
);

function soundToggleMarkup() {
  return `<button class="sound-toggle" id="soundToggle" data-sound="none" aria-label="소리 켜기/끄기"></button>`;
}

function bindSoundToggle() {
  const button = $('#soundToggle');
  if (!button) return;
  const sync = () => {
    const on = audio.isEnabled();
    button.textContent = on ? '🔊 소리 켜짐' : '🔇 소리 꺼짐';
    button.classList.toggle('off', !on);
  };
  button.onclick = (e) => {
    e.stopPropagation();
    audio.toggle();
    sync();
  };
  sync();
}

// ---------- 그림: 없으면 이모지로 대신 보여 준다 ----------
function art(src, emoji, cls = '', fallback = '') {
  const fb = fallback ? ` data-fallback="${BASE}${fallback}"` : '';
  return `<img class="${cls}" src="${BASE}${src}" alt="" draggable="false" data-emoji="${emoji}"${fb}>`;
}
document.addEventListener(
  'error',
  (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.emoji) return;
    if (img.dataset.fallback) {
      const f = img.dataset.fallback;
      delete img.dataset.fallback;
      img.src = f;
      return;
    }
    const span = document.createElement('span');
    span.className = `${img.className} emoji-art`;
    span.textContent = img.dataset.emoji;
    img.replaceWith(span);
  },
  true,
);

const url = (src) => `${BASE}${src}`;
const ui = (key, emoji, cls) => art(D.board.ui[key], emoji, cls);

function guideImg(expr) {
  const g = S.guide;
  return art(g.art[expr], g.emoji, 'guide', g.art.normal);
}

function tileInfo(t) {
  const b = D.board;
  if (t.type === 'place') return b.places[t.place];
  if (t.type === 'start') return { name: b.startName, short: '출발', emoji: '🎪', art: b.startArt };
  if (t.type === 'rest') return { name: b.restName, short: '쉼터', emoji: '🛖', art: b.restArt };
  return { name: b.chanceName, short: '찬스', emoji: '🎁', art: b.chanceArt };
}

// ---------- 시작 ----------
async function load() {
  const get = (f) =>
    fetch(BASE + f).then((r) => {
      if (!r.ok) throw new Error(f);
      return r.json();
    });
  try {
    const [board, questions, facts, nicknames] = await Promise.all(
      ['board.json', 'questions.json', 'facts.json', 'nicknames.json'].map(get),
    );
    D = { board, questions, facts, nicknames };
    document.title = board.title;
    // 종이 무늬가 없으면 CSS가 그냥 단색을 쓴다
    document.documentElement.style.setProperty('--paper', `url('${url(board.ui.paper)}')`);
    showTitle();
    if (import.meta.env.PROD) setupOffline(board);
  } catch (err) {
    $app.innerHTML = `<div class="loading"><p>지도를 불러오지 못했어요. (${esc(err.message)})</p></div>`;
  }
}

// 오프라인 설치: 지금 쓴 파일과 board.json에 적힌 그림을 모두 미리 저장해 둔다
async function setupOffline(board) {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
    const reg = await navigator.serviceWorker.ready;
    const arts = [
      board.mapArt, board.startArt, board.restArt, board.chanceArt,
      ...Object.values(board.places).map((p) => p.art),
      ...board.pieces.map((p) => p.art),
      ...board.guides.flatMap((g) => Object.values(g.art)),
      ...Object.values(board.ui),
      ...Object.values(board.minigameArt).flat(),
    ];
    const urls = [
      location.origin + import.meta.env.BASE_URL,
      ...performance.getEntriesByType('resource').map((r) => r.name),
      ...['board.json', 'questions.json', 'facts.json', 'nicknames.json', ...arts].map((f) => new URL(url(f), location.href).href),
    ];
    reg.active?.postMessage({ type: 'precache', urls: [...new Set(urls)] });
  } catch {}
}

const FLOAT_POS = [
  [9, 18], [88, 14], [6, 62], [92, 58], [20, 84], [80, 86], [30, 10], [70, 8], [4, 40], [95, 36],
];

function showTitle() {
  const b = D.board;
  const floats = Object.values(b.places)
    .map((p, i) => {
      const [x, y] = FLOAT_POS[i % FLOAT_POS.length];
      return `<span class="float" style="left:${x}%;top:${y}%;--d:${i * 0.4}s">${p.emoji}</span>`;
    })
    .join('');
  $app.innerHTML = `
    <div class="screen title-screen" style="--title-bg:url('${url(b.ui.titleBg)}')">
      ${floats}
      <p class="title-sub">주사위를 굴려 ${esc(b.regionName)}을 탐험해요!</p>
      <h1 class="title"><span>다 같이 돌자,</span><span class="big">${esc(b.regionName)} <em>한</em> 바퀴</span></h1>
      <p class="chip">연습 모드 · 기록은 저장되지 않아요</p>
      <button class="btn primary big-btn">화면을 눌러 시작!</button>
      <button class="mg-link" id="mgOnly">🎮 미니게임만 해 보기</button>
      <button class="mg-link teacher-link" id="teacher">⚙️ 선생님 설정</button>
      ${soundToggleMarkup()}
      <div class="modal-wrap" id="modal"></div>
    </div>`;
  bindSoundToggle();
  $('.title-screen').onclick = (e) => {
    if (e.target.closest('#mgOnly, #teacher, #soundToggle, .modal-wrap')) return;
    audio.unlock();
    audio.startBgm();
    audio.play('start');
    showNickname();
  };
  $('#modal').onclick = (e) => e.stopPropagation(); // 연습 모달 안의 클릭이 '시작'으로 번지지 않게
  $('#mgOnly').onclick = (e) => {
    e.stopPropagation();
    practiceMinigames();
  };
  $('#teacher').onclick = (e) => {
    e.stopPropagation();
    teacherSettings();
  };
}

async function teacherSettings() {
  const draft = { ...settings };
  const rows = SETTING_OPTIONS.map(
    (s) => `
      <div class="set-row"><b>${s.label}</b><div class="seg">${s.options
        .map(([v, label]) => `<button class="seg-btn" data-key="${s.key}" data-val="${v}">${label}</button>`)
        .join('')}</div></div>`,
  ).join('');
  const v = await modal(
    `<h2>⚙️ 선생님 설정</h2>
     <p class="muted">이 기기에 저장돼요. 수업 시간 모드를 켜면 정한 시간이 지난 뒤 지금 턴이 끝날 때 게임이 마무리돼요.</p>
     <div class="settings">${rows}</div>
     <div class="row center">
       <button class="btn ghost" data-close="reset">기본값으로</button>
       <button class="btn ghost" data-close="">취소</button>
       <button class="btn primary" data-close="save">저장</button>
     </div>`,
    'small',
    (wrap) => {
      const sync = () =>
        wrap.querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('sel', Number(b.dataset.val) === draft[b.dataset.key]));
      wrap.querySelectorAll('.seg-btn').forEach(
        (b) =>
          (b.onclick = () => {
            draft[b.dataset.key] = Number(b.dataset.val);
            sync();
          }),
      );
      sync();
    },
  );
  if (v === 'save') settings = draft;
  if (v === 'reset') settings = { ...DEFAULTS };
  if (v) saveSettings();
}

// 첫 화면에서 미니게임만 골라 연습한다 (점수·도장 없음)
async function practiceMinigames() {
  audio.unlock();
  audio.startBgm();
  S = { guide: pick(D.board.guides) };
  for (;;) {
    const id = await modal(
      `<h2>🎮 미니게임 연습</h2>
       <div class="intro-cards">${Object.entries(MINIGAMES)
         .map(([k, m]) => `<button class="intro-card" data-close="${k}"><span class="mg-emoji">${m.emoji}</span><b>${m.title}</b></button>`)
         .join('')}</div>
       <div class="row center">
         <button class="btn ghost" data-close="">닫기</button>
         <button class="btn gold small" data-close="level">난이도: ${profile.level === 'low' ? '🌱 쉬움' : '🌳 보통'}</button>
       </div>`,
      'small',
    );
    if (!id) return;
    if (id === 'level') {
      profile.level = profile.level === 'low' ? 'high' : 'low';
      continue;
    }
    await playMinigame(id, () => '');
  }
}

function homeButton() {
  return `<button class="home" data-home>🏠 처음으로</button>`;
}
function bindHome() {
  $app.querySelectorAll('[data-home]').forEach((b) => (b.onclick = showTitle));
}

function showNickname() {
  $app.innerHTML = `
    <div class="screen center">
      ${homeButton()}
      <div class="card setup">
        <div class="steps"><i class="on">1</i><i>2</i></div>
        <h2>별명을 정해요</h2>
        <p class="muted">게임에서 부를 이름이에요. 고르기 어려우면 추천 별명을 눌러 보세요.</p>
        <div class="row">
          <input id="nick" maxlength="8" placeholder="2~8글자" autocomplete="off" value="${esc(profile.nickname)}">
          <button class="btn gold" id="rand">🎲 추천 별명</button>
        </div>
        <p class="warn">⚠️ 진짜 이름은 쓰지 마세요!</p>
        <div class="row end"><button class="btn primary" id="next">다음</button></div>
      </div>
    </div>`;
  bindHome();
  const input = $('#nick');
  const next = $('#next');
  const check = () => (next.disabled = input.value.trim().length < 2);
  input.oninput = check;
  $('#rand').onclick = () => {
    const { adjectives, nouns } = D.nicknames;
    input.value = (pick(adjectives) + pick(nouns)).slice(0, 8);
    check();
  };
  next.onclick = () => {
    profile.nickname = input.value.trim();
    showReady();
  };
  check();
  input.focus();
}

function showReady() {
  const pieces = D.board.pieces;
  profile.piece ??= pieces[0].id;
  $app.innerHTML = `
    <div class="screen center">
      ${homeButton()}
      <div class="card setup wide">
        <div class="steps"><i class="on">1</i><i class="on">2</i></div>
        <h2>${esc(profile.nickname)}, 준비됐나요?</h2>
        <h3>난이도</h3>
        <div class="levels">
          <button class="opt" data-level="low"><span class="opt-emoji">🌱</span><b>쉬움</b><small>처음 해 보는 친구 · 쉬운 문제</small></button>
          <button class="opt" data-level="high"><span class="opt-emoji">🌳</span><b>보통</b><small>도전하고 싶은 친구 · 조금 어려운 문제</small></button>
        </div>
        <h3>내 말 고르기</h3>
        <div class="pieces">
          ${pieces.map((p) => `<button class="opt piece-opt" data-piece="${p.id}">${art(p.art, p.emoji, 'piece-pick')}<b>${esc(p.name)}</b></button>`).join('')}
        </div>
        <div class="row between">
          <button class="btn ghost" id="back">← 이전</button>
          <button class="btn primary" id="go">출발! 🚩</button>
        </div>
      </div>
    </div>`;
  bindHome();
  const sync = () => {
    $app.querySelectorAll('[data-level]').forEach((b) => b.classList.toggle('sel', b.dataset.level === profile.level));
    $app.querySelectorAll('[data-piece]').forEach((b) => b.classList.toggle('sel', b.dataset.piece === profile.piece));
  };
  $app.querySelectorAll('[data-level]').forEach((b) => (b.onclick = () => ((profile.level = b.dataset.level), sync())));
  $app.querySelectorAll('[data-piece]').forEach((b) => (b.onclick = () => ((profile.piece = b.dataset.piece), sync())));
  $('#back').onclick = showNickname;
  $('#go').onclick = startGame;
  sync();
}

// ---------- 게임판 ----------
function startGame() {
  audio.unlock();
  audio.startBgm();
  audio.play('start');
  RULES.turns = settings.turns;
  RULES.hearts = settings.hearts;
  RULES.quizSec = settings.quizSec;
  const placeIds = Object.keys(D.board.places);
  S = {
    tile: D.board.start,
    turn: 1,
    hearts: RULES.hearts,
    score: 0,
    buses: RULES.buses,
    hints: 1,
    stamps: shuffle(placeIds).slice(0, RULES.stamps),
    got: new Set(),
    used: new Set(),
    asked: 0,
    correct: 0,
    guide: pick(D.board.guides),
    piece: D.board.pieces.find((p) => p.id === profile.piece),
    busy: true,
    finished: false,
    deadline: settings.classMin ? Date.now() + settings.classMin * 60000 : 0,
  };
  renderBoard();
  openIntro();
}

function renderBoard() {
  const b = D.board;
  const pos = (t) => `left:${(t.x / b.width) * 100}%;top:${(t.y / b.height) * 100}%`;
  const lines = b.tiles
    .flatMap((t) =>
      t.next.map((n) => `<line x1="${t.x}" y1="${t.y}" x2="${b.tiles[n].x}" y2="${b.tiles[n].y}"/>`),
    )
    .join('');
  const tiles = b.tiles
    .map((t) => {
      const info = tileInfo(t);
      const label = t.type === 'start' ? `${info.name} · 출발/골인` : info.name;
      return `
        <div class="tile tile-${t.type}${t.label === 'left' ? ' label-left' : ''}" data-tile="${t.id}" style="${pos(t)}">
          <span class="dot"></span>
          ${art(info.art, info.emoji, 'bld')}
          <span class="tile-label">${esc(label)}</span>
        </div>`;
    })
    .join('');
  $app.innerHTML = `
    <div class="screen game">
      <div class="stage" id="stage">
        ${art(b.mapArt, '🗺️', 'map')}
        <svg class="paths" viewBox="0 0 ${b.width} ${b.height}" preserveAspectRatio="none">${lines}</svg>
        ${tiles}
        <div class="piece" id="piece">${art(S.piece.art, S.piece.emoji, 'piece-img')}<span class="me">나</span></div>
      </div>
      <div class="hud hud-player">${art(S.piece.art, S.piece.emoji, 'hud-piece')}<div><b>${esc(profile.nickname)}</b><small>${profile.level === 'low' ? '쉬움' : '보통'}</small></div></div>
      <div class="hud hud-stamps" id="stamps"></div>
      <div class="hud hud-status" id="status"></div>
      <button class="bus" id="bus" data-sound="bus">${ui('bus', '🚌', 'bus-icon')}<b>${esc(b.busName)}</b><i id="busN"></i></button>
      <button class="dice" id="dice" data-sound="dice"><span class="die" id="die">${pips(1)}</span><b>주사위 굴리기</b></button>
      ${soundToggleMarkup()}
      <div class="toast" id="toast"></div>
      <div class="modal-wrap" id="modal"></div>
    </div>`;
  bindSoundToggle();
  $('#dice').onclick = rollTurn;
  $('#bus').onclick = busTurn;
  placePiece(S.tile);
  updateHud();
}

function pips(n) {
  return Array.from({ length: 9 }, (_, i) => `<i class="${PIPS[n].includes(i) ? 'on' : ''}"></i>`).join('');
}

function updateHud() {
  const places = D.board.places;
  $('#stamps').innerHTML = `
    <b>오늘의 도장 ${S.got.size} / ${S.stamps.length}</b>
    <div class="stamp-row">${S.stamps
      .map((id) => `<span class="stamp${S.got.has(id) ? ' got' : ''}"><i>${S.got.has(id) ? ui('stamp', '✔', 'stamp-img') : places[id].emoji}</i><small>${esc(places[id].short)}</small></span>`)
      .join('')}</div>`;
  const hearts = Array.from({ length: RULES.hearts }, (_, i) =>
    i < S.hearts ? ui('heart', '❤️', 'heart') : ui('heartEmpty', '🤍', 'heart'),
  ).join('');
  $('#status').innerHTML = `
    <span class="hearts">${hearts}</span>
    <span class="score">${ui('score', '🪙', 'score-icon')}<span><small>점수</small><b>${S.score}</b></span></span>
    <span class="turn">턴 ${S.turn} / ${RULES.turns}</span>
    ${S.deadline ? `<span class="clock" id="clock">⏰ ${clockText()}</span>` : ''}`;
  $('#busN').textContent = `×${S.buses}`;
  $('#dice').disabled = S.busy;
  $('#bus').disabled = S.busy || S.buses <= 0;
  $app.querySelectorAll('.tile-place').forEach((el) => {
    const id = D.board.tiles[el.dataset.tile].place;
    el.classList.toggle('is-stamp', S.stamps.includes(id) && !S.got.has(id));
    el.classList.toggle('is-got', S.got.has(id));
  });
}

function clockText() {
  const left = Math.max(0, Math.ceil((S.deadline - Date.now()) / 1000));
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
}
const timeUp = () => S.deadline && Date.now() >= S.deadline;
setInterval(() => {
  const el = document.getElementById('clock');
  if (!el || !S?.deadline) return;
  el.textContent = `⏰ ${clockText()}`;
  el.classList.toggle('urgent', S.deadline - Date.now() < 60000);
}, 1000);

function placePiece(id, hop = false) {
  const t = D.board.tiles[id];
  const el = $('#piece');
  el.style.left = `${(t.x / D.board.width) * 100}%`;
  el.style.top = `${(t.y / D.board.height) * 100}%`;
  if (hop) {
    el.classList.remove('hop');
    void el.offsetWidth;
    el.classList.add('hop');
  }
  $app.querySelectorAll('.tile.active').forEach((x) => x.classList.remove('active'));
  $app.querySelector(`[data-tile="${id}"]`)?.classList.add('active');
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
}

// 모달은 Promise로: 버튼(data-close)을 누르면 그 값으로 끝난다
function modal(html, cls = '', onMount) {
  return new Promise((resolve) => {
    const wrap = $('#modal');
    wrap.innerHTML = `<div class="modal ${cls}">${html}</div>`;
    wrap.classList.add('open');
    audio.play('modal');
    const done = (v) => {
      wrap.classList.remove('open');
      wrap.innerHTML = '';
      resolve(v);
    };
    wrap.querySelectorAll('[data-close]').forEach((b) => (b.onclick = () => done(b.dataset.close)));
    onMount?.(wrap, done);
  });
}

function say(expr, text) {
  return `<div class="say">${guideImg(expr)}<p>${text}</p></div>`;
}

async function openIntro() {
  const places = D.board.places;
  await modal(
    `${say('normal', `안녕! 나는 ${esc(S.guide.name)}야. 오늘 같이 ${esc(D.board.regionName)}을 돌아보자!`)}
     <h2>⭐ 오늘의 도장</h2>
     <p>이 ${S.stamps.length}곳에서 문제를 맞혀 도장을 모으고, <b>${esc(D.board.startName)}</b>으로 돌아오세요!</p>
     <div class="intro-cards">${S.stamps
       .map((id) => `<div class="intro-card">${art(places[id].art, places[id].emoji, 'intro-bld')}<b>${esc(places[id].name)}</b></div>`)
       .join('')}</div>
     <p class="muted">🚌 ${esc(D.board.busName)} ${S.buses}번: 왼쪽 아래 버스를 누르면 도장 장소로 바로 갈 수 있어요.</p>
     <button class="btn primary" data-close>좋아요, 출발!</button>`,
    'intro',
  );
  S.busy = false;
  updateHud();
}

// ---------- 한 턴 ----------
async function rollTurn() {
  if (S.busy) return;
  S.busy = true;
  updateHud();
  const die = $('#die');
  let n = 1;
  die.classList.add('rolling');
  for (let i = 0; i < 10; i++) {
    audio.play('dice-roll');
    n = 1 + Math.floor(Math.random() * 6);
    die.innerHTML = pips(n);
    await sleep(55 + i * 14);
  }
  die.classList.remove('rolling');
  audio.play('dice');
  toast(`${n}칸 앞으로!`);
  await sleep(350);
  await move(n);
  await land();
  endTurn();
}

async function busTurn() {
  if (S.busy || S.buses <= 0) return;
  const places = D.board.places;
  const left = S.stamps.filter((id) => !S.got.has(id));
  const options = left.length
    ? left.map((id) => ({ id, name: places[id].name, art: places[id].art, emoji: places[id].emoji }))
    : [{ id: '__start', name: D.board.startName, art: D.board.startArt, emoji: '🎪' }];
  const choice = await modal(
    `<h2>🚌 어디로 갈까요?</h2>
     <p class="muted">버스를 타면 이번 턴에는 주사위를 굴리지 않아요. (남은 버스 ${S.buses}번)</p>
     <div class="intro-cards">${options
       .map((o) => `<button class="intro-card" data-close="${o.id}">${art(o.art, o.emoji, 'intro-bld')}<b>${esc(o.name)}</b></button>`)
       .join('')}</div>
     <button class="btn ghost" data-close="">그만둘래요</button>`,
    'intro',
  );
  if (!choice) return;
  audio.play('bus');
  S.busy = true;
  S.buses--;
  updateHud();
  const target = choice === '__start' ? D.board.start : D.board.tiles.find((t) => t.place === choice).id;
  const piece = $('#piece');
  piece.classList.add('fly');
  S.tile = target;
  placePiece(target, true);
  await sleep(700);
  piece.classList.remove('fly');
  if (target === D.board.start) reachStart();
  else await land();
  endTurn();
}

async function chooseFork(t) {
  const names = D.board.forks?.[t.id] ?? t.next.map((n) => tileInfo(D.board.tiles[n]).name);
  const v = await modal(
    `<h2>갈림길이에요! 어느 쪽으로 갈까요?</h2>
     <div class="row center">${t.next.map((n, i) => `<button class="btn primary" data-close="${n}">${esc(names[i])}</button>`).join('')}</div>`,
  );
  return Number(v);
}

async function move(steps) {
  const b = D.board;
  for (let i = 0; i < steps; i++) {
    const t = b.tiles[S.tile];
    const next = t.next.length > 1 ? await chooseFork(t) : t.next[0];
    S.tile = next;
    placePiece(next, true);
    audio.play('step');
    await sleep(280);
    if (next === b.start && reachStart()) return; // 도장을 다 모으고 돌아오면 바로 끝
  }
}

// 출발 칸에 닿을 때. 도장을 다 모았으면 완주(true)
function reachStart() {
  if (S.got.size === S.stamps.length) {
    S.finished = true;
    audio.play('finish');
    return true;
  }
  S.score += RULES.lapBonus;
  toast(`한 바퀴 돌았어요! +${RULES.lapBonus}점`);
  updateHud();
  return false;
}

async function land(fromChance = false) {
  if (S.finished) return;
  const t = D.board.tiles[S.tile];
  if (t.type === 'place') return placeQuiz(t.place);
  if (t.type === 'chance') return fromChance ? bonusPoints() : chance();
  if (t.type === 'rest') return rest();
  if (t.type === 'start') return factCard('normal', `${esc(D.board.startName)}에 돌아왔어요!`);
}

function endTurn() {
  updateHud();
  if (S.finished || S.hearts <= 0 || S.turn >= RULES.turns || timeUp()) {
    showEnd();
    return;
  }
  S.turn++;
  S.busy = false;
  updateHud();
}

// ---------- 퀴즈 ----------
function pickQuestion(placeId) {
  const levelOk = (q) => q.level === 'both' || q.level === profile.level;
  const ok = (q) => !S.used.has(q.id) && levelOk(q);
  const cats = placeId ? D.board.places[placeId].categories : [];
  const qs = D.questions;
  let pool = placeId ? qs.filter((q) => ok(q) && q.places?.includes(placeId)) : [];
  if (!pool.length) pool = qs.filter((q) => ok(q) && cats.includes(q.category));
  if (!pool.length) pool = qs.filter(ok);
  if (!pool.length) {
    S.used.clear();
    pool = qs.filter(levelOk);
  }
  const q = pick(pool);
  S.used.add(q.id);
  return q;
}

async function placeQuiz(placeId) {
  const place = D.board.places[placeId];
  const isStamp = S.stamps.includes(placeId) && !S.got.has(placeId);
  const games = place.minigames ?? [];
  const rate = settings.minigameRate;
  if (games.length && rate > 0 && (place.mode === 'minigame' || (place.mode === 'quiz_or_minigame' && Math.random() < rate))) {
    const ok = await playMinigame(pick(games), (won) => {
      if (!won) return '<p class="muted">괜찮아요, 하트는 그대로예요.</p>';
      S.score += RULES.minigame;
      if (isStamp) {
        S.got.add(placeId);
        audio.play('stamp');
        return `<div class="stamp-big">${place.emoji}<b>도장 쾅!</b></div><p class="gain">+${RULES.minigame}점 · 오늘의 도장을 받았어요</p>`;
      }
      return `<p class="gain">+${RULES.minigame}점</p>`;
    }, place);
    updateHud();
    return ok;
  }
  const q = pickQuestion(placeId);
  const result = await askQuiz(q, `${place.emoji} ${place.name}`, (r) => {
    if (r === 'correct') {
      S.score += RULES.correct;
      S.correct++;
      if (isStamp) {
        S.got.add(placeId);
        audio.play('stamp');
        return `<div class="stamp-big">${place.emoji}<b>도장 쾅!</b></div><p class="gain">+${RULES.correct}점 · 오늘의 도장을 받았어요</p>`;
      }
      return `<p class="gain">+${RULES.correct}점</p>`;
    }
    S.hearts--;
    return `<p class="loss">하트 −1</p>`;
  });
  updateHud();
  return result;
}

// 문제를 내고 'correct' | 'wrong' | 'timeout' 을 돌려준다
function askQuiz(q, where, apply) {
  S.asked++;
  const order = q.type === 'ox' ? [0, 1] : shuffle(q.choices.map((_, i) => i));
  const photo = q.image ? `<img class="quiz-photo" src="${BASE}${q.image}" alt="">` : '';
  const canHint = S.hints > 0 && q.type !== 'ox';
  const html = `
    <div class="quiz-head">
      <span class="where">${esc(where)}</span><span class="tag">${CATEGORY[q.category] ?? ''}</span>
      ${RULES.quizSec ? `<div class="timer"><i id="bar"></i><b id="sec">${RULES.quizSec}</b></div>` : ''}
    </div>
    <div class="quiz-q">${guideImg('think')}<div class="bubble">${esc(q.question)}</div></div>
    ${photo}
    <div class="choices ${q.type === 'ox' ? 'ox' : ''}">${order
      .map((ci, k) => `<button class="choice" data-c="${ci}">${q.type === 'ox' ? '' : `<span class="num">${k + 1}</span>`}${esc(q.choices[ci])}</button>`)
      .join('')}</div>
    <div class="quiz-foot"><button class="btn gold small" id="hint" ${canHint ? '' : 'disabled'}>${ui('hint', '💡', 'btn-icon')} 힌트 (${S.hints}번)</button></div>
    <div class="quiz-result" id="result"></div>`;
  return modal(html, 'quiz', (wrap, done) => {
    const start = performance.now();
    const total = RULES.quizSec * 1000;
    const bar = wrap.querySelector('#bar');
    const sec = wrap.querySelector('#sec');
    // 문제 시간 '제한 없음'이면 타이머를 돌리지 않는다
    const timer = total && setInterval(() => {
      const left = Math.max(0, total - (performance.now() - start));
      bar.style.width = `${(left / total) * 100}%`;
      sec.textContent = Math.ceil(left / 1000);
      if (left <= 0) finish('timeout', null);
    }, 100);

    wrap.querySelector('#hint').onclick = (e) => {
      audio.play('hint');
      S.hints--;
      e.currentTarget.disabled = true;
      const wrong = shuffle([...wrap.querySelectorAll('.choice')].filter((b) => Number(b.dataset.c) !== q.answer));
      wrong.slice(0, Math.max(0, wrong.length - 1)).forEach((b) => b.classList.add('gone'));
    };
    wrap.querySelectorAll('.choice').forEach((b) => (b.onclick = () => finish(Number(b.dataset.c) === q.answer ? 'correct' : 'wrong', b)));

    let ended = false;
    function finish(r, btn) {
      if (ended) return;
      ended = true;
      audio.play(r === 'correct' ? 'correct' : r === 'wrong' ? 'wrong' : 'timeout');
      clearInterval(timer);
      wrap.querySelectorAll('.choice').forEach((b) => {
        b.disabled = true;
        if (Number(b.dataset.c) === q.answer) b.classList.add('right');
      });
      btn?.classList.add(r === 'correct' ? 'right' : 'wrong');
      wrap.querySelector('#hint').disabled = true;
      const face = { correct: 'happy', wrong: 'sad', timeout: 'surprised' }[r];
      const title = { correct: '정답이에요! 🎉', wrong: '아쉬워요!', timeout: '시간이 다 됐어요!' }[r];
      const extra = apply(r);
      const res = wrap.querySelector('#result');
      res.innerHTML = `
        <div class="say">${guideImg(face)}<div><h3>${title}</h3><p>${esc(q.explanation)}</p></div></div>
        ${extra}
        <button class="btn primary" id="cont">계속하기</button>`;
      res.classList.add('show');
      updateHud();
      res.querySelector('#cont').onclick = () => done(r);
    }
  });
}

// ---------- 미니게임 ----------
// 설명 → 게임 → 결과(apply가 점수·도장을 반영하고 보여 줄 HTML을 돌려준다)
function playMinigame(id, apply, place) {
  const mg = MINIGAMES[id];
  const where = place ? `${place.emoji} ${esc(place.name)} · ` : '';
  return modal(
    `<div class="quiz-head"><span class="where">${where}🎮 ${mg.title}</span><span class="tag">미니게임</span></div>
     <div class="mg-area" id="mgArea">
       ${say('think', mg.how)}
       <button class="btn primary" id="mgStart">시작!</button>
     </div>
     <div class="quiz-result" id="result"></div>`,
    'quiz minigame',
    (wrap, done) => {
      wrap.querySelector('#mgStart').onclick = async () => {
        audio.play('minigame-start');
        const area = wrap.querySelector('#mgArea');
        const ctx = { art, url, mg: D.board.minigameArt, level: profile.level, audio };
        const won = await mg.run(area, ctx);
        audio.play(won ? 'win' : 'lose');
        const extra = apply(won);
        const res = wrap.querySelector('#result');
        res.innerHTML = `
          ${say(won ? 'happy' : 'sad', won ? `${mg.title} 성공! 🎉` : '아쉬워요, 다음엔 꼭!')}
          ${extra}
          <button class="btn primary" id="cont">계속하기</button>`;
        res.classList.add('show');
        res.scrollIntoView({ block: 'nearest' });
        updateHudSafe();
        res.querySelector('#cont').onclick = () => done(won);
      };
    },
  );
}

// 연습 모드(첫 화면)에는 HUD가 없다
function updateHudSafe() {
  if ($('#status')) updateHud();
}

// ---------- 찬스 · 쉼터 ----------
async function chance() {
  const events = [
    { text: '인삼 씨앗을 한 줌 주웠어요!', note: '+10점', run: () => (S.score += 10) },
    { text: '버스표를 한 장 얻었어요!', note: `${D.board.busName} +1`, run: () => S.buses++ },
    S.hearts < RULES.hearts
      ? { text: '홍삼 한 뿌리를 먹고 힘이 났어요!', note: '하트 +1', run: () => S.hearts++ }
      : { text: '홍삼 한 뿌리를 먹고 힘이 났어요!', note: '하트가 가득해서 +10점', run: () => (S.score += 10) },
    { text: '금강 바람을 타고 앞으로 날아가요!', note: '2칸 앞으로', run: async () => (await move(2), land(true)) },
    { text: '깜짝 퀴즈! 맞히면 +20점, 틀려도 하트는 그대로예요.', note: '도전!', run: () => bonusQuiz() },
    settings.minigameRate > 0 && {
      text: '깜짝 미니게임! 성공하면 +15점이에요.',
      note: '도전!',
      run: () => playMinigame(pick(Object.keys(MINIGAMES)), (won) => (won ? ((S.score += RULES.minigame), `<p class="gain">+${RULES.minigame}점</p>`) : '')),
    },
  ].filter(Boolean);
  const ev = pick(events);
  await modal(
    `<div class="chance-card">${art(D.board.chanceArt, '🎁', 'chance-img')}<h2>${esc(D.board.chanceName)}</h2><p>${esc(ev.text)}</p><p class="gain">${esc(ev.note)}</p></div>
     <button class="btn primary" data-close>좋아요!</button>`,
    'small',
  );
  await ev.run();
  updateHud();
}

function bonusPoints() {
  S.score += 10;
  toast('찬스 칸에 또 왔어요! +10점');
  updateHud();
}

function bonusQuiz() {
  const q = pickQuestion(null);
  return askQuiz(q, '🎁 깜짝 퀴즈', (r) => {
    if (r !== 'correct') return `<p class="muted">괜찮아요, 하트는 그대로예요.</p>`;
    S.score += 20;
    S.correct++;
    return `<p class="gain">+20점</p>`;
  });
}

async function rest() {
  let note = '';
  if (S.hearts < RULES.hearts) {
    S.hearts++;
    note = '<p class="gain">푹 쉬어서 하트 +1</p>';
  }
  updateHud();
  await factCard('normal', `${esc(D.board.restName)}에서 쉬어 가요.`, note);
}

function factCard(face, title, extra = '') {
  return modal(
    `${say(face, title)}
     <div class="fact"><b>📜 알고 있나요?</b><p>${esc(pick(D.facts))}</p></div>
     ${extra}
     <button class="btn primary" data-close>계속하기</button>`,
    'small',
  );
}

// ---------- 끝 ----------
async function showEnd() {
  S.busy = true;
  updateHud();
  let title;
  let face;
  if (S.finished) {
    S.score += RULES.finishBonus;
    title = `${esc(D.board.regionName)} 한 바퀴 완주! 🎉`;
    face = 'happy';
  } else if (S.hearts <= 0) {
    title = '하트를 모두 썼어요';
    face = 'sad';
  } else if (timeUp()) {
    title = '수업 시간이 끝났어요';
    face = 'surprised';
  } else {
    title = `${RULES.turns}턴이 끝났어요`;
    face = 'surprised';
  }
  updateHud();
  const v = await modal(
    `${S.finished ? ui('trophy', '🏆', 'trophy') : ''}
     ${say(face, title)}
     <div class="end-stats">
       <div><small>점수</small><b>${S.score}</b></div>
       <div><small>오늘의 도장</small><b>${S.got.size} / ${S.stamps.length}</b></div>
       <div><small>맞힌 문제</small><b>${S.correct} / ${S.asked}</b></div>
     </div>
     ${S.finished ? `<p class="gain">완주 보너스 +${RULES.finishBonus}점</p>` : ''}
     <div class="row center">
       <button class="btn ghost" data-close="home">처음으로</button>
       <button class="btn primary" data-close="again">한 번 더!</button>
     </div>`,
    'small',
  );
  if (v === 'again') startGame();
  else showTitle();
}

load();
