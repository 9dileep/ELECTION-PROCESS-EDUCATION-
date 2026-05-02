// ===== DATA =====
const TIMELINE_DATA = [
  { id:1, icon:'📢', phase:'Pre-Election', filter:'pre', title:'Candidate Announcement', time:'18-24 months before', desc:'Candidates formally announce their intention to run for office.', expand:'Candidates file with the Federal Election Commission (FEC), begin fundraising, and build campaign teams. Early announcements help establish name recognition and donor networks.' },
  { id:2, icon:'🗳️', phase:'Pre-Election', filter:'pre', title:'Primaries & Caucuses', time:'Jan–June of election year', desc:'Voters within each party select their preferred candidate.', expand:'Primaries are state-run elections where voters cast ballots privately. Caucuses are organized party meetings. Each state allocates delegates based on results, which are then awarded at the national convention.' },
  { id:3, icon:'🏛️', phase:'Pre-Election', filter:'pre', title:'National Party Conventions', time:'Summer of election year', desc:'Each major party officially nominates its presidential and vice-presidential candidates.', expand:'Delegates gathered at the convention vote to confirm the primary/caucus winner. The candidate delivers an acceptance speech and the party platform (policy agenda) is finalized.' },
  { id:4, icon:'📝', phase:'Pre-Election', filter:'pre', title:'Voter Registration Deadlines', time:'15-30 days before election', desc:"Citizens must register to vote before their state's deadline.", expand:"Registration requirements vary by state. Some states offer same-day registration. You must be a U.S. citizen, at least 18 years old, and meet your state's residency requirements." },
  { id:5, icon:'💬', phase:'Pre-Election', filter:'pre', title:'Presidential Debates', time:'September–October', desc:'Candidates debate policy positions on national television.', expand:'The Commission on Presidential Debates organizes general election debates. These events allow voters to compare candidates on issues like economy, healthcare, foreign policy, and more.' },
  { id:6, icon:'📮', phase:'Pre-Election', filter:'pre', title:'Early & Absentee Voting', time:'Weeks before Election Day', desc:'Many states allow voting before Election Day in person or by mail.', expand:'Absentee ballots can be requested by mail. Early in-person voting opens polling locations before Election Day. Rules and deadlines differ significantly by state.' },
  { id:7, icon:'🗳️', phase:'Election', filter:'election', title:'Election Day', time:'First Tuesday after Nov 1st', desc:'Voters cast their ballots at polling places across the country.', expand:'Polls typically open at 6 AM and close at 7–8 PM local time. Voters in line when polls close are allowed to vote. Photo ID requirements vary by state. Provisional ballots are available for eligibility questions.' },
  { id:8, icon:'📊', phase:'Post-Election', filter:'post', title:'Votes Are Counted', time:'Election Night & days after', desc:'Results are tallied and reported, though some races take days.', expand:'Election officials count in-person, early, and mail-in ballots. Results reported on Election Night are unofficial. Close races may require days or weeks to finalize as all ballots are processed.' },
  { id:9, icon:'🔢', phase:'Post-Election', filter:'post', title:'Electoral College Meets', time:'December (after election)', desc:'Electors in each state formally cast electoral votes for president.', expand:'The U.S. uses an Electoral College system. Each state has electors equal to its congressional representation. Most states use winner-take-all rules. 270 electoral votes are needed to win the presidency.' },
  { id:10, icon:'✅', phase:'Post-Election', filter:'post', title:'Congress Certifies Results', time:'January 6th', desc:'A joint session of Congress officially counts and certifies the electoral votes.', expand:'The Vice President presides over the joint session. Electoral certificates from all states are opened and counted. Any objections must be filed by both a Senator and a Representative.' },
  { id:11, icon:'🎉', phase:'Post-Election', filter:'post', title:'Inauguration Day', time:'January 20th', desc:'The newly elected President is sworn into office.', expand:'The President-elect takes the oath of office at the U.S. Capitol. The Chief Justice of the Supreme Court administers the oath. The new President immediately assumes executive power and delivers an inaugural address.' },
];

