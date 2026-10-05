# 記憶體裡的 R 物件

R 資料結構的互動式教材 —— 從「電腦怎麼擺放 bytes」的角度解釋 vector、list、matrix、factor、data.frame。

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/

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

## 第二部分：R 迴圈闖關（`loops.html`）

**線上版本：** https://chenyc0901.github.io/R_datastructure_learning/loops.html

Karel 風格的程式遊戲：寫 R 程式指揮機器人「R 寶」走迷宮、撿寶石。程式會逐行執行，同時顯示目前執行的那一行、Environment 裡的變數和 Console 輸出。

| # | 主題 | 重點 |
|---|---|---|
| 1 | 順序 | 一行一行執行、函式呼叫要加 `()` |
| 2–3 | `for` | `1:n` 序列、柵欄問題、`1:0` 陷阱與 `seq_len()` |
| 4 | `while` | 不知道次數時用條件控制、無限迴圈 |
| 5 | `!` | 把 TRUE 變 FALSE |
| 6–7 | `if` | 比較運算子、`%%` 取餘數、while + if |
| 8 | `&&` / `\|\|` | 而且／或者 |
| 9 | `break` | 提早結束整個迴圈、`while (TRUE)`、`repeat` |
| 10 | `next` | 跳過這一圈（其他語言的 continue） |
| 11–12 | 巢狀迴圈 | 外層 × 內層、內層次數依賴外層變數 |
| 13 | `ifelse()` | 向量化判斷，對比 `if` 的 `the condition has length > 1` |
| 14 | 迷宮 | `while` + `if … else if … else` 右手扶牆法 |
| ★ | 預測挑戰 | 讀程式碼、預測輸出 |

會隨機產生地圖的關卡，過關後會再用其他幾張地圖測試，寫死步數的程式會被抓出來。進度存在瀏覽器的 localStorage。

## 使用

兩個 HTML 檔（`index.html`、`loops.html`），沒有建置步驟、沒有相依套件。直接開 `index.html` 即可，或用任何靜態伺服器托管。

字型從 Google Fonts 載入（Noto Sans TC / JetBrains Mono / Chakra Petch），離線時會退回系統字型。

## 授權

教學用途，歡迎自由使用與修改。

---
陳育辰（YCC）· 中國醫藥大學 醫技系
