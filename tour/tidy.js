/* R 寶的 tidyverse 完全手冊 · 語音導覽講稿 */
VoiceTour.init({
  chapters: [['ch0', '開場：tidyverse 是什麼'], ['ch1', '01 讀資料'], ['ch2', '02 管線 |>'], ['ch3', '03 挑出列與欄'], ['ch4', '04 mutate'], ['ch5', '05 分組統計'], ['ch6', '06 tidyr 整理格式'], ['ch7', '07 join 合併'], ['ch8', '08 字串、類別、日期'], ['ex-a', '實作範例'], ['ch14', '總整理與測驗']],
  steps: ({ cell, std, sub, nth }) => [
    std.hero('ch0', ' R 寶的 tidyverse 完全手冊'),
    std.toc('ch0'),
    { ch: 'ch0', at: '#ch0 .lead',
      say: '先說 tidyverse 是什麼。前面幾個單元用的都是 R 內建的函式，它們什麼都做得到，但每個函式的寫法不太一樣。tidyverse 是一群設計理念相同的套件：讀檔、整理、轉換、畫圖，每一步都有對應的工具，而且寫法一致。' },
    { ch: 'ch0', at: '#ch0 .note.link',
      say: '這一頁跑的是真正的 R。每一格都已經先跑好了，可以直接看結果。只有當你按下「執行」，瀏覽器才會開始下載 R，第一次需要等一下，之後就可以自己改程式試試看。' },
    { ch: 'ch0', at: cell('範例 1-1'),
      say: '每一個程式格右上角都有「執行」和「還原」。可以直接在格子裡修改程式再執行，快捷鍵是 Ctrl 或 Command 加 Enter。',
      act: [['point', () => { const c = cell('範例 1-1')(); return c && c.querySelector('.run'); }]] },
    { ch: 'ch0', at: '#pcBtn',
      say: '角落的「專案檔案」按鈕，可以下載這一頁用到的資料檔，還有練習用的 R 程式檔。', act: [['point', '#pcBtn']] },

    { ch: 'ch1', at: '#ch1 .ch-h',
      say: '第一章，讀資料。read_csv 把檔案讀成 tibble，也就是加強版的 data frame。讀檔時它會報告每一欄被當成什麼型態，一定要看一眼：本來應該是數字的欄，如果被當成文字，代表資料裡有問題。' },
    std.ex('ch1', '#ex1', '這是練習一。'),

    { ch: 'ch2', at: '#ch2 .ch-h',
      say: '第二章，管線。管線符號把左邊的結果，送進右邊函式的第一個參數，所以程式可以照做事的順序，一步一步往下寫，像輸送帶一樣。' },
    { ch: 'ch2', at: '#ch2 .note.warn',
      say: '要注意：管線符號一定要放在一行的最後面。放到下一行的開頭，R 會以為上一行已經結束了。' },

    { ch: 'ch3', at: '#verbLab',
      say: '第三章，dplyr 的動詞，用來挑出需要的列和欄。這個動詞實驗室可以看到每個動詞對表格做了什麼。現在是 filter：一列一列檢查條件，成立的留下。看我換成 arrange。',
      act: [['click', '#verbLab [data-k="arrange1"]'], ['say', 'arrange 是排序，列數不變，只是順序換了。再看 select。'],
            ['click', '#verbLab [data-k="select1"]'], ['say', 'select 挑的是欄。記住：filter 挑列，select 挑欄。']] },
    { ch: 'ch3', at: '#verbLab',
      say: '換你。請點「slice_max」，看看它留下哪幾列。',
      wait: { on: '#verbLab [data-k="slice_max"]', ev: 'click', then: '每點一個按鈕，下面的說明都會告訴你這個動詞做了什麼。' } },
    { ch: 'ch3', at: '#ch3 .note.tip',
      say: '一個重要的觀念：動詞不會改到原本的資料，只是把結果印出來。要留下結果，要用箭頭存成新的變數。' },

    { ch: 'ch4', at: '#verbLab2',
      say: '第四章，mutate，用來新增或修改欄位。它每一列都算一次，把結果放進新的一欄，列數不變。分類的時候，兩類用 if_else，三類以上用 case_when。',
      act: [['click', '#verbLab2 [data-k="mutate2"]'], ['pause', 800], ['click', '#verbLab2 [data-k="mutate3"]']] },

    { ch: 'ch5', at: '#sac',
      say: '第五章，group_by 加 summarise，做分組統計。背後是三個步驟：分割、計算、合併。看我按「播放」。',
      act: [['click', '#sac .go'], ['pause', 3500],
            ['say', '資料先依組別分開，每一組各自算出統計量，最後合併成一張小表，每一組一列。'],
            ['click', '#sac [data-by="sex"]'],
            ['say', '換成依性別分組，同樣的三個步驟，結果就變成男女各一列。']] },
    { ch: 'ch5', at: '#sac', hold: true,
      say: '換你。請點「group_by group, sex」，用兩個變數分組，再按「播放」，看看會分成幾組。' + std.hold },

    { ch: 'ch6', at: '#pivot',
      say: '第六章，tidyr，把資料整理成 tidy 格式：每一欄是一個變數，每一列是一筆觀察。最常用的是 pivot_longer，把寬的表拉成長的。看我按一下。',
      act: [['click', '#pivot [data-m="long"]'], ['pause', 1500],
            ['say', '原本橫向展開的每個格子，都變成長格式的一列。pivot_wider 則是反過來。'],
            ['click', '#pivot [data-m="wide"]']] },

    { ch: 'ch7', at: '#joinLab',
      say: '第七章，join，把兩張表依照共同的鍵合併起來。最常用的是 left_join：左表每一列都留下，右表找得到就接上，找不到就是 NA。看我換成 inner_join。',
      act: [['click', '#joinLab [data-k="inner_join"]'], ['say', 'inner_join 只留下兩邊都有的。再看 anti_join。'],
            ['click', '#joinLab [data-k="anti_join"]'], ['say', 'anti_join 留下左表有、右表沒有的列，檢查資料時很好用。'],
            ['click', '#joinLab [data-k="left_join"]']] },
    { ch: 'ch7', at: '#ch7 .note.warn',
      say: '提醒：join 之後一定要檢查列數。left_join 的列數應該和左表一樣；變多了，代表右表的鍵有重複。' },

    { ch: 'ch8', at: '#ch8 .ch-h',
      say: '第八章，三種特別的資料。stringr 處理文字，parse_number 從文字裡抓出數字，forcats 控制類別的順序，lubridate 處理日期。' },

    { ch: 'ex-a', at: '#ex-a .ch-h',
      say: '接下來是三個完整的實作範例，把前面的工具串起來。第一個是臨床檢驗資料：從原始匯出檔開始，讀入、找問題、清理、分類、做統計表、畫圖、存檔。' },
    { ch: 'ex-a', at: '#ex-b .ch-h',
      say: '第二個是葡萄糖耐受試驗：把寬的資料拉長，畫每個人的曲線和每組的平均曲線，再算曲線下面積。' },
    { ch: 'ex-a', at: '#ex-c .ch-h',
      say: '第三個是 RNA-seq 差異表現分析：從計數矩陣開始，拉長、正規化、每個基因做檢定，最後畫出火山圖和熱圖。要提醒的是，這個範例是為了練習 tidyverse，真正的分析請用 Bioconductor 的專用套件。' },

    { ch: 'ch14', at: '#ch14 .ch-h',
      say: '最後是總整理與速查表：我想要做什麼、該用哪個動詞，還有常見錯誤訊息怎麼看。忘記的時候回來查這裡。' },
    { ch: 'ch14', at: '#quiz', hold: true,
      say: '最後有一個小測驗：每一題描述一件想做的事，請點你認為該用的函式，點下去會馬上顯示對或錯。' + std.hold },
    { ch: 'ch14', at: '#ch14 .note.link',
      say: '想更深入的話，可以讀免費的線上書 R for Data Science。導覽到這裡結束，八個練習等你回頭挑戰。' },
  ],
  /* 練習題講解（每題：要標亮的解答片段 code、要唸的話 say）。魔王關不講解。 */
  explain: {
    "ex1": [
      {
        "say": "練習一的講解。有兩件事：讀入一個 CSV 檔，還有自己動手做一張小表格。"
      },
      {
        "code": "visits <- read_csv(\"data/visits.csv\",",
        "say": "read_csv 的第一個參數是檔案路徑。注意是底線的 read_csv，它來自 tidyverse，讀進來的是 tibble；有一個點的 read.csv 是 R 內建的，兩個不一樣。"
      },
      {
        "code": "show_col_types = FALSE",
        "say": "題目要求不要顯示欄位型態的訊息，所以加上 show_col_types 等於 FALSE。"
      },
      {
        "code": "cutoff <- tribble(",
        "say": "第二件事，用 tribble 做小表格。它的特色是可以照著表格的樣子一列一列打，很直覺。"
      },
      {
        "code": "~analyte,  ~limit,",
        "say": "第一列是欄名，每個欄名前面要加波浪號。之後每一列是一筆資料，值和值之間用逗號分開，文字要加引號，數字不用。"
      },
      {
        "say": "常見的錯誤是欄名前面忘了波浪號，還有最後一筆資料後面多打一個逗號。"
      }
    ],
    "ex2": [
      {
        "say": "練習二的講解。把兩行一層包一層的寫法，改寫成管線。訣竅是：從最裡面的東西開始，由內往外，一步一步往右寫。"
      },
      {
        "code": "s <- lab$chol |> sd() |> round(2)",
        "say": "第一行原本的寫法，最裡面是膽固醇那一欄，包在 sd 裡，再包在 round 裡。改成管線，就照做事的順序：先取出膽固醇，然後算標準差，然後取兩位。管線會把左邊的結果，放進右邊函式的第一個參數，所以 round 裡面只要寫 2。"
      },
      {
        "code": "n_old <- (lab$age >= 65) |> sum()",
        "say": "第二行要注意括號：年齡大於等於 65 這個比較，要先用括號包起來，再送進 sum。不加括號的話，R 會先把 65 送進 sum，結果就錯了。"
      },
      {
        "say": "重點是：管線右邊的函式一定要有括號，即使裡面是空的。"
      }
    ],
    "ex3": [
      {
        "say": "練習三的講解。一條管線，用三個動詞：篩選列、排序、挑欄。"
      },
      {
        "code": "filter(group == \"diabetes\", sex == \"F\")",
        "say": "第一步 filter。兩個條件用逗號分開，逗號的意思就是「而且」。比較要用兩個等號，一個等號是指定參數，會出錯。文字要加引號，而且大小寫要和資料裡的一模一樣。"
      },
      {
        "code": "arrange(desc(hba1c))",
        "say": "第二步 arrange 排序。預設是由小到大，題目要由高到低，所以把欄名包在 desc 裡面。"
      },
      {
        "code": "select(id, age, hba1c)",
        "say": "第三步 select，只留下三欄。"
      },
      {
        "code": "top_dm <- lab |>",
        "say": "最後別忘了最前面：要用箭頭把結果存成 top_dm，否則只是印出來，沒有留下來。"
      },
      {
        "say": "三個動詞的順序也有講究：先 filter 再 select。如果先 select 把 group 和 sex 丟掉，後面就沒辦法用它們篩選了。"
      }
    ],
    "ex4": [
      {
        "say": "練習四的講解。用 mutate 新增兩欄：一欄是換單位，一欄是把數值分成三類。"
      },
      {
        "code": "mutate(glucose_mmol = round(glucose / 18, 1),",
        "say": "第一欄，血糖除以 18，換成 mmol 每公升，再取到小數第一位。mutate 裡的寫法是：新欄名、等號、怎麼算。"
      },
      {
        "code": "chol_cat = case_when(",
        "say": "第二欄要分三類，用 case_when。每一行是一個條件、一個波浪號，再接結果。"
      },
      {
        "code": "chol >= 240 ~ \"high\",",
        "say": "條件是從上往下檢查的，第一個成立就決定，所以最嚴格的要寫在最上面：先看是不是大於等於 240。"
      },
      {
        "code": "chol >= 200 ~ \"borderline\",",
        "say": "能走到第二行的，一定是小於 240 的人，所以這裡只要寫大於等於 200 就好。"
      },
      {
        "code": ".default = \"desirable\"",
        "say": "最後用 default 處理其他所有情況。"
      },
      {
        "code": "select(id, glucose_mmol, chol, chol_cat)",
        "say": "最後用 select 留下題目要的四欄。"
      },
      {
        "say": "常見的錯誤是把兩個條件的順序寫反。那樣大於 240 的人會先符合大於等於 200，全部被分到 borderline。"
      }
    ],
    "ex5": [
      {
        "say": "練習五的講解。分組統計的標準寫法：group_by 加 summarise。"
      },
      {
        "code": "group_by(group, sex)",
        "say": "group_by 放兩個變數，就會依照組別和性別的每一種組合來分組，一共四組。"
      },
      {
        "code": "summarise(n = n(),",
        "say": "summarise 把每一組濃縮成一列。n 加括號是專門用來數每組有幾列的函式，括號裡什麼都不用寫。"
      },
      {
        "code": "mean_chol = round(mean(chol), 1),",
        "say": "第二個統計量是膽固醇的平均，取到小數第一位。"
      },
      {
        "code": ".groups = \"drop\"",
        "say": "最後這個參數是解除分組。用兩個變數分組時，summarise 做完預設還會留著一層分組，可能會影響後面的計算，所以直接在這裡解除。"
      },
      {
        "say": "如果忘記解除分組，結果看起來一樣，但檢查時會被判定不同。養成習慣，算完就解除。"
      }
    ],
    "ex6": [
      {
        "say": "練習六的講解。分成兩步：先把寬的表格拉長，再找出每位病人血糖最高的那一列。"
      },
      {
        "code": "pivot_longer(-time,",
        "say": "第一步 pivot_longer。第一個參數是要拉長哪些欄：減號 time，意思是 time 以外的全部，也就是三位病人那三欄。"
      },
      {
        "code": "names_to = \"patient\",",
        "say": "names_to 是原本的欄名要放進哪一個新欄，這裡叫 patient。values_to 是格子裡的值要放進哪一個新欄，這裡叫 glucose。兩個新欄名都要加引號，因為它們現在還不存在。"
      },
      {
        "code": "group_by(patient) |>",
        "say": "第二步，每位病人分開看，所以先 group_by。"
      },
      {
        "code": "slice_max(glucose, n = 1) |>",
        "say": "slice_max 在每一組裡，留下 glucose 最大的那一列。"
      },
      {
        "code": "ungroup()",
        "say": "做完一樣要解除分組。"
      },
      {
        "say": "這一題示範了為什麼要先整理成長格式：變長之後，「每位病人」就變成一個可以分組的欄位，後面的動詞才用得上。"
      }
    ],
    "ex7": [
      {
        "say": "練習七的講解。兩種 join 的應用：一個是接上資料，一個是檢查資料。"
      },
      {
        "code": "inner_join(lab |> select(id, group), by = \"id\") |>",
        "say": "第一部分，題目說兩邊都有的 id 才留，所以用 inner_join。又說只接 group 這一欄，所以先把 lab 用 select 縮成只有 id 和 group，再拿來接。by 等於 id，指定用哪一欄對應。"
      },
      {
        "code": "filter(group == \"diabetes\")",
        "say": "接上組別之後，再用 filter 只留糖尿病組。"
      },
      {
        "code": "anti_join(lab, by = \"id\") |>",
        "say": "第二部分，要找 visits 裡有、但 lab 裡找不到的 id。anti_join 做的正是這件事：留下左表中，在右表找不到對應的列。"
      },
      {
        "code": "distinct(id)",
        "say": "同一個 id 可能回診很多次，所以用 distinct 讓每個 id 只留一次，同時也只留下 id 這一欄。"
      },
      {
        "say": "anti_join 是檢查資料的好工具。兩張表要合併之前，先用它看看有沒有對不上的編號。"
      }
    ],
    "ex8": [
      {
        "say": "練習八的講解。原始匯出檔的三個欄位都不乾淨，要各用一種工具處理。另外，這個檔案的欄名有空白和括號，在程式裡要用反引號包起來。"
      },
      {
        "code": "sex = str_to_upper(str_sub(Sex, 1, 1)),",
        "say": "性別欄的寫法不一致，但不管怎麼寫，第一個字母都是 M 或 F，只是大小寫不一定。所以用 str_sub 取第一個字，再用 str_to_upper 轉成大寫。"
      },
      {
        "code": "glucose = parse_number(`Glucose (mg/dL)`,",
        "say": "血糖欄是文字，裡面夾著單位。parse_number 會從文字裡抓出數字。"
      },
      {
        "code": "na = c(\"\", \"NA\", \"hemolyzed\")",
        "say": "但有些格子寫的是 hemolyzed，也就是溶血，根本沒有數字。用 na 參數事先告訴它，這些寫法都當作 NA，才不會跳出警告。"
      },
      {
        "code": "month = month(`Collect Date`)",
        "say": "日期欄已經被讀成日期了，用 lubridate 的 month 函式直接取出月份。"
      },
      {
        "code": "select(id = `Patient ID`, sex, glucose, month)",
        "say": "最後用 select 留下四欄。新名字、等號、舊名字的寫法，可以邊選邊改名。"
      },
      {
        "say": "這一題是真實資料清理的縮影：先觀察每一欄亂在哪裡，再挑對的工具。"
      }
    ]
  },
});
