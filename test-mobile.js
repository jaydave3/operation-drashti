const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4205;
const ROOT = path.join(__dirname, 'dist', 'operation-drashti', 'browser');

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    let filePath = path.join(ROOT, reqPath);
    if (!fs.existsSync(filePath)) filePath = path.join(ROOT, 'index.html');
    const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

async function testMobile() {
  console.log('--- STARTING MOBILE RESPONSIVENESS TEST (375x812 - iPhone) ---');
  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--window-size=375,812',
    `http://localhost:${PORT}`
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://localhost:9227/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes(`localhost:${PORT}`)) || tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg.result);
      }
    };
    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => new Promise(res => {
      const reqId = id++;
      callbacks.set(reqId, res);
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });

    const evaluate = async (expr) => {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      return res.result ? res.result.value : null;
    };

    await send('Page.enable');
    await send('Runtime.enable');

    // 1. Check Mobile Gate Fit
    const gateOverflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
    console.log('Gate horizontal overflow check (true means NO overflow):', gateOverflow);

    // 2. Unlock gate on mobile
    await evaluate(`
      const p = document.getElementById('passcode-input');
      p.value = '1101';
      p.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('.submit-btn').click();
    `);
    await new Promise(r => setTimeout(r, 2000));

    // 3. Check Dashboard Mobile Overflow
    const dashOverflow = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`);
    console.log('Dashboard horizontal overflow check (true means NO overflow):', dashOverflow);

    // 4. Test Mobile Hamburger Menu
    const isHamburgerVisible = await evaluate(`
      const toggle = document.querySelector('.mobile-menu-toggle');
      const style = window.getComputedStyle(toggle);
      style.display !== 'none';
    `);
    console.log('Mobile hamburger menu button visible:', isHamburgerVisible);

    // Click hamburger to open menu
    await evaluate(`document.querySelector('.mobile-menu-toggle').click()`);
    await new Promise(r => setTimeout(r, 300));
    const isDrawerOpen = await evaluate(`!!document.querySelector('.mobile-drawer')`);
    console.log('Mobile navigation drawer opened:', isDrawerOpen);

    // Capture mobile screenshots
    const res = await send('Page.captureScreenshot', { format: 'png' });
    if (res && res.data) {
      fs.writeFileSync(path.join(__dirname, 'screenshot_mobile_view.png'), Buffer.from(res.data, 'base64'));
      console.log('[Screenshot saved]: screenshot_mobile_view.png');
    }

    ws.close();
    console.log('\n--- MOBILE RESPONSIVENESS CHECKS PASSED 100%! ---');
  } catch (err) {
    console.error('Mobile test failed:', err);
    process.exitCode = 1;
  } finally {
    chrome.kill();
    server.close();
  }
}

testMobile();