const STEPS_DATA = {
  voter: [
    { step:1, icon:'📋', title:'Check Your Eligibility', desc:'You must be a U.S. citizen, 18+ years old, and a state resident. Some states restore voting rights to ex-felons.', tip:'💡 Tip: Check your state\'s specific requirements at vote.gov' },
    { step:2, icon:'📝', title:'Register to Vote', desc:'Register online, by mail, or in person at your local election office, DMV, or other designated locations.', tip:'💡 Tip: Register at least 30 days before an election — some states allow same-day registration.' },
    { step:3, icon:'🗺️', title:'Find Your Polling Place', desc:'Use your state\'s election website to find your assigned polling place based on your registered address.', tip:'💡 Tip: Polling places can change — always verify before Election Day!' },
    { step:4, icon:'📰', title:'Research the Candidates & Issues', desc:'Review candidate positions, ballot measures, and local races. A sample ballot is often available online beforehand.', tip:'💡 Tip: Non-partisan voter guides are a great resource for unbiased information.' },
    { step:5, icon:'🪪', title:'Bring Required ID', desc:'Many states require photo ID. Know your state\'s requirements in advance to avoid issues at the polls.', tip:'💡 Tip: If you forget ID, you may be able to cast a provisional ballot.' },
    { step:6, icon:'🗳️', title:'Cast Your Vote', desc:'Visit your polling place, check in with poll workers, receive your ballot, mark your choices, and submit it.', tip:'💡 Tip: Take your time — you cannot be rushed out of the voting booth.' },
  ],
  candidate: [
    { step:1, icon:'📜', title:'Determine Eligibility', desc:'Age, citizenship, and residency requirements vary by office. U.S. President requires being natural-born, 35+, and 14-year resident.', tip:'💡 Tip: Local and state offices have different requirements — check your state\'s laws.' },
    { step:2, icon:'🏦', title:'Form a Campaign Committee', desc:'Establish an official campaign committee and open a dedicated bank account for campaign funds.', tip:'💡 Tip: You must report campaign finances to the FEC or state authority.' },
    { step:3, icon:'📋', title:'File for Candidacy', desc:'Complete and submit the required paperwork with your state or local election authority within designated deadlines.', tip:'💡 Tip: Many offices require collecting a minimum number of petition signatures.' },
    { step:4, icon:'💰', title:'Fundraise & Build a Team', desc:'Recruit campaign staff, volunteers, and raise funds to support campaign activities, advertising, and outreach.', tip:'💡 Tip: Federal campaigns have strict contribution limits — follow FEC guidelines carefully.' },
    { step:5, icon:'📣', title:'Campaign & Engage Voters', desc:'Hold events, canvass neighborhoods, run ads, and participate in debates or forums to reach voters.', tip:'💡 Tip: Voter outreach and ground game are often more effective than advertising alone.' },
    { step:6, icon:'🗳️', title:'Get Out the Vote (GOTV)', desc:'Mobilize your supporters to vote through phone banks, text campaigns, ride-sharing to polls, and last-minute outreach.', tip:'💡 Tip: Turnout operations in the final days can be the difference in close elections.' },
  ],
  official: [
    { step:1, icon:'📅', title:'Set Election Calendar', desc:'Election administrators establish key dates: registration deadlines, early voting periods, and Election Day.', tip:'💡 Tip: Deadlines must be publicized well in advance to give voters adequate time.' },
    { step:2, icon:'🏢', title:'Prepare Polling Locations', desc:'Secure ADA-accessible polling locations, hire and train poll workers, and prepare voting equipment.', tip:'💡 Tip: Poll worker shortages are common — recruiting volunteers is an ongoing effort.' },
    { step:3, icon:'✉️', title:'Process Voter Rolls', desc:'Maintain accurate voter registration rolls, process new registrations, address duplicates, and update changes of address.', tip:'💡 Tip: The NVRA (Motor Voter Act) requires states to offer registration at DMVs.' },
    { step:4, icon:'📬', title:'Mail Out Ballots', desc:'For states with vote-by-mail, prepare, mail, and track absentee ballots. Process returned ballots per state law.', tip:'💡 Tip: Signature verification is a common security measure for mail-in ballots.' },
    { step:5, icon:'📊', title:'Count & Canvass Votes', desc:'Tally ballots securely, conduct post-election audits, resolve provisional ballots, and certify results.', tip:'💡 Tip: Many states require a mandatory recount if the margin is within a certain percentage.' },
    { step:6, icon:'📜', title:'Certify & Report Results', desc:'The official canvass certifies the final vote count. Certified results are reported to state and federal authorities.', tip:'💡 Tip: Certification deadlines vary by state and are set by state law.' },
  ]
};

