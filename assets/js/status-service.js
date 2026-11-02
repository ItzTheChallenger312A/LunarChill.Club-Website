/**
 * LunarChill Server Status Service (status-service.js)
 * Quản lý vòng đời trạng thái riêng biệt cho PC (Java) và PE (Bedrock)
 * Đọc chính xác payload expires_at, header X-Cache-Time-Remaining, timeout an toàn
 */
import { CONFIG } from './config.js';

export class StatusService {
  constructor(elements) {
    this.dot = elements.dot;
    this.text = elements.text;
  }

  init() {
    if (CONFIG.FORCE_MAINTENANCE) {
      this.renderState('maintenance', 'Máy chủ đang bảo trì');
      return;
    }

    const cached = this.getCachedStatus(CONFIG.CACHE_KEY_JAVA);
    if (cached) {
      this.applyStatusData(cached);
      return;
    }

    this.fetchStatus();
  }

  getCachedStatus(cacheKey) {
    try {
      const raw = sessionStorage.getItem(cacheKey);
      if (!raw) return null;
      
      const parsed = JSON.parse(raw);
      if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
        return parsed.data;
      }
      // Cache đã hết hạn
      sessionStorage.removeItem(cacheKey);
      return null;
    } catch (e) {
      console.warn('Lỗi đọc cache trạng thái:', e);
      return null;
    }
  }

  saveCache(cacheKey, data, responseHeaders) {
    try {
      let expiresAt = null;

      // 1. Đọc từ header X-Cache-Time-Remaining nếu có
      if (responseHeaders && responseHeaders.has('x-cache-time-remaining')) {
        const remainingSeconds = parseInt(responseHeaders.get('x-cache-time-remaining'), 10);
        if (!isNaN(remainingSeconds) && remainingSeconds > 0) {
          expiresAt = Date.now() + (remainingSeconds * 1000);
        }
      }

      // 2. Nếu chưa có, đọc từ JSON payload data.expires_at (epoch timestamp)
      if (!expiresAt && data && data.expires_at) {
        expiresAt = typeof data.expires_at === 'number' 
          ? (data.expires_at > 1e11 ? data.expires_at : data.expires_at * 1000)
          : new Date(data.expires_at).getTime();
      }

      // 3. Fallback mặc định 60s
      if (!expiresAt || isNaN(expiresAt)) {
        expiresAt = Date.now() + CONFIG.DEFAULT_CACHE_TTL_MS;
      }

      sessionStorage.setItem(cacheKey, JSON.stringify({
        data,
        expiresAt
      }));
    } catch (e) {
      console.warn('Lỗi ghi cache trạng thái:', e);
    }
  }

  async fetchStatus() {
    this.renderState('checking', 'Đang kiểm tra kết nối PC & PE...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

    try {
      // Gọi song song Java & Bedrock để không suy diễn chéo
      const [javaRes, bedrockRes] = await Promise.allSettled([
        fetch(CONFIG.API_STATUS_JAVA, { signal: controller.signal, headers: { 'Accept': 'application/json' } }),
        fetch(CONFIG.API_STATUS_BEDROCK, { signal: controller.signal, headers: { 'Accept': 'application/json' } })
      ]);
      
      clearTimeout(timeoutId);

      let javaData = null;
      let bedrockData = null;

      if (javaRes.status === 'fulfilled' && javaRes.value.ok) {
        javaData = await javaRes.value.json();
        this.saveCache(CONFIG.CACHE_KEY_JAVA, javaData, javaRes.value.headers);
      }

      if (bedrockRes.status === 'fulfilled' && bedrockRes.value.ok) {
        bedrockData = await bedrockRes.value.json();
        this.saveCache(CONFIG.CACHE_KEY_BEDROCK, bedrockData, bedrockRes.value.headers);
      }

      if (!javaData && !bedrockData) {
        this.renderState('unable', 'Không thể lấy trạng thái máy chủ');
        return;
      }

      // Áp dụng dữ liệu hiển thị rõ ràng từng nền tảng
      this.applyCombinedStatus(javaData, bedrockData);

    } catch (error) {
      clearTimeout(timeoutId);
      console.warn('Status fetch error:', error);
      this.renderState('unable', 'Không thể lấy trạng thái máy chủ');
    }
  }

  applyCombinedStatus(java, bedrock) {
    const isJavaOnline = Boolean(java?.online);
    const isBedrockOnline = Boolean(bedrock?.online);

    if (isJavaOnline || isBedrockOnline) {
      const playersOnline = java?.players?.online ?? bedrock?.players?.online ?? 0;
      const playersMax = java?.players?.max ?? bedrock?.players?.max ?? 50;

      let platformLabel = '';
      if (isJavaOnline && isBedrockOnline) {
        platformLabel = 'PC & PE Online';
      } else if (isJavaOnline) {
        platformLabel = 'PC Online (PE Đang kiểm tra)';
      } else {
        platformLabel = 'PE Online (PC Đang kiểm tra)';
      }

      this.renderState('online', `${playersOnline}/${playersMax} người chơi • ${platformLabel}`);
    } else {
      this.renderState('offline', 'Máy chủ ngoại tuyến');
    }
  }

  applyStatusData(data) {
    if (data?.online) {
      const playersOnline = data.players?.online ?? 0;
      const playersMax = data.players?.max ?? 50;
      this.renderState('online', `${playersOnline}/${playersMax} người chơi online`);
    } else {
      this.renderState('offline', 'Máy chủ ngoại tuyến');
    }
  }

  renderState(state, text) {
    if (this.dot) {
      this.dot.className = `status-dot ${state}`;
    }
    if (this.text) {
      this.text.textContent = text;
    }
  }
}
