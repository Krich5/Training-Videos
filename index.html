<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Training Portal</title>
  <meta name="color-scheme" content="dark">
  <style>
    :root{ --bg:#0b1020; --card:#131a2a; --muted:#92a0b8; --fg:#e9edf5; --accentA:#22d3ee; --accentB:#3b82f6; --input:#0e1525; --border:rgba(255,255,255,.08); }
    *,*::before,*::after{box-sizing:border-box}
    body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,"Noto Sans"; background:var(--bg); color:var(--fg);}
    header{padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.06)}
    .wrap{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
    .left{justify-self:start}
    .center{justify-self:center;text-align:center}
    .right{justify-self:end}
    .brand{font-weight:800;letter-spacing:.2px;font-size:1.1rem}
    .logo{height:36px}
    .btnLink{background:#0e1525;color:var(--fg);border:1px solid var(--border); font-weight:800;padding:8px 14px;border-radius:12px;text-decoration:none}
    main{max-width:820px;margin:28px auto;padding:0 16px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:22px;box-shadow:0 10px 30px rgba(0,0,0,.25);}
    h1{margin:0 0 .35rem;font-size:1.6rem;text-align:center}
    .lead{color:var(--muted);margin:0 0 1rem;text-align:center}
    label{display:block;font-size:13px;color:var(--muted);margin:8px 0 6px}
    input{width:100%;border-radius:12px;border:1px solid var(--border);background:var(--input); color:var(--fg);padding:10px 12px;outline:none;font-size:14px}
    input:focus{box-shadow:0 0 0 3px rgba(59,130,246,.25)}
    .btn{background:linear-gradient(135deg,var(--accentA),var(--accentB));border:none;color:#06111d; font-weight:800;padding:10px 18px;border-radius:12px;cursor:pointer;margin-top:12px;width:120px}
    .btn:active{transform:translateY(1px)}
    .error{color:#f87171;font-weight:700;margin-top:.75rem;text-align:center;min-height:1.2em}
    footer{color:#93a3ba;text-align:center;font-size:.85rem;padding:18px}
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="left"><a class="btnLink" href="admin.html">Admin</a></div>
      <div class="center"><div class="brand" id="brand">Training Portal</div></div>
      <div class="right"><img src="CX%20Advanced%20Solutions_Smaller_white.png" alt="CX Advanced Solutions" class="logo" /></div>
    </div>
  </header>

  <main>
    <section class="card">
      <h1 id="headline">CXAS Training Portal</h1>
      <p class="lead">Enter your name and your 10-character access code.</p>

      <form id="gateForm" novalidate>
        <label for="name">Your name</label>
        <input id="name" name="name" type="text" placeholder="Jane Doe" required />
        <label for="code">Access code</label>
        <input id="code" name="code" inputmode="text" autocapitalize="characters" placeholder="XXXXXXXXXX" required />
        <div style="display:flex;justify-content:center"><button class="btn" type="submit">Enter</button></div>
        <p id="error" class="error" role="alert" aria-live="polite"></p>
      </form>
    </section>
  </main>

  <footer>© <span id="yr"></span> Training</footer>

  <script src="config.js?v=v1"></script>
  <script>
  const { SCRIPT_URL, BRAND } = window.APP_CONFIG || {};
  document.getElementById("yr").textContent=new Date().getFullYear();
  if (BRAND) {
    document.getElementById('brand').textContent = BRAND;
    document.getElementById('headline').textContent = BRAND;
  }
  const errorEl = document.getElementById("error");

  document.getElementById("gateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const code = document.getElementById("code").value.trim().toUpperCase();
    errorEl.textContent = "";
    if (!name || !code){ errorEl.textContent = "Please fill out both fields."; return; }

    try{
      // No headers -> no preflight (more reliable on mobile)
      const res = await fetch(SCRIPT_URL, { method:"POST", body: JSON.stringify({ mode:"validate", code }) });
      const raw = await res.text(); let data; try { data = JSON.parse(raw); } catch { data = null; }
      if (!res.ok || !data) { errorEl.textContent = raw || "Server error. Try again."; return; }
      if (!data.ok)         { errorEl.textContent = data.error || "Invalid or inactive code."; return; }

      const course  = data.course;
      const company = data.company || "";
      sessionStorage.setItem('tp_user', JSON.stringify({ name, course, company }));

      // background sign-in log
      fetch(SCRIPT_URL, { method:"POST", body: JSON.stringify({
        type:"signin", name, course, company,
        ts_client: new Date().toISOString(),
        ua:navigator.userAgent, page:"index"
      }) }).catch(()=>{});

      location.href = "videos.html";
    }catch{
      errorEl.textContent = "Network error. Please try again.";
    }
  });
  </script>
</body>
</html>
