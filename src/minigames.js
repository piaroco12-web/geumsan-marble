// 미니게임은 모달 안의 root 요소에서 돌고, 성공하면 true로 끝난다.
// ctx: { art(src, emoji, cls), url(src), mg: board.minigameArt, level: 'low' | 'high' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shuffle = (a) => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const MINIGAMES = {
  ginseng: {
    title: '인삼 캐기',
    emoji: '🥕',
    how: '바늘이 <b>초록 칸</b>에 왔을 때 <b>당기기!</b>를 눌러요. 세 번 성공하면 인삼이 쏙 뽑혀요. 세 번 놓치면 뿌리가 끊어져요.',
    run: ginseng,
  },
  memory: {
    title: '깻잎 짝 맞추기',
    emoji: '🃏',
    how: '카드를 두 장씩 뒤집어 <b>같은 그림</b>을 찾아요. 시간 안에 짝을 모두 찾으면 성공!',
    run: memory,
  },
  signal: {
    title: '위성 신호 맞추기',
    emoji: '📡',
    how: '화살표 명령을 <b>순서대로</b> 넣고 <b>실행</b>을 눌러요. 신호가 산을 피해 위성까지 가면 성공! 기회는 세 번이에요.',
    run: signal,
  },
};

// ---------- 인삼 캐기: 타이밍 ----------
function ginseng(root, ctx) {
  const NEED = 3;
  const MISS = 3;
  let zone = ctx.level === 'low' ? 26 : 18; // 초록 칸 너비(%)
  let speed = ctx.level === 'low' ? 70 : 95; // 1초에 움직이는 %
  root.innerHTML = `
    <div class="mg-field" style="background-image:url('${ctx.url(ctx.mg.field)}')">
      <div class="mg-root" id="gRoot">${ctx.art(ctx.mg.root, '🥕', 'mg-root-img')}</div>
      <div class="mg-soil"></div>
      <div class="mg-pop" id="gPop"></div>
    </div>
    <div class="gauge"><span class="zone" id="gZone"></span><span class="needle" id="gNeedle"></span></div>
    <div class="mg-row">
      <span class="mg-count">성공 <b id="gHit">0</b>/${NEED} · 놓침 <b id="gMiss">0</b>/${MISS}</span>
      <button class="btn primary" id="gPull">당기기!</button>
    </div>`;
  const $ = (s) => root.querySelector(s);
  let hit = 0;
  let miss = 0;
  let pos = 0;
  let dir = 1;
  let zoneAt = 0;
  let last = performance.now();
  let raf;
  let locked = false;

  const placeZone = () => {
    zoneAt = 8 + Math.random() * (84 - zone);
    $('#gZone').style.left = `${zoneAt}%`;
    $('#gZone').style.width = `${zone}%`;
  };
  const pop = (text) => {
    const el = $('#gPop');
    el.textContent = text;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  };
  placeZone();

  return new Promise((resolve) => {
    const tick = (now) => {
      pos += dir * speed * ((now - last) / 1000);
      last = now;
      if (pos >= 100) (pos = 100), (dir = -1);
      if (pos <= 0) (pos = 0), (dir = 1);
      $('#gNeedle').style.left = `${pos}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pull = async () => {
      if (locked) return;
      locked = true;
      const ok = pos >= zoneAt && pos <= zoneAt + zone;
      if (ok) {
        hit++;
        pop(hit === NEED ? '쏙! 🎉' : '쑥!');
        $('#gRoot').style.setProperty('--up', hit / NEED);
        zone = Math.max(10, zone - 4);
        speed += 18;
      } else {
        miss++;
        pop('앗, 끊어질 뻔!');
        root.querySelector('.mg-field').classList.add('shake');
        setTimeout(() => root.querySelector('.mg-field')?.classList.remove('shake'), 400);
      }
      $('#gHit').textContent = hit;
      $('#gMiss').textContent = miss;
      if (hit >= NEED || miss >= MISS) {
        cancelAnimationFrame(raf);
        $('#gPull').disabled = true;
        await sleep(700);
        resolve(hit >= NEED);
        return;
      }
      placeZone();
      await sleep(250);
      locked = false;
    };
    $('#gPull').onclick = pull;
  });
}

// ---------- 깻잎 짝 맞추기: 기억 ----------
function memory(root, ctx) {
  const faces = ['🌱', '🍃', '🕊️', '📡'];
  const secs = ctx.level === 'low' ? 45 : 32;
  const deck = shuffle([0, 1, 2, 3, 0, 1, 2, 3]);
  const back = `background-image:url('${ctx.url(ctx.mg.cardBack)}')`;
  root.innerHTML = `
    <div class="mg-row"><span class="mg-count">찾은 짝 <b id="mFound">0</b>/4</span><div class="timer mg-timer"><i id="mBar"></i><b id="mSec">${secs}</b></div></div>
    <div class="cards">${deck
      .map((f, i) => `<button class="mcard open" data-i="${i}" data-f="${f}" disabled><span class="back" style="${back}"></span><span class="front">${ctx.art(ctx.mg.cards[f], faces[f], 'mcard-img')}</span></button>`)
      .join('')}</div>`;
  const cards = [...root.querySelectorAll('.mcard')];
  let first = null;
  let found = 0;
  let busy = false;

  return new Promise((resolve) => {
    let timer;
    const end = async (ok) => {
      clearInterval(timer);
      cards.forEach((c) => (c.disabled = true));
      await sleep(600);
      resolve(ok);
    };
    // 처음 1.5초 동안 모두 보여 준 뒤 뒤집는다
    setTimeout(() => {
      cards.forEach((c) => {
        c.classList.remove('open');
        c.disabled = false;
      });
      const start = performance.now();
      timer = setInterval(() => {
        const left = Math.max(0, secs * 1000 - (performance.now() - start));
        root.querySelector('#mBar').style.width = `${(left / (secs * 1000)) * 100}%`;
        root.querySelector('#mSec').textContent = Math.ceil(left / 1000);
        if (left <= 0) end(false);
      }, 100);
    }, 1500);

    cards.forEach(
      (c) =>
        (c.onclick = async () => {
          if (busy || c.classList.contains('open')) return;
          c.classList.add('open');
          if (!first) {
            first = c;
            return;
          }
          if (first.dataset.f === c.dataset.f) {
            first.classList.add('matched');
            c.classList.add('matched');
            first = null;
            root.querySelector('#mFound').textContent = ++found;
            if (found === 4) end(true);
            return;
          }
          busy = true;
          await sleep(700);
          first.classList.remove('open');
          c.classList.remove('open');
          first = null;
          busy = false;
        }),
    );
  });
}

// ---------- 위성 신호 맞추기: 순차 명령 ----------
const LEVELS = {
  low: [
    { start: [3, 0], target: [0, 4], blocks: [[2, 1], [1, 3]] },
    { start: [3, 0], target: [0, 2], blocks: [[2, 0], [2, 1], [1, 3], [0, 1]] },
  ],
  high: [
    { start: [3, 4], target: [0, 0], blocks: [[3, 2], [1, 1], [2, 3], [0, 2]] },
    { start: [0, 0], target: [3, 4], blocks: [[0, 2], [1, 1], [2, 3], [3, 1]] },
  ],
};
const MOVES = { up: [-1, 0, '⬆️'], down: [1, 0, '⬇️'], left: [0, -1, '⬅️'], right: [0, 1, '➡️'] };

function signal(root, ctx) {
  const ROWS = 4;
  const COLS = 5;
  const MAX = 12;
  const lv = LEVELS[ctx.level][Math.floor(Math.random() * LEVELS[ctx.level].length)];
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];
  const isBlock = (p) => lv.blocks.some((b) => same(b, p));
  const cells = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const p = [r, c];
      let inner = '';
      if (same(p, lv.start)) inner = ctx.art(ctx.mg.antenna, '📡', 'cell-img');
      else if (same(p, lv.target)) inner = ctx.art(ctx.mg.satellite, '🛰️', 'cell-img');
      else if (isBlock(p)) inner = ctx.art(ctx.mg.block, '⛰️', 'cell-img');
      cells.push(`<div class="cell${isBlock(p) ? ' block' : ''}${same(p, lv.target) ? ' target' : ''}" data-rc="${r},${c}">${inner}</div>`);
    }
  root.innerHTML = `
    <div class="sig">
      <div class="grid" style="--cols:${COLS}">${cells.join('')}<span class="beam" id="sBeam"></span></div>
      <div class="sig-side">
        <div class="mg-count">기회 <b id="sTry">3</b>번</div>
        <div class="queue" id="sQueue"><span class="muted">명령을 넣어 주세요</span></div>
        <div class="arrows">
          <span></span><button class="arrow" data-m="up">⬆️</button><span></span>
          <button class="arrow" data-m="left">⬅️</button><button class="arrow" data-m="down">⬇️</button><button class="arrow" data-m="right">➡️</button>
        </div>
        <div class="mg-row"><button class="btn ghost small" id="sDel">⌫ 지우기</button><button class="btn primary" id="sRun">▶ 실행</button></div>
      </div>
    </div>`;
  const $ = (s) => root.querySelector(s);
  const queue = [];
  let tries = 3;
  let running = false;
  const beam = $('#sBeam');
  const setBeam = (p) => {
    beam.style.left = `${((p[1] + 0.5) / COLS) * 100}%`;
    beam.style.top = `${((p[0] + 0.5) / ROWS) * 100}%`;
  };
  const drawQueue = () => {
    $('#sQueue').innerHTML = queue.length
      ? queue.map((m, i) => `<span class="q" data-q="${i}">${MOVES[m][2]}</span>`).join('')
      : '<span class="muted">명령을 넣어 주세요</span>';
  };
  const clearTrail = () => root.querySelectorAll('.cell.trail, .cell.bad').forEach((c) => c.classList.remove('trail', 'bad'));
  setBeam(lv.start);

  return new Promise((resolve) => {
    root.querySelectorAll('.arrow').forEach(
      (b) =>
        (b.onclick = () => {
          if (running || queue.length >= MAX) return;
          queue.push(b.dataset.m);
          drawQueue();
        }),
    );
    $('#sDel').onclick = () => {
      if (running) return;
      queue.pop();
      drawQueue();
    };
    $('#sRun').onclick = async () => {
      if (running || !queue.length) return;
      running = true;
      clearTrail();
      let p = [...lv.start];
      setBeam(p);
      let result = 'short';
      for (let i = 0; i < queue.length; i++) {
        root.querySelectorAll('.q').forEach((q) => q.classList.toggle('now', Number(q.dataset.q) === i));
        await sleep(380);
        const [dr, dc] = MOVES[queue[i]];
        const n = [p[0] + dr, p[1] + dc];
        if (n[0] < 0 || n[0] >= ROWS || n[1] < 0 || n[1] >= COLS) {
          result = 'out';
          break;
        }
        if (isBlock(n)) {
          root.querySelector(`[data-rc="${n}"]`).classList.add('bad');
          result = 'block';
          break;
        }
        p = n;
        setBeam(p);
        root.querySelector(`[data-rc="${p}"]`).classList.add('trail');
        if (same(p, lv.target)) {
          result = 'ok';
          break;
        }
      }
      if (result === 'ok') {
        beam.classList.add('win');
        await sleep(700);
        resolve(true);
        return;
      }
      tries--;
      $('#sTry').textContent = tries;
      const msg = { out: '신호가 판 밖으로 나갔어요!', block: '산에 막혔어요!', short: '위성까지 조금 모자라요!' }[result];
      $('#sQueue').insertAdjacentHTML('beforeend', `<span class="sig-msg">${msg}</span>`);
      if (tries <= 0) {
        await sleep(900);
        resolve(false);
        return;
      }
      await sleep(900);
      setBeam(lv.start);
      drawQueue();
      running = false;
    };
  });
}
