'use strict';
/* BrainQuest — app.js (seed data & state) */

const CATEGORIES=[
{name:'General Knowledge',icon:'\u{1F30D}',color:'#4f8ef7',desc:'Facts about the world'},
{name:'Science',icon:'\u{1F52C}',color:'#3ecfb2',desc:'Explore science & nature'},
{name:'History',icon:'\u{1F3DB}',color:'#e05c8a',desc:'Journey through time'},
{name:'Mathematics',icon:'\u{1F4D0}',color:'#48c78e',desc:'Numbers and logic'},
{name:'Current Affairs',icon:'\u{1F4F0}',color:'#f5a623',desc:"What's happening now"},
{name:'Technology',icon:'\u{1F4BB}',color:'#6366f1',desc:'Computers & innovation'},
{name:'Geography',icon:'\u{1F5FA}',color:'#14b8a6',desc:'Countries & places'},
{name:'Sports',icon:'\u26BD',color:'#f97316',desc:'Games & athletics'},
{name:'Entertainment',icon:'\u{1F3AC}',color:'#a855f7',desc:'Movies, music & TV'},
{name:'Literature',icon:'\u{1F4D6}',color:'#ec4899',desc:'Books & writing'},
{name:'Programming',icon:'\u{1F468}\u200D\u{1F4BB}',color:'#06b6d4',desc:'Code & algorithms'},
{name:'Kids Zone',icon:'\u{1F9D2}',color:'#f472b6',desc:'Fun quizzes for kids!',isKids:true}
];

const KIDS_CATS=[
{name:'Animals',icon:'\u{1F43E}',color:'#f59e0b',desc:'Learn about animals'},
{name:'Space',icon:'\u{1F680}',color:'#8b5cf6',desc:'Explore the universe'},
{name:'Colors & Shapes',icon:'\u{1F3A8}',color:'#ec4899',desc:'Fun with colors'},
{name:'Fun Facts',icon:'\u{1F929}',color:'#10b981',desc:'Amazing facts'},
{name:'Riddles',icon:'\u{1F9E9}',color:'#f97316',desc:'Brain teasers'}
];

const ACHIEVEMENTS=[
{id:'first',name:'First Quiz',icon:'\u{1F3AF}',desc:'Complete your first quiz'},
{id:'perfect',name:'Perfect Score',icon:'\u{1F4AF}',desc:'Score 100% on a quiz'},
{id:'streak3',name:'On a Roll',icon:'\u{1F525}',desc:'3 day streak'},
{id:'streak7',name:'Week Warrior',icon:'\u26A1',desc:'7 day streak'},
{id:'speedster',name:'Speedster',icon:'\u{1F3CE}',desc:'Finish under 60s'},
{id:'scholar',name:'Scholar',icon:'\u{1F4DA}',desc:'Complete 10 quizzes'},
{id:'master',name:'Quiz Master',icon:'\u{1F451}',desc:'Score 90%+ five times'},
{id:'explorer',name:'Explorer',icon:'\u{1F9ED}',desc:'Try 5 categories'},
{id:'kids_hero',name:'Kids Hero',icon:'\u{1F31F}',desc:'Complete 3 kids quizzes'},
{id:'night_owl',name:'Night Owl',icon:'\u{1F989}',desc:'Quiz after 10 PM'}
];

