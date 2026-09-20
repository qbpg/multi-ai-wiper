export default {
  name: "Mistral",
  icon: "◇",

  match(url) {
    return /chat\.mistral\.ai/.test(url);
  },

  scanChats() {
    const chats = [];
    const items = document.querySelectorAll(
      'a[href*="/chat/"], aside a, nav a, [class*="sidebar"] a, [data-testid*="conversation"]'
    );
    items.forEach((el) => {
      const title =
        el.querySelector("span, p, div")?.textContent?.trim() ||
        el.textContent?.trim() ||
        el.getAttribute("aria-label") ||
        "";
      const hrefMatch = el.href?.match(/\/chat\/([a-f0-9]+)/);
      const id = hrefMatch?.[1] || el.getAttribute("data-conversation-id") || crypto.randomUUID();
      if (title && title.length > 1 && !/^https?:/.test(title)) {
        chats.push({ id, title: title.slice(0, 80), element: el });
      }
    });
    return chats;
  },

  async deleteChat(chatItem, delayMs) {
    const el = chatItem.element;
    if (!el) return false;

    const parent = el.closest("li, div[class*='item'], div[class*='row']") || el.parentElement;
    if (parent) {
      parent.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      await sleep(delayMs);

      const menuBtn = parent.querySelector(
        'button[aria-label*="More"], button[aria-label*="Options"], button[aria-label*="Delete"], button[class*="more"], [data-testid="more"]'
      );
      if (menuBtn) {
        menuBtn.click();
        await sleep(delayMs);

        const menuItems = document.querySelectorAll('[role="menuitem"], [class*="menu"] div, [class*="dropdown"] button');
        let clicked = false;
        menuItems.forEach((item) => {
          if (/delete|remove|supprimer/i.test(item.textContent) && !clicked) {
            item.click();
            clicked = true;
          }
        });
        if (!clicked) {
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
          return false;
        }
        await sleep(delayMs);

        const confirmBtn = document.querySelector(
          'button[data-autofocus], button[class*="confirm"], button[class*="danger"], button[class*="primary"]'
        );
        if (confirmBtn) {
          confirmBtn.click();
          await sleep(delayMs);
        }
        return true;
      }
    }

    return false;
  }
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
