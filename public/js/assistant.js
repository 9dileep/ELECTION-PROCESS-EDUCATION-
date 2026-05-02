"use strict";
// ===== STATE =====
let isRecording = false, recognition = null, lastBotMsg = '', speechSynthesis = window.speechSynthesis;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Suggestions
  const sg = document.getElementById('suggestions');
  SUGGESTIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = s;
    btn.onclick = () => { document.getElementById('chat-input').value = s; sendChat(); };
    sg.appendChild(btn);
  });

  // Handle ?q= param from other pages
  const urlQ = new URLSearchParams(location.search).get('q');
  if (urlQ) { document.getElementById('chat-input').value = urlQ; setTimeout(sendChat, 500); }

  // API notice – hidden since key is managed server-side
  document.getElementById('api-notice').style.display = 'none';

  // Enter key
  document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

  // Gemini toggle on by default (server handles the key)
  document.getElementById('gemini-toggle').checked = true;
});

// ===== SEND CHAT =====
async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  
  // Sanitize user input before displaying
  const sanitizedText = escapeHTML(text);
  appendMsg(sanitizedText, 'user');
  
  const typId = appendTyping();
  const useGemini = document.getElementById('gemini-toggle').checked;
  let reply;
  
  if (useGemini) {
    reply = await callGemini(text);
  } else {
    reply = getLocalAnswer(text);
  }
  
  const lang = document.getElementById('resp-lang').value;
  if (lang) {
    reply = await translateText(reply, lang);
  }
  
  removeEl(typId);
  
  // Sanitize bot reply, then apply formatting safely
  const sanitizedReply = escapeHTML(reply);
  const formatted = sanitizedReply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
  
  lastBotMsg = reply;
  appendMsg(formatted, 'bot');
  if (document.getElementById('tts-toggle').checked) speakText(reply);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ===== GEMINI API (via secure server proxy) =====
async function callGemini(question) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return data.reply || 'No response content.';
    }

    // If server returns error, fall back to local KB
    console.warn('API chat error:', res.status);
  } catch (e) {
    console.warn('Network error calling /api/chat:', e.message);
  }

  showToast('AI request failed. Using local knowledge.', 'error');
  return getLocalAnswer(question);
}

// ===== LOCAL KB =====
function getLocalAnswer(q) {
  const lower = q.toLowerCase();
  for (const [key, val] of Object.entries(KB)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  return KB.default;
}

// ===== TRANSLATE =====
async function translateText(text, lang) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch { return text; }
}

// ===== VOICE INPUT (STT) =====
function toggleVoice() {
  const btn = document.getElementById('mic-btn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast('Speech recognition not supported in this browser', 'error'); return; }
  if (isRecording) {
    recognition.stop(); isRecording = false;
    btn.textContent = '🎤 Voice'; btn.classList.remove('recording');
    return;
  }
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.onstart = () => { isRecording = true; btn.textContent = '⏹ Stop'; btn.classList.add('recording'); showToast('🎤 Listening...', 'info', 10000); };
  recognition.onresult = e => {
    const transcript = e.results[0][0].transcript;
    document.getElementById('chat-input').value = transcript;
    showToast(`Heard: "${transcript}"`, 'success');
    sendChat();
  };
  recognition.onend = () => { isRecording = false; btn.textContent = '🎤 Voice'; btn.classList.remove('recording'); };
  recognition.onerror = e => { showToast('Voice error: ' + e.error, 'error'); isRecording = false; btn.textContent = '🎤 Voice'; btn.classList.remove('recording'); };
  recognition.start();
}

// ===== TEXT TO SPEECH =====
function speakText(text) {
  if (!speechSynthesis) return;
  speechSynthesis.cancel();
  const clean = text.replace(/<[^>]+>/g, '').replace(/\*\*(.*?)\*\*/g, '$1');
  const utt = new SpeechSynthesisUtterance(clean);
  utt.lang = 'en-US'; utt.rate = 0.95; utt.pitch = 1;
  speechSynthesis.speak(utt);
}

function speakLast() {
  if (!lastBotMsg) { showToast('No response to read yet', 'info'); return; }
  speakText(lastBotMsg);
  showToast('🔊 Reading response...', 'info');
}

// ===== CHAT UI HELPERS =====
function appendMsg(html, type) {
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = `chat-msg${type === 'user' ? ' user' : ''}`;
  div.id = type === 'typing' ? html : '';
  div.innerHTML = `<div class="msg-av">${type === 'user' ? '👤' : '🤖'}</div><div class="msg-bub">${html}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendTyping() {
  const id = 'typing-' + Date.now();
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'chat-msg'; div.id = id;
  div.innerHTML = `<div class="msg-av">🤖</div><div class="msg-bub"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeEl(id) { const el = document.getElementById(id); if (el) el.remove(); }
function removeTyping(id) { removeEl(id); }
function clearChat() {
  document.getElementById('chat-msgs').innerHTML = `<div class="chat-msg"><div class="msg-av">🤖</div><div class="msg-bub">Chat cleared. Ask me anything about elections!</div></div>`;
  lastBotMsg = '';
}
