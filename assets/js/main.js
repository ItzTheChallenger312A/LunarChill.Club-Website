/**
 * LunarChill Main Application Entry (main.js)
 * Khởi tạo Navigation, Mobile Drawer Accessibility, Clipboard actions và Server Status
 */
import { CONFIG } from './config.js';
import { copyToClipboard, showToast } from './clipboard.js';
import { StatusService } from './status-service.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi tạo Live Server Status Service
  const statusDot = document.getElementById('server-status-dot');
  const statusText = document.getElementById('server-status-text');
  if (statusDot && statusText) {
    const statusService = new StatusService({ dot: statusDot, text: statusText });
    statusService.init();
  }

  // 2. Xử lý nút Copy IP (Hero, Header & Command chips)
  const copyButtons = document.querySelectorAll('[data-action="copy-ip"]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ipToCopy = btn.getAttribute('data-ip') || CONFIG.SERVER_IP_JAVA;
      
      copyToClipboard(
        ipToCopy,
        () => {
          showToast(`Đã sao chép: ${ipToCopy}`, 'success');
          
          // Phản hồi visual trên nút
          const originalText = btn.innerHTML;
          btn.innerHTML = `<span>✓</span> <span>Đã sao chép!</span>`;
          btn.classList.add('copied');
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        },
        () => {
          showToast(`Không thể tự động sao chép. Vui lòng copy thủ công: ${ipToCopy}`, 'error');
        }
      );
    });
  });

  // 3. Xử lý Mobile Navigation Drawer (Hoàn thiện Accessibility)
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function closeDrawer() {
    if (!mobileDrawer || !mobileDrawer.classList.contains('open')) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      mobileToggle.focus();
    }
  }

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    }
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Đóng drawer khi người dùng nhấn phím Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Đóng drawer khi người dùng click vào bất kỳ liên kết nào trong menu
    const drawerLinks = mobileDrawer.querySelectorAll('a, button');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // 4. Cập nhật dynamic Discord links
  const discordLinks = document.querySelectorAll('[data-link="discord"]');
  discordLinks.forEach(link => {
    link.href = CONFIG.DISCORD_INVITE_URL;
  });
});
