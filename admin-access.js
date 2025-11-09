(function () {
  if (window.__adminAccessLoaded) return;
  window.__adminAccessLoaded = true;

  function ready(fn){
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    const cfg = (window.APP_CONFIG || {});
    const adminPass = cfg.ADMIN_PASS || "";

    if (!document.body) return;

    const styleId = "admin-access-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .adminFab{
          position:fixed;
          bottom:28px;
          right:28px;
          z-index:998;
          border:none;
          border-radius:999px;
          padding:14px 22px;
          font-weight:700;
          font-size:.95rem;
          color:#051021;
          background:linear-gradient(135deg,#22d3ee,#3b82f6);
          box-shadow:0 20px 45px rgba(15,30,45,.55);
          cursor:pointer;
          transition:transform .2s ease, box-shadow .2s ease;
        }
        .adminFab:active{transform:translateY(2px);}
        .adminFab:focus-visible{outline:3px solid rgba(255,255,255,.7); outline-offset:3px;}
        .adminPopover{
          position:fixed;
          bottom:115px;
          right:28px;
          width:280px;
          background:rgba(10,18,35,.92);
          border:1px solid rgba(255,255,255,.16);
          border-radius:20px;
          padding:18px;
          box-shadow:0 25px 70px rgba(0,0,0,.55);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          opacity:0;
          pointer-events:none;
          transform:translateY(10px) scale(.97);
          transition:opacity .25s ease, transform .25s ease;
          z-index:999;
        }
        .adminPopover.open{
          opacity:1;
          pointer-events:auto;
          transform:translateY(0) scale(1);
        }
        .adminPopover h3{
          margin:0 0 8px;
          font-size:1rem;
        }
        .adminPopover form{display:flex;flex-direction:column;gap:10px;}
        .adminPopover input{
          border-radius:12px;
          border:1px solid rgba(255,255,255,.2);
          background:rgba(5,10,20,.7);
          color:#e9edf5;
          padding:10px 12px;
        }
        .adminPopover button[type="submit"]{
          border:none;
          border-radius:12px;
          padding:10px 12px;
          font-weight:700;
          background:linear-gradient(135deg,#22d3ee,#3b82f6);
          color:#051021;
          cursor:pointer;
        }
        .adminPopover__error{min-height:18px;color:#f87171;font-weight:600;font-size:.85rem;text-align:center;}
        .adminPopover__close{
          position:absolute;
          top:10px;
          right:10px;
          background:transparent;
          border:none;
          color:#94a3b8;
          cursor:pointer;
          font-size:1.1rem;
        }
      `;
      document.head.appendChild(style);
    }

    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "adminFab";
    fab.setAttribute("aria-haspopup", "dialog");
    fab.setAttribute("aria-expanded", "false");
    fab.textContent = "Admin";

    const popover = document.createElement("div");
    popover.className = "adminPopover";
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-modal", "false");
    popover.innerHTML = `
      <button class="adminPopover__close" type="button" aria-label="Close">×</button>
      <h3>Admin access</h3>
      <form id="adminPopoverForm">
        <input type="password" id="adminPopoverPass" placeholder="Password" autocomplete="off" spellcheck="false" />
        <div class="adminPopover__error" id="adminPopoverError"></div>
        <button type="submit">Open Admin</button>
      </form>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(popover);

    const form = popover.querySelector("#adminPopoverForm");
    const passInput = popover.querySelector("#adminPopoverPass");
    const errorEl = popover.querySelector("#adminPopoverError");
    const closeBtn = popover.querySelector(".adminPopover__close");

    function openPopover(){
      popover.classList.add("open");
      fab.setAttribute("aria-expanded", "true");
      setTimeout(()=>passInput.focus(), 50);
      document.addEventListener("keydown", handleKey);
    }
    function closePopover(){
      popover.classList.remove("open");
      fab.setAttribute("aria-expanded", "false");
      errorEl.textContent = "";
      passInput.value = "";
      document.removeEventListener("keydown", handleKey);
    }
    function togglePopover(){
      if (popover.classList.contains("open")) closePopover();
      else openPopover();
    }
    function handleClickOutside(event){
      if (event.target === fab || popover.contains(event.target)) return;
      closePopover();
    }
    function handleKey(event){
      if (event.key === "Escape") closePopover();
    }
    fab.addEventListener("click", togglePopover);
    closeBtn.addEventListener("click", closePopover);
    document.addEventListener("click", handleClickOutside);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = passInput.value.trim();
      if (!value){
        errorEl.textContent = "Enter admin password.";
        return;
      }
      if (adminPass && value !== adminPass){
        errorEl.textContent = "Incorrect password.";
        return;
      }
      errorEl.textContent = "";
      sessionStorage.setItem("tp_admin", "true");
      form.querySelector("button[type=submit]").textContent = "Opening…";
      window.location.href = "admin.html";
    });
  });
})();
