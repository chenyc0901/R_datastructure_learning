/* ============================================================
   語音導覽引擎（全站共用）
   每一頁的講稿在 tour/<頁名>.js，用 VoiceTour.init({ chapters, steps }) 註冊。
   預設播放預錄女聲（微軟神經語音 zh-TW-HsiaoChenNeural「曉臻」），一句一個 mp3，放在 audio/tour/，
   檔名是句子內容的雜湊，所以改了哪一句，只要重錄那一句（清單：audio/tour/clips.json）。
   找不到音檔時自動改用瀏覽器內建的語音合成。
   ============================================================ */
(() => {
'use strict';
if (window.VoiceTour) return;
const CSS = `.vt-launch,.vt-panel,.vt-ring,.vt-ptr{--vt-panel:#fbfcfd;--vt-ink:#16202b;--vt-line:#d3dae2;--vt-accent:#1d5fae;--vt-on:#fff;--vt-soft:#dde9f7;--vt-amber:#d18a00;--vt-muted:#45515e}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) :is(.vt-launch,.vt-panel,.vt-ring,.vt-ptr){--vt-panel:#161d25;--vt-ink:#e3e9f0;--vt-line:#283340;--vt-accent:#6aa5ec;--vt-on:#0b1622;--vt-soft:#1b2c42;--vt-amber:#e9b949;--vt-muted:#93a1b1}}
.vt-panel,.vt-panel *,.vt-launch{box-sizing:border-box}
.vt-panel button,.vt-launch{font:inherit;cursor:pointer;color:var(--vt-ink)}
.vt-panel [hidden],.vt-ring[hidden],.vt-ptr[hidden]{display:none!important}
.vt-launch{color:var(--vt-on)!important;font-family:"Noto Sans TC","PingFang TC",system-ui,sans-serif}
.vt-row button:disabled{opacity:.45;cursor:default}
.vt-launch{position:fixed;left:18px;bottom:18px;z-index:940;display:flex;align-items:center;gap:8px;border:1px solid var(--vt-accent);border-radius:999px;padding:9px 16px 9px 12px;background:var(--vt-accent);color:var(--vt-on);font-weight:700;font-size:14.5px;box-shadow:0 8px 24px rgba(0,0,0,.2)}
.vt-launch small{font-weight:500;opacity:.85}
body.vt-on .vt-launch{display:none}
body.vt-on{padding-bottom:var(--vt-h,190px)}
body.vt-on .pcbtn{bottom:calc(var(--vt-h,190px) + 14px)}
body.vt-on .rstat{bottom:calc(var(--vt-h,190px) + 70px)}

.vt-panel{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:948;width:min(880px,calc(100vw - 20px));background:var(--vt-panel);color:var(--vt-ink);border:1px solid var(--vt-line);border-radius:16px;box-shadow:0 14px 40px rgba(0,0,0,.28);padding:12px 14px 10px;font-family:"Noto Sans TC","PingFang TC",system-ui,-apple-system,sans-serif}
.vt-cap{min-height:3.4em;max-height:8.5em;overflow:auto;font-size:17px;line-height:1.7;font-weight:500}
.vt-cap .vt-hint{display:block;margin-top:4px;color:var(--vt-accent);font-weight:700;font-size:15px}
.vt-note{font-size:12.5px;color:var(--vt-muted);margin:2px 0 0}
.vt-bar{height:4px;border-radius:2px;background:var(--vt-line);margin:8px 0;overflow:hidden}
.vt-bar i{display:block;height:100%;width:0;background:var(--vt-accent);transition:width .3s}
.vt-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;font-size:13.5px}
.vt-row button{border:1px solid var(--vt-line);background:var(--vt-panel);border-radius:9px;padding:5px 11px;font-size:14px;line-height:1.3;white-space:nowrap}
.vt-row button.vt-main{background:var(--vt-accent);border-color:var(--vt-accent);color:var(--vt-on);font-weight:700;min-width:5.6em}
.vt-row button.vt-pulse{animation:vtPulse 1.1s ease-in-out infinite}
.vt-row select{font:inherit;font-size:13.5px;color:var(--vt-ink);background:var(--vt-panel);border:1px solid var(--vt-line);border-radius:8px;padding:4px 6px;max-width:9.5em}
.vt-row label{display:flex;align-items:center;gap:4px;color:var(--vt-muted)}
.vt-row .vt-pos{color:var(--vt-muted);font-variant-numeric:tabular-nums}
.vt-row .vt-sp{flex:1}

.vt-ring{position:fixed;z-index:944;pointer-events:none;border-radius:14px;box-shadow:0 0 0 3px var(--vt-accent),0 0 0 200vmax rgba(8,16,26,.16);transition:left .35s ease,top .35s ease,width .35s ease,height .35s ease;left:0;top:0;width:0;height:0}
.vt-ring.vt-ask{box-shadow:0 0 0 4px var(--vt-amber),0 0 0 200vmax rgba(8,16,26,.16);animation:vtAsk 1s ease-in-out infinite}
.vt-ring.vt-follow{transition:none}
.vt-ptr{position:fixed;left:0;top:0;z-index:949;pointer-events:none;width:30px;height:30px;transition:transform .6s cubic-bezier(.3,.7,.3,1);filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))}
.vt-ptr.vt-drag{transition:transform .06s linear}
.vt-ptr::after{content:"";position:absolute;left:-13px;top:-13px;width:30px;height:30px;border-radius:50%;border:3px solid var(--vt-amber);opacity:0;transform:scale(.3)}
.vt-ptr.vt-tap::after{animation:vtTap .45s ease-out}
@keyframes vtTap{0%{opacity:.95;transform:scale(.3)}100%{opacity:0;transform:scale(1.7)}}
@keyframes vtAsk{50%{box-shadow:0 0 0 8px var(--vt-amber),0 0 0 200vmax rgba(8,16,26,.16)}}
@keyframes vtPulse{50%{box-shadow:0 0 0 5px var(--vt-soft)}}
@media (max-width:720px){
  .vt-launch{left:12px;bottom:12px;font-size:13.5px;padding:8px 13px 8px 10px}
  .vt-panel{bottom:6px;padding:10px 10px 8px}
  .vt-cap{font-size:15.5px;max-height:7em}
  .vt-row .vt-sp{display:none}
}
@media (prefers-reduced-motion: reduce){.vt-ring,.vt-ptr{transition:none}.vt-ring.vt-ask,.vt-row button.vt-pulse{animation:none}}
@media print{.vt-launch,.vt-panel,.vt-ring,.vt-ptr{display:none!important}}`;
const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
/* ---------- 講稿裡找元素的小工具 ---------- */
const cell = label => () => { const l = qa('div.cell .lab').find(e => e.textContent.trim().startsWith(label)); return l && l.closest('div.cell'); };
const cellRun = label => () => { const c = cell(label)(); return c && q('.run', c); };
const sub = tag => () => { const t = qa('h3 .tag').find(e => e.textContent.trim() === tag); return t && t.parentElement; };   // 小節標題，例如 sub('3-2')
const nth = (sel, i) => () => qa(sel)[i];

const resolve = at => { try { return typeof at === 'function' ? at() : at ? q(at) : null; } catch (e) { return null; } };
const inW = (wsel, bsel) => () => { const w = resolve(wsel); return w && q(bsel, w); };   // 在某個區塊裡找按鈕
const after = at => () => { const e = resolve(at); return e && e.nextElementSibling; };
const btn = (wsel, text) => () => { const w = resolve(wsel); return w && qa('button', w).find(b => b.textContent.trim().startsWith(text)); };   // 用按鈕上的字找按鈕
const CTRL = '下方的控制列可以暫停、回上一步、跳下一步，也可以調整語速，或直接跳到想聽的章節。';
const std = {   // 各頁共用的幾段話（句子相同，音檔也共用）
  hero: (ch, name, at) => ({ ch, at: at || '.hero', say: '歡迎來到' + name + '。我是語音導覽，會一段一段帶你看完這一頁，也會示範每個互動區塊要怎麼操作。' + CTRL }),
  toc: ch => ({ ch, at: '#toc', say: '這裡是目錄，點章節名稱就可以直接跳過去。後面有打勾記號的章節裡有練習題，完成之後勾勾會亮起來，下面的進度條也會跟著前進。' }),
  run: (ch, label) => ({ ch, at: cell(label), say: '這是可以執行的 R 程式格。右上角的「執行」會跑這段程式，結果顯示在下面。你可以直接在格子裡修改程式再執行，改壞了就按「還原」。快捷鍵是 Ctrl 或 Command 加 Enter。', act: [['point', cellRun(label)]] }),
  ex: (ch, sel, lead) => ({ ch, at: sel, say: (lead || '') + '題目在上面，下面是你的程式區。寫好之後按「執行並檢查」，網頁會自動批改，答對了這一題會顯示已完成，目錄也會打勾。卡住的時候可以按「看解答」，需要輸入老師給的密碼。練習可以等導覽結束再回來做。', act: [['point', sel + ' div.cell .run']] }),
  hold: '試完之後，按下方的「下一步」繼續。',
};
const H = { cell, cellRun, sub, nth, inW, after, btn, std, CTRL, q, qa };

window.VoiceTour = { init(CFG){
if (window.VoiceTour.steps) return;
const st = document.createElement('style'); st.id = 'vt-css'; st.textContent = CSS; document.head.append(st);
const STEPS = CFG.steps(H), CHAPTERS = CFG.chapters;
/* ============================================================ 引擎 ============================================================ */
const KEY = 'vt:' + location.pathname;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
const cfg = Object.assign({ idx: 0, rate: 1, voice: 'rec', mute: false }, load()); if (!cfg.voice) cfg.voice = 'rec';
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const synth = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window ? window.speechSynthesis : null;
const ABORT = { abort: true };

let gen = 0, idx = 0, active = false, paused = false, holding = false, ended = false;
let resumeWaiters = [], cutNow = null, cleanups = [], ringSrc = null, ringEl = null, raf = 0, curUtter = null;
const alive = g => g === gen;

/* ---------- 介面 ---------- */
const launch = document.createElement('button');
launch.type = 'button'; launch.className = 'vt-launch';
const paintLaunch = () => { launch.innerHTML = cfg.idx > 0 && cfg.idx < STEPS.length - 1 ? '🔊 繼續語音導覽 <small>（第 ' + (cfg.idx + 1) + ' / ' + STEPS.length + ' 段）</small>' : '🔊 語音導覽'; };
paintLaunch();

const panel = document.createElement('div');
panel.className = 'vt-panel'; panel.hidden = true; panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', '語音導覽');
panel.innerHTML = `<div class="vt-cap" aria-live="polite"></div><p class="vt-note" hidden></p>
  <div class="vt-bar"><i></i></div>
  <div class="vt-row">
    <button type="button" data-a="prev" aria-label="上一步">◀ 上一步</button>
    <button type="button" data-a="play" class="vt-main">⏸ 暫停</button>
    <button type="button" data-a="next" aria-label="下一步">下一步 ▶</button>
    <span class="vt-pos"></span><span class="vt-sp"></span>
    <select data-a="ch" aria-label="跳到章節">${CHAPTERS.map(([k, t]) => `<option value="${k}">${t}</option>`).join('')}</select>
    <label>語速<select data-a="rate" aria-label="語速">${[0.8, 0.9, 1, 1.15, 1.3, 1.5].map(r => `<option value="${r}">${r}×</option>`).join('')}</select></label>
    <label class="vt-voice">語音<select data-a="voice" aria-label="語音"></select></label>
    <button type="button" data-a="mute" aria-pressed="false">🔊</button>
    <button type="button" data-a="close" aria-label="結束導覽">✕</button>
  </div>`;
const ring = document.createElement('div'); ring.className = 'vt-ring'; ring.hidden = true;
const ptr = document.createElement('div'); ptr.className = 'vt-ptr'; ptr.hidden = true;
ptr.innerHTML = '<svg viewBox="0 0 30 30" width="30" height="30"><path d="M3 2 L3 23 L9 18 L13 27 L17 25 L13 16.5 L21 16.5 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
document.body.append(launch, ring, panel, ptr);
const cap = q('.vt-cap', panel), note = q('.vt-note', panel), bar = q('.vt-bar i', panel), bPlay = q('[data-a=play]', panel), bNext = q('[data-a=next]', panel),
  sCh = q('[data-a=ch]', panel), sRate = q('[data-a=rate]', panel), sVoice = q('[data-a=voice]', panel), bMute = q('[data-a=mute]', panel), pos = q('.vt-pos', panel);
sRate.value = String(cfg.rate); if (!sRate.value) { sRate.value = '1'; cfg.rate = 1; }

/* ---------- 語音 ---------- */
const AUDIO_DIR = CFG.audioDir || 'audio/tour/', REC = 'rec', REC_NAME = '曉臻（預錄女聲）';
const sentences = t => (t.match(/[^。！？!?]+[。！？!?]?/g) || [t]).map(s => s.trim()).filter(Boolean);
const clipId = t => { let a = 0xdeadbeef, b = 0x41c6ce57; for (let i = 0; i < t.length; i++) { const c = t.charCodeAt(i); a = Math.imul(a ^ c, 2654435761); b = Math.imul(b ^ c, 1597334677); }
  a = Math.imul(a ^ (a >>> 16), 2246822507) ^ Math.imul(b ^ (b >>> 13), 3266489909); b = Math.imul(b ^ (b >>> 16), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909);
  return ((b >>> 0).toString(16).padStart(8, '0') + (a >>> 0).toString(16).padStart(8, '0')).slice(0, 12); };
const clipURL = t => AUDIO_DIR + clipId(t) + '.mp3';
const allTexts = () => STEPS.flatMap(s => [s.say, ...(s.act || []).filter(a => a[0] === 'say').map(a => a[1]), s.wait && s.wait.then].filter(Boolean));
const aud = new Audio(); aud.preload = 'auto';
let recFail = 0;
const useRec = () => cfg.voice === REC && !cfg.mute && recFail < 3;
function playClip(text, fin, fallback){
  let over = false;
  const end = ok => { if (over) return; over = true; aud.onended = aud.onerror = null; if (ok) { recFail = 0; fin(); } else { recFail++; if (recFail >= 3) paintNote(); fallback(); } };
  aud.onended = () => end(true); aud.onerror = () => end(false);
  aud.muted = false; aud.src = clipURL(text); aud.playbackRate = cfg.rate;
  const p = aud.play(); if (p && p.catch) p.catch(e => { if (e && e.name === 'AbortError') return; end(false); });
}
let voices = [], voice = null;
const score = v => { const l = v.lang.replace('_', '-').toLowerCase(), n = v.name; let s = 0;
  if (l.startsWith('zh-tw') || /taiwan|臺灣|台灣/i.test(n)) s += 100; else if (l.startsWith('zh-cn') || l === 'zh' || l.startsWith('cmn')) s += 40; else if (l.startsWith('zh-hk') || l.startsWith('yue')) s -= 40;
  if (/natural|online|premium|enhanced|高品質|優化/i.test(n)) s += 50; if (/google/i.test(n)) s += 30; if (/meijia|美嘉|hsiaochen|yating|hanhan/i.test(n)) s += 20;
  if (/eddy|flo|grand|reed|rocko|sandy|shelley/i.test(n)) s -= 30;
  return s; };
function loadVoices(){
  voices = !synth ? [] : synth.getVoices().filter(v => /^(zh|cmn|yue)/i.test(v.lang)).sort((a, b) => score(b) - score(a));
  voice = voices.find(v => v.voiceURI === cfg.voice) || voices[0] || null;
  sVoice.innerHTML = `<option value="${REC}">${REC_NAME}</option>` + voices.map(v => `<option value="${v.voiceURI.replace(/"/g, '&quot;')}">裝置內建：${v.name.replace(/</g, '&lt;')}</option>`).join('');
  sVoice.value = cfg.voice === REC ? REC : voice ? voice.voiceURI : REC;
  paintNote();
}
function paintNote(){
  const recOK = cfg.voice === REC && recFail < 3, dev = synth && voices.length;
  const msg = cfg.mute ? '靜音中：只顯示字幕。'
    : recOK ? ''
    : cfg.voice === REC ? (dev ? '找不到預錄的音檔，先改用這台裝置內建的語音。' : '找不到預錄的音檔，這台裝置也沒有中文語音，改用字幕導覽。')
    : !dev ? '這台裝置找不到中文語音，改用字幕導覽。' : '';
  note.textContent = msg; note.hidden = !msg; measure();
}
loadVoices(); if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
const canSpeak = () => synth && voice && !cfg.mute;

const waitResume = () => new Promise(r => resumeWaiters.push(r));
function utter(text){   // 唸一句；被暫停或換步驟打斷時也會 resolve
  return new Promise(res => {
    let done = false, timer = 0;
    const fin = () => { if (done) return; done = true; clearTimeout(timer); cutNow = null; res(); };
    cutNow = () => { aud.onended = aud.onerror = null; try { aud.pause(); } catch (e) {} if (synth) synth.cancel(); fin(); };
    const viaDevice = () => {
      if (done) return;
      if (!canSpeak()) { timer = setTimeout(fin, (700 + text.length * 210) / cfg.rate); return; }
      const u = curUtter = new SpeechSynthesisUtterance(text);
      u.voice = voice; u.lang = voice.lang.replace('_', '-'); u.rate = cfg.rate; u.pitch = 1;
      u.onend = fin; u.onerror = fin;
      timer = setTimeout(fin, 4000 + text.length * 520 / cfg.rate);   // 保險：有些瀏覽器偶爾不觸發 onend
      setTimeout(() => { if (!done) { try { synth.cancel(); synth.speak(u); } catch (e) { fin(); } } }, 70);
    };
    if (useRec()) { timer = setTimeout(fin, 60000); playClip(text, fin, () => { clearTimeout(timer); viaDevice(); }); return; }
    viaDevice();
  });
}
async function speak(text, g, hint){
  for (const s of sentences(text)) {
    for (;;) {
      if (!alive(g)) throw ABORT;
      if (paused) { await waitResume(); continue; }
      setCap(s, hint);
      await utter(s);
      if (!alive(g)) throw ABORT;
      if (!paused) break;          // 被暫停打斷：恢復後整句重唸
    }
    await sleep(reduce ? 60 : 140, g);
  }
}
async function sleep(ms, g){
  let left = ms;
  while (left > 0) {
    if (!alive(g)) throw ABORT;
    if (paused) { await waitResume(); continue; }
    const d = Math.min(50, left); await new Promise(r => setTimeout(r, d)); left -= d;
  }
  if (!alive(g)) throw ABORT;
}
function setCap(text, hint){ cap.textContent = text; if (hint) { const h = document.createElement('span'); h.className = 'vt-hint'; h.textContent = hint; cap.append(h); } cap.scrollTop = 0; measure(); }

/* ---------- 版面：框線、捲動、游標 ---------- */
function measure(){ if (!panel.hidden) document.body.style.setProperty('--vt-h', (panel.offsetHeight + 24) + 'px'); }
const availH = () => innerHeight - (panel.hidden ? 0 : panel.offsetHeight + 24);
function track(){
  if (!active) return;
  if (ringSrc && (!ringEl || !ringEl.isConnected)) ringEl = resolve(ringSrc);
  if (ringEl) { const r = ringEl.getBoundingClientRect(), p = 6; ring.style.left = (r.left - p) + 'px'; ring.style.top = (r.top - p) + 'px'; ring.style.width = (r.width + 2 * p) + 'px'; ring.style.height = (r.height + 2 * p) + 'px'; ring.hidden = false; }
  else ring.hidden = true;
  raf = requestAnimationFrame(track);
}
async function scrollTo(el, g){
  const r = el.getBoundingClientRect(), av = availH();
  const want = r.height < av - 60 ? r.top - (av - r.height) / 2 : r.top - 16;
  if (Math.abs(want) > 8) {
    ring.classList.add('vt-follow');
    scrollBy({ top: want, behavior: reduce ? 'auto' : 'smooth' });
    let last = -1, still = 0;
    for (let i = 0; i < 40 && still < 3; i++) { await sleep(50, g); if (Math.abs(scrollY - last) < 1) still++; else still = 0; last = scrollY; }
    ring.classList.remove('vt-follow');
  }
}
async function focusOn(at, g){ ringSrc = at; ringEl = resolve(at); ring.classList.remove('vt-ask'); if (ringEl) await scrollTo(ringEl, g); }
function ptrTo(x, y){ ptr.hidden = false; ptr.style.transform = `translate(${x}px,${y}px)`; }
async function ptrOver(el, g){
  let r = el.getBoundingClientRect();
  if (r.top < 8 || r.bottom > availH() - 8) { await scrollTo(el, g); r = el.getBoundingClientRect(); }
  if (ptr.hidden) { ptr.classList.add('vt-drag'); ptrTo(Math.min(innerWidth - 60, r.left + r.width / 2 + 90), r.top + r.height / 2 + 70); void ptr.offsetWidth; ptr.classList.remove('vt-drag'); }
  ptrTo(r.left + r.width / 2, r.top + r.height / 2);
  await sleep(reduce ? 80 : 680, g);
}
async function tap(g){ ptr.classList.remove('vt-tap'); void ptr.offsetWidth; ptr.classList.add('vt-tap'); await sleep(220, g); }
const thumbX = (el, v) => { const r = el.getBoundingClientRect(), mn = +el.min || 0, mx = +el.max || 100; return r.left + 9 + (v - mn) / (mx - mn || 1) * (r.width - 18); };

async function doAct(a, g){
  const [kind, arg, val] = a;
  if (kind === 'say') return speak(arg, g);
  if (kind === 'pause') return sleep(arg, g);
  const el = resolve(arg); if (!el) return;
  if (kind === 'point') { await ptrOver(el, g); await tap(g); await sleep(500, g); return; }
  if (kind === 'click') { await ptrOver(el, g); await tap(g); el.click(); await sleep(520, g); return; }
  if (kind === 'slide') {
    await ptrOver(el, g);
    const r = el.getBoundingClientRect(), y = r.top + r.height / 2, from = +el.value, step = +el.step || 1, n = Math.max(1, Math.min(28, Math.round(Math.abs(val - from) / step)));
    ptrTo(thumbX(el, from), y); await sleep(reduce ? 60 : 420, g); await tap(g);
    ptr.classList.add('vt-drag');
    try {
      for (let i = 1; i <= n; i++) {
        const v = Math.round((from + (val - from) * i / n) / step) * step;
        el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
        ptrTo(thumbX(el, +el.value), y); await sleep(reduce ? 10 : 55, g);
      }
    } finally { ptr.classList.remove('vt-drag'); }
    await sleep(450, g);
  }
}
function waitUser(w, g){
  const t = resolve(w.on);
  if (!t || t.disabled) return Promise.resolve();
  ringSrc = w.on; ringEl = t; ring.classList.add('vt-ask'); ptr.hidden = true;
  return new Promise(res => {
    const h = e => { const hit = typeof w.on === 'string' ? e.target.closest && e.target.closest(w.on) : (resolve(w.on) || t).contains(e.target); if (!hit || !alive(g)) return; off(); ring.classList.remove('vt-ask'); res(); };
    const off = () => document.removeEventListener(w.ev || 'click', h, true);
    document.addEventListener(w.ev || 'click', h, true); cleanups.push(off);
  });
}

/* ---------- 流程 ---------- */
function paintUI(){
  const st = STEPS[idx];
  pos.textContent = (idx + 1) + ' / ' + STEPS.length; bar.style.width = ((idx + 1) / STEPS.length * 100) + '%'; sCh.value = st.ch;
  bPlay.textContent = ended ? '↺ 重新開始' : holding ? '繼續 ▶' : paused ? '▶ 繼續' : '⏸ 暫停';
  bNext.classList.toggle('vt-pulse', holding); bNext.disabled = idx >= STEPS.length - 1;
  q('[data-a=prev]', panel).disabled = idx <= 0;
  bMute.textContent = cfg.mute ? '🔇' : '🔊'; bMute.setAttribute('aria-pressed', String(cfg.mute)); bMute.title = cfg.mute ? '開啟聲音' : '靜音（只看字幕）';
}
function interrupt(){ gen++; cleanups.splice(0).forEach(f => f()); if (cutNow) cutNow(); try { aud.pause(); } catch (e) {} if (synth) synth.cancel(); holding = false; ended = false; ring.classList.remove('vt-ask'); }
function setPaused(p){ paused = p; if (p) { if (cutNow) cutNow(); } else resumeWaiters.splice(0).forEach(r => r()); paintUI(); }
async function runStep(i){
  interrupt(); if (paused) setPaused(false);
  const g = gen; idx = Math.max(0, Math.min(STEPS.length - 1, i)); cfg.idx = idx; save();
  const st = STEPS[idx]; ptr.hidden = true; paintUI();
  try {
    await focusOn(st.at, g);
    await speak(st.say, g);
    for (const a of st.act || []) await doAct(a, g);
    if (st.wait) { setCap(st.say, '👉 換你操作看看（或按「下一步」跳過）'); await waitUser(st.wait, g); await sleep(700, g); if (st.wait.then) await speak(st.wait.then, g); }
    if (st.hold) { holding = true; setCap(st.say, '👉 試完之後，按「下一步 ▶」繼續'); paintUI(); return; }
    await sleep(500, g);
    if (idx + 1 < STEPS.length) runStep(idx + 1);
    else { ended = true; cfg.idx = 0; save(); ptr.hidden = true; paintUI(); }
  } catch (e) { if (e !== ABORT) console.error('[語音導覽]', e); }
}
function start(i){
  active = true; panel.hidden = false; document.body.classList.add('vt-on'); measure(); paintNote();
  cancelAnimationFrame(raf); track();
  if (synth) { try { synth.cancel(); synth.resume(); } catch (e) {} }
  if (useRec()) { try { aud.muted = true; aud.src = clipURL(sentences(STEPS[Math.max(0, i)].say)[0]); const p = aud.play(); if (p && p.then) p.then(() => { if (aud.muted) { aud.pause(); aud.muted = false; } }).catch(() => {}); } catch (e) {} }
  runStep(i);
}
function stop(){
  interrupt(); if (paused) setPaused(false);
  active = false; cancelAnimationFrame(raf); panel.hidden = true; ring.hidden = true; ptr.hidden = true; ringSrc = ringEl = null;
  document.body.classList.remove('vt-on'); paintLaunch();
}

launch.addEventListener('click', () => start(cfg.idx > 0 && cfg.idx < STEPS.length - 1 ? cfg.idx : 0));
panel.addEventListener('click', e => {
  const b = e.target.closest('button[data-a]'); if (!b) return;
  const a = b.dataset.a;
  if (a === 'close') stop();
  else if (a === 'prev') runStep(idx - 1);
  else if (a === 'next') runStep(idx + 1);
  else if (a === 'play') { if (ended) runStep(0); else if (holding) runStep(idx + 1); else setPaused(!paused); }
  else if (a === 'mute') { cfg.mute = !cfg.mute; save(); if (cfg.mute) { try { aud.pause(); } catch (e) {} if (synth) synth.cancel(); } paintNote(); paintUI(); }
});
sCh.addEventListener('change', () => runStep(Math.max(0, STEPS.findIndex(s => s.ch === sCh.value))));
sRate.addEventListener('change', () => { cfg.rate = +sRate.value || 1; aud.playbackRate = cfg.rate; save(); });
sVoice.addEventListener('change', () => { if (sVoice.value === REC) { cfg.voice = REC; recFail = 0; } else { voice = voices.find(v => v.voiceURI === sVoice.value) || voice; cfg.voice = voice ? voice.voiceURI : REC; } save(); paintNote(); });
addEventListener('resize', measure);
addEventListener('pagehide', () => { try { aud.pause(); } catch (e) {} if (synth) synth.cancel(); });
document.addEventListener('keydown', e => { if (active && e.key === 'Escape' && !q('.modal,.drawer.open')) stop(); });

Object.assign(window.VoiceTour, { start, stop, steps: STEPS, clips: () => [...new Set(allTexts().flatMap(sentences))].map(t => ({ id: clipId(t), text: t })) });
} };
})();
