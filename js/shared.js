// ===== PARTICLES =====
function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  const colors = ['#6366f1','#8b5cf6','#ec4899','#3b82f6'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 6 + 3;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;`;
    c.appendChild(p);
  }
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!navbar) return;
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
  if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks && navLinks.classList.remove('open')));
  // Mark active page
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    const href = l.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) l.classList.add('active');
    else l.classList.remove('active');
  });
}

// ===== TOAST =====
function showToast(msg, type = 'info', duration = 3000) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), duration);
}

// ===== FIREBASE =====
let firebaseApp = null, db = null, auth = null, currentUser = null;

function initFirebase() {
  if (typeof firebase === 'undefined' || !CONFIG.FIREBASE.apiKey || CONFIG.FIREBASE.apiKey === 'YOUR_FIREBASE_API_KEY') return;
  try {
    firebaseApp = firebase.initializeApp(CONFIG.FIREBASE);
    auth = firebase.auth();
    db = firebase.firestore();
    auth.onAuthStateChanged(user => {
      currentUser = user;
      updateAuthUI(user);
    });
  } catch (e) { console.warn('Firebase init failed:', e.message); }
}

function updateAuthUI(user) {
  const authArea = document.getElementById('auth-area');
  if (!authArea) return;
  if (user) {
    authArea.innerHTML = `
      <div class="user-info">
        <img src="${user.photoURL || ''}" class="user-avatar" alt="${user.displayName}" onerror="this.style.display='none'"/>
        <span style="font-size:.85rem">${user.displayName || user.email}</span>
        <button class="sign-out-btn" onclick="signOut()">Sign out</button>
      </div>`;
  } else {
    authArea.innerHTML = `<button class="google-btn" onclick="signInWithGoogle()">
      <svg class="google-icon" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
      Sign in with Google
    </button>`;
  }
}

function signInWithGoogle() {
  if (!auth) { showToast('Firebase not configured. Add your API keys in js/config.js', 'error', 4000); return; }
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(e => showToast('Sign-in failed: ' + e.message, 'error'));
}

function signOut() {
  if (auth) auth.signOut().then(() => showToast('Signed out', 'info'));
}

// ===== GOOGLE CALENDAR =====
function addToCalendar(title, date, details) {
  const start = date + 'T090000';
  const end = date + 'T180000';
  const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&sf=true`;
  window.open(url, '_blank');
  showToast('Opening Google Calendar...', 'success');
}

// ===== SCROLL REVEAL =====
function initScrollReveal(selector = '.tl-item') {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll(selector).forEach(el => obs.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initFirebase();
});