const SQ=[
{id:'q001',cat:'General Knowledge',type:'mcq',difficulty:'Easy',text:'What is the capital of France?',options:['London','Berlin','Paris','Rome'],correct:2,explanation:'Paris has been the capital of France since the 10th century.'},
{id:'q002',cat:'General Knowledge',type:'mcq',difficulty:'Easy',text:'How many continents are there?',options:['5','6','7','8'],correct:2,explanation:'The 7 continents are Africa, Antarctica, Asia, Australia, Europe, North America, South America.'},
{id:'q003',cat:'General Knowledge',type:'truefalse',difficulty:'Easy',text:'The Great Wall of China is visible from space.',options:['True','False'],correct:1,explanation:'This is a myth. The wall is too narrow to see from space.'},
{id:'q004',cat:'General Knowledge',type:'fill',difficulty:'Medium',text:'The chemical symbol for gold is ___.',options:[],correct:'Au',explanation:'Au comes from Latin "Aurum".'},
{id:'q005',cat:'General Knowledge',type:'mcq',difficulty:'Medium',text:'Which ocean is the largest?',options:['Atlantic','Indian','Arctic','Pacific'],correct:3,explanation:"Pacific Ocean covers about 46% of Earth's water surface."},
{id:'q006',cat:'General Knowledge',type:'mcq',difficulty:'Hard',text:'In which year did World War II end?',options:['1943','1944','1945','1946'],correct:2,explanation:'WWII ended in 1945.'},
{id:'q007',cat:'General Knowledge',type:'mcq',difficulty:'Medium',text:'What is the largest planet in our solar system?',options:['Saturn','Jupiter','Neptune','Uranus'],correct:1,explanation:'Jupiter is the largest planet.'},
{id:'q008',cat:'General Knowledge',type:'truefalse',difficulty:'Easy',text:'Water boils at 100\u00B0C at sea level.',options:['True','False'],correct:0,explanation:'Water boils at 100\u00B0C (212\u00B0F) at standard atmospheric pressure.'},
{id:'q010',cat:'Science',type:'mcq',difficulty:'Easy',text:'What is the speed of light?',options:['300,000 km/s','150,000 km/s','500,000 km/s','250,000 km/s'],correct:0,explanation:'Light travels at ~299,792 km/s.'},
{id:'q011',cat:'Science',type:'truefalse',difficulty:'Easy',text:'DNA stands for Deoxyribonucleic Acid.',options:['True','False'],correct:0,explanation:'DNA carries genetic information.'},
{id:'q012',cat:'Science',type:'mcq',difficulty:'Medium',text:'Which planet is the Red Planet?',options:['Venus','Jupiter','Mars','Saturn'],correct:2,explanation:'Mars is red due to iron oxide.'},
{id:'q013',cat:'Science',type:'fill',difficulty:'Medium',text:'The powerhouse of the cell is the _____.',options:[],correct:'mitochondria',explanation:'Mitochondria produce ATP.'},
{id:'q014',cat:'Science',type:'mcq',difficulty:'Hard',text:'Atomic number of carbon?',options:['4','6','8','12'],correct:1,explanation:'Carbon has 6 protons.'},
{id:'q015',cat:'Science',type:'mcq',difficulty:'Hard',text:"Which gas makes up most of Earth's atmosphere?",options:['Oxygen','CO2','Argon','Nitrogen'],correct:3,explanation:'Nitrogen is about 78%.'},
{id:'q016',cat:'Science',type:'mcq',difficulty:'Medium',text:'What is the hardest natural substance?',options:['Gold','Iron','Diamond','Platinum'],correct:2,explanation:'Diamond is the hardest natural material.'},
{id:'q017',cat:'Science',type:'truefalse',difficulty:'Easy',text:'Sound travels faster than light.',options:['True','False'],correct:1,explanation:'Light is much faster than sound.'},
{id:'q020',cat:'History',type:'mcq',difficulty:'Easy',text:'Who was the first US President?',options:['Lincoln','Jefferson','Washington','Adams'],correct:2,explanation:'George Washington served 1789-1797.'},
{id:'q021',cat:'History',type:'truefalse',difficulty:'Easy',text:'The Titanic sank in 1912.',options:['True','False'],correct:0,explanation:'Titanic sank April 15, 1912.'},
{id:'q022',cat:'History',type:'mcq',difficulty:'Medium',text:'Largest empire by land area?',options:['Roman','British','Ottoman','Mongol'],correct:1,explanation:'British Empire covered ~26% of land.'},
{id:'q023',cat:'History',type:'mcq',difficulty:'Hard',text:'When did the Berlin Wall fall?',options:['1987','1988','1989','1991'],correct:2,explanation:'Berlin Wall fell November 9, 1989.'},
{id:'q024',cat:'History',type:'mcq',difficulty:'Medium',text:'Who discovered America in 1492?',options:['Magellan','Columbus','Vespucci','Drake'],correct:1,explanation:'Columbus reached the Americas in 1492.'},
{id:'q025',cat:'History',type:'fill',difficulty:'Hard',text:'The ancient Egyptian writing system is called _____.',options:[],correct:'hieroglyphics',explanation:'Hieroglyphics were used for over 3000 years.'},
{id:'q030',cat:'Mathematics',type:'mcq',difficulty:'Easy',text:'What is 15% of 200?',options:['25','30','35','40'],correct:1,explanation:'15% x 200 = 30.'},
{id:'q031',cat:'Mathematics',type:'truefalse',difficulty:'Easy',text:'\u03C0 (pi) is exactly 3.14.',options:['True','False'],correct:1,explanation:'Pi is irrational: 3.14159265...'},
{id:'q032',cat:'Mathematics',type:'fill',difficulty:'Medium',text:'The square root of 144 is ___.',options:[],correct:'12',explanation:'12 x 12 = 144.'},
{id:'q033',cat:'Mathematics',type:'mcq',difficulty:'Medium',text:'Sum of angles in a triangle?',options:['90\u00B0','180\u00B0','270\u00B0','360\u00B0'],correct:1,explanation:'Triangle angles always sum to 180\u00B0.'},
{id:'q034',cat:'Mathematics',type:'mcq',difficulty:'Hard',text:'Derivative of sin(x)?',options:['cos(x)','-cos(x)','tan(x)','-sin(x)'],correct:0,explanation:'d/dx sin(x) = cos(x).'},
{id:'q035',cat:'Mathematics',type:'mcq',difficulty:'Easy',text:'What is 7 x 8?',options:['54','56','58','64'],correct:1,explanation:'7 x 8 = 56.'},
{id:'q040',cat:'Current Affairs',type:'mcq',difficulty:'Medium',text:'Which org developed Covishield?',options:['Pfizer','Oxford-AstraZeneca','Moderna','J&J'],correct:1,explanation:'Developed by Oxford/AstraZeneca.'},
{id:'q041',cat:'Current Affairs',type:'truefalse',difficulty:'Easy',text:'AI is widely used in healthcare.',options:['True','False'],correct:0,explanation:'AI assists in diagnosis and drug discovery.'},
{id:'q042',cat:'Current Affairs',type:'mcq',difficulty:'Medium',text:'Which country launched a 6G satellite first?',options:['USA','S. Korea','Japan','China'],correct:3,explanation:'China launched a 6G test satellite in 2020.'},
{id:'q043',cat:'Current Affairs',type:'mcq',difficulty:'Hard',text:'NASA Mars rover launched in 2020?',options:['Curiosity','Opportunity','Perseverance','Spirit'],correct:2,explanation:'Perseverance landed on Mars Feb 2021.'},
{id:'q050',cat:'Technology',type:'mcq',difficulty:'Easy',text:'Who founded Microsoft?',options:['Steve Jobs','Bill Gates','Elon Musk','Jeff Bezos'],correct:1,explanation:'Bill Gates co-founded Microsoft in 1975.'},
{id:'q051',cat:'Technology',type:'mcq',difficulty:'Medium',text:'What does HTML stand for?',options:['HyperText Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyper Tool Multi Language'],correct:0,explanation:'HTML = HyperText Markup Language.'},
{id:'q052',cat:'Technology',type:'truefalse',difficulty:'Easy',text:'The first iPhone was released in 2007.',options:['True','False'],correct:0,explanation:'Apple released the first iPhone on June 29, 2007.'},
{id:'q053',cat:'Technology',type:'mcq',difficulty:'Hard',text:'Which programming language was created by Guido van Rossum?',options:['Java','C++','Python','Ruby'],correct:2,explanation:'Python was created by Guido van Rossum in 1991.'},
{id:'q060',cat:'Geography',type:'mcq',difficulty:'Easy',text:'What is the largest country by area?',options:['China','USA','Canada','Russia'],correct:3,explanation:'Russia is the largest country at 17.1M km\u00B2.'},
{id:'q061',cat:'Geography',type:'mcq',difficulty:'Medium',text:'Which river is the longest?',options:['Amazon','Nile','Mississippi','Yangtze'],correct:1,explanation:'The Nile is approximately 6,650 km long.'},
{id:'q062',cat:'Geography',type:'fill',difficulty:'Medium',text:'The capital of Japan is _____.',options:[],correct:'Tokyo',explanation:"Tokyo is Japan's capital and largest city."},
{id:'q063',cat:'Geography',type:'truefalse',difficulty:'Easy',text:'Australia is both a country and a continent.',options:['True','False'],correct:0,explanation:"Australia is the world's smallest continent and a country."},
{id:'q070',cat:'Sports',type:'mcq',difficulty:'Easy',text:'How many players in a football (soccer) team?',options:['9','10','11','12'],correct:2,explanation:'A football team has 11 players on the field.'},
{id:'q071',cat:'Sports',type:'mcq',difficulty:'Medium',text:'In which year were the first modern Olympics held?',options:['1892','1896','1900','1904'],correct:1,explanation:'The first modern Olympics were in Athens, 1896.'},
{id:'q072',cat:'Sports',type:'truefalse',difficulty:'Easy',text:'A marathon is 42.195 kilometers.',options:['True','False'],correct:0,explanation:'The marathon distance is 42.195 km (26.219 mi).'},
{id:'q073',cat:'Sports',type:'fill',difficulty:'Hard',text:"Cricket's highest individual test score of 400* was made by _____.",options:[],correct:'Brian Lara',explanation:'Brian Lara scored 400* vs England in 2004.'},
{id:'q080',cat:'Entertainment',type:'mcq',difficulty:'Easy',text:'Who played Iron Man in the MCU?',options:['Chris Evans','Robert Downey Jr.','Chris Hemsworth','Mark Ruffalo'],correct:1,explanation:'Robert Downey Jr. played Tony Stark/Iron Man.'},
{id:'q081',cat:'Entertainment',type:'mcq',difficulty:'Medium',text:'Which movie won Best Picture Oscar in 2020?',options:['1917','Joker','Parasite','Once Upon a Time'],correct:2,explanation:'Parasite (Bong Joon-ho) won Best Picture.'},
{id:'q082',cat:'Entertainment',type:'truefalse',difficulty:'Easy',text:'The Beatles are from Liverpool, England.',options:['True','False'],correct:0,explanation:'The Beatles formed in Liverpool in 1960.'},
{id:'q090',cat:'Literature',type:'mcq',difficulty:'Easy',text:'Who wrote Romeo and Juliet?',options:['Dickens','Shakespeare','Austen','Twain'],correct:1,explanation:'William Shakespeare wrote Romeo and Juliet.'},
{id:'q091',cat:'Literature',type:'mcq',difficulty:'Medium',text:'Who wrote "1984"?',options:['Aldous Huxley','George Orwell','Ray Bradbury','H.G. Wells'],correct:1,explanation:'George Orwell wrote 1984, published in 1949.'},
{id:'q092',cat:'Literature',type:'fill',difficulty:'Hard',text:'The Harry Potter series was written by _____.',options:[],correct:'J.K. Rowling',explanation:'J.K. Rowling wrote all 7 Harry Potter books.'},
{id:'q100',cat:'Programming',type:'mcq',difficulty:'Easy',text:'What does CSS stand for?',options:['Computer Style Sheets','Cascading Style Sheets','Creative Style System','Coded Style Sheets'],correct:1,explanation:'CSS = Cascading Style Sheets.'},
{id:'q101',cat:'Programming',type:'mcq',difficulty:'Medium',text:'Which data structure uses FIFO?',options:['Stack','Queue','Tree','Graph'],correct:1,explanation:'Queue uses First In, First Out.'},
{id:'q102',cat:'Programming',type:'truefalse',difficulty:'Easy',text:'JavaScript and Java are the same language.',options:['True','False'],correct:1,explanation:'They are completely different languages.'},
{id:'q103',cat:'Programming',type:'fill',difficulty:'Hard',text:'Big O notation for binary search is O(___).',options:[],correct:'log n',explanation:'Binary search has O(log n) time complexity.'},
{id:'k001',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'What sound does a cat make?',options:['Woof','Meow','Moo','Quack'],correct:1,explanation:'Cats say meow! \u{1F431}',isKids:true,kidsCat:'Animals'},
{id:'k002',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'How many legs does a spider have?',options:['4','6','8','10'],correct:2,explanation:'Spiders have 8 legs! \u{1F577}',isKids:true,kidsCat:'Animals'},
{id:'k003',cat:'Kids Zone',type:'truefalse',difficulty:'Easy',text:'The Sun is a star.',options:['True','False'],correct:0,explanation:'Yes! The Sun is our closest star! \u2B50',isKids:true,kidsCat:'Space'},
{id:'k004',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'What color do you get mixing red and blue?',options:['Green','Orange','Purple','Brown'],correct:2,explanation:'Red + Blue = Purple! \u{1F49C}',isKids:true,kidsCat:'Colors & Shapes'},
{id:'k005',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'Which animal is the tallest?',options:['Elephant','Giraffe','Horse','Bear'],correct:1,explanation:'Giraffes are the tallest animals! \u{1F992}',isKids:true,kidsCat:'Animals'},
{id:'k006',cat:'Kids Zone',type:'truefalse',difficulty:'Easy',text:'Bananas are berries.',options:['True','False'],correct:0,explanation:'Surprisingly, bananas ARE berries! \u{1F34C}',isKids:true,kidsCat:'Fun Facts'},
{id:'k007',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'How many sides does a triangle have?',options:['2','3','4','5'],correct:1,explanation:'Tri means three! \u25B3',isKids:true,kidsCat:'Colors & Shapes'},
{id:'k008',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'Which planet is closest to the Sun?',options:['Venus','Earth','Mercury','Mars'],correct:2,explanation:'Mercury is closest to the Sun!',isKids:true,kidsCat:'Space'},
{id:'k009',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'What do bees make?',options:['Milk','Honey','Sugar','Butter'],correct:1,explanation:'Bees make honey! \u{1F36F}\u{1F41D}',isKids:true,kidsCat:'Animals'},
{id:'k010',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:"I have hands but can't clap. What am I?",options:['Robot','Doll','Clock','Glove'],correct:2,explanation:"A clock has hands but can't clap! \u23F0",isKids:true,kidsCat:'Riddles'},
{id:'k011',cat:'Kids Zone',type:'mcq',difficulty:'Easy',text:'Which is the largest ocean?',options:['Atlantic','Pacific','Indian','Arctic'],correct:1,explanation:'The Pacific Ocean is the biggest! \u{1F30A}',isKids:true,kidsCat:'Fun Facts'},
{id:'k012',cat:'Kids Zone',type:'truefalse',difficulty:'Easy',text:'Octopuses have 3 hearts.',options:['True','False'],correct:0,explanation:'Yes! Octopuses have 3 hearts! \u{1F419}',isKids:true,kidsCat:'Animals'},
];

