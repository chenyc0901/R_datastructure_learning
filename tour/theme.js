/* ============================================================
   亮色／暗色切換 + 對比修正（全站共用，放在 <head> 最後載入）
   - 第一次進站跟隨系統設定；按過切換鈕之後記住選擇（localStorage: site-theme）
   - 各頁本來就有 :root[data-theme="dark"] / :not([data-theme="light"]) 兩套顏色，這裡只負責設定 data-theme
   - 首頁是單一深色設計，沒有亮色版，所以首頁不顯示切換鈕
   ============================================================ */
(() => {
'use strict';
const root = document.documentElement, KEY = 'site-theme';
const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
const stored = () => { try { const v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null; } catch (e) { return null; } };
const apply = t => { root.dataset.theme = t; root.style.colorScheme = t; };
let theme = stored() || (mq.matches ? 'dark' : 'light');
apply(theme);

const css = document.createElement('style'); css.id = 'th-css';
css.textContent = `
/* --- 圖裡沒有指定顏色的字（預設黑色）改用頁面的文字顏色 --- */
svg .th-ink{fill:var(--ink,var(--text,currentColor))}
/* --- 程式註解：兩種模式都加深／加亮到看得清楚 --- */
.t-com{color:#66727f}
#gutter{color:#6b7785}
.node .stars,.stars{color:#9aa6b4}
:root[data-theme="light"]{--amber:#9a6700}
.node .stars .on,.stars .on{color:var(--amber)}
:root[data-theme="dark"] .t-com{color:#93a1b1}
:root[data-theme="dark"] #gutter{color:#8795a5}
:root[data-theme="dark"] .node .stars,:root[data-theme="dark"] .stars{color:#5d6d82}
:root[data-theme="dark"] .node .stars .on,:root[data-theme="dark"] .stars .on{color:var(--amber)}
/* --- 暗色模式：亮色底的按鈕和標籤，字改成深色 --- */
:root[data-theme="dark"] :is(.cell-h .run,.wctl button.go,button.go,.btn.go,#bRun){color:#052016}
:root[data-theme="dark"] .ex.boss .badge{color:#2b1400}
:root[data-theme="dark"] .pcbtn .dot{color:#052016}
:root[data-theme="dark"] .coin-row .h{color:#2a1d00}
:root[data-theme="dark"] .prompt-h .k{color:#190f35}
/* --- 切換鈕 --- */
.th-toggle{position:fixed;right:18px;top:14px;z-index:939;width:42px;height:42px;border-radius:50%;border:1px solid #d3dae2;background:#fbfcfd;color:#16202b;font-size:19px;line-height:1;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;padding:0}
:root[data-theme="dark"] .th-toggle{background:#161d25;color:#e3e9f0;border-color:#283340}
.th-toggle:focus-visible{outline:2px solid #6aa5ec;outline-offset:2px}
body:has(.drawer.open) .th-toggle{display:none}
@media (max-width:720px){.th-toggle{right:10px;top:10px;width:38px;height:38px;font-size:17px}}
@media print{.th-toggle{display:none!important}}
`;
document.head.append(css);

function tagInk(){   // 找出「沒有指定填色、所以是純黑」的圖內文字
  document.querySelectorAll('figure svg text, figure svg tspan').forEach(el => {   // 只處理說明用的示意圖；R 畫出來的圖是白底，不能動
    if (el.classList.contains('th-ink') || el.closest('.plotbox, .rplot, .plots')) return;
    if (getComputedStyle(el).fill === 'rgb(0, 0, 0)') el.classList.add('th-ink');
  });
}
function mount(){
  // 只有一套深色設計的頁面（首頁）：不顯示切換鈕，維持原本的深色，只把太暗的小字調亮
  const hasThemes = [...document.querySelectorAll('style')].some(s => s !== css && s.id !== 'vt-css' && /data-theme/.test(s.textContent));
  if (!hasThemes) { delete root.dataset.theme; root.style.colorScheme = ''; root.style.setProperty('--faint', '#8496ad'); tagInk(); return; }
  root.style.colorScheme = theme;
  tagInk();
  const b = document.createElement('button'); b.type = 'button'; b.className = 'th-toggle';
  const paint = () => { const dark = theme === 'dark'; b.textContent = dark ? '☀️' : '🌙'; b.title = dark ? '切換成亮色模式' : '切換成暗色模式'; b.setAttribute('aria-label', b.title); };
  b.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem(KEY, theme); } catch (e) {} apply(theme); paint(); window.dispatchEvent(new Event('resize')); });
  paint(); document.body.append(b);
  if (mq.addEventListener) mq.addEventListener('change', e => { if (stored()) return; theme = e.matches ? 'dark' : 'light'; apply(theme); paint(); });
  setTimeout(tagInk, 1500); addEventListener('load', tagInk);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
window.SiteTheme = { get: () => theme };
})();
