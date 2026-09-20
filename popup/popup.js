/* ── Multi-AI Wiper – Popup JS (Cyber Dark UI) ── */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let currentChats = [];
let selectedIds = new Set();
let cancelFlag = false;
let undoBuffer = [];

const els = {
  platformBadge: $("#platform-badge"),
  statusDot: $("#status-dot"),
  statusText: $("#status-text"),
  chatCount: $("#chat-count"),
  btnScan: $("#btn-scan"),
  searchInput: $("#search-input"),
  selectAll: $("#select-all"),
  delaySlider: $("#delay-slider"),
  delayValue: $("#delay-value"),
  chatList: $("#chat-list"),
  btnExport: $("#btn-export"),
  btnDelete: $("#btn-delete"),
  btnExportSource: $("#btn-export-source"),
  progressOverlay: $("#progress-overlay"),
  progressText: $("#progress-text"),
  progressFill: $("#progress-fill"),
  progressDetail: $("#progress-detail"),
  btnCancel: $("#btn-cancel"),
  undoToast: $("#undo-toast"),
  undoText: $("#undo-text"),
  btnUndo: $("#btn-undo"),
};

/* ── Speed presets ── */
const speedMap = { fast: 50, balanced: 150, safe: 300 };

$$(".mw-speed-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".mw-speed-btn").forEach((b) => b.classList.remove("mw-speed-active"));
    btn.classList.add("mw-speed-active");
    const ms = speedMap[btn.dataset.speed] || 150;
    els.delaySlider.value = ms;
    els.delayValue.textContent = ms + "ms";
    chrome.storage.local.set({ speedPreset: btn.dataset.speed, delayMs: ms });
  });
});

els.delaySlider.addEventListener("input", () => {
  const v = els.delaySlider.value;
  els.delayValue.textContent = v + "ms";
  chrome.storage.local.set({ delayMs: Number(v) });
});

/* ── Content script injection ── */
async function ensureContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ["content/content.js"] });
    await chrome.scripting.insertCSS({ target: { tabId }, files: ["content/content.css"] });
  } catch { /* already injected */ }
}

/* ── Send message to content script ── */
function sendToContent(message) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (!tabs[0]) { resolve({ ok: false, error: "No active tab." }); return; }
      const tabId = tabs[0].id;
      await ensureContentScript(tabId);
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) resolve({ ok: false, error: chrome.runtime.lastError.message });
        else resolve(response || { ok: false, error: "No response" });
      });
    });
  });
}

/* ── Platform detection ── */
function detectPlatform(url) {
  if (/gemini\.google\.com/.test(url)) return "GEMINI";
  if (/claude\.ai/.test(url)) return "CLAUDE";
  if (/chatgpt\.com/.test(url)) return "CHATGPT";
  if (/chat\.deepseek\.com/.test(url)) return "DEEPSEEK";
  if (/chat\.mistral\.ai/.test(url)) return "MISTRAL";
  return null;
}

/* ── Set platform badge ── */
function setPlatform(name) {
  if (name) {
    els.platformBadge.textContent = name + " DETECTED";
    els.platformBadge.classList.add("mw-active");
    els.statusDot.classList.add("mw-connected");
  } else {
    els.platformBadge.textContent = "NO PLATFORM";
    els.platformBadge.classList.remove("mw-active");
    els.statusDot.classList.remove("mw-connected");
  }
}

/* ── Render chat list ── */
function renderChats(filter = "") {
  const lower = filter.toLowerCase();
  const filtered = currentChats.filter((c) => c.title.toLowerCase().includes(lower));

  if (filtered.length === 0) {
    els.chatList.innerHTML = '<p class="mw-empty-state">// no conversations found</p>';
    return;
  }

  els.chatList.innerHTML = filtered.map((c) => `
    <label class="mw-chat-item" data-id="${c.id}">
      <input type="checkbox" data-id="${c.id}" ${selectedIds.has(c.id) ? "checked" : ""} />
      <span class="mw-chat-title" title="${c.title}">${c.title}</span>
    </label>
  `).join("");

  els.chatList.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) selectedIds.add(cb.dataset.id);
      else selectedIds.delete(cb.dataset.id);
      updateActionButtons();
    });
  });
}

function updateActionButtons() {
  const hasSelection = selectedIds.size > 0;
  els.btnExport.disabled = currentChats.length === 0;
  els.btnDelete.disabled = !hasSelection;
  els.selectAll.checked = currentChats.length > 0 && selectedIds.size === currentChats.length;
}

/* ── Scan ── */
async function doScan() {
  els.statusText.textContent = "Scanning...";
  els.btnScan.disabled = true;

  const resp = await sendToContent({ action: "SCAN" });

  if (!resp.ok) {
    const tabUrl = await new Promise((r) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (t) => r(t[0]?.url || ""));
    });
    const platform = detectPlatform(tabUrl);
    setPlatform(platform);
    els.statusText.textContent = platform ? "No conversations detected." : "Navigate to a supported AI platform.";
    els.chatCount.textContent = "";
    currentChats = [];
    renderChats();
    updateActionButtons();
    els.btnScan.disabled = false;
    return;
  }

  setPlatform(resp.platform.toUpperCase());
  els.statusText.textContent = resp.chats.length + " conversation" + (resp.chats.length !== 1 ? "s" : "") + " found";
  els.chatCount.textContent = resp.chats.length;
  currentChats = resp.chats;
  selectedIds.clear();
  renderChats();
  updateActionButtons();
  els.btnScan.disabled = false;
}

