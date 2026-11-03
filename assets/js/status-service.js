/**
 * LunarChill Server Status Service (status-service.js)
 * Quản lý vòng đời 5 trạng thái độc lập cho PC (Java) và PE (Bedrock)
 * Tuân thủ AC-01.1, AC-01.2 (Dynamic Cache theo expires_at thực tế) & AC-01.3
 */
import { CONFIG } from './config.js';

export class StatusService {
  constructor(elements) {
    this.dot = elements.dot;
    this.text = elements.text;
  }

  async init() {
    if (this.text) {
      this.text.style.fontVariantNumeric = 'tabular-nums';
    }

    if (CONFIG.FORCE_MAINTENANCE) {
      this.renderState('maintenance', 'Máy chủ đang bảo trì (BQT)');
      return;
    }

    // 1. Đọc hai cache độc lập từ sessionStorage
    const javaData = this.getCachedStatus(CONFIG.CACHE_KEY_JAVA);
    const bedrockData = this.getCachedStatus(CONFIG.CACHE_KEY_BEDROCK);

    // Nếu cả hai cache đều còn hiệu lực (Date.now() < expiresAt) -> Hiển thị tức thì
    if (javaData !== null && bedrockData !== null) {
      this.applyCombinedStatus(
        { platform: 'java', status: 'ok', data: javaData },
        { platform: 'bedrock', status: 'ok', data: bedrockData }
      );
      return;
    }

    // 2. State Checking khi cần gọi API
    this.renderState('checking', 'Đang kiểm tra kết nối Java & Bedrock...');

    const javaPromise = javaData !== null
      ? Promise.resolve({ platform: 'java', status: 'ok', data: javaData })
      : this.fetchPlatformStatus(CONFIG.API_STATUS_JAVA, CONFIG.CACHE_KEY_JAVA, 'java');

    const bedrockPromise = bedrockData !== null
      ? Promise.resolve({ platform: 'bedrock', status: 'ok', data: bedrockData })
      : this.fetchPlatformStatus(CONFIG.API_STATUS_BEDROCK, CONFIG.CACHE_KEY_BEDROCK, 'bedrock');

    const [javaResult, bedrockResult] = await Promise.all([javaPromise, bedrockPromise]);
    this.applyCombinedStatus(javaResult, bedrockResult);
  }

  getCachedStatus(cacheKey) {
    try {
      const raw = sessionStorage.getItem(cacheKey);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (typeof parsed?.expiresAt === 'number' && Date.now() < parsed.expiresAt && parsed.data) {
        return parsed.data;
      }

      sessionStorage.removeItem(cacheKey);
      return null;
    } catch (e) {
      console.warn('Không thể đọc cache trạng thái:', cacheKey, e);
      return null;
    }
  }

  /**
   * Trích xuất thời điểm hết hạn thực tế từ payload JSON (`expires_at`)
   * hoặc header `X-Cache-Time-Remaining` (nếu được expose qua CORS).
   * Tuyệt đối không hardcode TTL cố định (tuân thủ FR-01.3 & AC-01.2).
   */
  extractExpiresAt(data, responseHeaders) {
    // 1. Ưu tiên trường expires_at trong JSON body của mcstatus.io v2 (epoch ms hoặc ISO string)
    if (data && data.expires_at != null) {
      const rawExpires = data.expires_at;
      const parsedTime = typeof rawExpires === 'number'
        ? (rawExpires > 1e11 ? rawExpires : rawExpires * 1000)
        : Date.parse(rawExpires);

      if (!Number.isNaN(parsedTime) && parsedTime > Date.now()) {
        return parsedTime;
      }
    }

    // 2. Kiểm tra header X-Cache-Time-Remaining (nếu trình duyệt/CORS cho phép đọc)
    if (responseHeaders && typeof responseHeaders.get === 'function') {
      const remainingHeader = responseHeaders.get('x-cache-time-remaining');
      if (remainingHeader !== null) {
        const remainingSeconds = Number.parseInt(remainingHeader, 10);
        if (!Number.isNaN(remainingSeconds) && remainingSeconds > 0) {
          return Date.now() + remainingSeconds * 1000;
        }
      }
    }

    return null;
  }

