# 🗳️ ElectED — Interactive Election Education Platform

> **Production-ready, enterprise-grade, AI-powered civic education web application**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5--flash-blue?logo=google)](https://aistudio.google.com)
[![Cloud Run](https://img.shields.io/badge/Cloud%20Run-Deployed-orange?logo=google-cloud)](https://cloud.google.com/run)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 📌 Problem Statement

Many first-time and returning voters lack access to clear, interactive, and trustworthy information about how elections work. **ElectED** solves this by providing a free, fully interactive education platform covering every stage of the U.S. election process — from voter registration to inauguration — powered by Google AI and cloud infrastructure.

---

## ✨ Features

| Feature | Description | Google Technology |
|---|---|---|
| 🤖 **AI Assistant** | Real-time Q&A on any election topic | Gemini 2.5 Flash API |
| 📅 **Election Timeline** | 11 interactive phases from announcement to inauguration | Google Calendar integration |
| 👣 **How to Participate** | Step-by-step guides for voters, candidates, and officials | — |
| 🗺️ **Polling Place Finder** | Find nearby polling places by address or GPS | Google Maps (free embed) |
| 🧠 **Election Quiz** | 10-question knowledge test with history tracking | localStorage |
| 📖 **Glossary** | 22 key election terms with live translation | Google Translate API |
| 🎤 **Voice Input / TTS** | Speak questions and hear answers read aloud | Web Speech API |
| 🌐 **Multilingual** | Translate any response into 8+ languages | Google Translate API |

---

## 🏗️ Architecture

The application follows a clean **MVC-inspired, modular architecture** separating concerns across dedicated layers:

```
elected-app/
├── server.js                     # Entry point: loads env, starts server, graceful shutdown
├── src/
│   ├── app.js                    # Express app: middleware stack, routes, error handling
│   ├── config/
│   │   └── helmetConfig.js       # Strict Content Security Policy (CSP) configuration
│   ├── controllers/
│   │   └── chatController.js     # Business logic: validates input, calls Gemini API
│   ├── middlewares/
│   │   ├── errorHandler.js       # Centralized async error handling
│   │   └── rateLimiter.js        # express-rate-limit: 50 req/15min per IP
│   └── routes/
│       └── api.js                # Route definitions (POST/GET /api/chat)
├── public/                       # Static frontend (HTML/CSS/JS)
│   ├── index.html                # Home page
│   ├── assistant.html            # AI Chat page
│   ├── timeline.html             # Election timeline
│   ├── quiz.html                 # Knowledge quiz
│   ├── glossary.html             # Term glossary
│   ├── steps.html                # Participation guide
│   ├── css/
│   │   ├── fonts.css             # Google Fonts import
│   │   └── shared.css            # Design system: tokens, layout, components
│   └── js/
│       ├── config.js             # Client-side config (Firebase only, NO secrets)
│       ├── data.js               # Static data: quiz, glossary, timeline, steps, KB
│       ├── shared.js             # Shared utilities: navbar, particles, Firebase auth
│       └── assistant.js          # AI chat logic, voice I/O, translation, XSS sanitization
├── __tests__/
│   └── server.test.js            # 13 Jest + Supertest tests (unit + integration + edge cases)
├── .env.example                  # Environment variable template
├── .gitignore                    # Excludes .env, node_modules, config.js
├── .eslintrc.json                # ESLint rules for backend code quality
├── Dockerfile                    # Hardened production Docker image (non-root user)
├── cloudbuild.yaml               # Google Cloud Build CI/CD pipeline
└── package.json                  # Dependencies, scripts, Jest configuration
```

---

## 🔒 Security Implementation

| Layer | Measure | Detail |
|---|---|---|
| **API Key** | Server-side only | Gemini key stored in `.env`, accessed via `/api/chat` proxy |
| **CSP** | Strict policy via Helmet | Allowlists only required Google domains |
| **Rate Limiting** | 50 req / 15 min / IP | Prevents DDoS and AI credit abuse |
| **Input Validation** | Type + length checks | Rejects non-string, empty, or >500-char inputs |
| **XSS Prevention** | `escapeHTML()` utility | All user/AI text sanitized before DOM insertion |
| **Payload Limit** | `50kb` JSON body limit | Prevents oversized payload attacks |
| **Container** | Non-root Docker user | `USER appuser` in Dockerfile |
| **Static Caching** | `ETag` + 1-day maxAge | Cache-control headers in production |

---

## ⚡ Performance Optimizations

- **Gzip Compression** — `compression` middleware reduces all text responses
- **Static Asset Caching** — `maxAge: '1d'` with ETags in production
- **Request Timeout** — `AbortController` kills Gemini requests after 15s
- **Graceful Shutdown** — `SIGTERM`/`SIGINT` handlers drain connections before exit
- **Minimal Docker Image** — Alpine base + `npm ci --omit=dev` = smallest possible image
- **Layer Caching** — `COPY package*.json` before `COPY .` for optimal Docker layer reuse

---

## ♿ Accessibility (WCAG 2.1 AA+)

| WCAG Criterion | Implementation |
|---|---|
| **1.3.1 Info & Relationships** | Semantic HTML5: `<main>`, `<nav>`, `<section>`, `<footer>` |
| **2.1.1 Keyboard** | Full keyboard navigation; `Escape` closes mobile menu |
| **2.4.1 Bypass Blocks** | Skip-to-content link on all pages |
| **2.4.3 Focus Order** | Logical DOM order; focus returned to hamburger on close |
| **4.1.2 Name, Role, Value** | `aria-label`, `aria-expanded`, `aria-current`, `aria-pressed`, `aria-selected` on all interactive elements |
| **Live Regions** | `aria-live="polite"` on chat log, glossary grid, steps panel; `aria-live="assertive"` on quiz feedback |
| **Role Semantics** | `role="log"` (chat), `role="tablist/tab/tabpanel"` (steps), `role="group"` (quiz options), `role="progressbar"` (quiz progress) |
| **Form Labels** | All inputs have explicit `aria-label` and `maxlength` |

---

## 🧪 Testing

**13 tests** across 5 test groups using **Jest** and **Supertest**:

```
✓ GET /api/chat → friendly HTML status page
✓ POST /api/chat → 400 on empty body
✓ POST /api/chat → 400 on empty string
✓ POST /api/chat → 400 on whitespace-only input
✓ POST /api/chat → 400 on non-string type (number)
✓ POST /api/chat → 400 on question >500 chars (abuse prevention)
✓ POST /api/chat → 200 on exactly 500-char question (boundary test)
✓ POST /api/chat → 500 when GEMINI_API_KEY missing
✓ POST /api/chat → 200 with reply on mocked success
✓ POST /api/chat → 200 with fallback when candidates empty
✓ POST /api/chat → 502 on Gemini 403 upstream error
✓ POST /api/chat → 504 on AbortError (timeout simulation)
✓ POST /api/chat → 500 on unexpected network failure
```

```bash
npm test              # Run all tests
npm run test:coverage # Run with coverage report
```

---

## 🌐 Google Services Integration

| Service | Usage | Cost |
|---|---|---|
| **Gemini 2.5 Flash** | AI chat (server-side proxy) | Free tier |
| **Google Maps Embed** | Polling place finder | Free (no API key) |
| **Google Calendar** | Election reminders deep-link | Free |
| **Google Translate** | In-page response translation | Free (unofficial endpoint) |
| **Firebase Auth** | Optional Google Sign-In | Free tier |
| **Cloud Run** | Serverless deployment | Free tier |
| **Cloud Build** | CI/CD pipeline | Free tier |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18.0.0
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local Development

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd elected-app

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and add: GEMINI_API_KEY=your_key_here

# 4. Start the development server
npm run dev

# 5. Open in browser
open http://localhost:8080
```

### Running Tests

```bash
npm test
```

### Production Build (Docker)

```bash
docker build -t elected-app .
docker run -p 8080:8080 -e GEMINI_API_KEY=your_key elected-app
```

### Deploy to Google Cloud Run

```bash
gcloud builds submit --config cloudbuild.yaml
```

---

## 📋 Pre-Submission Checklist

- [x] `npm test` passes all 13 tests
- [x] `.env` is in `.gitignore` (never committed)
- [x] `config.js` contains **no** API keys (only Firebase public config)
- [x] Gemini API key only exists in `.env` and Cloud Run environment
- [x] CSP headers active (verify in Chrome DevTools → Network → Response Headers)
- [x] Rate limiting active on `/api/chat`
- [x] All interactive elements have ARIA labels
- [x] Skip-to-content link present on all pages
- [x] Docker build succeeds and runs as non-root user
- [x] `README.md` is complete and professional

---

## 📄 License

MIT © 2026 ElectED — Built for educational purposes. Not affiliated with any government agency.
