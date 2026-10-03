<p align="center"><img src="icons/icon.svg" alt="Multi-AI Wiper" width="80"></p>

# Multi-AI Wiper

A browser extension to list, filter, export, and delete conversations on supported AI websites.

<p align="center"><img src="icons/icon-gemini.svg" alt="Gemini" title="Gemini" width="36" height="36"> <img src="icons/icon-claude.svg" alt="Claude" title="Claude" width="36" height="36"> <img src="icons/icon-chatgpt.svg" alt="ChatGPT" title="ChatGPT" width="36" height="36"> <img src="icons/icon-deepseek.svg" alt="DeepSeek" title="DeepSeek" width="36" height="36"> <img src="icons/icon-mistral.svg" alt="Mistral" title="Mistral" width="36" height="36"></p>

## Built with

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="html" height="28">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&amp;logo=css&amp;logoColor=white" alt="css" height="28">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&amp;logo=javascript&amp;logoColor=F7DF1E" alt="js" height="28">
</p>

## Supported platforms

Gemini, Claude, ChatGPT, DeepSeek, and Mistral. Runs in Chromium browsers such as Chrome, Edge, and Brave.

## Features

- Detect the platform in the active tab and scan available conversations.
- Search titles and select conversations individually or together.
- Export a JSON backup of the conversations exposed by the platform adapter.
- Delete selected conversations with speed presets or a custom delay.
- Cancel a batch to stop further deletions.
- Export the extension source as a JSON bundle.

Platform adapters interact with website pages. Website changes can affect scanning, export, or deletion.

## Installation

1. Clone this repository.
2. Open `chrome://extensions/`, `edge://extensions/`, or `brave://extensions/`.
3. Enable **Developer mode**, choose **Load unpacked**, and select the folder containing `manifest.json`.
4. Visit a supported platform and open the extension from the toolbar.

## Usage

Scan the active page, filter or select conversations, and export a backup before choosing **Delete Selected**. The progress panel lets you cancel remaining operations.

Deletion is irreversible. The current **Undo** button does not restore deleted conversations; it only dismisses the notice.

| System | Shortcut |
| --- | --- |
| Windows / Linux | `Ctrl + Shift + D` |
| macOS | `Cmd + Shift + D` |

## Project files

| Folder | Purpose |
| --- | --- |
| `background/` | Extension service worker |
| `content/` | Page interaction and platform adapters |
| `popup/` | Controls, selection, export, and batch deletion |
| `icons/` | Extension and platform SVG logos |

## Privacy

The extension runs in your browser and interacts with the supported websites. Settings are stored in browser storage. It does not require an AI API key. Exported files are downloaded locally.

## License

[MIT](LICENSE) · Created by **qbpg**.

<p align="center"><a href="https://qbpg.space/"><img src="https://raw.githubusercontent.com/qbpg/qbpg/46238df45b256cde3c09e0dc658364376efe0dcc/assets/portfolio.svg" alt="Portfolio : qbpg.space" width="202" height="28"></a></p>