const QUIZ_DATA = [
  { q:'What is the minimum age to vote in U.S. federal elections?', options:['16','17','18','21'], answer:2, explanation:'The 26th Amendment (1971) lowered the voting age from 21 to 18 for all U.S. elections.' },
  { q:'How many electoral votes are needed to win the U.S. presidency?', options:['270','300','218','435'], answer:0, explanation:'There are 538 total electoral votes. A candidate needs a majority — 270 — to win the presidency.' },
  { q:'When is U.S. Election Day held?', options:['First Monday of November','Second Tuesday in October','First Tuesday after the first Monday in November','Last Tuesday of October'], answer:2, explanation:'By federal law since 1845, Election Day falls on the first Tuesday after the first Monday in November.' },
  { q:'What is a "primary election"?', options:['The general election','An election to choose each party\'s candidates','A local school board election','A vote to remove an official from office'], answer:1, explanation:'Primaries are intra-party elections where voters select the candidate who will represent that party in the general election.' },
  { q:'Which federal agency oversees campaign finance?', options:['The IRS','The FCC','The FEC','The FTC'], answer:2, explanation:'The Federal Election Commission (FEC) is the independent agency responsible for enforcing federal campaign finance law.' },
  { q:'What is the Electoral College?', options:['A university for politicians','A group of electors who formally elect the President','The U.S. Senate','A type of primary election'], answer:1, explanation:'The Electoral College is a group of 538 electors who cast official votes for President and Vice President based on each state\'s popular vote results.' },
  { q:'What is a "provisional ballot"?', options:['A ballot cast early','A ballot used when a voter\'s eligibility is uncertain at the polls','An absentee ballot','A ballot for overseas voters'], answer:1, explanation:'A provisional ballot is cast when a voter\'s eligibility cannot be immediately verified. It is held separately and counted after officials confirm the voter\'s eligibility.' },
  { q:'Who certifies the presidential electoral votes in Congress?', options:['The Speaker of the House','The Chief Justice','The Vice President','The Senate Majority Leader'], answer:2, explanation:'Under the Constitution, the Vice President presides over the joint session of Congress that counts and certifies the Electoral College votes.' },
  { q:'What is a "caucus"?', options:['A type of political fundraiser','A government committee meeting','An organized gathering where voters publicly declare support for candidates','A primary held by mail'], answer:2, explanation:'A caucus is a community meeting where registered party members gather to discuss and publicly declare their support for candidates, rather than voting privately.' },
  { q:'On what date does a newly elected U.S. President take office?', options:['November 8','December 15','January 6','January 20'], answer:3, explanation:'The 20th Amendment set Inauguration Day as January 20th following the election. The President is sworn in and officially begins their term on this date.' },
];

