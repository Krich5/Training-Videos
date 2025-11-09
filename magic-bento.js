(function () {
  if (window.__magicBentoLoaded) return;
  window.__magicBentoLoaded = true;

  const styleId = "magic-bento-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      [data-magic-bento]{
        position:relative;
        overflow:hidden;
        isolation:isolate;
        border-radius:inherit;
        --mb-opacity:0;
        --mb-x:50%;
        --mb-y:50%;
      }
      [data-magic-bento]::before,
      [data-magic-bento]::after{
        content:"";
        position:absolute;
        inset:-1px;
        pointer-events:none;
        transition:opacity .3s ease;
        opacity:var(--mb-opacity,0);
        z-index:0;
      }
      [data-magic-bento]::before{
        background:radial-gradient(circle at var(--mb-x,50%) var(--mb-y,50%),
          rgba(34,211,238,.35),
          rgba(59,130,246,.18) 30%,
          rgba(8,145,178,.08) 55%,
          transparent 75%);
      }
      [data-magic-bento]::after{
        background:conic-gradient(from 0deg at var(--mb-x,50%) var(--mb-y,50%),
          rgba(59,130,246,.35),
          rgba(168,85,247,.25),
          rgba(248,113,113,.25),
          rgba(59,130,246,.35));
        mix-blend-mode:screen;
        filter:blur(30px);
      }
      [data-magic-bento] > *{
        position:relative;
        z-index:1;
      }
      @media (prefers-reduced-motion:reduce){
        [data-magic-bento]::before,
        [data-magic-bento]::after{
          transition:none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initMagicBento(el) {
    if (el.dataset.magicBentoInit === "1") return;
    el.dataset.magicBentoInit = "1";

    function setOpacity(value) {
      el.style.setProperty("--mb-opacity", value);
    }

    function updatePos(event) {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mb-x", `${x}%`);
      el.style.setProperty("--mb-y", `${y}%`);
    }

    el.addEventListener("pointerenter", (event) => {
      updatePos(event);
      setOpacity("1");
    });
    el.addEventListener("pointerleave", () => setOpacity("0"));
    el.addEventListener("pointermove", updatePos);
    el.addEventListener("touchstart", (event) => {
      if (event.touches[0]) {
        updatePos(event.touches[0]);
        setOpacity("1");
      }
    }, { passive: true });
    el.addEventListener("touchend", () => setOpacity("0"));
    el.addEventListener("touchcancel", () => setOpacity("0"));
  }

  function initAll() {
    document.querySelectorAll("[data-magic-bento]").forEach(initMagicBento);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  const observer = new MutationObserver(initAll);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
