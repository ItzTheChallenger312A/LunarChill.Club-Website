/**
 * LunarChill Main Application Entry (main.js)
 * Khởi tạo SSOT bindings, Clipboard actions (chống race-condition timeout),
 * Mobile Drawer Accessibility (inert + Tab/Shift+Tab Focus Trap + Escape), và Server Status.
 */
import { CONFIG } from './config.js';
import { copyToClipboard, showToast } from './clipboard.js';
import { StatusService } from './status-service.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Đồng bộ dữ liệu hiển thị từ CONFIG (Single Source of Truth)
  const configTextNodes = document.querySelectorAll('[data-config-text]');
  configTextNodes.forEach(node => {
    const key = node.getAttribute('data-config-text');
    if (key && key in CONFIG && (typeof CONFIG[key] === 'string' || typeof CONFIG[key] === 'number')) {
      node.textContent = String(CONFIG[key]);
    }
  });

  // 2. Khởi tạo Live Server Status Service
  const statusDot = document.getElementById('server-status-dot');
  const statusText = document.getElementById('server-status-text');
  if (statusDot && statusText) {
    const statusService = new StatusService({ dot: statusDot, text: statusText });
    statusService.init();
  }

  // 3. Xử lý nút Copy IP & Command Chips (Quản lý timeout riêng cho từng nút)
  const buttonTimeouts = new WeakMap();
  const originalButtonMarkup = new WeakMap();

  function resolveCopyValue(btn) {
    const targetKey = btn.getAttribute('data-copy-target');
    if (targetKey && targetKey in CONFIG.COPY_TARGETS) {
      return CONFIG.COPY_TARGETS[targetKey];
    }
    const explicitValue = btn.getAttribute('data-copy') || btn.getAttribute('data-ip');
    return explicitValue || CONFIG.SERVER_ADDRESS_JAVA;
  }

  const copyButtons = document.querySelectorAll('[data-action="copy-ip"]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const valueToCopy = resolveCopyValue(btn);

      copyToClipboard(
        valueToCopy,
        () => {
          showToast(`Đã sao chép: ${valueToCopy}`, 'success');

          // Lưu markup gốc chỉ ở lần đầu tiên khi nút chưa ở trạng thái copied
          if (!originalButtonMarkup.has(btn)) {
            originalButtonMarkup.set(btn, btn.innerHTML);
          }

          // Hủy timeout cũ nếu người dùng click liên tiếp
          const existingTimer = buttonTimeouts.get(btn);
          if (existingTimer) {
            clearTimeout(existingTimer);
          }

          btn.innerHTML = '<span>✓</span> <span>Đã sao chép!</span>';
          btn.classList.add('copied');

          const timerId = setTimeout(() => {
            btn.innerHTML = originalButtonMarkup.get(btn) ?? valueToCopy;
            btn.classList.remove('copied');
            buttonTimeouts.delete(btn);
          }, 2000);

          buttonTimeouts.set(btn, timerId);
        },
        () => {
          showToast(`Không thể tự động sao chép. Vui lòng copy thủ công: ${valueToCopy}`, 'error');
        }
      );
    });
  });

  // 4. Xử lý Mobile Navigation Drawer (inert + Focus Trap thực sự + Escape)
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const ICON_MENU = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  const ICON_CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';

  if (mobileDrawer) {
    mobileDrawer.setAttribute('inert', '');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  function getFocusableDrawerElements() {
    if (!mobileDrawer) return [];
    const drawerItems = Array.from(
      mobileDrawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
    return mobileToggle ? [mobileToggle, ...drawerItems] : drawerItems;
  }

  function closeDrawer(returnFocus = true) {
    if (!mobileDrawer || !mobileDrawer.classList.contains('open')) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawer.setAttribute('inert', '');

    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', 'Mở menu điều hướng');
      mobileToggle.innerHTML = ICON_MENU;
      if (returnFocus) {
        mobileToggle.focus();
      }
    }
  }

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawer.removeAttribute('inert');

    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileToggle.setAttribute('aria-label', 'Đóng menu điều hướng');
      mobileToggle.innerHTML = ICON_CLOSE;
    }

    const firstLink = mobileDrawer.querySelector('a[href], button:not([disabled])');
    if (firstLink) {
      requestAnimationFrame(() => firstLink.focus());
    }
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeDrawer(true);
      } else {
        openDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!mobileDrawer.classList.contains('open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer(true);
        return;
      }

      // Focus Trap khi nhấn Tab / Shift + Tab
      if (e.key === 'Tab') {
        const focusable = getFocusableDrawerElements();
        if (focusable.length === 0) return;

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });

    const drawerInteractiveItems = mobileDrawer.querySelectorAll('a, button');
    drawerInteractiveItems.forEach(item => {
      item.addEventListener('click', () => {
        closeDrawer(false);
      });
    });
  }

  // 5. Cập nhật dynamic Discord links từ CONFIG
  const discordLinks = document.querySelectorAll('[data-link="discord"]');
  discordLinks.forEach(link => {
    link.href = CONFIG.DISCORD_INVITE_URL;
  });
});