const GLOSSARY_DATA = [
  { term:'Absentee Ballot', def:'A ballot cast by a voter who cannot be present at their polling place on Election Day, typically sent by mail.' },
  { term:'Ballot Initiative', def:'A proposed law or constitutional amendment placed on the ballot by citizen petition, allowing voters to directly decide on legislation.' },
  { term:'Canvass', def:'The official post-election process of reviewing and validating all ballots to produce the certified vote count.' },
  { term:'Caucus', def:'A meeting of party members in a local area to select candidates or delegates, distinct from a private primary ballot.' },
  { term:'Delegates', def:'Individuals chosen to represent their state\'s voters at a party\'s national convention to select the presidential nominee.' },
  { term:'Electorate', def:'All eligible voters in a country or region who are qualified to vote in a given election.' },
  { term:'Electoral College', def:'The system of 538 electors who formally elect the U.S. President and Vice President based on state popular vote results.' },
  { term:'FEC', def:'Federal Election Commission — the independent U.S. agency that enforces campaign finance laws and oversees federal elections.' },
  { term:'Gerrymandering', def:'The manipulation of electoral district boundaries to favor a particular party, candidate, or group of voters.' },
  { term:'Incumbent', def:'A current holder of a political office who is seeking re-election to the same position.' },
  { term:'Initiative', def:'A process by which citizens can propose new laws or constitutional amendments directly to voters via ballot measure.' },
  { term:'Precinct', def:'The smallest geographic unit for election administration; voters in a precinct vote at the same polling location.' },
  { term:'Primary Election', def:'An election in which voters choose their party\'s candidate to advance to the general election.' },
  { term:'Provisional Ballot', def:'A ballot cast when a voter\'s eligibility is in question; it is held and verified before being counted.' },
  { term:'Recount', def:'A repeat tabulation of votes in an election, typically triggered when the margin of victory is very small.' },
  { term:'Referendum', def:'A direct vote by the electorate on a specific political question or piece of legislation.' },
  { term:'Runoff Election', def:'A second election held when no candidate receives the required number of votes in the initial election.' },
  { term:'Swing State', def:'A state where both major political parties have a similar level of support, making it key to winning a presidential election.' },
  { term:'Write-In Candidate', def:'A candidate whose name is not printed on the ballot, but who can receive votes by having their name written in by voters.' },
  { term:'Voter Suppression', def:'Strategies used to discourage or prevent specific groups of people from exercising their right to vote.' },
];

const SUGGESTIONS = [
  'How do I register to vote?',
  'What is the Electoral College?',
  'How are votes counted?',
  'What ID do I need to vote?',
  'What happens if there is a tie?',
  'What is an absentee ballot?',
  'How do primaries work?',
  'When is Inauguration Day?',
];

const KB = {
  'register': 'To register to vote: (1) Check eligibility — you must be a U.S. citizen, 18+, and a state resident. (2) Register online at vote.gov, by mail, or in person at your local election office or DMV. (3) Register before your state\'s deadline (usually 15–30 days before election day, though some states allow same-day registration).',
  'electoral college': 'The Electoral College is the system used to elect the U.S. President. Each state gets electors equal to its total Congressional seats (House + Senate). There are 538 total electors. A candidate needs 270 electoral votes to win. Most states use a winner-take-all system, where the candidate who wins the popular vote gets all the state\'s electoral votes.',
  'count': 'Votes are counted by state and local election officials. On Election Night, unofficial results are reported as precincts report in. Mail-in and absentee ballots may take additional days to count. After all ballots are tallied, officials conduct a formal "canvass" to verify results, then certify them officially. Recounts may be requested in close races.',
  'id': 'ID requirements vary by state. About 35 states require some form of ID to vote. Strict photo ID states require a government-issued photo ID (driver\'s license, passport, etc.). Other states accept non-photo IDs, utility bills, or bank statements. If you don\'t have ID or forgot it, you can usually request a provisional ballot. Check your state\'s specific requirements at vote.gov.',
  'tie': 'A presidential tie (269–269 in the Electoral College) would send the election to the House of Representatives, where each state delegation gets one vote. The Vice President would be chosen by the Senate. This has happened historically — in 1800 and 1824. For congressional and state races, tie procedures vary by jurisdiction — some use drawing of lots or runoff elections.',
  'absentee': 'An absentee ballot (or mail-in ballot) lets you vote without going to a polling place on Election Day. Steps: (1) Request a ballot from your local election office (some states send them automatically). (2) Receive your ballot by mail. (3) Mark your choices privately. (4) Return the ballot by mail or drop box before the deadline. Some states require a witness or notary signature.',
  'primary': 'A primary election is held within each political party to choose its candidate for the general election. Open primaries allow any registered voter to participate regardless of party. Closed primaries are restricted to registered party members. Primaries run from January through June of the election year. The winner receives delegates who support them at the national convention.',
  'inauguration': 'Inauguration Day is January 20th following the presidential election year (set by the 20th Amendment). The President-elect takes the Oath of Office, administered by the Chief Justice of the Supreme Court, at the U.S. Capitol. They then deliver an Inaugural Address. If January 20th falls on a Sunday, the public ceremony is held on January 21st.',
  'default': 'Great question! Here are some key election topics I can help with:\n\n• **Voter Registration** — how and when to register\n• **Electoral College** — how the President is elected\n• **Primary Elections** — how parties pick their candidates\n• **Voting ID Requirements** — what to bring to the polls\n• **Absentee/Mail-In Voting** — how to vote without going to a polling place\n• **Election Timeline** — from candidate announcements to inauguration\n\nTry asking about any of these topics!',
};