  saveCache(cacheKey, data, responseHeaders) {
    try {
      const expiresAt = this.extractExpiresAt(data, responseHeaders);

      // Chính sách: Nếu API không trả về thời hạn hợp lệ hoặc cache đã hết hạn -> không lưu mù
      if (!expiresAt) {
        sessionStorage.removeItem(cacheKey);
        return;
      }

      sessionStorage.setItem(cacheKey, JSON.stringify({ data, expiresAt }));
    } catch (e) {
      console.warn('Không thể lưu cache trạng thái:', cacheKey, e);
    }
  }

  async fetchPlatformStatus(url, cacheKey, platformName) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        clearTimeout(timeoutId);
        return { platform: platformName, status: 'error', error: `HTTP ${response.status}` };
      }

      const data = await response.json();
      clearTimeout(timeoutId);

      this.saveCache(cacheKey, data, response.headers);
      return { platform: platformName, status: 'ok', data };
    } catch (err) {
      clearTimeout(timeoutId);
      return {
        platform: platformName,
        status: 'error',
        error: err.name === 'AbortError' ? 'timeout' : 'network'
      };
    }
  }

  applyCombinedStatus(javaRes, bedrockRes) {
    const javaValid = javaRes?.status === 'ok' && typeof javaRes.data?.online === 'boolean';
    const bedrockValid = bedrockRes?.status === 'ok' && typeof bedrockRes.data?.online === 'boolean';

    const javaOnline = javaValid && javaRes.data.online === true;
    const bedrockOnline = bedrockValid && bedrockRes.data.online === true;

    const javaError = javaRes?.status === 'error' || !javaValid;
    const bedrockError = bedrockRes?.status === 'error' || !bedrockValid;

    // 1. Cả hai nền tảng đều Online
    if (javaOnline && bedrockOnline) {
      const playersOnline = javaRes.data?.players?.online ?? bedrockRes.data?.players?.online ?? 0;
      const maxPlayers = javaRes.data?.players?.max ?? bedrockRes.data?.players?.max;
      const maxText = maxPlayers ? `/${maxPlayers}` : '';

      this.renderState('online', `${playersOnline}${maxText} người chơi • Java & Bedrock Online`);
      return;
    }

    // 2. Java Online, Bedrock gặp lỗi hoặc Offline
    if (javaOnline) {
      const players = javaRes.data?.players?.online ?? 0;
      const maxText = javaRes.data?.players?.max ? `/${javaRes.data.players.max}` : '';
      const bedrockNote = bedrockError ? 'Bedrock đang kiểm tra' : 'Bedrock ngoại tuyến';
      this.renderState('online', `${players}${maxText} người chơi • Java Online (${bedrockNote})`);
      return;
    }

    // 3. Bedrock Online, Java gặp lỗi hoặc Offline
    if (bedrockOnline) {
      const players = bedrockRes.data?.players?.online ?? 0;
      const maxText = bedrockRes.data?.players?.max ? `/${bedrockRes.data.players.max}` : '';
      const javaNote = javaError ? 'Java đang kiểm tra' : 'Java ngoại tuyến';
      this.renderState('online', `${players}${maxText} người chơi • Bedrock Online (${javaNote})`);
      return;
    }

    // 4. Cả hai kết nối API đều lỗi/timeout -> Unable to retrieve status
    if (javaError && bedrockError) {
      this.renderState('unable', 'Không thể kiểm tra trạng thái máy chủ');
      return;
    }

    // 5. Một bên lỗi mạng, một bên phản hồi online: false
    if ((javaError && !bedrockOnline) || (bedrockError && !javaOnline)) {
      this.renderState('unable', 'Đang cập nhật trạng thái kết nối');
      return;
    }

    // 6. Cả hai đều xác nhận online: false
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
