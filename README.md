<div align="center">

# Multi-AI Wiper Tool

**Bulk-delete conversations from 5 AI platforms — locally, safely, instantly.**

![Manifest V3](https://img.shields.io/badge/Manifest-V3-7C3AED?style=for-the-badge&logo=googlechrome&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=microsoftedge&logoColor=white)
![Brave](https://img.shields.io/badge/Brave-F97316?style=for-the-badge&logo=brave&logoColor=white)
![100% Local](https://img.shields.io/badge/100%25_Local-059669?style=for-the-badge&logo=lock&logoColor=white)
![Zero Telemetry](https://img.shields.io/badge/Zero_Telemetry-DC2626?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MIT License](https://img.shields.io/badge/MIT-6B7280?style=for-the-badge)

<br />

<img src="icons/icon.svg" width="120" alt="Multi-AI Wiper" />

</div>

---

## Supported Platforms

<div align="center">

<table>
<tr>
<td align="center"><img src="icons/icon-gemini.svg" width="40" height="40" /><br /><b>Gemini</b><br /><code>gemini.google.com</code></td>
<td align="center"><img src="icons/icon-claude.svg" width="40" height="40" /><br /><b>Claude</b><br /><code>claude.ai</code></td>
<td align="center"><img src="icons/icon-chatgpt.svg" width="40" height="40" /><br /><b>ChatGPT</b><br /><code>chatgpt.com</code></td>
<td align="center"><img src="icons/icon-deepseek.svg" width="40" height="40" /><br /><b>DeepSeek</b><br /><code>chat.deepseek.com</code></td>
<td align="center"><img src="icons/icon-mistral.svg" width="40" height="40" /><br /><b>Mistral</b><br /><code>chat.mistral.ai</code></td>
</tr>
</table>

</div>

---

## Features

<table>
<tr>
<td width="50%">

### Core
- **One-click bulk delete** — wipe everything
- **Selective delete** — pick individual chats
- **Search & filter** — find by title instantly
- **JSON backup** — export before deleting

</td>
<td width="50%">

### Control
- **Speed presets** — Fast / Balanced / Safe
- **Custom delay** — slider from 50ms to 400ms
- **Undo window** — 5s grace period
- **Keyboard shortcut** — `Ctrl+Shift+D` / `Cmd+Shift+D`

</td>
</tr>
</table>

---

## Installation

### Chrome / Edge / Brave (Developer Mode)

```
1. Clone this repo
   └─ git clone https://github.com/qbpg/multi-ai-wiper.git

2. Open your browser
   └─ chrome://extensions/   (or edge://extensions/ or brave://extensions/)

3. Enable Developer mode (top-right toggle)

4. Click "Load unpacked" → select the cloned folder

5. Done — icon appears in toolbar
```

> The extension activates automatically when you visit a supported AI platform.

---

## Usage

<div align="center">

```
  ┌──────────────────────────────────────────────────┐
  │  1. Open any supported AI platform                │
  │  2. Click the extension icon                      │
  │  3. Platform auto-detected . chats scanned        │
  │  4. Filter > Select > Export backup > Delete       │
  │  5. Progress bar . Cancel anytime                  │
  └──────────────────────────────────────────────────┘
```

</div>

| Step | Action |
|:----:|--------|
| 1 | Navigate to Gemini, Claude, ChatGPT, DeepSeek or Mistral |
| 2 | Click the **Multi-AI Wiper** icon in your toolbar |
| 3 | The popup detects the platform and lists all conversations |
| 4 | Use the **search bar** to filter, or **checkboxes** to select |
| 5 | Click **Export JSON** to save a backup |
| 6 | Choose speed preset then click **Delete Selected** |
| 7 | Monitor progress then **Cancel** or **Undo** if needed |

---

## Keyboard Shortcuts

| OS | Shortcut | Action |
|----|----------|--------|
| Windows / Linux | `Ctrl + Shift + D` | Open popup |
| macOS | `Cmd + Shift + D` | Open popup |

---

## Architecture

```
multi-ai-wiper-tool/
├── manifest.json                    ── MV3 manifest
├── background/
│   └── background.js                ── Service worker
├── content/
│   ├── content.js                   ── Router
│   ├── content.css                  ── Toast overlay
│   └── adapters/
│       ├── gemini.js                ── Google Gemini
│       ├── claude.js                ── Anthropic Claude
│       ├── chatgpt.js               ── OpenAI ChatGPT
│       ├── deepseek.js              ── DeepSeek
│       └── mistral.js               ── Mistral AI
├── popup/
│   ├── popup.html                   ── Dark-theme UI
│   ├── popup.css                    ── Full styling
│   └── popup.js                     ── Popup logic
├── icons/
│   ├── icon.svg                     ── Main icon
│   ├── icon-gemini.svg              ── Gemini logo
│   ├── icon-claude.svg              ── Claude logo
│   ├── icon-chatgpt.svg             ── ChatGPT logo
│   ├── icon-deepseek.svg            ── DeepSeek logo
│   ├── icon-mistral.svg             ── Mistral logo
│   ├── icon16.png                   ── Favicon
│   ├── icon48.png                   ── Toolbar
│   └── icon128.png                  ── Store
└── README.md
```

---

## Security & Privacy

| | Guarantee |
|:-:|-----------|
| :lock: | **100% local** — everything runs inside your browser |
| :no_entry: | **Zero telemetry** — no analytics, no tracking, no phone-home |
| :key: | **No API keys** — pure DOM interaction, no external calls |
| :floppy_disk: | **Backup first** — export JSON before any deletion |

> **WARNING:** Conversation deletion is **irreversible**. Always export a JSON backup before deleting.

---

## License

MIT License — use responsibly. The authors are not responsible for any data loss.

---

<div align="center">

**Built with care. No data leaves your machine.**

</div>
