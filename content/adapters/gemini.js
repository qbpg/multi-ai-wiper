export default {
  name: "Gemini",
  icon: "✦",

  match(url) {
    return /gemini\.google\.com/.test(url);
  },

  scanChats() {
    const chats = [];
    const items = document.querySelectorAll(
      'a[href*="/app/"], a[href*="/chat/"]'
    );
    items.forEach((el) => {
      const title = el.textContent?.trim() || el.getAttribute("aria-label") || "";
      const id = el.href.split("/").pop() || el.getAttribute("data-id") || crypto.randomUUID();
      if (title) {
        chats.push({ id, title, element: el });
      }
    });
    return chats;
  },

  async deleteChat(chatItem, delayMs) {
    const el = chatItem.element;
    if (!el) return false;

    // Hover to reveal actions
    el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    await sleep(delayMs);

    // Try finding the three-dot / more menu near the chat item
    const parent = el.closest('[role="listitem"], li, [data-conversation-id]') || el.parentElement;
    if (parent) {
      const menuBtn = parent.querySelector(
        'button[aria-label*="More"], button[aria-label*="Delete"], button[aria-label*="Supprimer"], [data-test-id="more-actions"], .more-btn'
      );
      if (menuBtn) {
        menuBtn.click();
        await sleep(delayMs);

        // Look for delete option in dropdown
        const deleteOption =
          document.querySelector('[role="menuitem"][data-value="delete"]') ||
          document.querySelector('[role="menuitem"]:not([disabled])');
        const allMenuItems = document.querySelectorAll('[role="menuitem"]');
        let found = false;
        allMenuItems.forEach((item) => {
          if (/delete|supprimer|remove/i.test(item.textContent)) {
            item.click();
            found = true;
          }
        });
        if (!found) return false;
        await sleep(delayMs);

        // Confirm dialog if present
        const confirmBtn = document.querySelector(
          'button[data-test-id="confirm-delete"], button[aria-label*="Delete"], .confirm-delete'
        );
        if (confirmBtn) confirmBtn.click();
        await sleep(delayMs);
        return true;
      }
    }

    // Fallback: try direct right-click context menu approach
    el.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true }));
    await sleep(delayMs / 2);
    const ctxDelete = document.querySelector(
      '[role="menuitem"][data-command="delete"], [role="menu"]:not([hidden]) [role="menuitem"]'
    );
    if (ctxDelete && /delete/i.test(ctxDelete.textContent)) {
      ctxDelete.click();
      await sleep(delayMs);
      const confirm = document.querySelector('button[data-autofocus], button[ref="cancel"]');
      if (confirm) confirm.click();
      return true;
    }

    return false;
  }
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
