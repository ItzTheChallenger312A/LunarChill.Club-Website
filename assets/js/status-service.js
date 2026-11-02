/**
 * LunarChill Server Status Service (status-service.js)
 * Quản lý vòng đời 5 trạng thái & Dynamic Cache với mcstatus.io
 */
import { CONFIG } from './config.js';

export class StatusService {
  constructor(statusElements) {
    this.statusDot = statusElements.dot;
    this.statusText = statusElements.text;
  }

  init() {
    if (CONFIG.FORCE_MAINTENANCE) {
      this.renderState('maintenance', 'Bảo trì máy chủ', 'Hẹn gặp lại bạn sớm!');
      return;
    }

    const cached = this.getCachedStatus();
    if (cached) {
      this.applyStatusData(cached);
      return;
    }

    this.fetchLiveStatus();
  }

  getCachedStatus() {
    try {
      const dataStr = sessionStorage.getItem(CONFIG.CACHE_STORAGE_KEY);
      if (!dataStr) return null;
      
      const cached = JSON.parse(dataStr);
      const now = Date.now();
      
      // Kiểm tra hạn sống cache
      if (cached.expiresAt && now < cached.expiresAt) {
        return cached.data;
      }
      return null;
    } catch (e) {
      console.warn('Error reading status cache', e);
      return null;
    }
  }

  saveCache(data, expiresAtTimestamp) {
    try {
      const cachePayload = {
        data: data,
        expiresAt: expiresAtTimestamp || (Date.now() + CONFIG.DEFAULT_CACHE_TTL_MS)
      };
      sessionStorage.setItem(CONFIG.CACHE_STORAGE_KEY, JSON.stringify(cachePayload));
    } catch (e) {
      console.warn('Error saving status cache', e);
    }
  }

  async fetchLiveStatus() {
    this.renderState('checking', 'Đang kiểm tra...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

    try {
      const response = await fetch(CONFIG.API_STATUS_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      
      // Tính toán cache expiration từ JSON expires_at hoặc Header
      let expiresAt = null;
      if (data.expires_at) {
        expiresAt = typeof data.expires_at === 'number' ? data.expires_at * 1000 : new Date(data.expires_at).getTime();
      }

      this.saveCache(data, expiresAt);
      this.applyStatusData(data);
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn('Could not fetch server status:', error);
      this.renderState('unable', 'Không thể lấy trạng thái');
    }
  }

  applyStatusData(data) {
    if (data.online) {
      const onlinePlayers = data.players?.online ?? 0;
      const maxPlayers = data.players?.max ?? 50;
      this.renderState('online', `${onlinePlayers}/${maxPlayers} người chơi đang online`);
    } else {
      this.renderState('offline', 'Máy chủ ngoại tuyến');
    }
  }

  renderState(state, text) {
    if (this.statusDot) {
      this.statusDot.className = `status-dot ${state}`;
    }
    if (this.statusText) {
      this.statusText.textContent = text;
    }
  }
}
