"use strict";
// =============================================
//  ElectED – Client-Side Configuration
//  NOTE: The Gemini API key is managed SERVER-SIDE
//  via environment variables (.env) and accessed
//  through the secure /api/chat proxy endpoint.
//  NEVER put secret keys in client-side code.
// =============================================
const CONFIG = {
    // Gemini is accessed via server proxy — no key needed here.

    // 2. Map uses Google Maps Free Embed (no API key needed!)
    // 3. Google Calendar (FREE – no key needed!)
    // 4. Google Translate (FREE – no key needed!)
    // 5. Web Speech API (FREE – built into browsers!)
    // Optional: Firebase – Get from https://console.firebase.google.com
    FIREBASE: {
        apiKey: "AIzaSyCzqyWuZWFLkiRvqlCZqpoQE28VA_82I4U",
        authDomain: "election-e7597.firebaseapp.com",
        projectId: "election-e7597",
        storageBucket: "election-e7597.firebasestorage.app",
        messagingSenderId: "451653308265",
        appId: "1:451653308265:web:3488f07cc1c28d4e91f7f8"
    }
};