const SEED_QUIZZES=[
{id:'qz001',title:'GK Basics',category:'General Knowledge',difficulty:'Easy',timePerQ:20,questionIds:['q001','q002','q003','q005','q008'],description:'Test your basic knowledge!',type:'quick'},
{id:'qz002',title:'Science Explorer',category:'Science',difficulty:'Medium',timePerQ:25,questionIds:['q010','q011','q012','q014','q015','q016','q017'],description:'Explore science.',type:'full'},
{id:'qz003',title:'History Deep Dive',category:'History',difficulty:'Hard',timePerQ:30,questionIds:['q020','q021','q022','q023','q024','q025'],description:'Test your history knowledge.',type:'full'},
{id:'qz004',title:'Math Challenge',category:'Mathematics',difficulty:'Medium',timePerQ:30,questionIds:['q030','q031','q032','q033','q034','q035'],description:'Math skills test.',type:'full'},
{id:'qz005',title:'Current Affairs',category:'Current Affairs',difficulty:'Medium',timePerQ:25,questionIds:['q040','q041','q042','q043'],description:'Stay updated.',type:'quick'},
{id:'qz006',title:'Mixed Mega Quiz',category:'General Knowledge',difficulty:'Hard',timePerQ:20,questionIds:['q001','q010','q020','q030','q050','q060','q070','q080'],description:'A mix of everything!',type:'full'},
{id:'qz007',title:'Tech Trivia',category:'Technology',difficulty:'Medium',timePerQ:25,questionIds:['q050','q051','q052','q053'],description:'Technology knowledge.',type:'quick'},
{id:'qz008',title:'World Geography',category:'Geography',difficulty:'Medium',timePerQ:25,questionIds:['q060','q061','q062','q063'],description:'Test your geography.',type:'quick'},
{id:'qz009',title:'Sports Quiz',category:'Sports',difficulty:'Medium',timePerQ:25,questionIds:['q070','q071','q072','q073'],description:'Sports trivia.',type:'quick'},
{id:'qz010',title:'Movie Buff',category:'Entertainment',difficulty:'Easy',timePerQ:20,questionIds:['q080','q081','q082'],description:'Entertainment quiz.',type:'quick'},
{id:'qz011',title:'Bookworm',category:'Literature',difficulty:'Medium',timePerQ:25,questionIds:['q090','q091','q092'],description:'Literature quiz.',type:'quick'},
{id:'qz012',title:'Code Master',category:'Programming',difficulty:'Medium',timePerQ:30,questionIds:['q100','q101','q102','q103'],description:'Programming quiz.',type:'quick'},
{id:'qz013',title:'GK Full Test',category:'General Knowledge',difficulty:'Medium',timePerQ:25,questionIds:['q001','q002','q003','q004','q005','q006','q007','q008'],description:'Complete GK test.',type:'full'},
{id:'qz014',title:'Animal Fun',category:'Kids Zone',difficulty:'Easy',timePerQ:30,questionIds:['k001','k002','k005','k009','k012'],description:'Learn about animals! \u{1F43E}',type:'kids',isKids:true},
{id:'qz015',title:'Space Adventure',category:'Kids Zone',difficulty:'Easy',timePerQ:30,questionIds:['k003','k008','k011'],description:'Explore space! \u{1F680}',type:'kids',isKids:true},
{id:'qz016',title:'Fun & Games',category:'Kids Zone',difficulty:'Easy',timePerQ:30,questionIds:['k004','k006','k007','k010'],description:'Fun mixed quiz! \u{1F3AE}',type:'kids',isKids:true},
{id:'qz017',title:'Science Section: Physics',category:'Science',difficulty:'Hard',timePerQ:30,questionIds:['q010','q015','q016','q017'],description:'Physics focused.',type:'section'},
{id:'qz018',title:'Quick Math',category:'Mathematics',difficulty:'Easy',timePerQ:15,questionIds:['q030','q035','q031'],description:'Speed math test!',type:'timed'},
];

