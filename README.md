# 🗳️ ElectED – Election Process Education

ElectED is a premium, interactive web application designed to empower citizens with knowledge about the U.S. democratic process. Built with a focus on accessibility and zero-cost operation, it leverages the full power of the Google ecosystem.

![ElectED Preview](https://via.placeholder.com/1200x600/6366f1/ffffff?text=ElectED+Election+Education+App)

## 🌟 Key Features

- **📅 Interactive Timeline:** 11 phases of the election process, from candidate announcements to inauguration, with integrated **Google Calendar** reminders.
- **🗺️ Polling Place Finder:** A 100% free **Google Maps** integration that helps voters find their local stations (no API key required).
- **🤖 AI Election Assistant:** Powered by **Google Gemini 1.5 Flash**. Ask any election-related question via text or voice.
- **🧠 Knowledge Quiz:** Test your understanding with a 10-question quiz. Features **Google Sign-in** and cloud-synced scores.
- **📖 Multilingual Glossary:** 22+ key terms with instant **Google Translate** support for 10+ languages.
- **🎤 Voice Interaction:** Fully accessible via the **Web Speech API** for voice commands and audio responses.

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3 (Glassmorphic Design), Vanilla JavaScript.
- **Backend:** Node.js, Express.js (Secure Proxy for AI).
- **Database/Auth:** Firebase (Authentication & Firestore).
- **AI/APIs:** Google Gemini API, Google Maps Embed, Google Calendar Intent, Google Translate, Web Speech API.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "Election Process Education"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   GEMINI_API_KEY=your_key_here
   PORT=8080
   ```

4. **Update Firebase Config:**
   Open `js/config.js` and add your Firebase project keys from the Firebase Console.

5. **Start the server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:8080`.

## 🌐 Deployment

This project is optimized for deployment on platforms like **Heroku**, **Render**, or **Vercel**.

1. **Environment Variables:** In your hosting dashboard, add the `GEMINI_API_KEY` to the **Environment Variables** (or Config Vars) section.
2. **Build Tool:** The platform will automatically detect the `package.json` and run `npm install` followed by `npm start`.
3. **Security:** By using the Node.js backend proxy, your Gemini API key remains hidden from the public.

## ⚖️ License
This project is for educational purposes only. © 2026 ElectED.
