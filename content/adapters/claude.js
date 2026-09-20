export default {
  name: "Claude",
  icon: "◼",

  match(url) {
    return /claude\.ai/.test(url);
  },

  scanChats() {
    const chats = [];
    // Claude sidebar navigation items
    const items = document.querySelectorAll(
      'nav a[href*="/chat/"], aside a[href*="/chat/"], [data-testid*="conversation"] a, a[class*="sidebar"]'
    );
    items.forEach((el) => {
      const title =
        el.querySelector("span, p, div")?.textContent?.trim() ||
        el.textContent?.trim() ||
        el.getAttribute("aria-label") ||
        "";
      const hrefMatch = el.href?.match(/\/chat\/([a-f0-9-]+)/);
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

    // Claude uses a sidebar with hover actions
    const parent = el.closest("li, [role='listitem'], [data-testid*='conversation']") || el.parentElement;
    if (parent) {
      parent.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      await sleep(delayMs);

      // Look for the kebab/more menu on the conversation row
      const menuTrigger = parent.querySelector(
        'button[aria-label*="More"], button[aria-label*="Options"], button[data-testid*="more"], [role="button"][aria-haspopup]'
      );
      if (menuTrigger) {
        menuTrigger.click();
        await sleep(delayMs);

        // Click delete in the dropdown
        const menuItems = document.querySelectorAll('[role="menuitem"], [role="option"], [data-testid*="delete"]');
        let clicked = false;
        menuItems.forEach((item) => {
          if (/delete|remove|supprimer/i.test(item.textContent) && !clicked) {
            item.click();
            clicked = true;
          }
        });
        if (!clicked) {
          // Try Escape to close menu
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
          return false;
        }
        await sleep(delayMs);

        // Confirm if dialog appears
        const confirmBtn = document.querySelector(
          'button[data-testid*="confirm"], button[aria-label*="Confirm"], button[data-autofocus]'
        );
        if (confirmBtn && /confirm|delete|supprimer/i.test(confirmBtn.textContent)) {
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
