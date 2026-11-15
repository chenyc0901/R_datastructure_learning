/* R 寶的資料倉庫 · 語音導覽講稿 */
VoiceTour.init({
  chapters: [['c0', '開場：這一頁怎麼用'], ['ch1', '01 套件：install 與 library'], ['ch2', '02 ::、require、Bioconductor'], ['ch3', '03 工作目錄與路徑'], ['ch4', '04 文字檔'], ['ch5', '05 CSV 與 data.frame'], ['ch6', '06 TSV 與遺漏值'], ['ch7', '07 RDS 與 source'], ['ch8', '08 大魔王與總整理']],
  steps: ({ cell, std, nth, btn }) => [
    std.hero('c0', ' R 寶的資料倉庫'),
    std.toc('c0'),
    { ch: 'c0', at: '#intro .note.lab',
      say: '這一頁是一台模擬的電腦。R 寶的電腦裡有一個專案資料夾，放著檢驗科送來的資料。要記得：每一格範例，都像是重新打開一次 RStudio，所以上一格載入的套件、做好的變數，下一格不會留著。' },
    std.run('c0', '範例 1-1'),
    { ch: 'c0', at: '#pcBtn',
      say: '角落的「專案檔案」按鈕，可以看到這個模擬專案資料夾裡有哪些檔案。', act: [['point', '#pcBtn']] },

    { ch: 'ch1', at: '#ch1 .ch-h',
      say: '第一章，套件是什麼。套件就是別人寫好的工具箱。要用它有兩個動作：install.packages 是安裝，每台電腦做一次；library 是載入，每次打開 R 都要做。' },
    { ch: 'ch1', at: '#shelf',
      say: '用書架來想。安裝是把書買回來放上書架，載入是把書從書架拿到桌上。看我示範：先按 install.packages。',
      act: [['click', '#shelf [data-act="install"]'], ['say', '書放上書架了，但還沒拿到桌上。接著按 library。'],
            ['click', '#shelf [data-act="library"]'], ['say', '書到桌上了，現在才能用它的函式。'],
            ['click', '#shelf [data-act="use"]'], ['pause', 700],
            ['say', '最後我按「關掉 R 再打開」。'],
            ['click', '#shelf [data-act="restart"]'],
            ['say', '桌上的書被收走了，但書架上還在。所以不用重新安裝，只要再 library 一次。']] },
    { ch: 'ch1', at: '#shelf', hold: true,
      say: '換你。請在上面選另一本書，例如 dplyr，先不安裝，直接按「用它的函式」，看看會出現什麼錯誤訊息。' + std.hold },
    { ch: 'ch1', at: '#ch1 .note.warn',
      say: '兩個常見的錯誤：install.packages 裡的套件名稱要加引號；套件名稱有分大小寫，打錯就找不到。' },
    std.ex('ch1', '#ex1', '這是練習一。'),

    { ch: 'ch2', at: '#ch2 .ch-h',
      say: '第二章。套件名稱加兩個冒號再加函式名稱，不用 library 也能呼叫，而且一眼看得出函式來自哪個套件。兩個套件有同名的函式時，後載入的會蓋掉先載入的，這時用兩個冒號指名道姓最安全。另外，生物資訊的套件大多放在 Bioconductor，要用 BiocManager 來安裝。' },

    { ch: 'ch3', at: '#ch3 .ch-h',
      say: '第三章，工作目錄與路徑。R 找檔案時，是從工作目錄出發的。絕對路徑從最上層寫起，相對路徑從工作目錄寫起。' },
    { ch: 'ch3', at: '#pathnav',
      say: '這個路徑導航，會一步一步告訴你 R 怎麼解讀一條路徑。看我點幾個例子。',
      act: [['click', btn('#pathnav', 'qpcr.csv')], ['say', '只寫檔名，R 會直接在工作目錄裡找；檔案其實在 data 資料夾裡，所以找不到。'],
            ['click', btn('#pathnav', '../Downloads')], ['say', '兩個點代表往上一層資料夾。'],
            ['click', btn('#pathnav', 'data\\qpcr.csv')], ['say', '最後這個是 Windows 的反斜線，在 R 的字串裡會出問題，要改成一般的斜線。']] },
    { ch: 'ch3', at: '#pathnav', hold: true,
      say: '換你。上面的輸入框可以自己打路徑，或者把其他幾個例子都點點看。' + std.hold },
    { ch: 'ch3', at: cell('範例 3-5'),
      say: '另外提醒：setwd 能不用就不用。把路徑寫死在程式裡，換一台電腦就不能跑了。用專案資料夾加上相對路徑，才是好習慣。' },

    { ch: 'ch4', at: '#ch4 .ch-h',
      say: '第四章，文字檔。readLines 把檔案一行一行讀進來，變成文字向量，很適合讀 FASTA 這種序列檔。writeLines 和 cat 則用來寫出文字檔。' },

    { ch: 'ch5', at: '#csvw',
      say: '第五章，CSV 和 data frame。CSV 就是用逗號分隔的純文字表格。左邊是檔案的內容，右邊是讀進 R 之後的樣子。看我把 header 改成 FALSE。',
      act: [['click', '#csvw [data-v="0"]'], ['say', '第一行不再被當成欄名，而是被當成資料。改回來，再把分隔符號換成分號。'],
            ['click', '#csvw [data-v="1"]'], ['click', '#csvw [data-v=";"]'],
            ['say', '分隔符號設錯，整行就切不開，全部擠在同一欄。所以讀檔之前，要先看清楚檔案長什麼樣子。'],
            ['click', '#csvw [data-v=","]']] },
    { ch: 'ch5', at: cell('範例 5-5'),
      say: '寫出 CSV 的時候，記得加上 row.names 等於 FALSE，不然檔案會多出一欄沒有用的列編號。另外，篩選資料時要小心遺漏值 NA。' },

    { ch: 'ch6', at: '#ch6 .ch-h',
      say: '第六章，其他格式和遺漏值。用 tab 分隔的檔案用 read.delim，用空白分隔的用 read.table。儀器匯出的檔案，遺漏值不一定寫成 NA，可以用 na.strings 告訴 R 哪些寫法代表遺漏。原則是：先看檔案長怎樣，再選對的函式和參數。' },

    { ch: 'ch7', at: '#ch7 .ch-h',
      say: '第七章。saveRDS 把一個 R 物件原封不動存下來，型別、factor 的順序都會保留，用 readRDS 讀回來；缺點是別的軟體打不開。source 則是執行一個點 R 檔，可以把自己常用的函式放在裡面，重複使用。' },

    { ch: 'ch8', at: '#ch8 .ch-h',
      say: '第八章是大魔王：批次讀取整個資料夾。流程是用 list.files 列出檔案，用 lapply 一個一個讀進來，再用 do.call 加 rbind 接成一張大表。這也是上一個單元 apply 家族最實用的地方。' },
    { ch: 'ch8', at: '#sum .ch-h',
      say: '最後的總整理，教你專案資料夾怎麼放，讓別人、還有三個月後的你，打開就能跑。導覽到這裡結束，八個練習等你回頭挑戰。' },
  ],
  /* 練習題講解（每題：要標亮的解答片段 code、要唸的話 say）。魔王關不講解。 */
  explain: {
    "ex1": [
      {
        "say": "練習一的講解。這一題的重點是：每一格都是新開的 R。套件雖然已經裝好了，但還沒有載入，所以第一件事是 library。"
      },
      {
        "code": "library(stringr)",
        "say": "先用 library 載入 stringr。不需要 install.packages，因為題目說這台電腦已經裝好了。少了這一行，後面的函式都會找不到。"
      },
      {
        "code": "len <- str_length(genes)",
        "say": "str_length 算每個基因名稱有幾個字。它是向量化的，整個向量丟進去，就得到每個元素的長度。"
      },
      {
        "code": "is_il <- str_detect(genes, \"^IL\")",
        "say": "str_detect 檢查每個名稱符不符合某個樣式，回傳 TRUE 或 FALSE。樣式裡的尖尖符號代表開頭，所以意思是「以 IL 開頭」。少了這個符號，名字中間有 IL 的也會被算進去。"
      },
      {
        "code": "il_genes <- genes[is_il]",
        "say": "最後用那一排 TRUE 和 FALSE 當索引，把 IL 開頭的基因挑出來。"
      },
      {
        "say": "常見的錯誤是忘記 library，還有樣式少了代表開頭的符號。"
      }
    ],
    "ex2": [
      {
        "say": "練習二的講解。這一題不准用 library，要用兩個冒號的寫法，指名道姓地呼叫 stringr 裡的函式。"
      },
      {
        "code": "up <- stringr::str_to_upper(seqs)",
        "say": "寫法是套件名稱、兩個冒號、函式名稱。這樣不用先載入套件，也能直接使用。第一步把所有序列轉成大寫，因為原始資料大小寫混在一起，不先統一，後面就數不準。"
      },
      {
        "code": "cpg <- stringr::str_count(up, \"CG\")",
        "say": "第二步，str_count 數每條序列裡出現幾次 CG。注意是對轉成大寫之後的 up 來數，不是原本的 seqs。"
      },
      {
        "code": "has_tata <- stringr::str_detect(up, \"TATAA\")",
        "say": "第三步，str_detect 檢查每條序列有沒有 TATAA 這一段，回傳 TRUE 或 FALSE。"
      },
      {
        "say": "常見的錯誤是後面兩步還在用原本的 seqs，結果小寫的部分就沒被算到。另外，每一個函式前面都要加上 stringr 和兩個冒號。"
      }
    ],
    "ex3": [
      {
        "say": "練習三的講解。這一題練習的是不把檔名寫死：資料夾裡有哪些檔案，讓 R 自己去列出來。一共要做四件事。"
      },
      {
        "code": "csv_files <- list.files(\"data/plate\", pattern = \"\\\\.csv$\", full.names = TRUE)",
        "say": "第一件事，用 list.files 列出檔案。pattern 是篩選的樣式：兩個反斜線加一個點，代表真正的點；錢字號代表結尾。合起來就是「以點 csv 結尾」，這樣說明檔就不會混進來。full.names 等於 TRUE，會把資料夾路徑接在檔名前面。"
      },
      {
        "code": "ids <- sub(\"\\\\.csv$\", \"\", basename(csv_files))",
        "say": "第二件事，取出樣本編號。先用 basename 去掉前面的資料夾，只留檔名；再用 sub 把結尾的點 csv 換成空字串。"
      },
      {
        "code": "out_file <- file.path(\"results\", \"plate_summary.csv\")",
        "say": "第三件事，用 file.path 組出輸出的路徑。它會自動用斜線把各段接起來，比自己用 paste 接安全。"
      },
      {
        "code": "if (!dir.exists(\"results\")) dir.create(\"results\")",
        "say": "第四件事，確定 results 資料夾存在。先用 dir.exists 檢查，不存在才建立，這樣不管資料夾原本在不在，程式都不會出錯。"
      },
      {
        "say": "常見的錯誤是忘記 full.names，結果只拿到檔名，之後讀檔就找不到檔案。"
      }
    ],
    "ex4": [
      {
        "say": "練習四的講解。這一題比較難：FASTA 檔裡，一條序列可能分成好幾行，要先把同一條的各行接起來，再輸出每一條的長度。關鍵是想辦法知道每一行屬於第幾條序列。"
      },
      {
        "code": "fa <- readLines(\"data/run.fasta\")",
        "say": "先用 readLines 把整個檔案一行一行讀進來，變成文字向量。"
      },
      {
        "code": "is_head <- grepl(\"^>\", fa)",
        "say": "用 grepl 找出標題行，也就是大於符號開頭的行，得到一排 TRUE 和 FALSE。"
      },
      {
        "code": "id <- cumsum(is_head)",
        "say": "這一行是整題的關鍵。對那一排 TRUE 和 FALSE 做累加：每遇到一個標題行，數字就加 1。結果，第一條序列的每一行都是 1，第二條的每一行都是 2，等於幫每一行貼上「第幾條」的標籤。"
      },
      {
        "code": "seqs <- sapply(split(fa[!is_head], id[!is_head]), paste, collapse = \"\")",
        "say": "有了標籤，就可以分組。先只留下不是標題的序列行，用 split 依照標籤分組；再用 sapply 對每一組做 paste，collapse 設成空字串，把同一條的各行接成一整條。"
      },
      {
        "code": "names(seqs) <- sub(\" .*\", \"\", sub(\"^>\", \"\", fa[is_head]))",
        "say": "接著設定名字。從標題行出發，裡面那層 sub 去掉開頭的大於符號，外面那層 sub 去掉第一個空白之後的說明，只留下編號。"
      },
      {
        "code": "lines <- paste(names(seqs), nchar(seqs), sep = \"\\t\")",
        "say": "最後寫出檔案。先確定 results 資料夾存在，再用 paste 把編號和長度接起來，中間用 tab 分隔，然後用 writeLines 每個元素寫成一行。"
      },
      {
        "say": "這一題最值得記住的，是用累加來幫每一行編組的技巧。以後遇到「一筆資料跨好幾行」的檔案，都可以用同一招。"
      }
    ],
    "ex5": [
      {
        "say": "練習五的講解。這是一個完整的小流程：讀檔、篩選、排序、寫檔。"
      },
      {
        "code": "run <- read.csv(\"data/qpcr_run.csv\")",
        "say": "第一步，用 read.csv 讀進來，存成 run。題目要求保留原始資料，所以後面清理的結果要另外存，不要蓋掉 run。"
      },
      {
        "code": "clean <- run[!is.na(run$ct) & run$ct < 35, ]",
        "say": "第二步，篩選。條件有兩個：Ct 不是 NA，而且小於 35。這裡一定要先排除 NA，因為 NA 和 35 比較的結果是 NA，會讓篩出來的表多出整列都是 NA 的怪東西。另外注意中括號裡的逗號：逗號前面是要留的列，逗號後面留空白，代表所有的欄。"
      },
      {
        "code": "clean <- clean[order(clean$ct), ]",
        "say": "第三步，排序。order 回傳的是「由小到大排的話，應該依序拿第幾列」，把它放在逗號前面，整張表就排好了。"
      },
      {
        "code": "write.csv(clean, \"results/qpcr_clean.csv\", row.names = FALSE)",
        "say": "第四步，寫出檔案。先確定 results 資料夾存在，再用 write.csv。記得加上 row.names 等於 FALSE，不然檔案會多出一欄列編號。"
      },
      {
        "say": "常見的錯誤有三個：忘記處理 NA、中括號裡忘記逗號，還有寫檔時忘記 row.names 等於 FALSE。"
      }
    ],
    "ex6": [
      {
        "say": "練習六的講解。儀器匯出的檔案有三個麻煩：開頭有井字號的說明行、欄位用 tab 分隔、遺漏值有兩種寫法。處理的原則是：先看檔案長什麼樣子，再決定參數。"
      },
      {
        "code": "cat(readLines(\"data/chem.tsv\"), sep = \"\\n\")",
        "say": "所以第一行先把檔案原封不動印出來看，確認上面說的三件事。"
      },
      {
        "code": "chem <- read.delim(\"data/chem.tsv\", comment.char = \"#\", na.strings = c(\"NA\", \".\"))",
        "say": "然後一次解決。tab 分隔，所以用 read.delim。comment.char 設成井字號，那些說明行就會被當成註解跳過。na.strings 告訴 R，NA 和一個點，都代表遺漏值。"
      },
      {
        "code": "str(chem)",
        "say": "讀完用 str 檢查每一欄的型態。如果遺漏值沒有設定好，那個點會讓整欄變成文字，這裡一看就知道。"
      },
      {
        "code": "n_missing <- colSums(is.na(chem))",
        "say": "每一欄有幾個遺漏值：is.na 把整張表變成 TRUE 和 FALSE，colSums 一欄一欄加起來。"
      },
      {
        "code": "complete <- na.omit(chem)",
        "say": "na.omit 只留下完全沒有遺漏值的列。"
      },
      {
        "code": "write.table(complete, \"results/chem_complete.tsv\", sep = \"\\t\", quote = FALSE, row.names = FALSE)",
        "say": "最後寫出 TSV，用 write.table，三個參數分別是：分隔符號用 tab、不加引號、不要列名。"
      },
      {
        "say": "常見的錯誤是沒有設定 na.strings，結果數字欄變成了文字欄。讀完檔一定要用 str 看一眼。"
      }
    ],
    "ex7": [
      {
        "say": "練習七的講解。這一題把三件事串起來：用 source 載入自己寫的函式、用它來計算，再用 RDS 把結果存起來。"
      },
      {
        "code": "source(\"R/helpers.R\")",
        "say": "source 會把那個檔案從頭到尾執行一遍。檔案裡定義了 gc_content 這個函式，執行完之後就可以使用了。"
      },
      {
        "code": "gc <- vapply(batch$seqs, gc_content, numeric(1))",
        "say": "接著對每條序列算 GC 比例。這裡用上一個單元學的 vapply：每條序列交給 gc_content，說好每次回傳一個數字。序列原本的名字會自動沿用。"
      },
      {
        "code": "batch$gc <- gc",
        "say": "用錢字號，在 batch 這個 list 裡新增一個叫 gc 的元素。"
      },
      {
        "code": "saveRDS(batch, \"results/batch.rds\")",
        "say": "先確定 results 資料夾存在，再用 saveRDS 把整個 list 原封不動存成一個檔案。"
      },
      {
        "code": "back <- readRDS(\"results/batch.rds\")",
        "say": "readRDS 把它讀回來。和 load 不一樣的地方是，讀回來的東西要自己取名字，這裡叫 back。最後一行用 identical 確認，讀回來的和原本的完全一樣。"
      },
      {
        "say": "RDS 的好處是，list 的結構、名字和型別全部保留，不會像 CSV 那樣，讀回來還要重新猜型別。"
      }
    ]
  },
});
