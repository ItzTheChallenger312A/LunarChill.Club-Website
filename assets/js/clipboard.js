/**
 * LunarChill Clipboard Module (clipboard.js)
 * Xử lý 1-Click Copy IP với kiểm tra kết quả thực tế và Toast feedback
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
  
  const icon = type === 'success' ? '✓' : '⚠️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.className = `toast-container show ${type}`;
  
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}
