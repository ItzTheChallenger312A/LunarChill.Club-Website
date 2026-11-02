/**
 * LunarChill Server Status Service (status-service.js)
 * Quản lý vòng đời trạng thái độc lập cho PC (Java) và PE (Bedrock)
 * Đọc hai cache độc lập, timeout an toàn trọn vẹn (bao gồm body parsing),
 * phân biệt minh bạch: Online, Offline, Unable to retrieve, Partial status
 */
import { CONFIG } from './config.js';

export class StatusService {
  constructor(elements) {
    this.dot = elements.dot;
    this.text = elements.text;
  }

  async init() {
    if (CONFIG.FORCE_MAINTENANCE) {
      this.renderState('maintenance', 'Máy chủ đang bảo trì (BQT)');
      return;
    }

    // 1. Đọc hai cache độc lập
    let javaData = this.getCachedStatus(CONFIG.CACHE_KEY_JAVA);
    let bedrockData = this.getCachedStatus(CONFIG.CACHE_KEY_BEDROCK);

    // Nếu cả hai cache đều còn hạn hợp lệ -> Hiển thị ngay lập tức
    if (javaData !== null && bedrockData !== null) {
      this.applyCombinedStatus(
        { status: 'ok', data: javaData },
        { status: 'ok', data: bedrockData }
      );
      return;
    }

    // Nếu thiếu 1 trong 2 hoặc cả hai -> Kiểm tra API cho nền tảng cần cập nhật
    this.renderState('checking', 'Đang kiểm tra kết nối PC & PE...');

    const promises = [];

    // Kiểm tra Java nếu thiếu cache
    if (javaData !== null) {
      promises.push(Promise.resolve({ platform: 'java', status: 'ok', data: javaData }));
    } else {
      promises.push(this.fetchPlatformStatus(CONFIG.API_STATUS_JAVA, CONFIG.CACHE_KEY_JAVA, 'java'));
    }

    // Kiểm tra Bedrock nếu thiếu cache
    if (bedrockData !== null) {
      promises.push(Promise.resolve({ platform: 'bedrock', status: 'ok', data: bedrockData }));
    } else {
      promises.push(this.fetchPlatformStatus(CONFIG.API_STATUS_BEDROCK, CONFIG.CACHE_KEY_BEDROCK, 'bedrock'));
    }

    const results = await Promise.all(promises);
    const javaResult = results.find(r => r.platform === 'java');
    const bedrockResult = results.find(r => r.platform === 'bedrock');

    this.applyCombinedStatus(javaResult, bedrockResult);
  }

