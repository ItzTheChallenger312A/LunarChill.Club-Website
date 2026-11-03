/**
 * LunarChill Configuration Module (config.js)
 * Nguồn dữ liệu kết nối tập trung duy nhất (Single Source of Truth)
 */
const SERVER_HOST = 'LunarChill.club';
const SERVER_PORT_JAVA = 25572;
const SERVER_PORT_BEDROCK = 19143;

export const CONFIG = Object.freeze({
  // 1. Server Connection Specs
  SERVER_HOST,
  SERVER_IP_JAVA: SERVER_HOST,
  SERVER_PORT_JAVA,
  SERVER_ADDRESS_JAVA: `${SERVER_HOST}:${SERVER_PORT_JAVA}`,

  SERVER_IP_BEDROCK: SERVER_HOST,
  SERVER_PORT_BEDROCK,
  SERVER_ADDRESS_BEDROCK: `${SERVER_HOST}:${SERVER_PORT_BEDROCK}`,

  // 2. Supported Versions
  VERSION_PC: '1.21.11 – 26.3',
  VERSION_PE: '26.30 – 26.51',

  // 3. External Ecosystem URLs
  DISCORD_INVITE_URL: 'https://discord.gg/lunarchill',

  // 4. mcstatus.io API Endpoints
  API_STATUS_JAVA: `https://api.mcstatus.io/v2/status/java/${SERVER_HOST}:${SERVER_PORT_JAVA}`,
  API_STATUS_BEDROCK: `https://api.mcstatus.io/v2/status/bedrock/${SERVER_HOST}:${SERVER_PORT_BEDROCK}`,
  API_TIMEOUT_MS: 5000,

  // 5. Session Storage Cache Keys (Dynamic Cache per AC-01.2)
  CACHE_KEY_JAVA: 'lunarchill_status_java_v2',
  CACHE_KEY_BEDROCK: 'lunarchill_status_bedrock_v2',

  // 6. Declarative Copy Targets (Dùng cho thuộc tính data-copy-target trên HTML)
  COPY_TARGETS: Object.freeze({
    java: `${SERVER_HOST}:${SERVER_PORT_JAVA}`,
    bedrock: SERVER_HOST,
    host: SERVER_HOST,
    'bedrock-port': String(SERVER_PORT_BEDROCK)
  }),

  // 7. Maintenance Override Flag (Chỉ bật chủ động khi BQT bảo trì)
  FORCE_MAINTENANCE: false
});
