/* R 寶的 ggplot2 畫室 · 語音導覽講稿 */
VoiceTour.init({
  chapters: [['g0', '開場：這一頁怎麼用'], ['g1', '01 圖形文法'], ['g2', '02 一層一層疊上去'], ['g3', '03 aes：對應與設定'], ['g4', '04 一個數值的分布'], ['g5', '05–06 類別與比較組別'], ['g7', '07–08 散佈圖與折線圖'], ['g9', '09–10 分面與位置'], ['g11', '11–13 尺度、標籤、主題'], ['g14', '14–15 存檔與常見的圖'], ['g16', '16 qPCR 實作與總整理']],
  steps: ({ cell, std, sub, nth, inW }) => {
    const W = (sec, i = 0) => nth('#' + sec + ' .widget', i);
    const B = (sec, i, b) => inW(W(sec, i), '.seg [data-i="' + b + '"]');
    return [
    std.hero('g0', ' R 寶的 ggplot2 畫室'),
    std.toc('g0'),
    { ch: 'g0', at: '#g0 .note.lab',
      say: '這一頁用的資料和前面一樣：lab 是 40 位受檢者的檢驗結果，visits 是回診的低密度膽固醇，ogtt 是葡萄糖耐受試驗。每一格都已經先載入 tidyverse、讀好這些資料。' },
    { ch: 'g0', at: '#g0 .note.link',
      say: '每一格程式都已經先跑好了，圖都看得到。只有當你按下「執行」，瀏覽器才會開始下載 R，第一次大約要等 30 到 60 秒，之後就可以自己改程式重新畫。' },

    { ch: 'g1', at: '#g1 figure',
      say: '第一章，為什麼用 ggplot2。它的核心是圖形文法：每一張圖都由同樣的幾個部分組成，包括資料、對應、幾何物件、尺度、分面、座標和主題。學會這套文法，任何圖都是同一種寫法。' },

    { ch: 'g2', at: W('g2'),
      say: '第二章，一層一層疊上去。這個面板把一張圖拆成七步。第一步只給資料，得到一張空白的畫布。看我一步一步往下按。',
      act: [['click', B('g2', 0, 1)], ['say', '加上 aes，告訴它 x 軸和 y 軸是哪兩欄，座標軸就出現了。'],
            ['click', B('g2', 0, 2)], ['say', '加上 geom_point，才真的畫出點。'],
            ['click', B('g2', 0, 3)], ['say', '把顏色對應到組別，兩組就分成兩種顏色。'],
            ['click', B('g2', 0, 4)], ['say', '再疊一層 geom_smooth，加上趨勢線。']] },
    { ch: 'g2', at: W('g2'),
      say: '換你。請點最後兩步：labs 和 theme_bw，看看標題和外觀怎麼變。',
      wait: { on: B('g2', 0, 6), ev: 'click', then: '這就是 ggplot2 的寫法：用加號把圖層一層一層疊上去。' } },
    { ch: 'g2', at: cell('範例 2-1'),
      say: '每一個程式格右上角都有「執行」和「還原」，可以直接改程式重新畫圖，快捷鍵是 Ctrl 或 Command 加 Enter。',
      act: [['point', () => { const c = cell('範例 2-1')(); return c && c.querySelector('.run'); }]] },
    { ch: 'g2', at: '#g2 .note.warn',
      say: '兩個最常見的錯誤。第一，圖層之間用加號，不是管線符號。第二，加號要放在一行的最後面。' },

    { ch: 'g3', at: W('g3', 0),
      say: '第三章，aes。寫在 aes 裡面叫做對應：顏色依照某一欄的值變化，會有圖例。看我切到「aes 外」。',
      act: [['click', B('g3', 0, 1)], ['say', '寫在 aes 外面叫做設定：所有的點都是同一個顏色，沒有圖例。再看常見的錯誤。'],
            ['click', B('g3', 0, 2)], ['say', '把固定的顏色名稱寫進 aes 裡面，ggplot 會把它當成一個類別，結果顏色不對，還多出一個奇怪的圖例。'],
            ['click', B('g3', 0, 0)]] },
    { ch: 'g3', at: W('g3', 2),
      say: '另一個重點是 aes 放在哪裡。寫在 ggplot 裡面，所有圖層都會用到；寫在某個 geom 裡面，只有那一層用到。看我切換。',
      act: [['click', B('g3', 2, 1)], ['say', '顏色只給點那一層，迴歸線就變回一條。'], ['click', B('g3', 2, 0)]] },

    { ch: 'g4', at: W('g4'),
      say: '第四章，一個數值的分布，用直方圖。最重要的參數是 binwidth，也就是每一格多寬。現在太窄，像鋸齒一樣。看我換寬一點。',
      act: [['click', B('g4', 0, 1)], ['say', '這個寬度看得出整體的形狀。再寬一點。'],
            ['click', B('g4', 0, 2)], ['say', '太寬的話，細節全部不見了。所以畫直方圖一定要多試幾個寬度。']] },
    std.ex('g4', '#gx1', '這是練習一。這一頁的練習要你把圖存成 p。'),

    { ch: 'g5', at: '#g5 .ch-h',
      say: '第五章，類別資料用長條圖。geom_bar 會幫你數每一類有幾筆；如果已經算好數字，就用 geom_col 照著畫。' },
    { ch: 'g5', at: W('g6'),
      say: '第六章，比較組別。同一份資料，可以換不同的 geom。現在是盒形圖。看我換成 jitter。',
      act: [['click', B('g6', 0, 1)], ['say', 'jitter 把每一個人的點抖開畫出來。兩個疊在一起。'],
            ['click', B('g6', 0, 2)], ['say', '盒形圖加上每一個點，是最推薦的畫法：看得到統計量，也看得到原始資料。'],
            ['click', B('g6', 0, 4)], ['say', '這是平均加減標準誤，論文裡很常見，但它把分布藏起來了。']] },

    { ch: 'g7', at: W('g7'),
      say: '第七章，兩個數值用散佈圖，再用 geom_smooth 加上趨勢線。method 等於 lm 是直線迴歸，灰色帶是信賴區間。',
      act: [['click', B('g7', 0, 1)], ['say', '換成 loess，就變成跟著資料彎曲的平滑曲線。'], ['click', B('g7', 0, 0)]] },
    { ch: 'g7', at: W('g8'),
      say: '第八章，隨時間變化用折線圖。畫每個人各自一條線的時候，group 很重要。平均曲線的誤差，可以用誤差線，也可以用誤差帶。',
      act: [['click', B('g8', 0, 1)], ['pause', 900], ['click', B('g8', 0, 0)]] },

    { ch: 'g9', at: W('g9'),
      say: '第九章，分面，依類別把一張圖拆成好幾張小圖。現在所有小圖共用同一個 y 軸，數值小的那一張被壓扁了。看我把 scales 改成 free。',
      act: [['click', B('g9', 0, 1)], ['say', '每張小圖有自己的 y 軸，變化就看得清楚了。但要小心，這時候不同的小圖不能直接比高低。']] },
    { ch: 'g9', at: W('g10'),
      say: '第十章，位置。同一個位置有好幾個長條時，可以疊起來、並排，或是換成比例。看我切換。',
      act: [['click', B('g10', 0, 1)], ['say', 'dodge 是並排，方便比較各組的人數。'],
            ['click', B('g10', 0, 2)], ['say', 'fill 把每一條拉成百分之百，比較的是比例。']] },

    { ch: 'g11', at: W('g11', 0),
      say: '第十一章，尺度與座標。有一個很重要的陷阱：想放大看某個範圍時，用 scale 的 limits 會把範圍外的資料直接刪掉。',
      act: [['click', B('g11', 0, 1)], ['say', '資料被刪掉之後，盒形圖是用剩下的人重新算的，整個盒子都變了。改用 coord_cartesian。'],
            ['click', B('g11', 0, 2)], ['say', '它只是把鏡頭拉近，資料一筆都沒少。']] },
    { ch: 'g11', at: W('g11', 1),
      say: '配色也是尺度的一部分。可以自己指定顏色，也可以用現成的調色盤。viridis 這一組對色盲友善，印成黑白也看得出深淺。',
      act: [['click', B('g11', 1, 3)]] },
    { ch: 'g11', at: '#g12 .ch-h',
      say: '第十二章，標籤與註解：用 labs 寫標題和軸名稱，用參考線和文字標出重點。' },
    { ch: 'g11', at: W('g13'),
      say: '第十三章，主題，控制和資料無關的外觀。內建的主題換一個函式就好。',
      act: [['click', B('g13', 0, 2)], ['say', 'theme_classic 只有座標軸線，沒有格線，最像傳統的統計圖。'], ['click', B('g13', 0, 3)]] },

    { ch: 'g14', at: '#g14 .ch-h',
      say: '第十四章，存檔與排版。用 ggsave 存圖，記得指定寬度、高度和解析度，才不會每次存出來都不一樣大。' },
    { ch: 'g14', at: '#g15 .ch-h',
      say: '第十五章，醫學與生資常見的四種圖：熱圖、比較兩種方法一致性的 Bland Altman 圖、整理很多效應量的森林圖，還有火山圖。' },

    { ch: 'g16', at: '#g16 .ch-h',
      say: '第十六章是完整的實作：real-time PCR 的結果分析。從擴增曲線、標準曲線與擴增效率、技術重複的品管，一路算到 delta delta Ct 和倍數變化，最後畫出報告用的圖。' },
    { ch: 'g16', at: '#g16 .note.tip',
      say: '這裡有一份 qPCR 分析的檢查清單，做自己的實驗時可以對照。' },
    { ch: 'g16', at: '#g17 .ch-h',
      say: '最後是總整理與速查表：什麼資料用什麼 geom，還有常見的錯誤。不知道該畫哪一種圖，可以回統計圖鑑查選圖決策樹；要做統計檢定，看 p 值教室。導覽到這裡結束，六個練習等你回頭挑戰。' },
  ]; },
  /* 練習題講解（每題：要標亮的解答片段 code、要唸的話 say）。魔王關不講解。 */
  explain: {
    "gx1": [
      {
        "say": "練習一的講解。畫糖化血色素的直方圖，兩組用不同的顏色。照圖形文法，一層一層寫。"
      },
      {
        "code": "p <- ggplot(lab, aes(x = hba1c, fill = group)) +",
        "say": "第一層，資料和對應。x 對應到 hba1c；fill 對應到 group，讓兩組的柱子填上不同顏色。直方圖只需要 x，y 會由它自己數出來。"
      },
      {
        "code": "geom_histogram(binwidth = 0.5, alpha = 0.6, position = \"identity\") +",
        "say": "第二層，直方圖。binwidth 是每一格的寬度。position 設成 identity，意思是兩組的柱子各畫各的、互相重疊，而不是疊上去；所以要搭配 alpha，設成半透明，才看得到後面那一組。"
      },
      {
        "code": "labs(x = \"HbA1c (%)\")",
        "say": "第三層，用 labs 設定 x 軸的標籤。"
      },
      {
        "say": "要注意兩件事：圖層之間用加號，而且加號放在行尾。還有，柱子的填色是 fill，不是 colour；colour 管的是外框。"
      }
    ],
    "gx2": [
      {
        "say": "練習二的講解。盒形圖加上每個人的點，是比較組別最推薦的畫法。"
      },
      {
        "code": "p <- ggplot(lab, aes(x = group, y = hba1c, fill = group)) +",
        "say": "三個對應都寫在 ggplot 裡：x 是組別，y 是數值，fill 也是組別。寫在這裡，後面每一個圖層都會用到。"
      },
      {
        "code": "geom_boxplot() +",
        "say": "第一個圖層，盒形圖。"
      },
      {
        "code": "geom_jitter(width = 0.15) +",
        "say": "第二個圖層，geom_jitter 把每個人畫成一個點，並且左右稍微抖開，才不會全部疊在同一條直線上。width 控制抖開的寬度。"
      },
      {
        "code": "labs(y = \"HbA1c (%)\")",
        "say": "最後設定 y 軸的標籤。"
      },
      {
        "say": "圖層的順序就是繪製的順序：盒形圖先畫，點後畫，所以點會蓋在盒子上面。"
      }
    ],
    "gx3": [
      {
        "say": "練習三的講解。這一題把好幾個元件組合在一起：散佈圖、參考線、自訂顏色和分面。"
      },
      {
        "code": "p <- ggplot(lab, aes(x = hba1c, y = glucose, colour = group)) +",
        "say": "先是對應。點的顏色是 colour，對應到 group。"
      },
      {
        "code": "geom_hline(yintercept = 126, linetype = \"dashed\") +",
        "say": "畫完點之後，用 geom_hline 加一條水平線。yintercept 是線的高度，linetype 設成 dashed 是虛線。"
      },
      {
        "code": "scale_colour_manual(values = c(control = \"steelblue\", diabetes = \"tomato\")) +",
        "say": "顏色用 scale_colour_manual 自己指定。values 是一個有名字的向量：名字是組別，值是顏色。這樣寫最保險，不會因為順序而配錯顏色。"
      },
      {
        "code": "facet_wrap(~ sex) +",
        "say": "facet_wrap 依性別分成兩張小圖。注意欄名前面要有波浪號。"
      },
      {
        "code": "labs(x = \"HbA1c (%)\", y = \"Glucose (mg/dL)\")",
        "say": "最後設定兩個座標軸的標籤。"
      },
      {
        "say": "要注意名稱的搭配：aes 裡用的是 colour，尺度就要用 scale_colour。如果用的是 fill，就要用 scale_fill。兩邊對不上，設定就不會生效。"
      }
    ],
    "gx4": [
      {
        "say": "練習四的講解。兩個類別變數，用分組長條圖。"
      },
      {
        "code": "p <- ggplot(lab, aes(x = blood, fill = group)) +",
        "say": "x 是血型，fill 是組別。這裡沒有 y，因為接下來的 geom_bar 會自己數每一類有幾個人。"
      },
      {
        "code": "geom_bar(position = \"dodge\") +",
        "say": "geom_bar 預設會把兩組疊起來。position 設成 dodge，才會並排。"
      },
      {
        "code": "scale_fill_manual(values = c(control = \"steelblue\", diabetes = \"tomato\")) +",
        "say": "長條的填色用的是 fill，所以這裡用 scale_fill_manual 指定顏色，寫法和上一題一樣，是有名字的向量。"
      },
      {
        "code": "labs(y = \"Count\")",
        "say": "最後設定 y 軸的標籤。"
      },
      {
        "say": "常見的錯誤是用了 geom_col。geom_col 需要你自己提供 y 的數字；要讓 ggplot 幫你數，要用 geom_bar。"
      }
    ],
    "gx5": [
      {
        "say": "練習五的講解。Bland Altman 圖用來看兩種測量方法一不一致。前面幾行是範例 15-2 的準備工作，已經算好三樣東西：每個檢體兩種方法的平均和差值、平均差 bias，還有兩條一致性界限 loa。"
      },
      {
        "code": "p <- ggplot(ba, aes(x = avg, y = diff)) +",
        "say": "畫圖的部分：x 是兩個方法的平均，y 是兩個方法的差。"
      },
      {
        "code": "geom_point() +",
        "say": "每個檢體畫成一個點。"
      },
      {
        "code": "geom_hline(yintercept = bias) +",
        "say": "第一條水平線畫在平均差的位置。如果兩個方法完全一致，這條線應該在 0。"
      },
      {
        "code": "geom_hline(yintercept = loa, linetype = \"dashed\")",
        "say": "第二個 geom_hline 畫一致性界限。loa 是長度為 2 的向量，所以一次就畫出上下兩條虛線。"
      },
      {
        "say": "這一題的小技巧是：yintercept 可以放一個向量，一次畫好幾條線。"
      }
    ],
    "gx6": [
      {
        "say": "練習六的講解。前面那一大段管線，是題目已經幫你算好的 fc，和步驟七一樣，不用改。你要寫的只有最後畫圖的部分。"
      },
      {
        "code": "p <- ggplot(fc, aes(x = condition, y = -ddct, colour = condition)) +",
        "say": "x 是條件，顏色也依照條件。重點在 y：寫的是負的 ddct。倍數變化等於 2 的負 delta delta Ct 次方，所以取以 2 為底的對數之後，剛好就是負的 delta delta Ct。aes 裡面可以直接寫運算式，不用先另外算一欄。"
      },
      {
        "code": "geom_hline(yintercept = 0) +",
        "say": "畫完點之後，加一條高度是 0 的水平線。在對數尺度上，0 代表沒有變化；往上 1 格是增加 2 倍，往下 1 格是減少一半，上下對稱。"
      },
      {
        "code": "facet_wrap(~ gene) +",
        "say": "用 facet_wrap 依基因分面，每個基因一張小圖。"
      },
      {
        "code": "labs(y = \"log2 fold change\")",
        "say": "最後設定 y 軸的標籤。"
      },
      {
        "say": "為什麼要用對數尺度？因為在原本的尺度上，增加 2 倍是從 1 到 2，減少一半卻是從 1 到 0.5，看起來不對稱，會低估下降的幅度。"
      }
    ]
  },
});
