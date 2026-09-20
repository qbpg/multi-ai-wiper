import gemini from "./adapters/gemini.js";
import claude from "./adapters/claude.js";
import chatgpt from "./adapters/chatgpt.js";
import deepseek from "./adapters/deepseek.js";
import mistral from "./adapters/mistral.js";

const adapters = [gemini, claude, chatgpt, deepseek, mistral];

function getActiveAdapter() {
  const url = window.location.href;
  return adapters.find((a) => a.match(url)) || null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function handleDeleteBatch(ids, delayMs, sendResponse) {
  const adapter = getActiveAdapter();
  if (!adapter) {
    sendResponse({ ok: false, error: "No adapter for this page." });
    return;
  }

  const chats = adapter.scanChats();
  const targets = ids === "ALL" ? chats : chats.filter((c) => ids.includes(c.id));

  if (targets.length === 0) {
    sendResponse({ ok: false, error: "No matching conversations found." });
    return;
  }

  let deleted = 0;
  for (const chat of targets) {
    sendResponse({ progress: { current: deleted, total: targets.length, title: chat.title } });
    const ok = await adapter.deleteChat(chat, delayMs);
    if (ok) deleted++;
    await sleep(delayMs);
  }

  sendResponse({ done: { deleted, total: targets.length } });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "SCAN") {
    const adapter = getActiveAdapter();
    if (!adapter) {
      sendResponse({ ok: false, platform: null });
      return false;
    }
    const chats = adapter.scanChats();
    sendResponse({
      ok: true,
      platform: adapter.name,
      icon: adapter.icon,
      chats: chats.map((c) => ({ id: c.id, title: c.title }))
    });
    return false;
  }

  if (msg.action === "DELETE_BATCH") {
    handleDeleteBatch(msg.ids, msg.delayMs, sendResponse);
    return true;
  }

  if (msg.action === "EXPORT_JSON") {
    const adapter = getActiveAdapter();
    if (!adapter) {
      sendResponse({ ok: false });
      return false;
    }
    const chats = adapter.scanChats();
    const data = chats.map((c) => ({ id: c.id, title: c.title }));
    sendResponse({ ok: true, data, platform: adapter.name, exportedAt: new Date().toISOString() });
    return false;
  }

  return false;
});
