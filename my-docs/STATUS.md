# STATUS — 初心者向けコンテンツ追加プロジェクト

> 最終更新: 2026-05-09（UI/UX 改善 3: 個別レッスンの調整）
> ブランチ: `claude/enable-optimization-engine-ng4lU`
> 仕様書: [`SPEC_beginner_content.md`](./SPEC_beginner_content.md)

## 1. 概要

`optimization_lab.jsx` に対して、**初心者向けの導入・体感・実務接続レッスン** を追加するプロジェクト。
仕様書（SPEC）で定義した5本のレッスンが **すべて完了**。残作業は既存レッスンへの接続文挿入のみ。

## 2. 全レッスン構成（現状）

| # | ID | タイトル | 状態 |
|---|---|---|---|
| 00 | `intro`     | 最適化って何？（お弁当） | ✅ 追加済み |
| 01 | `lp`        | 工場の社長になる         | 既存 |
| 02 | `explosion` | 組合せ爆発を体感する     | ✅ 追加済み |
| 03 | `knapsack`  | 旅の荷物を詰める         | 既存 |
| 04 | `transport` | お菓子を配送する         | 既存（最適解ハードコード） |
| 05 | `landscape` | 山と谷                   | ✅ 追加済み |
| 06 | `shift`     | シフトを組む             | 既存 |
| 07 | `setcover`  | 消防署を配置する         | 既存 |
| 08 | `facility`  | 倉庫を建てる             | 既存 |
| 09 | `portfolio` | 資産を運用する           | 既存 |
| 10 | `modeling`  | 文章を式にする           | ✅ 追加済み |
| 11 | `toolchain` | ソルバーとモデリング言語 | ✅ 追加済み |

## 3. コミット履歴（このプロジェクト分）

| ハッシュ | 内容 |
|---|---|
| `894c2c2` | Add beginner content spec |
| `be05686` | Add Lesson 00 (intro): bento box |
| `f2c0a5e` | Add Lesson 02 (explosion): combinatorial blow-up |
| `99d0c14` | Add Lesson 09 (toolchain) ※当時の番号、現在は 11 |
| `d00b632` | Add Lesson 05 (landscape): local vs global optimum |
| `0216d0e` | Add STATUS.md |
| `14d6446` | Add Lesson 10 (modeling): chip-classification exercise（toolchain 10→11 へ繰り下げ） |
| `ff9c8d7` | Add cross-lesson connector lines (Lesson 01 / 03 / 06) |
| `390e78d` | UI/UX 改善 1: hero CTA / home grouping / mobile-friendly tabs / lesson prev-next nav |
| `cc9c5ea` | UI/UX 改善 2: ボタンラベル統一 / 採点トグル化 / Landscape 配色を中立化 |
| _次commit_ | UI/UX 改善 3: 多解性注釈 / 爆発初期 n=30 / ジャンプ順次表示 / 構造化解説 / コピーボタン |

## 4. 残 TODO

### 4.1 既存の小さな調整（仕様書 §3）

- [x] Lesson 01 LP 冒頭に「Lesson 00 の3点セットがここで初めて式になる」と接続文
- [x] Lesson 03 ナップサック冒頭に「Lesson 02（爆発）から、全列挙は n=20 が限界」と接続文
- [x] Lesson 06 シフト冒頭に「autoSolve は貪欲なので局所最適。詳しくは Lesson 05」と接続文

### 4.2 新規レッスン

無し（仕様書定義の5本はすべて完了）

### 4.3 UI/UX レビュー（2026-05-09）からの改善

- [x] #1 ヘッダータブのモバイル対応（番号のみ → md以上で全ラベル）
- [x] #2 レッスン末尾に前後ナビ（`LessonNav`）
- [x] #3 ホームのカードを STEP 1〜4 にグループ化
- [x] ヒーロー直下に「初めての人はここから → Lesson 00」CTA
- [x] #4 ボタンラベル統一（やり直し / 空にする / すべて閉鎖 → リセット）
- [x] #5 ModelingView 採点トグル化（編集に戻る／採点する）
- [x] #6 Landscape 配色を 3要素色から外す（貪欲の軌跡を chalk 黒に）
- [x] #7 IntroView：多解性の注釈
- [x] #8 ExplosionView：初期 n=30
- [x] #9 LandscapeView：ジャンプ探索のシーケンシャル表示（220ms 間隔）
- [x] #10 ModelingView：採点後に「変数 / 目的 / 制約」の正解を3列カードで表示
- [x] #11 ToolchainView：コードのコピーボタン（成功で緑トースト）
- [ ] #12 SVG に `<title>` 追加
- [ ] #13 状態を色＋記号で示す
- [ ] #14 タップ領域 44pt 以上
- [ ] #15 メタテキストのコントラスト改善（inkLight → inkSoft）

> 仕様書スコープ内 TODO（§4.1, §4.2）は完了。UI/UX 改善は順次反映中。

## 5. スコープ外（別タスク）

- Lesson 04 輸送のハードコード解消（本物の頂点列挙ソルバーへ置換）
- ビルド設定（`package.json`, Vite 等）の整備
- 多言語化（現状日本語のみ）
- アクセシビリティ強化（aria-* 等）

## 6. 既知の課題 / 留意点

- 番号繰り下げは今後発生しない見込み（Lesson 11 までで打ち止め）。
- それでも追加が出た場合、ファイル内の **kicker / SectionTitle / MODULES.no / Header tabs** の4箇所を漏れなく更新すること。
- `optimization_lab.jsx` は単一ファイル構成（ビルド設定なし）。型チェック・テストは外部で行えないため、追加時は **同様のスタイル/部品を再利用** して整合性を担保する。
- 既存テーマトークン: `C` / `F_DISP` / `F_MONO` / `F_BODY`
- 既存共通部品: `Card`, `Btn`, `Slider`, `Equation`, `Blackboard`, `NotePaper`, `ModuleHeader`, `Story`, `SectionTitle`, `Tag`, `StatusBox`

## 7. 更新ルール

このファイルは **コミットを切るたびに更新する**：

1. §2 の表で該当 Lesson の状態を更新
2. §3 にコミットを追記（ハッシュは push 後に確認）
3. §4 の TODO を消し込み（または新規追加）
4. ヘッダーの「最終更新」を更新
5. STATUS.md の更新自体は **同じコミットに含める**（別コミットにしない）
