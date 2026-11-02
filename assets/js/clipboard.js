/**
 * LunarChill Clipboard Module (clipboard.js)
 * Xử lý 1-Click Copy IP và Toast feedback thông báo
 */
export function copyToClipboard(text, successCallback) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      if (successCallback) successCallback(text);
    }).catch(err => {
      console.warn('Clipboard API failed, trying fallback...', err);
      fallbackCopyText(text, successCallback);
    });
  } else {
    fallbackCopyText(text, successCallback);
  }
}

function fallbackCopyText(text, successCallback) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    if (successCallback) successCallback(text);
  } catch (err) {
    console.error('Fallback copy failed:', err);
  } finally {
    document.body.removeChild(textArea);
  }
}

export function showToast(message) {
  let toast = document.getElementById('lunar-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lunar-toast';
    toast.className = 'toast-container';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');
  
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}
