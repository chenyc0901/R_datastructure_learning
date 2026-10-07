# 大數據分析與實踐 · R 互動教材

**課程首頁：** https://chenyc0901.github.io/R_datastructure_learning/

| 單元 | 頁面 |
|---|---|
| 封面 | `index.html` |
| 01 記憶體裡的 R 物件 | `memory.html` |
| 02 R 寶的奇幻旅程 | `loops.html` |
| 03 R 寶的演算法學院 | `algo.html` |
| 04 R 寶的 apply 工廠 | `apply.html` |
| 05 R 寶的資料倉庫 | `io.html` |
| 06 R 寶的統計圖鑑 | `plot.html` |
| 07 R 寶的 tidyverse 完全手冊 | `tidy.html` |
| ＋ 控制流程補充教材 | `extras.html` |

## 第一部分：記憶體裡的 R 物件（`memory.html`）

R 資料結構的互動式教材 —— 從「電腦怎麼擺放 bytes」的角度解釋 vector、list、matrix、factor、data.frame。

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/memory.html

## 這是什麼

中國醫藥大學 醫技系「大數據分析與實踐」課程（Lecture 2–3）的補充教材。

每個章節都是左右對照的：

- **左邊（程式端）** —— 你寫的 R 程式碼，以及 console 印出來的樣子
- **右邊（電腦端）** —— 同一時刻的記憶體傾印：位址、真正的 bytes、指標、屬性

滑鼠移到任一邊，另一邊會同步亮起來，底部的連結列說明兩者怎麼對應。

十六進位數字是照 IEEE 754 與 little-endian 實際計算的，不是示意值。

## 章節

| # | 主題 | 重點 |
|---|---|---|
| 01 | CPU 只看得到位址與 bytes | hex dump、SEXP header 48 bytes 拆解、`object.size()` 的尺寸級距 |
| 02 | 變數與 `<-` | environment 是名字→位址的對照表、copy-on-modify、GC |
| 03 | Atomic vector | 位址跨距、O(1) 索引、character 為什麼是指標 |
| 04 | Coercion | 型別階梯、同一個值在三種型別下的 bytes |
| 05 | Named vector | `attrib` → 屬性節點 → names 向量的完整鏈結、名字索引是線性搜尋 |
| 06 | List | 指標陣列、`c()` 會把結構壓扁 |
| 07 | `[ ]` vs `[[ ]]` vs `$` | 拿盒子 vs 打開盒子 |
| 08 | Matrix | vector ＋ `dim`，column-major |
| 09 | Factor | integer 編碼 ＋ `levels` 對照表 |
| 10 | data.frame | 全部展開：指標陣列 ＋ 四塊欄位 ＋ 三個屬性 |
| 11 | 全圖 | 兩個源頭加屬性長出五種結構 |
| 12 | 隨堂測驗 | 十一題，附解釋 |

## 第二部分：R 寶的奇幻旅程（`loops.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/loops.html

Karel 風格的程式遊戲：寫 R 程式指揮機器人「R 寶」走迷宮、撿寶石。程式會逐行執行，同時顯示目前執行的那一行、Environment 裡的變數和 Console 輸出。

| # | 主題 | 重點 |
|---|---|---|
| 1 | 順序 | 一行一行執行、函式呼叫要加 `()` |
| 2–3 | `for` | `1:n` 序列、柵欄問題、`1:0` 陷阱與 `seq_len()` |
| 4 | `while` | 不知道次數時用條件控制、無限迴圈 |
| 5 | `!` | 把 TRUE 變 FALSE |
| 6 | `if` | 比較運算子、`%%` 取餘數 |
| 7 | `%in%` | for 迴圈裡判斷「是否屬於」，和 for 的 `in` 區分 |
| 8 | while + if | 柵欄問題再現 |
| 9 | `&&` / `\|\|` | 而且／或者 |
| 10 | `break` | 提早結束整個迴圈 |
| 11 | `repeat` | 沒有條件的迴圈，靠 `if … break` 離開；「先做事、再檢查」一個迴圈解決柵欄問題 |
| 12 | `next` | 跳過這一圈（其他語言的 continue） |
| 13–14 | 巢狀迴圈 | 外層 × 內層、內層次數依賴外層變數 |
| 15 | `ifelse()` | 向量化判斷，對比 `if` 的 `the condition has length > 1` |
| 16 | 迷宮 | `while` + `if … else if … else` 右手扶牆法 |
| 17 | ☠ 大魔王 | 隨機大小的倉庫：蛇行掃描（巢狀 `repeat` + `break`）、`while` 撿光疊放的寶石、變數計數、`seq_len()` 避開 `1:0` |
| 18 | 🧬 生資實戰 | HBB 基因突變篩檢（鐮刀型貧血 HbS）：用 `$`／`[[ ]]` 從 list 取出序列、和參考 vector 逐一比對、`c(pos, i)` 收集突變、`%in%` 判讀 |
| ★ | 預測挑戰 | 讀程式碼、預測輸出 |