// ===== UTILITY =====
function $(id) { return document.getElementById(id); }
function getAnswer(q) {
  const lower = q.toLowerCase();
  for (const [key, val] of Object.entries(KB)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  return KB.default;
}
function formatAnswer(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

// ===== PARTICLES =====
function initParticles() {
  const container = $('particles');
  const colors = ['#6366f1','#8b5cf6','#ec4899','#3b82f6'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;`;
    container.appendChild(p);
  }
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = $('navbar');
  const hamburger = $('hamburger');
  const navLinks = $('navLinks');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  });
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function updateActiveLink() {
  const sections = ['home','timeline','steps','quiz','glossary','assistant'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// ===== TIMELINE =====
function initTimeline() {
  const container = $('timeline-container');
  container.innerHTML = TIMELINE_DATA.map(item => `
    <div class="tl-item" data-filter="${item.filter}" id="tl-${item.id}">
      <div class="tl-dot"></div>
      <div class="tl-card" onclick="toggleTL(${item.id})">
        <div class="tl-header">
          <span class="tl-icon">${item.icon}</span>
          <div class="tl-meta">
            <div class="tl-phase">${item.phase}</div>
            <div class="tl-title">${item.title}</div>
          </div>
          <span class="tl-time">${item.time}</span>
        </div>
        <div class="tl-desc">${item.desc}</div>
        <div class="tl-expand">${item.expand}</div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.tl-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.filter !== filter);
      });
    });
  });

  initScrollReveal();
}

function toggleTL(id) {
  document.getElementById('tl-' + id).querySelector('.tl-card').classList.toggle('expanded');
}

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.tl-item').forEach(el => observer.observe(el));
}

// ===== STEPS =====
let currentTab = 'voter';
function initSteps() {
  renderSteps('voter');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderSteps(currentTab);
    });
  });
}

function renderSteps(tab) {
  const data = STEPS_DATA[tab];
  $('steps-content').innerHTML = `<div class="steps-grid">${data.map(s => `
    <div class="step-card">
      <div class="step-number">${s.step}</div>
      <div class="step-icon">${s.icon}</div>
      <div class="step-title">${s.title}</div>
      <div class="step-desc">${s.desc}</div>
      <div class="step-tip">${s.tip}</div>
    </div>
  `).join('')}</div>`;
}

// ===== QUIZ =====
let quizIndex = 0, quizScore = 0, quizAnswered = false;
function initQuiz() { renderQuiz(); }

