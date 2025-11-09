(function(){
  if (window.__clickSparkLoaded) return;
  window.__clickSparkLoaded = true;

  const palette = ["#22d3ee","#3b82f6","#38bdf8","#f472b6","#facc15","#a855f7"];
  const styleId = "click-spark-styles";

  function injectStyles(){
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
    .spark,
    .spark-line{
      position:fixed;
      pointer-events:none;
      mix-blend-mode:screen;
      filter:drop-shadow(0 0 6px var(--spark-color,#fff));
      animation-duration:var(--spark-duration,.65s);
      animation-timing-function:cubic-bezier(.2,.7,.3,1);
      animation-fill-mode:forwards;
    }
    .spark{
      --spark-x:0px;
      --spark-y:0px;
      width:12px;
      height:12px;
      border-radius:999px;
      background:radial-gradient(circle,var(--spark-color,#fff) 20%,transparent 70%);
      animation-name:spark-pop,spark-move;
    }
    .spark-line{
      --spark-angle:0deg;
      width:44px;
      height:2px;
      border-radius:999px;
      background:linear-gradient(90deg,var(--spark-color,#fff),transparent);
      transform-origin:left center;
      animation-name:spark-line;
    }
    @keyframes spark-pop{
      0%{opacity:.95;transform:translate(-50%,-50%) scale(.2);}
      100%{opacity:0;transform:translate(-50%,-50%) scale(1.3);}
    }
    @keyframes spark-move{
      0%{transform:translate(-50%,-50%);}
      100%{transform:translate(calc(-50% + var(--spark-x)),calc(-50% + var(--spark-y)));}
    }
    @keyframes spark-line{
      0%{opacity:.9;transform:translate(-50%,-50%) rotate(var(--spark-angle)) scaleX(0);}
      100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--spark-angle)) scaleX(1);}
    }`;
    document.head.appendChild(style);
  }

  function randFrom(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function rand(min, max){ return Math.random() * (max - min) + min; }

  function spawnSpark(x, y){
    const el = document.createElement("span");
    const distance = rand(24, 60);
    const angle = rand(0, Math.PI * 2);
    el.className = "spark";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
    el.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
    el.style.setProperty("--spark-color", randFrom(palette));
    el.style.setProperty("--spark-duration", `${rand(420, 760)}ms`);
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once:true });
  }

  function spawnSparkLine(x, y){
    const el = document.createElement("span");
    el.className = "spark-line";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--spark-color", randFrom(palette));
    el.style.setProperty("--spark-angle", `${rand(0, 360)}deg`);
    el.style.setProperty("--spark-duration", `${rand(360, 680)}ms`);
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once:true });
  }

  function burstAt(x, y){
    for (let i = 0; i < 14; i++) requestAnimationFrame(() => spawnSpark(x, y));
    for (let i = 0; i < 5; i++) requestAnimationFrame(() => spawnSparkLine(x, y));
  }

  function handlePointer(event){
    if (event.button !== 0 || !document.body) return;
    burstAt(event.clientX, event.clientY);
  }

  function handleKey(event){
    if (event.key !== "Enter" && event.key !== " ") return;
    const el = document.activeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function init(){
    injectStyles();
    document.addEventListener("pointerdown", handlePointer, { passive:true });
    document.addEventListener("keyup", handleKey);
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init, { once:true });
  } else {
    init();
  }
})();
