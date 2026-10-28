// 외부 오디오 파일 없이 Web Audio API로 만드는 금산탐험대 사운드.
// 첫 사용자 동작에서 오디오 컨텍스트를 열고, 오프라인에서도 바로 재생된다.
const STORAGE_KEY = 'geumsan-audio-enabled';

let ctx;
let master;
let sfxGain;
let musicGain;
let musicTimer;
let musicStep = 0;
let enabled = true;

try {
  enabled = localStorage.getItem(STORAGE_KEY) !== 'off';
} catch {}

function ensure() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    sfxGain = ctx.createGain();
    musicGain = ctx.createGain();
    master.gain.value = 0.72;
    sfxGain.gain.value = 0.9;
    musicGain.gain.value = 0.22;
    sfxGain.connect(master);
    musicGain.connect(master);
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, duration, type = 'sine', volume = 0.12, target = sfxGain, when = 0, slideTo = null) {
  if (!enabled) return;
  const ac = ensure();
  const start = ac.currentTime + when;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(target);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function noise(duration = 0.08, volume = 0.08, when = 0, filterFreq = 1800) {
  if (!enabled) return;
  const ac = ensure();
  const start = ac.currentTime + when;
  const buffer = ac.createBuffer(1, Math.ceil(ac.sampleRate * duration), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const source = ac.createBufferSource();
  const filter = ac.createBiquadFilter();
  const gain = ac.createGain();
  filter.type = 'lowpass';
  filter.frequency.value = filterFreq;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(filter).connect(gain).connect(sfxGain);
  source.start(start);
}

function sequence(notes, type = 'sine', volume = 0.12, gap = 0.07, target = sfxGain) {
  notes.forEach((freq, i) => tone(freq, 0.16, type, volume, target, i * gap));
}

const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const G4 = 392.0;
const A4 = 440.0;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const G5 = 783.99;
const C6 = 1046.5;

function play(name) {
  if (!enabled) return;
  switch (name) {
    case 'click':
      tone(520, 0.055, 'sine', 0.045);
      tone(780, 0.07, 'sine', 0.035, sfxGain, 0.025);
      break;
    case 'start':
      sequence([C4, E4, G4, C5], 'triangle', 0.1, 0.075);
      break;
    case 'modal':
      sequence([G4, C5], 'sine', 0.08, 0.08);
      break;
    case 'dice':
      noise(0.11, 0.11, 0, 2600);
      tone(190, 0.08, 'square', 0.055, sfxGain, 0.03, 120);
      break;
    case 'dice-roll':
      noise(0.045, 0.045, 0, 3200);
      tone(260, 0.035, 'square', 0.028);
      break;
    case 'step':
      tone(155, 0.08, 'triangle', 0.07, sfxGain, 0, 105);
      noise(0.035, 0.025, 0, 1100);
      break;
    case 'bus':
      tone(290, 0.18, 'sawtooth', 0.07, sfxGain, 0, 220);
      tone(440, 0.2, 'triangle', 0.08, sfxGain, 0.13, 520);
      break;
    case 'fork':
      sequence([D4, G4], 'triangle', 0.08, 0.09);
      break;
    case 'correct':
      sequence([C5, E5, G4, C5, E5], 'triangle', 0.13, 0.075);
      break;
    case 'wrong':
      tone(220, 0.22, 'sawtooth', 0.1, sfxGain, 0, 145);
      tone(175, 0.24, 'triangle', 0.07, sfxGain, 0.16, 110);
      break;
    case 'timeout':
      tone(330, 0.13, 'square', 0.08);
      tone(250, 0.13, 'square', 0.08, sfxGain, 0.17);
      tone(190, 0.2, 'square', 0.08, sfxGain, 0.34);
      break;
    case 'hint':
      sequence([E5, G5, C6], 'sine', 0.09, 0.06);
      break;
    case 'chance':
      sequence([G4, C5, E5, G5], 'triangle', 0.11, 0.08);
      break;
    case 'rest':
      sequence([E4, G4, C5], 'sine', 0.08, 0.12);
      break;
    case 'stamp':
      noise(0.08, 0.13, 0, 900);
      sequence([C5, G4, C5], 'triangle', 0.12, 0.07);
      break;
    case 'minigame-start':
      sequence([C4, G4, C5], 'square', 0.07, 0.08);
      break;
    case 'pull':
      tone(125, 0.2, 'sawtooth', 0.09, sfxGain, 0, 310);
      break;
    case 'card':
      tone(430, 0.08, 'triangle', 0.07, sfxGain, 0, 680);
      break;
    case 'signal':
      tone(740, 0.08, 'sine', 0.07);
      break;
    case 'win':
      sequence([C5, E5, G4, C5, E5, G4, C5], 'triangle', 0.12, 0.075);
      break;
    case 'lose':
      tone(260, 0.32, 'sawtooth', 0.09, sfxGain, 0, 100);
      break;
    case 'finish':
      sequence([C4, E4, G4, C5, E5, G4, C5, E5], 'triangle', 0.14, 0.09);
      break;
    default:
      play('click');
  }
}

function scheduleMusic() {
  if (!enabled) return;
  ensure();
  const roots = [C4, G4, A4, E4];
  const melody = [E5, G4, A4, G4, E5, C5, D5, C5];
  const root = roots[musicStep % roots.length];
  const note = melody[musicStep % melody.length];
  tone(root / 2, 0.72, 'sine', 0.035, musicGain);
  tone(root, 0.5, 'triangle', 0.026, musicGain, 0.08);
  tone(note, 0.24, 'sine', 0.035, musicGain, 0.18);
  if (musicStep % 4 === 3) tone(note * 1.5, 0.18, 'sine', 0.022, musicGain, 0.42);
  musicStep++;
}

function startBgm() {
  if (!enabled) return;
  ensure();
  if (musicTimer) return;
  musicStep = 0;
  scheduleMusic();
  musicTimer = setInterval(scheduleMusic, 820);
}

function stopBgm() {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
}

function toggle() {
  enabled = !enabled;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  } catch {}
  if (enabled) {
    refreshVolume();
    startBgm();
    play('start');
  } else {
    stopBgm();
    if (master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.04);
  }
  return enabled;
}

function refreshVolume() {
  if (master && ctx) master.gain.setTargetAtTime(enabled ? 0.72 : 0, ctx.currentTime, 0.04);
}

export const audio = {
  play,
  startBgm,
  stopBgm,
  toggle,
  refreshVolume,
  unlock: ensure,
  isEnabled: () => enabled,
};
