---
layout: post
date: 2021-06-13
title: Excel 取得一列中最後一個非空的值
description: Excel 取得一列中最後一個非空的值
published: true
comments: true
tags: [excel]
skip_amp: true
---

在網路上找到一個公式是可以將一個單元 (cell) 的值設定成某一列的數據中最後一個非空的值

在這之前需要先了解一下 LOOKUP 公式

<!-- more -->

如果想知道一個值在一列數據中落在哪一個單元 (cell) 就可以用到 LOOKUP 公式

```excel
=LOOKUP(查找值, 查找陣列, [結果陣列])
N("結果陣列的長度必須和查找陣列長度相等")
```

如果沒傳入第三個參數-結果陣列，就會基於查找陣列返回一個最接近的結果，查找值和查找陣列的邏輯是大於或等於

如果傳入結果陣列就會回傳與查找陣列映射相同位置的值

應用場景如分數級距評語

|   | A | B | C | D | E |
| - | - | - | - | - | - |
| 1 | 1 | 欠佳 | | | |
| 2 | 6 | 尚可 | | | |
| 3 | 9 | 很好 | | | |
| 4 |   |     | 得分 | 級別 | 評語 |
| 5 |   |     |  | `=LOOKUP(C5,A1:A3)` | `=LOOKUP(C5,A1:A3,B1:B3)` |

如果我們在得分下面 C5 輸入 1~5 分，級別會是 1，評語會是欠佳

輸入 6~8 分，級別會是 6，評語會是尚可

輸入 9 分以上，級別會是 9，評語會是很好

## 取得一列中最後一個非空的值

公式是這樣

```excel
=LOOKUP(1,1/(A:A<>""),A:A)
```

如果是表格，可以指定某一列名稱

```excel
=LOOKUP(1,1/(表格1[合計股]<>""),表格1[合計股])
```

這公式的意思

  1. A:A<>"" 回傳的是一組 {FALSE, TRUE, TRUE, FALSE, FASLE... }，有值的單元為 TRUE 空的為 FALSE
  2. 數字 1 除以 A:A<>"" 的陣列回傳另外一個新的陣列，其中包含一連串的 TRUE 或 #DIV/0! (1 / TRUE = TRUE, 1 / FALSE = #DIV/0!)
  3. LOOKUP 公式說明中的備註
     - 如果 LOOKUP 函數找不到 lookup_value，就會比對 lookup_vector 中小於或等於 lookup_value 的最大值。
     - 如果 lookup_value 小於 lookup_vector 中的最小值，LOOKUP 函數會傳回 #N/A 的錯誤值。
  4. 在上面公式中，查找值是 2 ，但是查找陣列中最大的值是 1 (TRUE 也表示 1)，所以 lookup 回傳陣列中最後一個匹配
  5. 最後 LOOKUP 會回傳相對於結果陣列位置的值

這能怎麼應用呢

例如記錄股票的交易

就可以做像這樣的表

|   | A | B | C | D | E | F | G |
| - | - | - | - | - | - | - | - |
| 1 | 總成本 | -4409.96 |
| 2 | 總計股 | 50 `=LOOKUP(2,1/(表格1[合計股]<>""),表格1[合計股])` |
| 2 | 平均成本 | -88.1992 |
|   | 日期 | 成交價 | 買入(股) | 賣出(股) | 手續費 | 成本 | 合計股 |
|   | 2021/02/10 | 100 | 10 |          | 1.99 | -1101.99 | 10 |
|   | 2021/03/11 | 90 | 20 |          | 1.99 | -1801.99 | 30 |
|   | 2021/03/25 | 150 |   |    10     | 3.99 | 1496.01 | 20 |
|   | 2021/04/17 | 100 | 30 |          | 1.99 | -3001.99 | 50 |

當然也可以直接 `=SUM(表格1[買入(股)]) - SUM(表格1[賣出(股)])`

但是當股票有配發股利（新增欄位）就必須修改總計股公式

此公式目的是希望**統計數據**到表格某一欄中再取該欄最後一行的值

---

{% include donation.html %}

---

Ref.

- [Excel formula: Get value of last non-empty cell | Exceljet](https://exceljet.net/formula/get-value-of-last-non-empty-cell)
- [LOOKUP 函數](https://support.office.com/zh-tw/f1/topic/csh?HelpId=xlmain11.chm60076&NS=MACEXCEL&Version=90&Lcid=1028&UiLcid=1028&EntryPoint=True&testtransaction=0&feedback=0)
