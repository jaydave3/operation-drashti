# Operation Drashti 💗 — A Little Website of Smiles

> **"A tiny corner of the internet where you are allowed to smile."**

A personal, mobile-first, static Angular website created by **Jay** for **Drashti** — designed to bring laughter, confidence, comfort, and study motivation during her MD examination journey.

---

## 🌸 Key Features

1. **Security Gate (Access Screen)**:
   - Playful passcode gate requiring:
     - **Passcode**: `1101`
     - **Month/Year**: `11/2001`
   - Show/hide password toggle, inline error messages, and unlock celebration animation.
2. **Personal Happiness Dashboard (Hero)**:
   - Warm welcome greeting, custom creator credit, dynamic motivational rotation, and care package cards.
3. **Emergency Smile Kit 😂**:
   - Prescription nonsense generator with 28 original, friendly jokes in English and natural Hinglish.
   - "Make It Funnier" button and interactive reaction buttons with feedback counters.
4. **MD Exam Motivation & Focus Timer 🩺**:
   - 22 grounded, uplifting motivational quotes tailored for a medical student preparing for MD.
   - Interactive **25-minute Pomodoro study timer** and **5-minute break timer** with pause, resume, and reset.
   - 5-step interactive study flow checklist.
5. **Official Compliment Department 💗**:
   - 22 sincere, genuine reminders of strength, resilience, and worth without romantic pressure or expectations.
   - Save/Copy reminder capability.
6. **Mission: Feel 1% Better 🌈**:
   - Zero-pressure micro-missions (hydration, stretching, 5 slow breaths, comfort song, etc.).
   - Instant celebration confetti and encouraging feedback upon completion.
7. **Jay's Joke Lab — Clinical Trials Pending 🧪**:
   - 18 scientific, developer, and medical student crossover jokes.
   - 1–5 star rating system with playful diagnosis responses depending on the score.
8. **A Small Note From Your Friend 💌**:
   - The original heartfelt letter from Jay in full, styled like vintage stationery.
   - "Send Me Another Silly Note" button to cycle through additional humorous notes.
9. **Responsive Navigation & Polish**:
   - Mobile-first drawer navigation, smooth anchor scrolling with header offset, back-to-top button, and `@media (prefers-reduced-motion)`.

---

## 🚀 Running Locally

```bash
# Navigate to the project directory
cd "C:\Users\Innovura Tech\.gemini\antigravity\scratch\operation-drashti"

# Start the Angular development server
npm start
# or: ng serve
```
Open your browser at `http://localhost:4200`.

---

## 📦 Production Static Build

```bash
npm run build:static
# or: ng build --base-href ./
```

### Build Output Directory:
`dist/operation-drashti/browser/`

Contains:
- `index.html` (SPA entry point)
- `404.html` (GitHub Pages routing fallback)
- `staticwebapp.config.json` (Azure Static Web Apps configuration)
- Bundled CSS & JavaScript files with cache-busting hashes

---

## 🧪 Automated End-to-End Verification

Automated Chromium DevTools Protocol (CDP) test scripts are included:
```bash
# Run full E2E feature verification suite
node test-e2e.js

# Run mobile viewport (375x812) responsiveness test
node test-mobile.js
```

---

## 🌐 Static Deployment Guide

### Option 1: Azure Static Web Apps (Recommended)
1. Deploy the contents of `dist/operation-drashti/browser/`.
2. The included `staticwebapp.config.json` handles SPA routing and security headers automatically.

### Option 2: GitHub Pages
1. Push to a GitHub repository.
2. Deploy the `dist/operation-drashti/browser/` directory to the `gh-pages` branch.
3. The included `404.html` ensures clean routing upon page refreshes.
