# Multi-AI Wiper Tool

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blueviolet?style=flat-square&logo=googlechrome)
![100% Local](https://img.shields.io/badge/100%25-Local-00c853?style=flat-square&logo=lock)
![Zero Telemetry](https://img.shields.io/badge/Zero%20Telemetry-red?style=flat-square&logo=nodedotjs)

A Chrome/Edge/Brave extension to **bulk-delete conversations** from multiple AI platforms — fully local, zero telemetry.

---

## Supported Platforms

| Platform | Status |
|----------|--------|
| <img src="icons/icon.svg" width="16"> Google Gemini (`gemini.google.com`) | ✅ Supported |
| <img src="icons/icon.svg" width="16"> Claude (`claude.ai`) | ✅ Supported |
| <img src="icons/icon.svg" width="16"> ChatGPT (`chatgpt.com`) | ✅ Supported |
| <img src="icons/icon.svg" width="16"> DeepSeek (`chat.deepseek.com`) | ✅ Supported |
| <img src="icons/icon.svg" width="16"> Mistral (`chat.mistral.ai`) | ✅ Supported |

---

## Features

| Feature | Description |
|---------|-------------|
| **One-click bulk delete** | Select all conversations and delete them in one action |
| **Selective delete** | Pick individual conversations via checkboxes |
| **Search / Filter** | Instantly filter conversations by title |
| **JSON Backup export** | Export all conversations to JSON before deleting |
| **Speed control** | Choose Fast ⚡ (50ms), Balanced ⚖️ (150ms), or Safe 🛡️ (300ms) delay |
| **Custom delay slider** | Fine-tune the inter-delete delay from 50ms to 400ms |
| **Undo grace period** | 5-second window to cancel after starting deletion |
| **Keyboard shortcut** | `Ctrl+Shift+D` (Windows/Linux) / `Cmd+Shift+D` (Mac) |
| **Auto platform detection** | Automatically detects which AI platform is open |
| **Dark theme UI** | Clean, dark utility-style popup interface |

---

## Installation (Chrome / Edge / Brave)

1. **Clone or download** this repository:
   ```
   git clone https://github.com/YOUR_USERNAME/multi-ai-wiper-tool.git
   ```

2. Open your browser and navigate to:
   ```
   chrome://extensions/
   ```
   (or `edge://extensions/` for Edge, `brave://extensions/` for Brave)

3. Enable **Developer mode** (toggle in the top-right corner).

4. Click **"Load unpacked"** and select the `multi-ai-wiper-tool` folder.

5. The extension icon will appear in your toolbar. Click it on any supported AI platform to start.

---

## Usage

1. Navigate to any supported AI platform (Gemini, Claude, ChatGPT, DeepSeek, or Mistral).
2. Click the extension icon in your toolbar.
3. The popup will auto-detect the platform and scan your conversations.
4. Use the search bar to filter, or checkboxes to select specific conversations.
5. **Export JSON** to create a backup before deleting.
6. Choose your speed preset and click **Delete Selected**.
7. A progress overlay shows real-time deletion status with a cancel option.

---

## Security & Privacy

- **100% local**: All operations run entirely within your browser. No data is sent to any external server.
- **Zero telemetry**: No analytics, tracking, or phone-home calls.
- **No API keys required**: Works purely through DOM interaction.
- **Backup first**: The extension strongly recommends exporting a JSON backup before any deletion.

> ⚠️ **WARNING**: Conversation deletion is **irreversible**. Always export a backup before deleting.

---

## Keyboard Shortcut

| Platform | Shortcut |
|----------|----------|
| Windows / Linux | `Ctrl+Shift+D` |
| macOS | `Cmd+Shift+D` |

The shortcut opens the popup directly, allowing quick access to the deletion interface.

---

## Architecture

```
multi-ai-wiper-tool/
├── manifest.json              # MV3 manifest
├── background/
│   └── background.js          # Service worker (keyboard commands, storage)
├── content/
│   ├── content.js             # Content script router
│   ├── content.css            # Overlay toast styles
│   └── adapters/
│       ├── gemini.js          # Google Gemini adapter
│       ├── claude.js          # Claude adapter
│       ├── chatgpt.js         # ChatGPT adapter
│       ├── deepseek.js        # DeepSeek adapter
│       └── mistral.js         # Mistral adapter
├── popup/
│   ├── popup.html             # Extension popup UI
│   ├── popup.css              # Dark theme styles
│   └── popup.js               # Popup logic
├── icons/
│   ├── icon.svg               # Vector source icon
│   ├── icon16.png             # 16x16 favicon
│   ├── icon48.png             # 48x48 toolbar icon
│   └── icon128.png            # 128x128 store icon
└── README.md
```

---

## License

MIT License. Use responsibly. The authors are not responsible for any data loss.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
