/**
 * LunarChill Configuration Module (config.js)
 * Nguồn dữ liệu kết nối tập trung (Single Source of Truth)
 */
export const CONFIG = {
  // Server connection info
  SERVER_IP_JAVA: 'LunarChill.club',
  SERVER_PORT_JAVA: 25572,
  SERVER_IP_BEDROCK: 'LunarChill.club',
  SERVER_PORT_BEDROCK: 19143,
  
  // Versions supported
  VERSION_PC: '1.21.11 - 26.3 (Mới nhất)',
  VERSION_PE: '26.30 - 26.51',

  // External URLs
  DISCORD_INVITE_URL: 'https://discord.gg/lunarchill',
  LIVE_MAP_URL: 'https://map.lunarchill.club',
  
  // mcstatus.io API
  API_STATUS_URL: 'https://api.mcstatus.io/v2/status/java/LunarChill.club:25572',
  API_TIMEOUT_MS: 5000,
  CACHE_STORAGE_KEY: 'lunarchill_server_status_v1',
  DEFAULT_CACHE_TTL_MS: 60000, // 60s fallback nếu API không trả expires_at
  
  // Maintenance override flag
  FORCE_MAINTENANCE: false
};
