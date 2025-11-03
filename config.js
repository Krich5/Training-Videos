(function () {
  const VERSION = 'v1';
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBXz7dEnenXJMEYkBFNLBDkZECMd9GAzt-xMKZjuNBe8hYDotEgpe0fvNjiRz5OySU/exec';
  const ADMIN_TOKEN = 'CXASTrainingPortal25';
  const ADMIN_PASS = 'admin';
  const BRAND = 'CXAS Training Portal';
  const TIMEZONE = 'America/New_York';

  window.APP_CONFIG = {
    VERSION,
    SCRIPT_URL,
    ADMIN_TOKEN,
    ADMIN_PASS,
    BRAND,
    TIMEZONE
  };

  if (typeof console !== 'undefined') {
    console.info('APP_CONFIG loaded:', {
      SCRIPT_URL: window.APP_CONFIG.SCRIPT_URL,
      ADMIN_TOKEN: window.APP_CONFIG.ADMIN_TOKEN ? 'set' : 'MISSING',
      ADMIN_PASS: window.APP_CONFIG.ADMIN_PASS ? 'set' : 'MISSING',
      VERSION: window.APP_CONFIG.VERSION
    });
  }
})();