let DB={users:[],questions:[],quizzes:[],scores:[],streaks:{}};
let currentUser=null,quizSession=null;
let perfChart=null,catChart=null,adminAttemptsChart=null,adminScoresChart=null;

function saveDB(){
  localStorage.setItem('bq_db',JSON.stringify(DB));
  fetch('/api/sync',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(DB)}).catch(e=>console.log('Sync error'));
}

async function loadDB(){
  try {
    const res = await fetch('/api/sync');
    const data = await res.json();
    if(data && data.users && data.users.length > 0) {
      DB = data;
      localStorage.setItem('bq_db', JSON.stringify(DB));
    } else {
      loadLocalDB();
      saveDB(); // Seed the server with local DB if it's empty
    }
  } catch(e) {
    loadLocalDB();
  }

  if(!DB.streaks)DB.streaks={};
  if(!DB.users.find(u=>u.email==='admin@brainquest.com')){DB.users.unshift({id:'u_admin',name:'Admin',email:'admin@brainquest.com',password:'admin123',role:'admin',joined:Date.now(),achievements:[]});saveDB()}
  const savedCats=localStorage.getItem('bq_categories');if(savedCats){const parsed=JSON.parse(savedCats);CATEGORIES.length=0;parsed.forEach(c=>CATEGORIES.push(c))}
  const saved=localStorage.getItem('bq_session');
  if(saved){currentUser=JSON.parse(saved);currentUser=DB.users.find(u=>u.id===currentUser.id)||null;if(currentUser)showApp()}
}