/* ── Export conversations JSON ── */
async function doExport() {
  const resp = await sendToContent({ action: "EXPORT_JSON" });
  if (!resp.ok) return;

  const blob = new Blob([JSON.stringify(resp, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = resp.platform.toLowerCase() + "-backup-" + Date.now() + ".json";
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Delete batch ── */
async function doDelete() {
  if (selectedIds.size === 0) return;

  const delayMs = Number(els.delaySlider.value) || 150;
  const ids = Array.from(selectedIds);

  els.progressOverlay.classList.remove("mw-hidden");
  els.progressFill.style.width = "0%";
  els.progressText.textContent = "DELETING " + ids.length + " CONVERSATION" + (ids.length > 1 ? "S" : "");
  els.progressDetail.textContent = "";
  cancelFlag = false;

  let current = 0;
  const total = ids.length;

  for (const id of ids) {
    if (cancelFlag) break;
    const chat = currentChats.find((c) => c.id === id);
    els.progressDetail.textContent = chat ? chat.title : id;
    els.progressFill.style.width = ((current / total) * 100) + "%";
    await sendToContent({ action: "DELETE_BATCH", ids: [id], delayMs });
    current++;
    els.progressFill.style.width = ((current / total) * 100) + "%";
  }

  els.progressOverlay.classList.add("mw-hidden");
  const deleted = cancelFlag ? current : total;
  undoBuffer = ids.slice(0, deleted);
  showUndoToast(deleted);
  await doScan();
}

function showUndoToast(count) {
  els.undoText.textContent = count + " conversation" + (count !== 1 ? "s" : "") + " deleted";
  els.undoToast.classList.remove("mw-hidden");
  const timer = setTimeout(() => { els.undoToast.classList.add("mw-hidden"); undoBuffer = []; }, 5000);
  els.btnUndo.onclick = () => {
    clearTimeout(timer);
    els.undoToast.classList.add("mw-hidden");
    alert("Undo is limited. Always export a JSON backup before deleting.");
    undoBuffer = [];
  };
}

/* ── Export Program Source Code ── */
const SOURCE_FILES = [
  "manifest.json",
  "background/background.js",
  "content/content.js",
  "content/content.css",
  "content/adapters/gemini.js",
  "content/adapters/claude.js",
  "content/adapters/chatgpt.js",
  "content/adapters/deepseek.js",
  "content/adapters/mistral.js",
  "popup/popup.html",
  "popup/popup.css",
  "popup/popup.js",
];

async function doExportSource() {
  els.btnExportSource.disabled = true;
  els.btnExportSource.textContent = "PACKAGING...";

  const files = {};

  for (const path of SOURCE_FILES) {
    try {
      const url = chrome.runtime.getURL(path);
      const resp = await fetch(url);
      if (resp.ok) {
        files[path] = await resp.text();
      } else {
        files[path] = "// ERROR: Could not read file (" + resp.status + ")";
      }
    } catch (e) {
      files[path] = "// ERROR: " + e.message;
    }
  }

  /* Also grab the manifest content */
  try {
    const mResp = await fetch(chrome.runtime.getURL("manifest.json"));
    if (mResp.ok) files["manifest.json"] = await mResp.text();
  } catch {}

  const bundle = {
    name: "multi-ai-wiper-tool",
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    fileCount: Object.keys(files).length,
    files: files,
  };

  const json = JSON.stringify(bundle, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "multi-ai-wiper-source-" + Date.now() + ".json";
  a.click();
  URL.revokeObjectURL(url);

  els.btnExportSource.disabled = false;
  els.btnExportSource.innerHTML = `
    <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
    EXPORT PROGRAM SOURCE`;
}

/* ── Event listeners ── */
els.btnScan.addEventListener("click", doScan);
els.searchInput.addEventListener("input", () => renderChats(els.searchInput.value));

els.selectAll.addEventListener("change", () => {
  if (els.selectAll.checked) currentChats.forEach((c) => selectedIds.add(c.id));
  else selectedIds.clear();
  renderChats(els.searchInput.value);
  updateActionButtons();
});

els.btnExport.addEventListener("click", doExport);
els.btnDelete.addEventListener("click", doDelete);
els.btnExportSource.addEventListener("click", doExportSource);
els.btnCancel.addEventListener("click", () => { cancelFlag = true; });

/* ── Load saved settings ── */
chrome.storage.local.get(["delayMs", "speedPreset"], (data) => {
  if (data.delayMs) {
    els.delaySlider.value = data.delayMs;
    els.delayValue.textContent = data.delayMs + "ms";
  }
  if (data.speedPreset) {
    $$(".mw-speed-btn").forEach((b) => {
      b.classList.toggle("mw-speed-active", b.dataset.speed === data.speedPreset);
    });
  }
});

/* ── Init ── */
doScan();
