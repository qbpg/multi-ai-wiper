export default {
  name: "ChatGPT",
  icon: "◉",

  match(url) {
    return /chatgpt\.com/.test(url);
  },

  scanChats() {
    const chats = [];
    // ChatGPT sidebar conversation links
    const items = document.querySelectorAll(
      'nav a[href*="/c/"], aside a[href*="/c/"], [data-testid="conversation-turn"], a[class*="group"]'
    );
    items.forEach((el) => {
      const title =
        el.querySelector("span, p, div")?.textContent?.trim() ||
        el.textContent?.trim() ||
        el.getAttribute("aria-label") ||
        "";
      const hrefMatch = el.href?.match(/\/c\/([a-z0-9-]+)/);
      const id = hrefMatch?.[1] || el.getAttribute("data-conversation-id") || crypto.randomUUID();
      if (title && title.length > 1) {
        chats.push({ id, title: title.slice(0, 80), element: el });
      }
    });
    return chats;
  },

  async deleteChat(chatItem, delayMs) {
    const el = chatItem.element;
    if (!el) return false;

    const parent = el.closest("li, [role='listitem'], div[class*='conversation']") || el.parentElement;
    if (parent) {
      parent.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      await sleep(delayMs);

      // ChatGPT uses a three-dot menu on each sidebar item
      const menuBtn = parent.querySelector(
        'button[data-testid="more-button"], button[aria-label*="More"], button[aria-label*="Options"], button[class*="more"]'
      );
      if (menuBtn) {
        menuBtn.click();
        await sleep(delayMs);

        // Delete option in the popover
        const deleteItem =
          document.querySelector('[data-testid="delete-button"]') ||
          document.querySelector('button[aria-label*="Delete"]');

        if (deleteItem) {
          deleteItem.click();
          await sleep(delayMs);

          // Confirm dialog
          const confirmBtn = document.querySelector(
            'button[data-testid="delete-confirm"], button.btn-primary, button[aria-label*="Confirm"], button[class*="delete"]'
          );
          if (confirmBtn) {
            confirmBtn.click();
            await sleep(delayMs);
          }
          return true;
        }
      }

      // Fallback: try long-press / shift-click delete
      el.dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
      await sleep(delayMs / 2);
    }

    return false;
  }
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