async function pollSync(){
  try {
    const res = await fetch('/api/sync');
    const data = await res.json();
    if(data && data.users && data.users.length > 0) {
      const oldScores = JSON.stringify(DB.scores||[]);
      const newScores = JSON.stringify(data.scores||[]);
      if(oldScores !== newScores) {
        DB = data;
        localStorage.setItem('bq_db', JSON.stringify(DB));
        if(typeof initLanding === 'function') initLanding();
        const lp = document.getElementById('leaderboard-page');
        if(lp && lp.classList.contains('active') && typeof renderLbTable === 'function') {
          renderLbTable();
        }
      }
    }
  } catch(e) {}
}
setInterval(pollSync, 5000); // Check for updates every 5 seconds

function loadLocalDB(){
  const raw=localStorage.getItem('bq_db');
  if(raw){DB=JSON.parse(raw)}else{
  DB.questions=JSON.parse(JSON.stringify(SQ));
  DB.quizzes=JSON.parse(JSON.stringify(SEED_QUIZZES));
  DB.users=[
  {id:'u_admin',name:'Admin',email:'admin@brainquest.com',password:'admin123',role:'admin',joined:Date.now(),achievements:[]},
  {id:'u_demo',name:'Demo User',email:'user@brainquest.com',password:'user123',role:'user',joined:Date.now(),achievements:[]}
  ];
  DB.scores=[];DB.streaks={};saveDB()}
}

// THEME
function toggleTheme(){const h=document.documentElement;const d=h.getAttribute('data-theme')!=='light';h.setAttribute('data-theme',d?'light':'dark');localStorage.setItem('bq_theme',d?'light':'dark');updateThemeIcons()}
function updateThemeIcons(){const l=document.documentElement.getAttribute('data-theme')==='light';document.querySelectorAll('.theme-toggle i, #theme-icon-sidebar').forEach(i=>{i.className=l?'fas fa-sun':'fas fa-moon'});const lb=document.getElementById('theme-label');if(lb)lb.textContent=l?'Light Mode':'Dark Mode'}
function loadTheme(){const t=localStorage.getItem('bq_theme');if(t)document.documentElement.setAttribute('data-theme',t);updateThemeIcons()}

// SCREENS
function showScreen(n){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const e=document.getElementById(n+'-screen');if(e)e.classList.add('active')}

// AUTH
let pendingOTP=null,otpTimerInterval=null;
function switchAuth(m){
  document.getElementById('tab-login').classList.toggle('active',m==='login');
  document.getElementById('tab-register').classList.toggle('active',m==='register');
  document.getElementById('login-form').classList.toggle('active',m==='login');
  document.getElementById('register-form').classList.toggle('active',m==='register');
  document.getElementById('otp-form').style.display='none';
  const ff=document.getElementById('forgot-form'); if(ff)ff.style.display='none';
  const fof=document.getElementById('forgot-otp-form'); if(fof)fof.style.display='none';
}
function handleLogin(e){e.preventDefault();const em=document.getElementById('login-email').value.trim().toLowerCase();const pw=document.getElementById('login-pass').value;const u=DB.users.find(u=>u.email===em&&u.password===pw);if(!u){document.getElementById('login-error').textContent='Invalid email or password.';return}document.getElementById('login-error').textContent='';currentUser=u;localStorage.setItem('bq_session',JSON.stringify({id:u.id}));showApp()}
function handleRegister(e){e.preventDefault();const n=document.getElementById('reg-name').value.trim();const em=document.getElementById('reg-email').value.trim().toLowerCase();const pw=document.getElementById('reg-pass').value;if(pw.length<6){document.getElementById('reg-error').textContent='Password must be at least 6 characters.';return}const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!emailRegex.test(em)){document.getElementById('reg-error').textContent='Please enter a valid real email address.';return}const fakeDomains=['tempmail.com','10minutemail.com','mailinator.com','guerrillamail.com','yopmail.com','temp-mail.org','fakeinbox.com','throwawaymail.com'];const domain=em.split('@')[1];if(fakeDomains.includes(domain)){document.getElementById('reg-error').textContent='Disposable or fake email addresses are not allowed.';return}if(DB.users.find(u=>u.email===em)){document.getElementById('reg-error').textContent='Email already registered.';return}document.getElementById('reg-error').textContent='';const regBtn=document.querySelector('#register-form .btn-p');regBtn.disabled=true;regBtn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';fetch('/api/otp/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,name:n})}).then(r=>r.json()).then(data=>{regBtn.disabled=false;regBtn.innerHTML='Send Verification Code <i class="fas fa-paper-plane"></i>';if(data.error){document.getElementById('reg-error').textContent=data.error;return}pendingOTP={name:n,email:em,password:pw,simulated:data.simulated||false,code:data.code||null,expires:Date.now()+300000};document.getElementById('register-form').classList.remove('active');document.getElementById('otp-form').style.display='block';if(data.simulated){document.getElementById('otp-display').innerHTML='<div class="otp-sim-box"><i class="fas fa-envelope-open-text"></i><div>A verification code has been sent to <strong>'+em+'</strong></div><div class="otp-code-preview">'+data.code+'</div><div style="font-size:.68rem;color:var(--t3);margin-top:4px">(Dev mode \u2014 configure EMAIL_USER & EMAIL_PASS in .env for real emails)</div></div>'}else{document.getElementById('otp-display').innerHTML='<div class="otp-sim-box"><i class="fas fa-envelope-open-text"></i><div>A verification code has been sent to<br><strong>'+em+'</strong></div><div style="margin-top:10px;font-size:.85rem;color:var(--g)"><i class="fas fa-check-circle"></i> Check your inbox (and spam folder)</div></div>'}document.getElementById('otp-input').value='';document.getElementById('otp-error').textContent='';startOTPTimer()}).catch(()=>{regBtn.disabled=false;regBtn.innerHTML='Send Verification Code <i class="fas fa-paper-plane"></i>';const code=String(Math.floor(100000+Math.random()*900000));pendingOTP={name:n,email:em,password:pw,simulated:true,code:code,expires:Date.now()+300000};document.getElementById('register-form').classList.remove('active');document.getElementById('otp-form').style.display='block';document.getElementById('otp-display').innerHTML='<div class="otp-sim-box"><i class="fas fa-envelope-open-text"></i><div>A verification code has been sent to <strong>'+em+'</strong></div><div class="otp-code-preview">'+code+'</div><div style="font-size:.68rem;color:var(--t3);margin-top:4px">(Backend not running \u2014 using simulated code)</div></div>';document.getElementById('otp-input').value='';document.getElementById('otp-error').textContent='';startOTPTimer()})}
function handleOTPVerify(e){e.preventDefault();const val=document.getElementById('otp-input').value.trim();if(!pendingOTP){document.getElementById('otp-error').textContent='Session expired. Please register again.';return}if(Date.now()>pendingOTP.expires){document.getElementById('otp-error').textContent='Code expired. Click Resend.';return}const verBtn=document.querySelector('#otp-form .btn-p');verBtn.disabled=true;verBtn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Verifying...';if(pendingOTP.simulated){setTimeout(()=>{verBtn.disabled=false;verBtn.innerHTML='Verify & Create Account <i class="fas fa-check"></i>';if(val!==pendingOTP.code){document.getElementById('otp-error').textContent='Invalid code. Please try again.';return}completeRegistration()},500)}else{fetch('/api/otp/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:pendingOTP.email,code:val})}).then(r=>r.json()).then(data=>{verBtn.disabled=false;verBtn.innerHTML='Verify & Create Account <i class="fas fa-check"></i>';if(data.error){document.getElementById('otp-error').textContent=data.error;return}completeRegistration()}).catch(()=>{verBtn.disabled=false;verBtn.innerHTML='Verify & Create Account <i class="fas fa-check"></i>';document.getElementById('otp-error').textContent='Server error. Please try again.'})}}
function completeRegistration(){const u={id:'u_'+Date.now(),name:pendingOTP.name,email:pendingOTP.email,password:pendingOTP.password,role:'user',joined:Date.now(),achievements:[],verified:true};DB.users.push(u);saveDB();clearInterval(otpTimerInterval);pendingOTP=null;currentUser=u;localStorage.setItem('bq_session',JSON.stringify({id:u.id}));showToast('\u{2705} Email verified! Welcome to BrainQuest!','success');showApp()}
function cancelOTP(){pendingOTP=null;clearInterval(otpTimerInterval);document.getElementById('otp-form').style.display='none';document.getElementById('register-form').classList.add('active')}
function resendOTP(){if(!pendingOTP)return;const resBtn=document.getElementById('resend-btn');resBtn.disabled=true;resBtn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';fetch('/api/otp/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:pendingOTP.email,name:pendingOTP.name})}).then(r=>r.json()).then(data=>{resBtn.disabled=false;resBtn.innerHTML='Resend Code <i class="fas fa-redo"></i>';if(data.simulated){pendingOTP.code=data.code;pendingOTP.simulated=true;const preview=document.getElementById('otp-display').querySelector('.otp-code-preview');if(preview)preview.textContent=data.code}else{pendingOTP.simulated=false}pendingOTP.expires=Date.now()+300000;document.getElementById('otp-error').textContent='';showToast('\u{1F4E7} New code sent!','info');startOTPTimer()}).catch(()=>{resBtn.disabled=false;resBtn.innerHTML='Resend Code <i class="fas fa-redo"></i>';pendingOTP.code=String(Math.floor(100000+Math.random()*900000));pendingOTP.expires=Date.now()+300000;pendingOTP.simulated=true;const preview=document.getElementById('otp-display').querySelector('.otp-code-preview');if(preview)preview.textContent=pendingOTP.code;document.getElementById('otp-error').textContent='';showToast('\u{1F4E7} New code generated (offline mode)','info');startOTPTimer()})}
function startOTPTimer(){clearInterval(otpTimerInterval);let sec=300;const el=document.getElementById('otp-timer');const tick=()=>{if(sec<=0){clearInterval(otpTimerInterval);el.textContent='Code expired';el.style.color='var(--r)';return}const m=Math.floor(sec/60);const s=sec%60;el.textContent='Code expires in '+m+':'+(s<10?'0':'')+s;el.style.color='var(--t2)';sec--};tick();otpTimerInterval=setInterval(tick,1000)}
function togglePw(id,btn){const i=document.getElementById(id);i.type=i.type==='password'?'text':'password';btn.querySelector('i').className=i.type==='password'?'fas fa-eye':'fas fa-eye-slash'}

