// ===== TIMELINE DATA =====
const TIMELINE_DATA = [
  { id:1, icon:'📢', phase:'Pre-Election', filter:'pre', title:'Candidate Announcement', time:'18-24 months before', calDate:'20250201', desc:'Candidates formally announce their intention to run for office.', expand:'Candidates file with the Federal Election Commission (FEC), begin fundraising, and build campaign teams. Early announcements help establish name recognition and donor networks.' },
  { id:2, icon:'🗳️', phase:'Pre-Election', filter:'pre', title:'Primaries & Caucuses', time:'Jan–June (election year)', calDate:'20261103', desc:'Voters within each party select their preferred candidate.', expand:'Primaries are state-run elections where voters cast ballots privately. Caucuses are organized party meetings. Each state allocates delegates based on results.' },
  { id:3, icon:'🏛️', phase:'Pre-Election', filter:'pre', title:'National Party Conventions', time:'Summer of election year', calDate:'20260815', desc:'Each major party officially nominates its presidential candidates.', expand:'Delegates vote to confirm the primary winner. The candidate delivers an acceptance speech and the party platform is finalized.' },
  { id:4, icon:'📝', phase:'Pre-Election', filter:'pre', title:'Voter Registration Deadline', time:'15-30 days before election', calDate:'20261004', desc:"Citizens must register to vote before their state's deadline.", expand:"Registration requirements vary by state. Some states offer same-day registration. You must be a U.S. citizen, at least 18 years old, and meet your state's residency requirements." },
  { id:5, icon:'💬', phase:'Pre-Election', filter:'pre', title:'Presidential Debates', time:'September–October', calDate:'20260929', desc:'Candidates debate policy positions on national television.', expand:'The Commission on Presidential Debates organizes general election debates. These events allow voters to compare candidates on issues like economy, healthcare, foreign policy, and more.' },
  { id:6, icon:'📮', phase:'Pre-Election', filter:'pre', title:'Early & Absentee Voting', time:'Weeks before Election Day', calDate:'20261019', desc:'Many states allow voting before Election Day in person or by mail.', expand:'Absentee ballots can be requested by mail. Early in-person voting opens polling locations before Election Day. Rules and deadlines differ significantly by state.' },
  { id:7, icon:'🗳️', phase:'Election', filter:'election', title:'Election Day', time:'First Tuesday after Nov 1st', calDate:'20261103', desc:'Voters cast their ballots at polling places across the country.', expand:'Polls typically open at 6 AM and close at 7–8 PM local time. Voters in line when polls close are allowed to vote. Provisional ballots are available for eligibility questions.' },
  { id:8, icon:'📊', phase:'Post-Election', filter:'post', title:'Votes Are Counted', time:'Election Night & days after', calDate:'20261104', desc:'Results are tallied and reported, though some races take days.', expand:'Election officials count in-person, early, and mail-in ballots. Results reported on Election Night are unofficial. Close races may require days or weeks to finalize.' },
  { id:9, icon:'🔢', phase:'Post-Election', filter:'post', title:'Electoral College Meets', time:'December (after election)', calDate:'20261214', desc:'Electors in each state formally cast electoral votes for president.', expand:'The U.S. uses an Electoral College system. Each state has electors equal to its congressional representation. Most states use winner-take-all rules. 270 electoral votes are needed to win.' },
  { id:10, icon:'✅', phase:'Post-Election', filter:'post', title:'Congress Certifies Results', time:'January 6th', calDate:'20270106', desc:'A joint session of Congress officially counts and certifies the electoral votes.', expand:'The Vice President presides over the joint session. Electoral certificates from all states are opened and counted. Any objections must be filed by both a Senator and a Representative.' },
  { id:11, icon:'🎉', phase:'Post-Election', filter:'post', title:'Inauguration Day', time:'January 20th', calDate:'20270120', desc:'The newly elected President is sworn into office.', expand:'The President-elect takes the oath of office at the U.S. Capitol. The Chief Justice of the Supreme Court administers the oath. The new President delivers an inaugural address.' },
];