會隨機產生地圖的關卡，過關後會再用其他幾張地圖測試，寫死步數的程式會被抓出來。進度存在瀏覽器的 localStorage。

## 第三部分：R 寶的演算法學院（`algo.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/algo.html

和第二部分同一個機器人與直譯器，改成練習自己寫 `function`，再用 function 組出演算法。執行時 Environment 會標出 function 裡的區域變數，遞迴時對話框會顯示第幾層。

| # | 主題 | 重點 |
|---|---|---|
| 1 | function | 定義與呼叫：自己做 `turn_around()` |
| 2 | 參數 | `move_n(n)`、引數、`seq_len(n)` 處理 0 |
| 3 | return | 回傳值、最後一行自動回傳；量走廊找中點 |
| 4 | 區域變數 | function 裡改不到外面的變數，用回傳值帶出結果 |
| 5 | 位置引數、具名引數、預設值 | positional vs keyword argument、混用時的配對規則、`function(len, n = 1)` |
| 6 | 分解問題 | 由上而下設計：`harvest_row()` 收割整片田 |
| 7 | 線性搜尋 | `return` 立刻離開 function、最差 n 步 |
| 8 | 最大值 | 記住目前最大值與位置 |
| 9 | 遞迴 | 停止條件、呼叫堆疊；不准用迴圈 |
| 10 | 💀 氣泡排序 | 相鄰比較、n − 1 輪 |
| ★ | 預測挑戰 | 作用域、預設值、提早 return、遞迴的輸出順序 |

## 第四部分：R 寶的 apply 工廠（`apply.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/apply.html

apply 家族從原理到應用，每段程式都能直接執行（內建的 R 直譯器支援函式值、具名向量、矩陣與 list），輸出已逐一和真正的 R 比對。

| 章 | 內容 | 練習 |
|---|---|---|
| 01 | 原理：函式也是值、匿名函式、親手做 lapply；動畫「R 寶工廠」 | 自己做 my_map |
| 02 | lapply：結果裝進 list、`...` 額外參數 | 定序讀長品管 |
| 03 | sapply 的簡化規則與陷阱、vapply 的 FUN.VALUE | GC 含量 |
| 04 | apply：矩陣的列與欄、結果轉置；動畫 | 變異係數最大的基因 |
| 05 | mapply 與 Map | 從不同位置讀密碼子 |
| 06 | tapply 與 split（split → apply → combine 動畫） | qPCR 平均 Ct |
| 07 | Filter、Reduce、do.call | 多次實驗的核心基因 |
| 08 | 大魔王：多位病人的 HBB 批次篩檢（不准寫迴圈） | HBB 篩檢 |

## 補充教材：控制流程（`extras.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/extras.html

閱讀式教材，每段程式碼都能直接修改、執行（和遊戲共用同一個 R 直譯器），每章最後有一題用多組測資自動批改的練習。

| 章 | 主題 | 重點 |
|---|---|---|
| 01 | if / else 完整版 | `else if` 鏈的順序、`} else` 要同一行、`if` 回傳值 vs `ifelse()` |
| 02 | 在迴圈裡存結果 | `numeric(n)` 預先配置、`x[i] <- …`、`c()` 接長的代價、超出長度補 NA |
| 03 | 走訪值還是位置 | `for (b in dna)` vs `seq_along()`、`1:length(x)` 空向量陷阱、迴圈變數 |
| 04 | 向量化 | `sum` / `mean` / `which` / `any` / `all` / `x[條件]`，什麼時候還是需要迴圈 |
| 05 | switch、&& 與 NA | `switch()`、`&&` vs `&`、NA 的傳染與 `is.na()`、短路 |

## 使用

三個 HTML 檔（`index.html` 封面、`memory.html`、`loops.html`），沒有建置步驟、沒有相依套件。直接開 `index.html` 即可，或用任何靜態伺服器托管。

字型從 Google Fonts 載入（Noto Sans TC / JetBrains Mono / Chakra Petch），離線時會退回系統字型。

## 授權

教學用途，歡迎自由使用與修改。

---
陳育辰（YCC）· 中國醫藥大學 醫技系

## 第五部分：R 寶的資料倉庫（`io.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/io.html

套件的安裝與載入、工作目錄與路徑，以及文字檔、CSV、TSV、RDS 的讀寫。頁面模擬一台電腦：安裝過的套件和寫進「硬碟」的檔案會保留下來（存在瀏覽器裡），變數和 `library()` 每一格重來；右下角的「R 寶的電腦」可以看硬碟內容和已安裝的套件。範例的輸出和寫出的檔案都已和真正的 R 比對（套件下載訊息是模擬的）。