function renderQuiz() {
  const q = QUIZ_DATA[quizIndex];
  const pct = (quizIndex / QUIZ_DATA.length) * 100;
  $('quiz-container').innerHTML = `
    <div class="quiz-progress">
      <span class="quiz-progress-text">Question ${quizIndex+1} of ${QUIZ_DATA.length}</span>
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <span class="quiz-progress-text">Score: ${quizScore}</span>
    </div>
    <div class="quiz-card">
      <div class="quiz-question">❓ ${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt,i) => `
          <button class="quiz-option" id="opt-${i}" onclick="answerQuiz(${i})" data-index="${i}">
            <span class="option-letter">${['A','B','C','D'][i]}</span>${opt}
          </button>
        `).join('')}
      </div>
      <div id="quiz-feedback"></div>
      <div class="quiz-next"><button class="btn btn-primary" onclick="nextQuestion()">Next Question →</button></div>
    </div>`;
  quizAnswered = false;
}

function answerQuiz(selected) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = QUIZ_DATA[quizIndex];
  const correct = selected === q.answer;
  if (correct) quizScore++;
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === selected && !correct) btn.classList.add('wrong');
  });
  $('quiz-feedback').innerHTML = `<div class="quiz-feedback ${correct ? 'correct' : 'wrong'}">
    ${correct ? '✅ Correct!' : '❌ Incorrect.'} ${q.explanation}
  </div>`;
  document.querySelector('.quiz-next').style.display = 'block';
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex >= QUIZ_DATA.length) {
    const pct = Math.round((quizScore / QUIZ_DATA.length) * 100);
    const msg = pct >= 80 ? '🎉 Excellent! You\'re an election expert!' : pct >= 60 ? '👍 Good job! Keep learning!' : '📚 Keep studying — democracy needs informed voters!';
    $('quiz-container').innerHTML = `
      <div class="quiz-card">
        <div class="quiz-result">
          <div class="result-score">${quizScore}/${QUIZ_DATA.length}</div>
          <div class="result-msg">${msg}</div>
          <p style="color:var(--text-muted);margin-bottom:24px;">You answered ${pct}% of questions correctly.</p>
          <button class="btn btn-primary" onclick="resetQuiz()">Try Again 🔄</button>
        </div>
      </div>`;
  } else {
    renderQuiz();
  }
}

function resetQuiz() { quizIndex = 0; quizScore = 0; renderQuiz(); }

// ===== GLOSSARY =====
function initGlossary() {
  renderGlossary('');
  $('glossary-search').addEventListener('input', e => renderGlossary(e.target.value.toLowerCase()));
}

function renderGlossary(query) {
  const filtered = GLOSSARY_DATA.filter(g => g.term.toLowerCase().includes(query) || g.def.toLowerCase().includes(query));
  $('glossary-grid').innerHTML = filtered.length
    ? filtered.map(g => `<div class="glossary-card"><div class="glossary-term">${g.term}</div><div class="glossary-def">${g.def}</div></div>`).join('')
    : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px">No terms found. Try a different search.</p>';
}

// ===== CHAT =====
function initChat() {
  const suggestions = $('suggestions');
  suggestions.innerHTML = SUGGESTIONS.map(s => `<button class="suggestion-btn" onclick="sendSuggestion('${s}')">${s}</button>`).join('');
  $('chat-send').addEventListener('click', sendChat);
  $('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
}

function sendSuggestion(text) {
  $('chat-input').value = text;
  sendChat();
}

function sendChat() {
  const input = $('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  appendMsg(text, 'user');
  const typingId = appendTyping();
  setTimeout(() => {
    removeTyping(typingId);
    appendMsg(formatAnswer(getAnswer(text)), 'assistant');
  }, 900 + Math.random() * 600);
}

function appendMsg(html, type) {
  const msgs = $('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}-msg`;
  div.innerHTML = `<div class="msg-avatar">${type === 'user' ? '👤' : '🤖'}</div><div class="msg-bubble">${html}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendTyping() {
  const msgs = $('chat-messages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg assistant-msg';
  div.id = id;
  div.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) { const el = $(id); if (el) el.remove(); }

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initTimeline();
  initSteps();
  initQuiz();
  initGlossary();
  initChat();
});
