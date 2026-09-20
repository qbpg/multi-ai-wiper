<div align="center">

# 🧹 Multi-AI Wiper Tool

**Bulk-delete conversations from 5 AI platforms — locally, safely, instantly.**

![Manifest V3](https://img.shields.io/badge/Manifest-V3-7C3AED?style=for-the-badge&logo=googlechrome&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-Ready-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-Ready-0078D7?style=for-the-badge&logo=microsoftedge&logoColor=white)
![Brave](https://img.shields.io/badge/Brave-Ready-F97316?style=for-the-badge&logo=brave&logoColor=white)
![100% Local](https://img.shields.io/badge/100%25-Local-059669?style=for-the-badge&logo=lock&logoColor=white)
![Zero Telemetry](https://img.shields.io/badge/Zero%20Telemetry-DC2626?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-6B7280?style=for-the-badge)

<br />

<img src="icons/icon.svg" width="120" alt="Multi-AI Wiper Icon" />

</div>

---

## ✦ Supported Platforms

<div align="center">

| | Platform | Domain | Status |
|:-:|----------|--------|:------:|
| <img src="https://img.shields.io/badge/-Gemini-8B5CF6?style=flat-square&logo=google&logoColor=white" height="28"> | **Google Gemini** | `gemini.google.com` | ✅ |
| <img src="https://img.shields.io/badge/-Claude-D97706?style=flat-square&logo=anthropic&logoColor=white" height="28"> | **Anthropic Claude** | `claude.ai` | ✅ |
| <img src="https://img.shields.io/badge/-ChatGPT-10A37F?style=flat-square&logo=openai&logoColor=white" height="28"> | **OpenAI ChatGPT** | `chatgpt.com` | ✅ |
| <img src="https://img.shields.io/badge/-DeepSeek-2563EB?style=flat-square&logo=datastore&logoColor=white" height="28"> | **DeepSeek** | `chat.deepseek.com` | ✅ |
| <img src="https://img.shields.io/badge/-Mistral-FF7000?style=flat-square&logo=apache&logoColor=white" height="28"> | **Mistral AI** | `chat.mistral.ai` | ✅ |

</div>

---

## ✦ Features

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
- **Speed presets** — ⚡ Fast / ⚖️ Balanced / 🛡️ Safe
- **Custom delay** — slider from 50ms to 400ms
- **Undo window** — 5s grace period
- **Keyboard shortcut** — `Ctrl+Shift+D` / `⌘+Shift+D`

</td>
</tr>
</table>

---

## ✦ Installation

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

## ✦ Usage

<div align="center">

```
  ┌──────────────────────────────────────────────────┐
  │  1. Open any supported AI platform                │
  │  2. Click the extension icon                      │
  │  3. Platform auto-detected • chats scanned        │
  │  4. Filter → Select → Export backup → Delete       │
  │  5. Progress bar • Cancel anytime                  │
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
| 6 | Choose speed preset → click **Delete Selected** |
| 7 | Monitor progress → **Cancel** or **Undo** if needed |

---

## ✦ Keyboard Shortcuts

| OS | Shortcut | Action |
|----|----------|--------|
| Windows / Linux | `Ctrl + Shift + D` | Open popup |
| macOS | `⌘ + Shift + D` | Open popup |

---

## ✦ Architecture

```
multi-ai-wiper-tool/
├── manifest.json                    ── MV3 manifest
├── background/
│   └── background.js                ── Service worker (shortcuts, storage)
├── content/
│   ├── content.js                   ── Router (SCAN / DELETE / EXPORT)
│   ├── content.css                  ── Toast overlay styles
│   └── adapters/
│       ├── gemini.js                ── Google Gemini adapter
│       ├── claude.js                ── Anthropic Claude adapter
│       ├── chatgpt.js               ── OpenAI ChatGPT adapter
│       ├── deepseek.js              ── DeepSeek adapter
│       └── mistral.js               ── Mistral AI adapter
├── popup/
│   ├── popup.html                   ── Dark-theme UI
│   ├── popup.css                    ── Full styling
│   └── popup.js                     ── Logic (scan/filter/export/delete)
├── icons/
│   ├── icon.svg                     ── Vector source
│   ├── icon16.png                   ── Favicon
│   ├── icon48.png                   ── Toolbar
│   └── icon128.png                  ── Store / large
└── README.md
```

---

## ✦ Security & Privacy

| | Guarantee |
|:-:|-----------|
| 🔒 | **100% local** — everything runs inside your browser |
| 🚫 | **Zero telemetry** — no analytics, no tracking, no phone-home |
| 🔑 | **No API keys** — pure DOM interaction, no external calls |
| 💾 | **Backup first** — export JSON before any deletion |

> **⚠️ WARNING:** Conversation deletion is **irreversible**. Always export a JSON backup before deleting.

---

## ✦ License

MIT License — use responsibly. The authors are not responsible for any data loss.

---

<div align="center">

**Built with care. No data leaves your machine.**

</div>
