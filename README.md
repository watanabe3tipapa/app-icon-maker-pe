# App Icon Maker PE

**アイコンは、作るものではなく育てるもの。**

macOS アプリアイコンを、AI との対話を重ねながら育てて `.icns` 形式で書き出すデスクトップアプリです。テキストで望みのデザインを説明し、必要なら参考画像を添え、生成された複数のバリアントから選んで磨き上げ、満足したところで標準サイズ一式 (`.icns` / `.iconset`) を保存します。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)](https://github.com/watanabe3tipapa/app-icon-maker-pe/releases)
[![macOS](https://img.shields.io/badge/macOS-14%20(Apple%20Silicon)-000000.svg)](https://www.apple.com/macos/)
[![Node.js](https://img.shields.io/badge/Node.js-24.14.1-339933.svg)](https://nodejs.org/)
[![MōBrowser](https://img.shields.io/badge/MōBrowser-2.7.1-1f6feb.svg)](https://teamdev.com/mobrowser/)
[![OpenAI](https://img.shields.io/badge/OpenAI-DALL%C2%B7E-412991.svg)](https://openai.com/api/)

[日本語](README.md) | [English](README_en.md)

---

## 概要

アプリのアイコンは、アプリがユーザーに最初に見せる顔です。本アプリは [OpenAI API](https://openai.com/api/) による画像生成を使い、テキストと (任意の) 参考画像から macOS らしいアイコンを生成します。生成は毎回 **3 バリアント** を返し、どれかを基準に **さらに育てる (refine)** ことで、納得のいく一点に仕上げていきます。

- プロンプトは固定のシステム制約でラップされるため、出力が macOS のアイコンとして成立する構図 (中央寄せ・文字なし・squircle 適合) に収まります
- 保存する `.icns` はマスクなしのフルサイズ画像を使い、切り抜きは macOS 側に任せます (コーナーを事前に切り抜くと、グレーのプレートと縮小表示になる罠を回避できます)
- 未保存のアイコンが残ったまま終了すると、確認ダイアログが表示されます

---

## コンセプト (なぜ「育てる」のか)

良いアイコンは一発で完成するものではありません。「生成 → 選ぶ → 磨く → 保存」の反復で少しずつ良くなっていきます。本アプリはその反復こそを主役とし、選んだ一つのデザインを次回生成の基準としてバトンタッチすることで、アイコンの「育成」と呼べるフローを提供します。

このコンセプトは UI にも反映されています。鉱石ラジオ回路図 (スケマティック) の装飾で構成された画面には、プロンプトを表すバリコン、生成ボタンを表すゲルマニウムダイオード、状態を示すアナログ VU メーターなどが配置され、アイコンの「信号」を流す回路としてアプリ全体を楽しめます。設計メモは DEV-MEMO を参照してください。

---

## 主な特徴

- プロンプトからの生成 (Enter / Generate)
- 1 回の生成で **3 バリアント** を比較
- 参考画像の添付で構図・スタイルを指定
- 選んだアイコンを基準に育てる **refine** ワークフロー
- squircle マスク付きのリアルなプレビュー
- `.icns` + `.iconset` (全標準サイズ) の書き出し
- 鉱石ラジオ回路図風の UI (VU メーター・バリコン・アンテナ/アース・LC 共振タグ)

---

## 前提条件

| ツール | 必要バージョン | 確認コマンド |
|---|---:|---|
| macOS | 14 (Apple Silicon) 以降 | `sw_vers` |
| Node.js | 24.14.1 (LTS) 以降 | `node --version` |
| MōBrowser | 2.7.1 以降 | `mobrowser --version` |

---

## 開始手順 (確認できる事実のみ)

1. 依存関係をインストール:

```bash
npm install
```

2. 開発モードで起動:

```bash
npm run dev
```

3. (API キー不要で UI のみ確認したい場合) モックプロバイダで起動:

```bash
npm run dev:mock
```

4. 本番ビルド:

```bash
npm run build
```

---

## アプリの使い方

1. プロンプト欄にアイコンの説明を書く (例: “blue clipboard with folded corner”)
2. (任意) 参考画像を添付して構図・スタイルを指定
3. **Generate** (または Enter) を押して 3 つのプレビューを生成
4. 気に入ったバリアントを選んで refine モードへ、または最初から作り直す
5. refine モードでは選択したアイコンを基準に再度生成して磨き上げる
6. 納得したら **Save** を押し、`.icns` の保存先を選ぶ (同名の既存ファイルは確認の上で置き換え)
7. 保存成功 UI の **Reveal in Finder** で保存先を開ける

---

## デモ動画

操作感は `app-icon-maker-demo.mp4` で確認できます:

[app-icon-maker-demo.mp4](./app-icon-maker-demo.mp4)

---

## プロジェクト構成 (主なファイル・ディレクトリ)

- `src/main/` — ウィンドウ・IPC・プロンプト構築・プロバイダ選択・`.icns` 組み立て
- `src/renderer/` — React UI・squircle プレビュー・生成パイプライン状態
- `resources/` — 画像生成用テンプレート
- `.github/workflows/release.yml` — リリース用ワークフロー
- `DEV-MEMO.md`, `LICENSE`, `README.md`, `README_en.md`

---

## コントリビューション

コントリビューションは歓迎します。大きな変更は事前に issue を立ててください。

基本的なワークフロー:

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/your-feature`)
3. 変更をコミット (`git commit -m 'Add your change'`)
4. ブランチをプッシュし、Pull Request を作成

---

## 連絡先 / リポジトリ

- GitHub: https://github.com/watanabe3tipapa/app-icon-maker-pe
- リリース: https://github.com/watanabe3tipapa/app-icon-maker-pe/releases

> 本プロジェクトは [TeamDev-IP/MoBrowser-App-Icon-Maker](https://github.com/TeamDev-IP/MoBrowser-App-Icon-Maker) の派生版 (personal edition) です。

---

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) ファイルを参照してください。