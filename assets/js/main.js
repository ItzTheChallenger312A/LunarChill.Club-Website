/**
 * LunarChill Main Application Entry (main.js)
 * Khởi tạo Navigation, Mobile Drawer, Clipboard actions và Server Status
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

  // 2. Xử lý nút Copy IP (Hero & Header)
  const copyButtons = document.querySelectorAll('[data-action="copy-ip"]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ipToCopy = btn.getAttribute('data-ip') || CONFIG.SERVER_IP_JAVA;
      
      copyToClipboard(ipToCopy, () => {
        showToast(`Đã sao chép IP: ${ipToCopy}`);
        
        // Phản hồi visual trên nút
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>✓</span> <span>Đã sao chép!</span>`;
        btn.classList.add('copied');
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // 3. Xử lý Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  }

  // 4. Cập nhật dynamic Discord links
  const discordLinks = document.querySelectorAll('[data-link="discord"]');
  discordLinks.forEach(link => {
    link.href = CONFIG.DISCORD_INVITE_URL;
  });
});
