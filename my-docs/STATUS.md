# STATUS — 初心者向けコンテンツ追加プロジェクト

> 最終更新: 2026-05-08（Lesson 05 landscape 追加時点）
> ブランチ: `claude/enable-optimization-engine-ng4lU`
> 仕様書: [`SPEC_beginner_content.md`](./SPEC_beginner_content.md)

## 1. 概要

`optimization_lab.jsx` に対して、**初心者向けの導入・体感・実務接続レッスン** を追加するプロジェクト。
仕様書（SPEC）で定義した5本のうち4本が完了。残り1本（モデリング演習）。

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
| **10** | `toolchain` | **ソルバーとモデリング言語** | ✅ 追加済み（※modeling 追加時に 11 へ繰り下げ予定） |

## 3. コミット履歴（このプロジェクト分）

| ハッシュ | 内容 |
|---|---|
| `894c2c2` | Add beginner content spec |
| `be05686` | Add Lesson 00 (intro): bento box |
| `f2c0a5e` | Add Lesson 02 (explosion): combinatorial blow-up |
| `99d0c14` | Add Lesson 09 (toolchain): solver vs modeling language ※当時の番号 |
| `d00b632` | Add Lesson 05 (landscape): local vs global optimum（toolchain は 10 へ繰り下げ） |

## 4. 残 TODO

### 4.1 必須（このプロジェクトのスコープ）

- [ ] **Lesson 10 `modeling` を実装**
  - 文章中の語句を「決定変数 / 目的関数 / 制約」にドラッグ&ドロップで分類
  - 3問構成（ケーキ屋・配車・旅行プラン）
  - DnD/採点ロジックが必要
  - 完成後 `toolchain` を 10 → **11** へ繰り下げ
    - kicker `LESSON 10` → `LESSON 11`
    - SectionTitle `10.1, 10.2, 10.3` → `11.1, 11.2, 11.3`
    - MODULES `no: '10'` → `'11'`
    - Header tabs `'10 道具'` → `'11 道具'`
  - LandscapeView のクロスリファレンス（`Lesson 01・09` `Lesson 06・08`）は維持で OK

### 4.2 既存の小さな調整（仕様書 §3）

- [ ] Lesson 01 LP 冒頭に「Lesson 00 の3点セットがここで初めて式になる」と接続文
- [ ] Lesson 03 ナップサック冒頭に「Lesson 02（爆発）から、全列挙は n=20 が限界」と接続文
- [ ] Lesson 06 シフト冒頭に「autoSolve は貪欲なので局所最適。詳しくは Lesson 05」と接続文

## 5. スコープ外（別タスク）

- Lesson 04 輸送のハードコード解消（本物の頂点列挙ソルバーへ置換）
- ビルド設定（`package.json`, Vite 等）の整備
- 多言語化（現状日本語のみ）
- アクセシビリティ強化（aria-* 等）

## 6. 既知の課題 / 留意点

- 番号繰り下げが何度か発生する（`modeling` 追加時に `toolchain` のみ）。
  ファイル内の **kicker / SectionTitle / MODULES.no / Header tabs** の4箇所を漏れなく更新すること。
- `optimization_lab.jsx` は単一ファイル構成（ビルド設定なし）。型チェック・テストは外部で行えないため、追加時は **同様のスタイル/部品を再利用** して整合性を担保する。
- 既存テーマトークン: `C` / `F_DISP` / `F_MONO` / `F_BODY`
- 既存共通部品: `Card`, `Btn`, `Slider`, `Equation`, `Blackboard`, `NotePaper`, `ModuleHeader`, `Story`, `SectionTitle`, `Tag`, `StatusBox`

## 7. 更新ルール

このファイルは **コミットを切るたびに更新する**：

1. §2 の表で該当 Lesson の状態を更新
2. §3 にコミットを追記（ハッシュは push 後に確認）
3. §4 の TODO を消し込み（または新規追加）
4. ヘッダーの「最終更新」と「現状を反映している commit」を更新
5. STATUS.md の更新自体は **同じコミットに含める**（別コミットにしない）