// ===== STEPS DATA =====
const STEPS_DATA = {
  voter: [
    { step:1, icon:'📋', title:'Check Your Eligibility', desc:'You must be a U.S. citizen, 18+ years old, and a state resident. Some states restore voting rights to ex-felons.', tip:"💡 Tip: Check your state's specific requirements at vote.gov" },
    { step:2, icon:'📝', title:'Register to Vote', desc:'Register online, by mail, or in person at your local election office, DMV, or other designated locations.', tip:'💡 Tip: Register at least 30 days before an election — some states allow same-day registration.' },
    { step:3, icon:'🗺️', title:'Find Your Polling Place', desc:"Use your state's election website to find your assigned polling place based on your registered address.", tip:'💡 Tip: Polling places can change — always verify before Election Day!' },
    { step:4, icon:'📰', title:'Research Candidates & Issues', desc:'Review candidate positions, ballot measures, and local races. A sample ballot is often available online beforehand.', tip:'💡 Tip: Non-partisan voter guides are a great resource for unbiased information.' },
    { step:5, icon:'🪪', title:'Bring Required ID', desc:"Many states require photo ID. Know your state's requirements in advance to avoid issues at the polls.", tip:'💡 Tip: If you forget ID, you may be able to cast a provisional ballot.' },
    { step:6, icon:'🗳️', title:'Cast Your Vote', desc:'Visit your polling place, check in with poll workers, receive your ballot, mark your choices, and submit it.', tip:'💡 Tip: Take your time — you cannot be rushed out of the voting booth.' },
  ],
  candidate: [
    { step:1, icon:'📜', title:'Determine Eligibility', desc:'Age, citizenship, and residency requirements vary by office. President requires being natural-born, 35+, and 14-year resident.', tip:"💡 Tip: Local and state offices have different requirements — check your state's laws." },
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

// ===== QUIZ DATA =====
const QUIZ_DATA = [
  { q:'What is the minimum age to vote in U.S. federal elections?', options:['16','17','18','21'], answer:2, explanation:'The 26th Amendment (1971) lowered the voting age from 21 to 18 for all U.S. elections.' },
  { q:'How many electoral votes are needed to win the U.S. presidency?', options:['270','300','218','435'], answer:0, explanation:'There are 538 total electoral votes. A candidate needs a majority — 270 — to win the presidency.' },
  { q:'When is U.S. Election Day held?', options:['First Monday of November','Second Tuesday in October','First Tuesday after the first Monday in November','Last Tuesday of October'], answer:2, explanation:'By federal law since 1845, Election Day falls on the first Tuesday after the first Monday in November.' },
  { q:'What is a "primary election"?', options:['The general election',"An election to choose each party's candidates",'A local school board election','A vote to remove an official from office'], answer:1, explanation:'Primaries are intra-party elections where voters select the candidate who will represent that party in the general election.' },
  { q:'Which federal agency oversees campaign finance?', options:['The IRS','The FCC','The FEC','The FTC'], answer:2, explanation:'The Federal Election Commission (FEC) is the independent agency responsible for enforcing federal campaign finance law.' },
  { q:'What is the Electoral College?', options:['A university for politicians','A group of electors who formally elect the President','The U.S. Senate','A type of primary election'], answer:1, explanation:"The Electoral College is a group of 538 electors who cast official votes for President and Vice President based on each state's popular vote results." },
  { q:'What is a "provisional ballot"?', options:['A ballot cast early',"A ballot used when a voter's eligibility is uncertain at the polls",'An absentee ballot','A ballot for overseas voters'], answer:1, explanation:"A provisional ballot is cast when a voter's eligibility cannot be immediately verified. It is held separately and counted after officials confirm eligibility." },
  { q:'Who certifies the presidential electoral votes in Congress?', options:['The Speaker of the House','The Chief Justice','The Vice President','The Senate Majority Leader'], answer:2, explanation:'Under the Constitution, the Vice President presides over the joint session of Congress that counts and certifies the Electoral College votes.' },
  { q:'What is a "caucus"?', options:['A type of political fundraiser','A government committee meeting','An organized gathering where voters publicly declare support for candidates','A primary held by mail'], answer:2, explanation:'A caucus is a community meeting where registered party members gather to discuss and publicly declare their support for candidates.' },
  { q:'On what date does a newly elected U.S. President take office?', options:['November 8','December 15','January 6','January 20'], answer:3, explanation:'The 20th Amendment set Inauguration Day as January 20th following the election year.' },
];

// ===== GLOSSARY DATA =====
const GLOSSARY_DATA = [
  { term:'Absentee Ballot', def:'A ballot cast by a voter who cannot be present at their polling place on Election Day, typically sent by mail.', category:'voting' },
  { term:'Ballot Initiative', def:'A proposed law or constitutional amendment placed on the ballot by citizen petition, allowing voters to directly decide on legislation.', category:'process' },
  { term:'Canvass', def:'The official post-election process of reviewing and validating all ballots to produce the certified vote count.', category:'process' },
  { term:'Caucus', def:'A meeting of party members in a local area to select candidates or delegates, distinct from a private primary ballot.', category:'process' },
  { term:'Delegates', def:"Individuals chosen to represent their state's voters at a party's national convention to select the presidential nominee.", category:'process' },
  { term:'Electorate', def:'All eligible voters in a country or region who are qualified to vote in a given election.', category:'voting' },
  { term:'Electoral College', def:'The system of 538 electors who formally elect the U.S. President and Vice President based on state popular vote results.', category:'system' },
  { term:'FEC', def:'Federal Election Commission — the independent U.S. agency that enforces campaign finance laws and oversees federal elections.', category:'system' },
  { term:'Gerrymandering', def:'The manipulation of electoral district boundaries to favor a particular party, candidate, or group of voters.', category:'system' },
  { term:'Incumbent', def:'A current holder of a political office who is seeking re-election to the same position.', category:'candidates' },
  { term:'Initiative', def:'A process by which citizens can propose new laws or constitutional amendments directly to voters via ballot measure.', category:'process' },
  { term:'Precinct', def:'The smallest geographic unit for election administration; voters in a precinct vote at the same polling location.', category:'system' },
  { term:'Primary Election', def:"An election in which voters choose their party's candidate to advance to the general election.", category:'process' },
  { term:'Provisional Ballot', def:"A ballot cast when a voter's eligibility is in question; it is held and verified before being counted.", category:'voting' },
  { term:'Recount', def:'A repeat tabulation of votes in an election, typically triggered when the margin of victory is very small.', category:'process' },
  { term:'Referendum', def:'A direct vote by the electorate on a specific political question or piece of legislation.', category:'process' },
  { term:'Runoff Election', def:'A second election held when no candidate receives the required number of votes in the initial election.', category:'process' },
  { term:'Swing State', def:'A state where both major political parties have a similar level of support, making it key to winning a presidential election.', category:'system' },
  { term:'Write-In Candidate', def:'A candidate whose name is not printed on the ballot, but who can receive votes by having their name written in by voters.', category:'candidates' },
  { term:'Voter Suppression', def:'Strategies used to discourage or prevent specific groups of people from exercising their right to vote.', category:'voting' },
  { term:'Dark Money', def:'Political spending by nonprofit organizations that are not required to disclose their donors.', category:'candidates' },
  { term:'Super PAC', def:'An independent expenditure-only committee that can raise unlimited funds from corporations, unions, and individuals.', category:'candidates' },
];

// ===== AI KNOWLEDGE BASE =====
const KB = {
  'register': 'To register to vote:\n\n1️⃣ **Check eligibility** — U.S. citizen, 18+, state resident\n2️⃣ **Register online** at vote.gov, by mail, or at your DMV\n3️⃣ **Meet the deadline** — usually 15–30 days before election day\n\nSome states offer same-day registration. Visit **vote.gov** to get started!',
  'electoral college': 'The **Electoral College** elects the U.S. President:\n\n• 538 total electors (one per congressional seat + 3 for D.C.)\n• A candidate needs **270 electoral votes** to win\n• Most states use winner-take-all\n• Electors meet in December to cast official votes\n• Results certified by Congress on January 6th',
  'count': 'How votes are counted:\n\n1️⃣ In-person ballots are scanned election night\n2️⃣ Early/mail-in ballots take additional days\n3️⃣ Officials conduct a formal **canvass** to verify all results\n4️⃣ Results are certified officially\n5️⃣ Close races may trigger a **recount**\n\nElection Night results are *unofficial* until certified.',
  'id': 'Voting ID requirements by state type:\n\n🔴 **Strict Photo ID** (~11 states): government-issued photo ID required\n🟡 **Photo ID requested** (~16 states): non-photo ID accepted too\n🟢 **No strict ID** (~23 states): signature or verbal confirmation\n\nIf you forget ID, request a **provisional ballot**. Check vote.gov for your state.',
  'tie': 'A presidential tie (269–269 electoral votes):\n\n• Election goes to the **House of Representatives**\n• Each state delegation gets **one vote** (not each member)\n• Vice President chosen by the **Senate**\n• Has occurred in 1800 and 1824 in U.S. history',
  'absentee': 'How to vote absentee (by mail):\n\n1️⃣ **Request** a ballot from your local election office\n2️⃣ **Receive** your ballot by mail\n3️⃣ **Mark** your choices privately\n4️⃣ **Return** by mail or drop box before the deadline\n\nSome states send ballots automatically. Some require a witness signature.',
  'primary': 'Primary elections explained:\n\n• **Purpose**: Each party selects its candidate for the general election\n• **Open primary**: Any registered voter can participate\n• **Closed primary**: Only registered party members can vote\n• **Caucus**: A public meeting instead of private ballot\n• Primaries run **January through June** of the election year',
  'inauguration': '**Inauguration Day** is January 20th (set by 20th Amendment)\n\n• President-elect takes the **Oath of Office**\n• Administered by the **Chief Justice** of the Supreme Court\n• Held at the **U.S. Capitol**\n• New President delivers an **Inaugural Address**\n• If Jan 20 is a Sunday, public ceremony moves to Jan 21',
  'candidate': 'To run for U.S. President you must:\n\n• Be a **natural-born citizen**\n• Be at least **35 years old**\n• Have been a **U.S. resident for 14 years**\n\nFor Congress: age 25+ (House), 30+ (Senate), U.S. citizen for 7 or 9 years respectively.',
  'debate': 'Presidential debates:\n\n• Organized by the **Commission on Presidential Debates**\n• Typically held September–October\n• Cover topics: economy, healthcare, foreign policy, etc.\n• Vice Presidential candidates also debate\n• Watched by tens of millions of voters',
  'default': "I'm your Election Education Assistant! 🗳️\n\nHere are topics I can help with:\n\n• **Voter Registration** — how and when to register\n• **Electoral College** — how the President is elected\n• **Primary Elections** — how parties pick their candidates\n• **Voting ID** — what to bring to the polls\n• **Absentee Voting** — how to vote by mail\n• **Election Timeline** — key dates and phases\n• **Presidential Debates** — how they work\n• **Running for Office** — candidate requirements\n\nJust ask me anything!"
};

const SUGGESTIONS = [
  'How do I register to vote?',
  'What is the Electoral College?',
  'How are votes counted?',
  'What ID do I need to vote?',
  'What happens if there is a tie?',
  'What is an absentee ballot?',
  'How do primaries work?',
  'When is Inauguration Day?',
  'Who can run for President?',
  'How do presidential debates work?',
];
