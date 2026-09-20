/* background.js – service worker (MV3) */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ delayMs: 150, speedPreset: "balanced" });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "_execute_action") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.action.openPopup();
      }
    });
  }
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "PING") {
    sendResponse({ ok: true });
    return false;
  }
  return false;
});
