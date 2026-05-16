# STATUS — 初心者向けコンテンツ追加プロジェクト

> 最終更新: 2026-05-17（付録タブを push 済み・次は Vercel 初回デプロイ）
> ブランチ: `main`
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
| 付録 | `setup`    | 手元で動かす（Python + Colab） | ✅ 追加済み |

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
| `93cb4df` | UI/UX 改善 3: 多解性注釈 / 爆発初期 n=30 / ジャンプ順次表示 / 構造化解説 / コピーボタン |
| `973196d` | UI/UX 改善 4: SVG aria-label / 倉庫ボタン 44pt / inkLight コントラスト改善 |
| `16e8b45` | スコープ外 1: 輸送LP の本物ソルバー化 + Vite/React/Tailwind ビルド設定 |
| `222cf06` | スコープ外 2: skip link / focus-visible / view 切替時の focus + scroll / aria-current |
| `56c2fb3` | スコープ外 3: i18n インフラ（LangContext/I18N/useT）+ ヘッダー・ホーム・フッターを EN 化 |
| `ce4c511` | i18n: Lesson 00 本文を `t()` 化（Story / Card / SectionTitle / NotePaper / SVG ラベル / dish 名） |
| `28ba3cb` | 付録：開発環境セットアップタブを追加（Python + Colab、ja/en 両対応、Lesson 番号体系外） |

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
- [x] #12 SVG に `role="img"` + `aria-label` 追加（9枚すべて）
- [x] #13 状態を色＋記号で示す（✓ / ✗ / ! 既に併用、Landscape 凡例に黒丸/青丸/✕ で形状区別）
- [x] #14 タップ領域 44pt 以上（FacilityView 倉庫ボタンを `minHeight: 44` に。SetCover 56×56・Shift 56×56・Knapsack 約60px は OK）
- [x] #15 メタテキストのコントラスト改善（`C.inkLight` を #7a7062 → #5d5446、`C.inkLighter` も濃く）

> 仕様書スコープ内 TODO・UI/UX レビュー TODO・スコープ外（輸送 / ビルド / a11y / i18n インフラ）すべて完了。
> 残るのは「レッスン本文の英訳」のみ — 機械的な `t()` 置換タスクとして次フェーズへ。

## 5. スコープ外 → 取り組み中

- [x] Lesson 04 輸送のハードコード解消 → 整数格子点総当たりで動的計算
- [x] ビルド設定（Vite + React + Tailwind 整備、`npm run dev` / `npm run build` で起動）
- [x] 初心者向け開発環境セットアップ付録タブ — Python + Colab に絞り、Lesson 番号体系外の独立タブとして追加（`SetupView`、ja/en 完全対応、Colab セル / ローカル端末の2タブ式コードサンプル + コピーボタン、Lesson 11 への戻り動線）
- [x] 多言語化 — **インフラ + UI シェル + Lesson 00**（`LangContext` + `I18N{ja,en}` + `useT()` + ヘッダー言語切替）。翻訳済み: スキップリンク・フッター・ヘッダータブ全 13・ホームのヒーロー / CTA / STEP 1〜4 ラベル / ESSENCE / レッスン前後ナビ / **Lesson 00 全文（Story・SectionTitle・NotePaper・Card・SVG ラベル・お弁当のおかず名・単位（分/点/個））**
  - **未翻訳（次フェーズ）**: Lesson 01〜11 の Story 散文・SectionTitle 本文・Card 内のプロース解説・SVG 凡例日本語ラベル。Lesson 00 と同じパターン（`useContext(LangContext)` で `lang` と `t` を取り、`I18N` に `<lesson>.*` プレフィクスでキー追加）で順次置換可能
- [x] アクセシビリティ強化（skip link / `:focus-visible` / view 切替時の focus 移動 + smooth scroll / `aria-current="page"` / `<main aria-live="polite">`）

## 6. 既知の課題 / 留意点

- 番号繰り下げは今後発生しない見込み（Lesson 11 までで打ち止め）。
- それでも追加が出た場合、ファイル内の **kicker / SectionTitle / MODULES.no / Header tabs** の4箇所を漏れなく更新すること。
- `optimization_lab.jsx` は単一ファイル構成（ビルド設定なし）。型チェック・テストは外部で行えないため、追加時は **同様のスタイル/部品を再利用** して整合性を担保する。
- 既存テーマトークン: `C` / `F_DISP` / `F_MONO` / `F_BODY`
- 既存共通部品: `Card`, `Btn`, `Slider`, `Equation`, `Blackboard`, `NotePaper`, `ModuleHeader`, `Story`, `SectionTitle`, `Tag`, `StatusBox`

## 7. 次回作業

### 7.1 公開（Vercel デプロイ）

- [ ] **Vercel での初回デプロイ** — `vercel.com/new` → GitHub の `2314069/dev_optimization-starter` を Import → Vite 自動検出を確認 → Deploy。`vercel.json` は不要（standard Vite 検出で動く）。発行 URL は `https://dev-optimization-starter.vercel.app/` 系の見込み
  - 前提：リポジトリは PUBLIC・main の HEAD は `28ba3cb`（付録タブ込み）で公開準備済み
  - 注意：`vite.config.js` に `base` 設定は無い → Vercel ではこのままで OK（GitHub Pages に切り替える場合のみ `base: '/dev_optimization-starter/'` が必要）
  - デプロイ後に `index.html` の `<title>` / favicon を整える余地あり（任意）

### 7.2 残コンテンツ作業（再開時の参照）

- [ ] Lesson 01〜11 の Story 散文・SectionTitle 本文・Card 内プロース解説・SVG 凡例日本語ラベルを順次 `t()` 化（Lesson 00 と同じパターン）

## 8. 更新ルール

このファイルは **コミットを切るたびに更新する**：

1. §2 の表で該当 Lesson の状態を更新
2. §3 にコミットを追記（ハッシュは push 後に確認）
3. §4 の TODO を消し込み（または新規追加）
4. ヘッダーの「最終更新」を更新
5. STATUS.md の更新自体は **同じコミットに含める**（別コミットにしない）