| 章 | 內容 | 練習 |
|---|---|---|
| 01 | 套件是什麼、`install.packages` 與 `library`；動畫「R 寶的書架」 | 第一次用 stringr |
| 02 | `套件::函式`、同名函式的遮蔽、`require`、Bioconductor 與 BiocManager | 只用 `::` 找 CpG |
| 03 | `getwd`、`list.files`、絕對／相對路徑、`file.path`、`dir.create`；動畫「路徑導航」 | 整理一盤樣本檔 |
| 04 | `readLines`、FASTA 解析、`writeLines`、`cat(append = TRUE)` | FASTA 長度報告 |
| 05 | data.frame、`read.csv`、NA 篩選陷阱、`write.csv(row.names = FALSE)`；動畫「CSV ↔ data.frame」 | qPCR 資料清理 |
| 06 | `read.delim`、`read.table`、`na.strings`、註解行、`na.omit`、寫 TSV | 整理儀器匯出檔 |
| 07 | 型別被猜錯、`saveRDS`／`readRDS`、`save`／`load`、`source` | 存下分析結果 |
| 08 | 大魔王：`list.files` → `lapply` → `do.call(rbind)` 批次合併 | 合併一整批計數檔 |

## 第六部分：R 寶的統計圖鑑（`plot.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/plot.html

用 R 內建的繪圖函式（base graphics）呈現統計結果。網頁裡的直譯器會把 `plot()`、`hist()`、`boxplot()` 等畫成 SVG，版面、刻度和預設顏色都對照真正的 R 調整過；summary、quantile、t.test、lm 等文字輸出已和 R 4.4.2 逐字比對。

| 章 | 內容 | 練習 |
|---|---|---|
| 01 | `plot()` 與圖的組成：main、xlab、ylab、pch、col、cex；動畫「調整一張圖」 | 年齡與膽固醇散佈圖 |
| 02 | 一個數值：`summary`、`hist`、`boxplot`、密度曲線；動畫「分布顯微鏡」 | 膽固醇直方圖＋中位數線 |
| 03 | 類別資料：`table`、`prop.table`、`barplot`、`pie` 的使用時機 | 兩組人數長條圖 |
| 04 | 比較組別：`boxplot(y ~ g)`、資料點、平均數 ± SD、`t.test` | 男女的 HbA1c |
| 05 | 兩個數值：散佈圖、`cor`、`lm` 與迴歸線；動畫「相關係數直覺」 | 年齡和膽固醇的關係 |
| 06 | 折線圖：`type = "b"`、`lines`、`legend`、`par(mfrow)`、`png()` 存檔 | 兩位病人的 OGTT |
| 07 | 更多常用的圖：分組／堆疊長條圖、`mosaicplot` + `chisq.test`、`stripchart`、`dotchart`、`qqnorm`、`pairs` | 血型 × 組別 |
| 08 | 總整理：選圖決策樹（可點選的流程圖）、對照表、小測驗、誤導圖 | — |
| 07 | 總整理：資料類型 → 圖的對照表、選圖器、8 題小測驗、常見的誤導圖 | — |

## 第七部分：R 寶的 tidyverse 完全手冊（`tidy.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/tidy.html

從讀資料、整理、轉換、合併，一路到 ggplot2 繪圖。這一頁執行的是**真正的 R**：用 [webR](https://docs.r-wasm.org/webr/) 在瀏覽器裡跑 R 4.6 與 tidyverse。每一格的輸出都已經在建置時用同一個 webR 預先執行好，所以不用等 R 下載就能閱讀；按「執行」才會下載 R（第一次約 30–60 秒）。

| 章 | 內容 | 練習 |
|---|---|---|
| 00 | tidyverse 是什麼、資料分析流程、安裝與載入 | — |
| 01 | `read_csv`、tibble、`glimpse`、`tribble`、`write_csv` | 讀入回診資料 |
| 02 | 管線 `\|>`（與 `%>%`） | 改寫成管線 |
| 03 | `filter`、`arrange`、`select`、`rename`、`distinct`、`slice_*`（動詞實驗室動畫） | 女性糖尿病患者 |
| 04 | `mutate`、`if_else`、`case_when`、`lag`、`across`、缺值 | 換單位、分三類 |
| 05 | `group_by` + `summarise`（split–apply–combine 動畫）、`count`、分組 mutate、t 檢定、`p.adjust` | 組別 × 性別 |
| 06 | tidy data、`pivot_longer` / `pivot_wider`（動畫）、`separate_wider_delim`、`fill` | 血糖高峰 |
| 07 | join 六種（動畫）、`join_by`、`bind_rows` | 回診資料檢查 |
| 08 | stringr、regex、`parse_number`、forcats、lubridate | 整理原始匯出檔 |
| 09 | ggplot2 圖形文法（逐層動畫）、aes 對應與設定、什麼資料用什麼 geom | 盒形圖＋點 |
| 10 | facet、position、scale、熱圖、主題、參考線與標籤、誤差線、排序、`ggsave` | 分面散佈圖 |
| 11 | 實作範例：臨床檢驗原始檔 → 清理 → Table 1 → 三張圖 | — |
| 12 | 實作範例：OGTT 寬變長、平均 ± SE、AUC | — |
| 13 | 實作範例（生資）：RNA-seq 計數 → CPM → 每基因 t 檢定 + BH → 火山圖、熱圖 | — |
| 14 | 速查表、常見錯誤訊息、小測驗 | — |

資料（全部為模擬資料）放在 `data/`。