let pendingForgotOTP=null;
function showForgotForm(e){
  e.preventDefault();
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('forgot-form').style.display='block';
  document.getElementById('forgot-error').textContent='';
  document.getElementById('forgot-email').value='';
}

function handleForgot(e){
  e.preventDefault();
  const em=document.getElementById('forgot-email').value.trim().toLowerCase();
  const u=DB.users.find(u=>u.email===em);
  if(!u){
    document.getElementById('forgot-error').textContent='No account found with that email.';
    return;
  }
  document.getElementById('forgot-error').textContent='';
  const btn=document.querySelector('#forgot-form .btn-p');
  btn.disabled=true; btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  fetch('/api/otp/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,name:u.name})})
  .then(r=>r.json()).then(data=>{
    btn.disabled=false; btn.innerHTML='Send Reset Code <i class="fas fa-paper-plane"></i>';
    if(data.error){document.getElementById('forgot-error').textContent=data.error;return}
    pendingForgotOTP={email:em,simulated:data.simulated||false,code:data.code||null};
    document.getElementById('forgot-form').style.display='none';
    document.getElementById('forgot-otp-form').style.display='block';
    
    if(data.simulated){
      document.getElementById('forgot-otp-display').innerHTML='<div class="otp-sim-box"><i class="fas fa-envelope-open-text"></i><div>A reset code has been sent to <strong>'+em+'</strong></div><div class="otp-code-preview">'+data.code+'</div></div>';
    } else {
      document.getElementById('forgot-otp-display').innerHTML='<div class="otp-sim-box"><i class="fas fa-envelope-open-text"></i><div>A reset code has been sent to<br><strong>'+em+'</strong></div></div>';
    }
  }).catch(()=>{
    btn.disabled=false; btn.innerHTML='Send Reset Code <i class="fas fa-paper-plane"></i>';
    const code=String(Math.floor(100000+Math.random()*900000));
    pendingForgotOTP={email:em,simulated:true,code:code};
    document.getElementById('forgot-form').style.display='none';
    document.getElementById('forgot-otp-form').style.display='block';
    document.getElementById('forgot-otp-display').innerHTML='<div class="otp-sim-box"><i class="fas fa-envelope-open-text"></i><div>A reset code has been sent to <strong>'+em+'</strong></div><div class="otp-code-preview">'+code+'</div></div>';
  });
}

function handleForgotVerify(e){
  e.preventDefault();
  const val=document.getElementById('forgot-otp-input').value.trim();
  const np=document.getElementById('forgot-new-pass').value;
  if(np.length<6){
    document.getElementById('forgot-otp-error').textContent='Password must be at least 6 characters.';
    return;
  }
  if(!pendingForgotOTP){
    document.getElementById('forgot-otp-error').textContent='Session expired.';
    return;
  }
  
  const btn=document.querySelector('#forgot-otp-form .btn-p');
  btn.disabled=true; btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Resetting...';
  
  const finishReset = () => {
    const u=DB.users.find(x=>x.email===pendingForgotOTP.email);
    if(u) u.password=np;
    saveDB();
    pendingForgotOTP=null;
    currentUser=u;
    localStorage.setItem('bq_session',JSON.stringify({id:u.id}));
    showToast('\u{1F512} Password reset successful!','success');
    showApp();
    btn.disabled=false; btn.innerHTML='Reset & Sign In <i class="fas fa-check"></i>';
  };
  
  if(pendingForgotOTP.simulated){
    setTimeout(()=>{
      if(val!==pendingForgotOTP.code){
        btn.disabled=false; btn.innerHTML='Reset & Sign In <i class="fas fa-check"></i>';
        document.getElementById('forgot-otp-error').textContent='Invalid code.';
        return;
      }
      finishReset();
    },500);
  } else {
    fetch('/api/otp/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:pendingForgotOTP.email,code:val})})
    .then(r=>r.json()).then(data=>{
      if(data.error){
        btn.disabled=false; btn.innerHTML='Reset & Sign In <i class="fas fa-check"></i>';
        document.getElementById('forgot-otp-error').textContent=data.error;
        return;
      }
      finishReset();
    }).catch(()=>{
      btn.disabled=false; btn.innerHTML='Reset & Sign In <i class="fas fa-check"></i>';
      document.getElementById('forgot-otp-error').textContent='Server error. Try again.';
    });
  }
}
function logout(){currentUser=null;localStorage.removeItem('bq_session');showLoader();setTimeout(()=>{hideLoader();showScreen('landing')},600)}

// APP SHELL
function showLoader(){document.getElementById('page-loader').classList.add('active')}
function hideLoader(){document.getElementById('page-loader').classList.remove('active')}
function showApp(){showLoader();setTimeout(()=>{showScreen('app');document.getElementById('sidebar-user').textContent='\u{1F464} '+currentUser.name;document.getElementById('topbar-user').textContent=currentUser.name;const isAdmin=currentUser.role==='admin';const ai=document.querySelector('.nav-item.admin-only');if(ai){if(isAdmin)ai.classList.remove('hidden');else ai.classList.add('hidden')}const adminHidePages=['dashboard','kids-zone','leaderboard','history'];document.querySelectorAll('.nav-item[data-page]').forEach(el=>{el.onclick=e=>{e.preventDefault();showPageWithLoader(el.dataset.page)};if(isAdmin&&adminHidePages.includes(el.dataset.page))el.classList.add('hidden');else if(adminHidePages.includes(el.dataset.page))el.classList.remove('hidden')});hideLoader();showPage(isAdmin?'admin':'dashboard')},500)}
function showPageWithLoader(p){showLoader();setTimeout(()=>{hideLoader();showPage(p)},300)}
function showPage(p){document.querySelectorAll('.page').forEach(pg=>pg.classList.remove('active'));document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));const e=document.getElementById('page-'+p);if(e)e.classList.add('active');const nv=document.querySelector('.nav-item[data-page="'+p+'"]');if(nv)nv.classList.add('active');document.getElementById('topbar-title').textContent={dashboard:'Dashboard',categories:'Categories','kids-zone':'Kids Zone',quizzes:'Quizzes',quiz:'Quiz',results:'Results',leaderboard:'Leaderboard',history:'History',profile:'Profile',admin:'Admin Panel'}[p]||'BrainQuest';if(p==='dashboard')renderDashboard();if(p==='categories')renderCategories();if(p==='kids-zone')renderKidsZone();if(p==='leaderboard')renderLeaderboard();if(p==='history')renderHistory();if(p==='profile')renderProfile();if(p==='admin')renderAdmin();document.getElementById('sidebar').classList.remove('open')}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open')}
function toggleMobileNav(){document.getElementById('mobile-nav').classList.toggle('open')}
function closeMobileNav(){document.getElementById('mobile-nav').classList.remove('open')}

