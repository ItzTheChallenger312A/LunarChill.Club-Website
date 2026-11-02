/**
 * LunarChill Clipboard Module (clipboard.js)
 * Xử lý 1-Click Copy IP với kiểm tra kết quả thực tế và Toast feedback an toàn (XSS-safe)
 */
export function copyToClipboard(text, onSuccess, onFailure) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (onSuccess) onSuccess(text);
      })
      .catch(err => {
        console.warn('Navigator clipboard failed, trying fallback...', err);
        executeFallback(text, onSuccess, onFailure);
      });
  } else {
    executeFallback(text, onSuccess, onFailure);
  }
}

function executeFallback(text, onSuccess, onFailure) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  textArea.setAttribute('readonly', '');
  document.body.appendChild(textArea);
  
  textArea.focus();
  textArea.select();
  
  let successful = false;
  try {
    successful = document.execCommand('copy');
  } catch (err) {
    console.error('execCommand copy failed:', err);
    successful = false;
  } finally {
    document.body.removeChild(textArea);
  }

  if (successful) {
    if (onSuccess) onSuccess(text);
  } else {
    if (onFailure) {
      onFailure(text);
    } else {
      showToast(`Không thể tự động sao chép. Hãy copy thủ công: ${text}`, 'error');
    }
  }
}

export function showToast(message, type = 'success') {
  let toast = document.getElementById('lunar-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lunar-toast';
    toast.className = 'toast-container';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  
  // Dùng textContent và DOM node để đảm bảo XSS-safe
  toast.textContent = '';
  
  const iconSpan = document.createElement('span');
  iconSpan.textContent = type === 'success' ? '✓' : '⚠️';
  iconSpan.setAttribute('aria-hidden', 'true');
  
  const msgSpan = document.createElement('span');
  msgSpan.textContent = message;
  
  toast.appendChild(iconSpan);
  toast.appendChild(msgSpan);
  toast.className = `toast-container show ${type}`;
  
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}
