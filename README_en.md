# App Icon Maker PE

**An app icon is something you grow, not something you make.**

A desktop app that grows a macOS app icon through iterative conversation with AI and writes it out in the `.icns` format. Describe the design you want in text, optionally attach a reference image, pick from several generated variants, refine your choice, and finally save a full set of standard sizes (`.icns` / `.iconset`).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)](https://github.com/watanabe3tipapa/app-icon-maker-pe/releases)
[![macOS](https://img.shields.io/badge/macOS-14%20(Apple%20Silicon)-000000.svg)](https://www.apple.com/macos/)
[![Node.js](https://img.shields.io/badge/Node.js-24.14.1-339933.svg)](https://nodejs.org/)
[![MōBrowser](https://img.shields.io/badge/MōBrowser-2.7.1-1f6feb.svg)](https://teamdev.com/mobrowser/)
[![OpenAI](https://img.shields.io/badge/OpenAI-DALL%C2%B7E-412991.svg)](https://openai.com/api/)

[English](README_en.md) | [日本語](README.md)

---

## Overview

An app icon is the first face an app shows to its users. This app uses the [OpenAI API](https://openai.com/api/) for image generation and creates macOS-style icons from text plus an (optional) reference image. Each run returns **three variants**, and you can keep **refining** one of them as the basis until you settle on a single design you are happy with.

- The prompt is wrapped in fixed system constraints, so output stays within a composition that works as a macOS icon (centered subject, no text, squircle-friendly).
- The saved `.icns` uses an unmasked, full-bleed image and lets macOS apply its own mask — avoiding the gray plate and shrunken icon you get from pre-clipped corners.
- Quitting with an unsaved icon triggers a confirmation dialog.

---

## Concept (why "grow")

A great icon is rarely finished in a single shot. It improves through the loop of "generate → pick → refine → save". This app makes that loop the star of the show: the icon you choose becomes the reference for the next generation, enabling a workflow you could call *growing* an icon.

The concept is reflected in the UI too. The screen is dressed as a crystal-radio schematic: a variable capacitor for the prompt, a germanium diode for the generate button, and an analog VU meter for status — so the whole app is readable as a circuit carrying the icon's "signal". See DEV-MEMO for the design notes.

---

## Features

- Generate from a text prompt (Enter / Generate)
- **Three variants** per run for quick comparison
- Attach a **reference image** to steer composition and style
- **refine** workflow that reuses your chosen icon as the base
- Realistic preview with a squircle mask
- Export `.icns` + `.iconset` (all standard sizes)
- Crystal-radio schematic UI (VU meter, variable capacitor, antenna/ground, LC resonance tags)

---

## Requirements

| Tool | Required version | Check |
|---|---:|---|
| macOS | 14 (Apple Silicon) or later | `sw_vers` |
| Node.js | 24.14.1 (LTS) or later | `node --version` |
| MōBrowser | 2.7.1 or later | `mobrowser --version` |

---

## Getting Started (verifiable facts only)

1. Install dependencies:

```bash
npm install
```

2. Run in development mode:

```bash
npm run dev
```

3. (UI only, no API key required) Run with the mock provider:

```bash
npm run dev:mock
```

4. Build for production:

```bash
npm run build
```

---

## How to use the app

1. Describe the icon in the prompt field (e.g. “blue clipboard with folded corner”).
2. (Optional) Attach a **reference image** to influence layout or style.
3. Press **Generate** (or **Enter**). Wait for **three** previews.
4. Pick a variant to move into refine mode, or generate again from scratch.
5. In refine mode, adjust the prompt and generate again; the confirmed icon is used as the reference for the next batch.
6. When satisfied, click **Save** and choose a `.icns` path. The app writes **`YourName.icns`** and **`YourName.iconset`** in that folder (replacing existing files only if you confirm).
7. Use **Reveal in Finder** from the success UI to open the save location.

---

## Demo video

See `app-icon-maker-demo.mp4` for how the app looks in action:

[app-icon-maker-demo.mp4](./app-icon-maker-demo.mp4)

---

## Project layout (main files & directories)

- `src/main/` — window, IPC, prompt building, provider selection, `.icns` assembly
- `src/renderer/` — React UI, squircle preview, generation pipeline state
- `resources/` — image generation templates
- `.github/workflows/release.yml` — release workflow
- `DEV-MEMO.md`, `LICENSE`, `README.md`, `README_en.md`

---

## Contribution

Contributions are welcome. For major changes, please open an issue first.

Basic workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your change'`)
4. Push the branch and open a Pull Request

---

## Contact / Repository

- GitHub: https://github.com/watanabe3tipapa/app-icon-maker-pe
- Releases: https://github.com/watanabe3tipapa/app-icon-maker-pe/releases

> This project is a personal edition derived from [TeamDev-IP/MoBrowser-App-Icon-Maker](https://github.com/TeamDev-IP/MoBrowser-App-Icon-Maker).

---

## License

MIT License — see the [LICENSE](LICENSE) file for details.