  getCachedStatus(cacheKey) {
    try {
      const raw = sessionStorage.getItem(cacheKey);
      if (!raw) return null;
      
      const parsed = JSON.parse(raw);
      if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
        return parsed.data;
      }
      sessionStorage.removeItem(cacheKey);
      return null;
    } catch (e) {
      console.warn('Lỗi đọc cache:', cacheKey, e);
      return null;
    }
  }

  saveCache(cacheKey, data, responseHeaders) {
    try {
      let expiresAt = null;

      // Đọc header X-Cache-Time-Remaining
      if (responseHeaders && typeof responseHeaders.get === 'function') {
        const remaining = parseInt(responseHeaders.get('x-cache-time-remaining'), 10);
        if (!isNaN(remaining) && remaining > 0) {
          expiresAt = Date.now() + (remaining * 1000);
        }
      }

      // Đọc trường expires_at từ JSON
      if (!expiresAt && data && data.expires_at) {
        expiresAt = typeof data.expires_at === 'number'
          ? (data.expires_at > 1e11 ? data.expires_at : data.expires_at * 1000)
          : new Date(data.expires_at).getTime();
      }

      // Fallback an toàn nếu không có thông tin
      if (!expiresAt || isNaN(expiresAt)) {
        expiresAt = Date.now() + CONFIG.DEFAULT_CACHE_TTL_MS;
      }

      sessionStorage.setItem(cacheKey, JSON.stringify({ data, expiresAt }));
    } catch (e) {
      console.warn('Lỗi lưu cache:', cacheKey, e);
    }
  }

  /**
   * Fetch từng nền tảng độc lập, giữ timeout xuyên suốt cả quá trình fetch và parse JSON
   */
  async fetchPlatformStatus(url, cacheKey, platformName) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        clearTimeout(timeoutId);
        return { platform: platformName, status: 'error', error: `HTTP ${response.status}` };
      }

      // Giữ timeout cho đến khi đọc xong hoàn toàn body
      const data = await response.json();
      clearTimeout(timeoutId);

      this.saveCache(cacheKey, data, response.headers);
      return { platform: platformName, status: 'ok', data };
    } catch (err) {
      clearTimeout(timeoutId);
      return { platform: platformName, status: 'error', error: err.name === 'AbortError' ? 'timeout' : 'network' };
    }
  }

  /**
   * Tổng hợp trạng thái rõ ràng, phân biệt:
   * - Cả hai Online
   * - Partial Online (một bên Online, một bên Lỗi kết nối hoặc Offline)
   * - Xác nhận Offline (cả hai phản hồi thành công và đều báo online: false)
   * - Unable to retrieve (cả hai đều lỗi kết nối hoặc timeout)
   */
  applyCombinedStatus(javaRes, bedrockRes) {
    const javaOnline = javaRes?.status === 'ok' && Boolean(javaRes.data?.online);
    const bedrockOnline = bedrockRes?.status === 'ok' && Boolean(bedrockRes.data?.online);

    const javaError = javaRes?.status === 'error';
    const bedrockError = bedrockRes?.status === 'error';

    // Trường hợp 1: Cả hai nền tảng đều online
    if (javaOnline && bedrockOnline) {
      const playersOnline = javaRes.data?.players?.online ?? bedrockRes.data?.players?.online ?? 0;
      const maxJava = javaRes.data?.players?.max;
      const maxBedrock = bedrockRes.data?.players?.max;
      const maxText = (maxJava || maxBedrock) ? `/${maxJava || maxBedrock}` : '';

      this.renderState('online', `${playersOnline}${maxText} người chơi • PC & PE Online`);
      return;
    }

    // Trường hợp 2: PC Online, PE gặp vấn đề hoặc Offline
    if (javaOnline) {
      const players = javaRes.data?.players?.online ?? 0;
      const maxText = javaRes.data?.players?.max ? `/${javaRes.data.players.max}` : '';
      const peNote = bedrockError ? 'PE Đang kết nối lại' : 'PE Ngoại tuyến';
      this.renderState('online', `${players}${maxText} người chơi • PC Online (${peNote})`);
      return;
    }

    // Trường hợp 3: PE Online, PC gặp vấn đề hoặc Offline
    if (bedrockOnline) {
      const players = bedrockRes.data?.players?.online ?? 0;
      const maxText = bedrockRes.data?.players?.max ? `/${bedrockRes.data.players.max}` : '';
      const pcNote = javaError ? 'PC Đang kết nối lại' : 'PC Ngoại tuyến';
      this.renderState('online', `${players}${maxText} người chơi • PE Online (${pcNote})`);
      return;
    }

    // Trường hợp 4: Cả hai kết nối API đều lỗi hoặc timeout (KHÔNG KẾT LUẬN OFFLINE)
    if (javaError && bedrockError) {
      this.renderState('unable', 'Không thể kiểm tra trạng thái máy chủ');
      return;
    }

    // Trường hợp 5: Một bên lỗi kết nối, một bên phản hồi online: false
    if ((javaError && !bedrockOnline) || (bedrockError && !javaOnline)) {
      this.renderState('unable', 'Đang cập nhật trạng thái kết nối');
      return;
    }

    // Trường hợp 6: Cả hai đều kết nối thành công và xác nhận máy chủ offline (online: false)
    this.renderState('offline', 'Máy chủ ngoại tuyến');
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