// STREAK
function getStreak(){if(!currentUser)return{count:0,dates:[]};return DB.streaks[currentUser.id]||{dates:[],count:0}}
function updateStreak(){if(!currentUser)return;const t=new Date().toISOString().slice(0,10);if(!DB.streaks[currentUser.id])DB.streaks[currentUser.id]={dates:[],count:0};const s=DB.streaks[currentUser.id];if(!s.dates.includes(t)){s.dates.push(t);const y=new Date(Date.now()-86400000).toISOString().slice(0,10);if(s.dates.includes(y)||s.dates.length===1)s.count=(s.count||0)+1;else s.count=1;saveDB();if(s.count>=3)unlockAchievement('streak3');if(s.count>=7)unlockAchievement('streak7')}}
function renderStreakCard(){const s=getStreak();const l=[];for(let i=6;i>=0;i--){const d=new Date(Date.now()-i*86400000).toISOString().slice(0,10);l.push({date:d,done:s.dates&&s.dates.includes(d),today:i===0})}return'<div class="streak-card"><div class="streak-fire" style="font-size:2rem">\u{1F525}</div><div class="streak-info"><div class="streak-label">'+(s.count||0)+' Day Streak</div><div class="streak-sub">Keep it going! Take a quiz today.</div><div class="streak-cal">'+l.map(d=>'<div class="streak-day'+(d.done?' done':'')+(d.today?' today':'')+'" title="'+d.date+'"></div>').join('')+'</div></div></div>'}

