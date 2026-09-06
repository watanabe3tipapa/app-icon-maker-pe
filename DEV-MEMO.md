# DEV-MEMO: 鉱石ラジオ回路図UI

## 概要

MoBrowser App Icon Maker のUIを「鉱石ラジオの回路図（スケマティック）」風にリデザインする。

## 設計方針

- 既存の全ロジック・IPCパイプラインは変更しない（見た目のみ）
- dark theme は維持
- shadcn/ui コンポーネント（button/input/toggle/toggle-group）は変更しない
- 装飾はSVG + CSSアニメーションで実現

## カラーパレット

| 用途 | 色 | CSS変数 |
|------|-----|---------|
| 背景 | oklch(0.13 0.02 60) | --circuit-bg |
| 配線(銅) | #b87333 | --copper |
| 配線(錫) | #c0c0c0 | --solder |
| 金/接点 | #d4a843 | --gold |
| 方眼グリッド | rgba(180,140,80,0.08) | --grid-color |
| テキスト | oklch(0.85 0.01 60) | --circuit-fg |
| ダイオード橙 | #e8734a | --diode-orange |
| 電池/電源 | #4a7a4a | --battery-green |

## 回路記号マッピング

| UI要素 | 回路記号 | SVG実装 |
|--------|---------|---------|
| プロンプト入力 | バリコン (可変コンデンサ) | 回転つまみ + プレート |
| Generate | ゲルマニウムダイオード | 三角形 + バー |
| Save | イヤホン / ヘッドホン | イヤホンマーク |
| API Key設定 | アンテナ + アース | 逆Fアンテナ / 水平線 |
| ステータス | アナログVUメーター | arc + needle |
| 生成中 | 掃引線 (sweep) | 既存 blueprint-scan 流用 |
| バリアント3種 | 3つのフィルター回路 | LC並列共振記号 |

## 主要ファイル変更計画

### 変更ファイル一覧

1. **DEV-MEMO.md** — (新規) 本ファイル
2. **src/renderer/index.css** — 回路図テーマ変数, 方眼パターン, VUメーターアニメーション
3. **src/renderer/components/circuit-wires.tsx** — (新規) 背景配線SVG
4. **src/renderer/components/analog-meter.tsx** — (新規) VUメーターコンポーネント
5. **src/renderer/components/app-content.tsx** — 回路図レイアウト, 配線オーバーレイ追加
6. **src/renderer/components/prompt-input.tsx** — バリコン風スタイリング
7. **src/renderer/components/blueprint-face.tsx** — 回路図グリッド強化
8. **src/renderer/components/title-bar-status.tsx** — VUメーター統合

### 非変更ファイル

- src/renderer/components/ui/*.tsx — shadcn UIキット
- src/renderer/lib/*.ts — 純ロジック
- src/renderer/proto/*.proto — スキーマ定義
- src/main/*.ts — メインプロセス (IPC, プロバイダ等)
- vite.config.ts / tsconfig.json / postcss.config.js — 設定

## レイアウト構成

```
┌──────────────────────────────────────┐
│  ~~~~ アンテナ──── API Key設定       │
│                              [🎧保存] │
│                                      │
│    ┌────────────────────────┐        │
│    │   アイコン プレビュー    │        │
│    │  (squircle / generated) │        │
│    └────────┬───────────────┘        │
│             │ 配線                    │
│    ────┤├───┘  ダイオード (Generate)  │
│             │                        │
│    ┌─── ══ ─┐                        │
│    │ バリコン │← プロンプト入力        │
│    └─────────┘                        │
│                                      │
│    ┌─ VUメーター ─────────────────┐   │
│    │  ████████░░░░░  65%          │   │
│    └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

## SVG配線設計

主要な接続パス:
- バリコン → ダイオード → アイコン (信号経路)
- アンテナ → 設定 (外部接続)
- アイコン → 保存 (出力経路)

配線スタイル:
- stroke: copper (#b87333), width 1.5-2px
- 角は curved (stroke-linejoin: round)
- 一部に diameter text ("0.8φ" など) を配置

## VUメーター仕様

- SVG arc によるアナログメーター
- 針 (needle) は CSS transform rotate でアニメーション
- 0-100% の値表示
- 生成中は振れ、完了/エラーで固定

## プロジェクトルート

```text
/Users/watanabe3tipapa/Github/app-icon-maker-pe/
```

- `package.json` の name: `"app-icon-maker-pe"`
- GitHub リポジトリ名: `MoBrowser-App-Icon-Maker`（元クローン元）
- PE 接尾辞: privatedit / personal edition の意

## 今後の拡張案

- 真空管アンプ風のツールチップ
- 7セグLED数字表示
- 発振回路アニメーション (待機中)
- ろう付け痕のテクスチャ

## 実装状況 (1.0.2 改修)

| 項目 | 状態 | ファイル |
|------|------|----------|
| 背景配線 SVG | ✅ | circuit-wires.tsx |
| アナログVUメーター | ✅ | analog-meter.tsx (針は支点(64,68)の view-box 回転で補正済み) |
| バリコン (プロンプト入力) | ✅ | prompt-input.tsx |
| ダイオード (Generate ボタン) | ✅ | prompt-input.tsx (submit 時 triangle+bar, signal-pulse) |
| アンテナ/アース (API Key) | ✅ | prompt-input.tsx |
| イヤホン (Save) | ✅ | app-content.tsx (Headphones アイコン + SAVE) |
| LC並列共振 (バリアント3種) | ✅ | variant-picker.tsx (LC1〜LC3 タグ) |
| 掃引線 / trace-draw アニメ | ✅ | blueprint-face.tsx / circuit-wires.tsx |
| 配線・グリッド銅色化 | ✅ | index.css / blueprint-face.tsx |

> 注: `npm run gen` は macOS x64 未対応のためこの環境で実行不可。tsc の残エラー
> は `gen/` 生成物が無い事に起因する既存のもののみ。
