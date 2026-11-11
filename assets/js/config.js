/**
 * LunarChill Configuration Module (config.js)
 * Nguồn dữ liệu kết nối tập trung duy nhất (Single Source of Truth)
 * 
 * Quy ước phân loại nền tảng:
 * - Bản PC: Bao gồm cả Java Edition và Bedrock (Windows) trên máy tính (Cổng 25572).
 * - Bản PE riêng: Dành cho thiết bị di động / Pocket Edition (Cổng 25572).
 */
const SERVER_HOST = 'LunarChill.club';
const SERVER_PORT_COMMON = 25572;
const SERVER_PORT_JAVA = SERVER_PORT_COMMON;
const SERVER_PORT_BEDROCK = SERVER_PORT_COMMON;
const SERVER_PORT_BEDROCK_FALLBACK = 19143;

export const CONFIG = Object.freeze({
  // 1. Server Connection Specs
  SERVER_HOST,
  SERVER_IP: SERVER_HOST,
  SERVER_PORT: SERVER_PORT_COMMON,
  BEDROCK_PORT: SERVER_PORT_BEDROCK,
  SERVER_IP_JAVA: SERVER_HOST,
  SERVER_PORT_JAVA,
  SERVER_ADDRESS_JAVA: `${SERVER_HOST}:${SERVER_PORT_JAVA}`,

  SERVER_IP_BEDROCK: SERVER_HOST,
  SERVER_PORT_BEDROCK,
  SERVER_ADDRESS_BEDROCK: `${SERVER_HOST}:${SERVER_PORT_BEDROCK}`,
  SERVER_PORT_BEDROCK_FALLBACK,
  SERVER_ADDRESS_COMMON: `${SERVER_HOST}:${SERVER_PORT_COMMON}`,

  // 2. Supported Versions
  VERSION_PC: '1.21.11 đến 26.3', // Bản PC (Java & Bedrock máy tính)
  VERSION_PE: '26.30 đến 26.51',   // Bản PE riêng (Điện thoại)

  // 3. External Ecosystem URLs
  DISCORD_INVITE_URL: 'https://discord.gg/SM9cn8pQQH',

  // 4. mcstatus.io API Endpoints
  API_STATUS_JAVA: `https://api.mcstatus.io/v2/status/java/${SERVER_HOST}:${SERVER_PORT_JAVA}`,
  API_STATUS_BEDROCK: `https://api.mcstatus.io/v2/status/bedrock/${SERVER_HOST}:${SERVER_PORT_BEDROCK}`,
  API_STATUS_BEDROCK_FALLBACK: `https://api.mcstatus.io/v2/status/bedrock/${SERVER_HOST}:${SERVER_PORT_BEDROCK_FALLBACK}`,
  API_TIMEOUT_MS: 5000,

  // 5. Session Storage Cache Keys (Dynamic Cache per AC-01.2)
  CACHE_KEY_JAVA: 'lunarchill_status_java_v2',
  CACHE_KEY_BEDROCK: 'lunarchill_status_bedrock_v2',

  // 6. Declarative Copy Targets (Dùng cho thuộc tính data-copy-target trên HTML)
  COPY_TARGETS: Object.freeze({
    pc: `${SERVER_HOST}:${SERVER_PORT_JAVA}`,
    java: `${SERVER_HOST}:${SERVER_PORT_JAVA}`,
    pe: SERVER_HOST,
    bedrock: SERVER_HOST,
    host: SERVER_HOST,
    common: `${SERVER_HOST}:${SERVER_PORT_COMMON}`,
    'bedrock-full': `${SERVER_HOST}:${SERVER_PORT_BEDROCK}`,
    'pe-port': String(SERVER_PORT_BEDROCK),
    'bedrock-port': String(SERVER_PORT_BEDROCK),
    port: String(SERVER_PORT_COMMON)
  }),

  // 7. Maintenance Override Flag (Chỉ bật chủ động khi BQT bảo trì)
  FORCE_MAINTENANCE: false
});
