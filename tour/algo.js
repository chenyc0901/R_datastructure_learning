/* R 寶的演算法學院（遊戲）· 語音導覽講稿 */
VoiceTour.init({
  chapters: [['c0', '認識畫面'], ['c1', '怎麼玩']],
  steps: ({ CTRL }) => [
    { ch: 'c0', at: 'header.top .brand',
      say: '歡迎來到 R 寶的演算法學院。這一頁同樣是遊戲，玩法和奇幻旅程一樣，但這次要把重複的動作包成 function，再用 function 組出演算法。' + CTRL },
    { ch: 'c0', at: '#map',
      say: '關卡從第一個 function 開始，依序學參數、return、區域變數和引數，再練習分解問題，然後完成搜尋、找最大值和遞迴，最後的大魔王是排序。我先回到第一關。',
      act: [['click', '.node[data-id="fn"]']] },
    { ch: 'c0', at: '.a-mission',
      say: '這一塊是任務和觀念說明。function 就是把一串動作包起來，取一個名字。之後只要寫名字加括號，就會執行裡面全部的動作。' },
    { ch: 'c0', at: '.a-side',
      say: '這裡的地圖很多是隨機的。看我按「換地圖」。',
      act: [['click', '#bReroll'],
            ['say', '每按一次就換一張新的地圖。所以你的程式不能把步數寫死，要能應付各種長度。']] },
    { ch: 'c1', at: '.a-code .pane',
      say: '這裡是程式編輯區。下面的插入按鈕，比上一個單元多了 function 和 return。' },
    { ch: 'c1', at: '.a-side',
      say: '執行、一步一步、提示、看解答和還原，用法都和上一個單元一樣。Environment 分頁在這個單元特別有用：一步一步執行時，可以看到 function 裡的變數怎麼出現、怎麼消失。',
      act: [['click', '.a-side [data-t="env"]'], ['pause', 600], ['click', '.a-side [data-t="goal"]']] },
    { ch: 'c1', at: '.a-mission',
      say: '現在換你。第一關請做一個向後轉的函式 turn_around。提示：在大括號裡寫兩行 turn_left。導覽到這裡結束，祝你順利挑戰大魔王。' },
  ],
});
