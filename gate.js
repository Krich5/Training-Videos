// gate.js
window.gate = (() => {
  async function sha256Hex(str) {
    const enc = new TextEncoder();
    const data = enc.encode(str);
    const buf = await crypto.subtle.digest('SHA-256', data);
    const bytes = Array.from(new Uint8Array(buf));
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function isAuthed() {
    return sessionStorage.getItem('authed') === 'true';
  }

  function requireAuthOrRedirect() {
    if (!isAuthed()) {
      window.location.href = "index.html";
    }
  }

  return { sha256Hex, isAuthed, requireAuthOrRedirect };
})();