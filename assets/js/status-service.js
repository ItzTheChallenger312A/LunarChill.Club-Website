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
    this.playersOnlineEl = document.getElementById('portal-players-online');
    this.playersMaxEl = document.getElementById('portal-players-max');
    this.javaStatusEl = document.getElementById('java-node-status');
    this.javaIconEl = document.getElementById('java-node-icon');
    this.bedrockStatusEl = document.getElementById('bedrock-node-status');
    this.bedrockIconEl = document.getElementById('bedrock-node-icon');
    this.checkedTimeEl = document.getElementById('status-checked-time');
  }

  formatNowTimestamp() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${pad(now.getDate())}-${pad(now.getMonth() + 1)}`;
  }

  async init() {
    if (this.text) {
      this.text.style.fontVariantNumeric = 'tabular-nums';
    }

    if (CONFIG.FORCE_MAINTENANCE) {
      this.renderState('maintenance', 'Đang bảo trì (BQT)');
      if (this.playersOnlineEl) this.playersOnlineEl.textContent = '0';
      if (this.javaStatusEl) this.javaStatusEl.textContent = 'Đang bảo trì';
      if (this.bedrockStatusEl) this.bedrockStatusEl.textContent = 'Đang bảo trì';
      if (this.checkedTimeEl) this.checkedTimeEl.textContent = this.formatNowTimestamp();
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
    this.renderState('checking', 'Đang kiểm tra...');

    const javaPromise = javaData !== null
      ? Promise.resolve({ platform: 'java', status: 'ok', data: javaData })
      : this.fetchPlatformStatus(CONFIG.API_STATUS_JAVA, CONFIG.CACHE_KEY_JAVA, 'java');

    const bedrockPromise = bedrockData !== null
      ? Promise.resolve({ platform: 'bedrock', status: 'ok', data: bedrockData })
      : this.fetchBedrockStatus();

    const [javaResult, bedrockResult] = await Promise.all([javaPromise, bedrockPromise]);
    this.applyCombinedStatus(javaResult, bedrockResult);
  }

  /**
   * Truy vấn trạng thái Bedrock: Thử trước endpoint cổng 25572 thống nhất,
   * nếu GeyserMC chưa hoàn tất chuyển port thì fallback an toàn sang cổng 19143.
   */
  async fetchBedrockStatus() {
    const primaryResult = await this.fetchPlatformStatus(
      CONFIG.API_STATUS_BEDROCK,
      CONFIG.CACHE_KEY_BEDROCK,
      'bedrock'
    );

    if (primaryResult.status === 'ok' && primaryResult.data?.online === true) {
      return primaryResult;
    }

    if (CONFIG.API_STATUS_BEDROCK_FALLBACK) {
      try {
        const fallbackResult = await this.fetchPlatformStatus(
          CONFIG.API_STATUS_BEDROCK_FALLBACK,
          CONFIG.CACHE_KEY_BEDROCK,
          'bedrock'
        );
        if (fallbackResult.status === 'ok' && fallbackResult.data?.online === true) {
          return fallbackResult;
        }
      } catch (e) {
        // Fallback thất bại thì trả về primaryResult ban đầu
      }
    }

    return primaryResult;
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

    if (this.checkedTimeEl) {
      this.checkedTimeEl.textContent = this.formatNowTimestamp();
    }

    // Cập nhật trạng thái riêng cho từng cổng (Node Cards)
    if (this.javaStatusEl && this.javaIconEl) {
      if (javaOnline) {
        this.javaStatusEl.textContent = 'Đang hoạt động';
        this.javaIconEl.className = 'node-icon-box online';
      } else if (javaError) {
        this.javaStatusEl.textContent = 'Không thể kiểm tra';
        this.javaIconEl.className = 'node-icon-box unable';
      } else {
        this.javaStatusEl.textContent = 'Ngoại tuyến';
        this.javaIconEl.className = 'node-icon-box offline';
      }
    }

    if (this.bedrockStatusEl && this.bedrockIconEl) {
      if (bedrockOnline) {
        this.bedrockStatusEl.textContent = 'Đang hoạt động';
        this.bedrockIconEl.className = 'node-icon-box online';
      } else if (bedrockError) {
        this.bedrockStatusEl.textContent = 'Không thể kiểm tra';
        this.bedrockIconEl.className = 'node-icon-box unable';
      } else {
        this.bedrockStatusEl.textContent = 'Ngoại tuyến';
        this.bedrockIconEl.className = 'node-icon-box offline';
      }
    }

    // Cập nhật bộ đếm người chơi lớn (Big Metric)
    // Ưu tiên nền tảng đang Online thực tế; tránh việc Java Offline trả về 0 đè lên Bedrock đang có người chơi
    let playersOnline = 0;
    let maxPlayers = 50;

    if (javaOnline && bedrockOnline) {
      // Trong môi trường cross-play GeyserMC, lấy giá trị cao nhất giữa hai bên để phản ánh chính xác nhất
      playersOnline = Math.max(
        javaRes.data?.players?.online ?? 0,
        bedrockRes.data?.players?.online ?? 0
      );
      maxPlayers = Math.max(
        javaRes.data?.players?.max ?? 0,
        bedrockRes.data?.players?.max ?? 0
      ) || 50;
    } else if (javaOnline) {
      playersOnline = javaRes.data?.players?.online ?? 0;
      maxPlayers = javaRes.data?.players?.max ?? 50;
    } else if (bedrockOnline) {
      playersOnline = bedrockRes.data?.players?.online ?? 0;
      maxPlayers = bedrockRes.data?.players?.max ?? 50;
    }

    if (this.playersOnlineEl) {
      this.playersOnlineEl.textContent = String(playersOnline);
    }
    if (this.playersMaxEl) {
      this.playersMaxEl.textContent = String(maxPlayers);
    }

    // 1. Cả hai nền tảng đều Online
    if (javaOnline && bedrockOnline) {
      this.renderState('online', 'Đang hoạt động');
      return;
    }

    // 2. PC Online, PE gặp lỗi hoặc Offline
    if (javaOnline) {
      this.renderState('online', 'Bản PC đang hoạt động');
      return;
    }

    // 3. PE Online, PC gặp lỗi hoặc Offline
    if (bedrockOnline) {
      this.renderState('online', 'Bản PE đang hoạt động');
      return;
    }

    // 4. Cả hai kết nối API đều lỗi/timeout -> Unable to retrieve status
    if (javaError && bedrockError) {
      this.renderState('unable', 'Không thể kiểm tra');
      return;
    }

    // 5. Một bên lỗi mạng, một bên phản hồi online: false
    if ((javaError && !bedrockOnline) || (bedrockError && !javaOnline)) {
      this.renderState('unable', 'Đang cập nhật');
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