// DASHBOARD
function renderDashboard(){const h=new Date().getHours();const g=h<12?'Good morning':h<18?'Good afternoon':'Good evening';document.getElementById('dash-greeting').textContent=g+', '+currentUser.name.split(' ')[0]+'!';document.getElementById('dash-streak').innerHTML=renderStreakCard();const my=DB.scores.filter(s=>s.userId===currentUser.id);const avg=my.length?Math.round(my.reduce((a,s)=>a+s.score,0)/my.length):0;const best=my.length?Math.max(...my.map(s=>s.score)):0;
document.getElementById('dash-stats').innerHTML='<div class="stat-card"><div class="stat-icon" style="background:rgba(79,142,247,.12)">\u{1F3AF}</div><div><div class="stat-val">'+my.length+'</div><div class="stat-lbl">Quizzes Taken</div></div></div><div class="stat-card"><div class="stat-icon" style="background:rgba(245,166,35,.12)">\u2B50</div><div><div class="stat-val">'+avg+'%</div><div class="stat-lbl">Avg Score</div></div></div><div class="stat-card"><div class="stat-icon" style="background:rgba(72,199,142,.12)">\u{1F3C6}</div><div><div class="stat-val">'+best+'%</div><div class="stat-lbl">Best Score</div></div></div><div class="stat-card"><div class="stat-icon" style="background:rgba(224,92,138,.12)">\u{1F396}</div><div><div class="stat-val">'+(currentUser.achievements||[]).length+'</div><div class="stat-lbl">Achievements</div></div></div>';
const dq=DB.quizzes[Math.floor(Date.now()/86400000)%DB.quizzes.length];document.getElementById('dash-daily').innerHTML=dq?'<div class="quiz-card" onclick="startQuiz(\''+dq.id+'\')"><div class="qc-top"><div><div class="qc-title">\u26A1 '+dq.title+'</div><div class="qc-desc">'+(dq.description||'')+'</div></div><span class="diff-badge diff-'+dq.difficulty+'">'+dq.difficulty+'</span></div><div class="qc-meta"><span><i class="fas fa-question-circle"></i> '+dq.questionIds.length+' Qs</span><span><i class="fas fa-clock"></i> '+dq.timePerQ+'s each</span></div></div>':'';
document.getElementById('dash-categories').innerHTML=CATEGORIES.filter(c=>!c.isKids).slice(0,6).map(c=>{const cnt=DB.quizzes.filter(q=>q.category===c.name).length;return'<div class="cat-card" style="--cat-clr:'+c.color+'" onclick="openCategory(\''+c.name+'\')"><div class="cat-icon">'+c.icon+'</div><div class="cat-name">'+c.name+'</div><div class="cat-count">'+cnt+' quiz'+(cnt!==1?'zes':'')+'</div></div>'}).join('');
const rec=[...DB.scores].filter(s=>s.userId===currentUser.id).sort((a,b)=>b.date-a.date).slice(0,5);document.getElementById('dash-recent').innerHTML=rec.length?rec.map(s=>{const qz=DB.quizzes.find(q=>q.id===s.quizId)||{title:'?',category:'?'};return'<div class="hist-item"><div><div class="hist-title">'+qz.title+'</div><div class="hist-meta"><span>'+qz.category+'</span><span>'+fmtDate(s.date)+'</span></div></div><div><div class="hist-score">'+s.score+'%</div><div class="hist-grade">'+gradeLabel(s.score)+'</div></div></div>'}).join(''):'<div class="card" style="text-align:center;padding:2rem;color:var(--t2)">No quizzes yet. <a href="#" onclick="showPage(\'categories\')" style="color:var(--p)">Start one!</a></div>'}

// CATEGORIES
function renderCategories(){document.getElementById('cat-grid').innerHTML=CATEGORIES.map(c=>{const qs=DB.quizzes.filter(q=>q.category===c.name);return'<div class="cat-card" style="--cat-clr:'+c.color+'" onclick="'+(c.isKids?"showPage('kids-zone')":"openCategory('"+c.name+"')")+'"><div class="cat-icon">'+c.icon+'</div><div class="cat-name">'+c.name+'</div><div class="cat-count">'+c.desc+'</div><div style="margin-top:6px;font-size:.72rem;color:var(--t3)">'+qs.length+' quiz'+(qs.length!==1?'zes':'')+'</div></div>'}).join('')}
function openCategory(n){const c=CATEGORIES.find(c=>c.name===n);document.getElementById('quiz-browser-title').textContent=(c?c.icon+' ':'')+n;document.getElementById('quiz-browser-sub').textContent='Select a quiz to start';const qs=DB.quizzes.filter(q=>q.category===n);document.getElementById('quiz-list-grid').innerHTML=qs.length?qs.map(quizCardHTML).join(''):'<p style="color:var(--t2)">No quizzes in this category yet.</p>';showPage('quizzes')}
function quizCardHTML(q){const mb=DB.scores.filter(s=>s.userId===currentUser.id&&s.quizId===q.id);const b=mb.length?Math.max(...mb.map(s=>s.score)):null;return'<div class="quiz-card" onclick="startQuiz(\''+q.id+'\')"><div class="qc-top"><div><div class="qc-title">'+q.title+'</div><div class="qc-desc">'+(q.description||'')+'</div></div><span class="diff-badge diff-'+q.difficulty+'">'+q.difficulty+'</span></div><div class="qc-meta"><span><i class="fas fa-question-circle"></i> '+q.questionIds.length+' Qs</span><span><i class="fas fa-clock"></i> '+q.timePerQ+'s</span><span class="type-badge">'+(q.type||'quiz')+'</span>'+(b!==null?'<span style="color:var(--g)"><i class="fas fa-star"></i> '+b+'%</span>':'')+'</div></div>'}

// KIDS ZONE
function renderKidsZone(){document.getElementById('kids-cat-grid').innerHTML=KIDS_CATS.map(c=>'<div class="kids-card" onclick="openKidsCat(\''+c.name+'\')"><div class="ki">'+c.icon+'</div><div class="kn">'+c.name+'</div><div class="kc">'+c.desc+'</div></div>').join('');document.getElementById('kids-quiz-area').innerHTML=''}
function openKidsCat(n){const qs=DB.quizzes.filter(q=>q.isKids);document.getElementById('kids-quiz-area').innerHTML='<div class="sec-title">\u{1F3AE} '+n+' Quizzes</div><div class="quiz-grid">'+qs.map(quizCardHTML).join('')+'</div>'}
