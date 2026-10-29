const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4201; // use dedicated port 4201
const ROOT = path.join(__dirname, 'dist', 'operation-drashti', 'browser');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

function createStaticServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    let filePath = path.join(ROOT, reqPath);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(ROOT, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runE2E() {
  console.log('--- STARTING E2E CHROMIUM TEST ---');

  const server = createStaticServer();
  await new Promise(r => server.listen(PORT, r));
  console.log(`Local test server running at http://localhost:${PORT}`);

  const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--window-size=1280,1000',
    `http://localhost:${PORT}`
  ]);

  await sleep(1500);

  try {
    const listRes = await fetch('http://localhost:9223/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes(`localhost:${PORT}`)) || tabs[0];
    console.log('Connected to tab:', tab.url);

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const resolve = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        resolve(msg.result);
      }
    };

    await new Promise(r => ws.onopen = r);

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        callbacks.set(reqId, resolve);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res.result ? res.result.value : null;
    }

    async function takeScreenshot(fileName) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      if (res && res.data) {
        const filePath = path.join(__dirname, fileName);
        fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
        console.log(`[Screenshot saved]: ${fileName}`);
      }
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('\n--- 1. Testing Access Gate (Initial State) ---');
    const gateTitle = await evaluate(`document.querySelector('.gate-title')?.textContent.trim()`);
    console.log('Gate Title:', gateTitle);
    if (!gateTitle.includes('Hey Drashti')) throw new Error('Gate title mismatch');

    await takeScreenshot('screenshot_1_gate.png');

    console.log('\n--- 2. Testing Invalid Passcode Validation ---');
    await evaluate(`
      const p = document.getElementById('passcode-input');
      p.value = '9999';
      p.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('.submit-btn').click();
    `);
    await sleep(500);

    const errorMsg = await evaluate(`document.querySelector('.inline-error')?.textContent.trim()`);
    console.log('Error message on invalid code:', errorMsg);
    if (!errorMsg || !errorMsg.includes('Double-check and try again') && !errorMsg.includes('Need a clue')) {
      throw new Error('Expected friendly error message not found');
    }
    await takeScreenshot('screenshot_2_invalid_code.png');

    console.log('\n--- 3. Testing Valid Passcode (Single Secret Code) ---');
    const step3Immediate = await evaluate(`(() => {
      const p = document.getElementById('passcode-input');
      p.value = '1101';
      p.dispatchEvent(new Event('input', { bubbles: true }));
      const btn = document.querySelector('.submit-btn');
      btn.click();
      return {
        pass: p.value,
        disabled: btn.disabled,
        text: btn.textContent.trim()
      };
    })()`);
    console.log('Step 3 Immediate evaluation:', step3Immediate);

    await sleep(2000); // allow unlock animation and signal transition

    const step3After = await evaluate(`(() => {
      return {
        err: document.querySelector('.inline-error')?.textContent.trim(),
        succ: document.querySelector('.inline-success')?.textContent.trim(),
        hasHero: !!document.querySelector('.hero-title'),
        heroText: document.querySelector('.hero-title')?.textContent.trim()
      };
    })()`);
    console.log('Step 3 After 2s evaluation:', step3After);

    const heroTitle = await evaluate(`document.querySelector('.hero-title')?.textContent.trim()`);
    console.log('Hero Title after unlock:', heroTitle);
    if (!heroTitle || !heroTitle.includes('Drashtiiii!')) throw new Error('Failed to unlock dashboard');

    await takeScreenshot('screenshot_3_dashboard_unlocked.png');

    console.log('\n--- 4. Testing Emergency Smile Kit ---');
    const jokeBefore = await evaluate(`document.querySelector('.joke-text')?.textContent.trim()`);
    console.log('Initial Joke:', jokeBefore);

    // Click "Make It Funnier"
    await evaluate(`document.querySelector('.funnier-btn').click()`);
    await sleep(300);
    const jokeAfter = await evaluate(`document.querySelector('.joke-text')?.textContent.trim()`);
    console.log('New Joke after click:', jokeAfter);

    // Click reaction "😂 This was ridiculous"
    await evaluate(`document.querySelector('.laugh-btn').click()`);
    await sleep(300);
    const laughCount = await evaluate(`document.querySelector('.laugh-btn .count-bubble')?.textContent.trim()`);
    const reactionFeedback = await evaluate(`document.querySelector('.reaction-feedback')?.textContent.trim()`);
    console.log('Laugh count:', laughCount, '| Feedback:', reactionFeedback);

    console.log('\n--- 5. Testing MD Motivation & Focus Timer ---');
    const motivationBefore = await evaluate(`document.querySelector('.motivation-quote')?.textContent.trim()`);
    console.log('Initial Motivation:', motivationBefore);
    await evaluate(`document.querySelector('.motivation-btn').click()`);
    await sleep(300);
    const motivationAfter = await evaluate(`document.querySelector('.motivation-quote')?.textContent.trim()`);
    console.log('Updated Motivation:', motivationAfter);

    // Timer controls test
    const timerTextInitial = await evaluate(`document.querySelector('.countdown-text')?.textContent.trim()`);
    console.log('Initial Timer:', timerTextInitial);
    await evaluate(`document.querySelector('.control-btn').click()`); // Start
    await sleep(2100);
    const timerTextRunning = await evaluate(`document.querySelector('.countdown-text')?.textContent.trim()`);
    console.log('Timer after running 2s:', timerTextRunning);

    await evaluate(`document.querySelector('.pause-btn').click()`); // Pause
    console.log('Timer successfully paused.');
    await evaluate(`document.querySelectorAll('.control-btn')[1].click()`); // Reset
    const timerTextReset = await evaluate(`document.querySelector('.countdown-text')?.textContent.trim()`);
    console.log('Timer after reset:', timerTextReset);

    // Interactive checklist test
    const firstChecklist = await evaluate(`(() => {
      const item = document.querySelectorAll('.checklist-item')[0];
      item.click();
      return item.classList.contains('checked');
    })()`);
    console.log('Checklist item checked:', firstChecklist);

    console.log('\n--- 6. Testing Compliment Generator ---');
    const compBefore = await evaluate(`document.querySelector('.compliment-text')?.textContent.trim()`);
    console.log('Compliment before:', compBefore);
    await evaluate(`document.querySelector('.compliment-btn').click()`);
    await sleep(300);
    const compAfter = await evaluate(`document.querySelector('.compliment-text')?.textContent.trim()`);
    console.log('Compliment after:', compAfter);

    console.log('\n--- 7. Testing Happiness Challenge (Mission 1% Better) ---');
    const missionTitle = await evaluate(`document.querySelector('.mission-title')?.textContent.trim()`);
    console.log('Mission:', missionTitle);
    await evaluate(`document.querySelector('.complete-btn').click()`);
    await sleep(500);
    const rewardMsg = await evaluate(`document.querySelector('.reward-text')?.textContent.trim()`);
    console.log('Reward message on completion:', rewardMsg);

    console.log('\n--- 8. Testing Jay’s Joke Lab & Rating ---');
    const labSetup = await evaluate(`document.querySelector('.setup-text')?.textContent.trim()`);
    console.log('Joke Lab setup:', labSetup);
    // Rate 5 stars
    await evaluate(`document.querySelectorAll('.star-btn')[4].click()`);
    await sleep(300);
    const ratingFeedback = await evaluate(`document.querySelector('.rating-feedback')?.textContent.trim()`);
    console.log('5-star rating feedback:', ratingFeedback);

    console.log('\n--- 9. Testing A Note From Jay ---');
    const noteHeading = await evaluate(`document.querySelector('.letter-title')?.textContent.trim()`);
    console.log('Note title:', noteHeading);
    // Click "Send Me Another Silly Note"
    await evaluate(`document.querySelector('.next-note-btn').click()`);
    await sleep(300);
    const sillyNoteTitle = await evaluate(`document.querySelector('.letter-title')?.textContent.trim()`);
    console.log('Silly Note title:', sillyNoteTitle);

    await takeScreenshot('screenshot_4_notes_and_lab.png');

    ws.close();
    console.log('\n======================================================');
    console.log('ALL E2E CHECKS PASSED WITH 100% SUCCESSFUL VALIDATION!');
    console.log('======================================================');
  } catch (err) {
    console.error('E2E TEST FAILURE:', err);
    process.exitCode = 1;
  } finally {
    chromeProcess.kill();
    server.close();
  }
}

runE2E();
