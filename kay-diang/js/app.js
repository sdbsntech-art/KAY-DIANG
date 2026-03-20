let currentUser = null;
let currentTheme = localStorage.getItem('kd_theme') || 'dark';
const MAX_TOTAL_XP = 2000; // XP for Expert level, based on level thresholds in auth.js

function updateGlobalProgressBar() {
  if (!currentUser) return;
  const xp = currentUser.xp || 0;
  const percent = Math.min(100, (xp / MAX_TOTAL_XP) * 100);
  
  const fill = document.getElementById('globalXpFill');
  if (fill) {
    fill.style.width = percent + '%';
  }
}

function initApp(user) {
  currentUser = user;
  document.getElementById('authPage').hidden = true;
  document.getElementById('appPage').hidden = false;
  document.getElementById('globalProgressBar').hidden = false;
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('btnTheme') && (document.getElementById('btnTheme').textContent = currentTheme === 'dark' ? '☀️' : '🌙');
  document.querySelector('.btn-theme').textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  const initial = (user.name || user.username || '?')[0].toUpperCase();
  document.getElementById('avatarInitial').textContent = initial;
  document.getElementById('umName').textContent = user.name || user.username;
  document.getElementById('umLevel').textContent = KD.LEVEL_NAMES[KD.LEVELS[user.level || 0]] || 'Débutant';

  if (user.role === 'admin') {
    document.getElementById('adminNavLink').style.display = '';
  }

  updateGlobalProgressBar();
  loadDashboard();
  loadVocabulary();
  loadGrammar();
  loadHadiths();
  loadAllLessons();
  showSection('dashboard');
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('kd_theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.querySelector('.btn-theme').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  toast('Thème ' + (currentTheme === 'dark' ? 'sombre' : 'clair') + ' activé', 'info');
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  const link = document.querySelector(`.nav-link[onclick*="${id}"]`);
  if (link) link.classList.add('active');

  // Refresh user data on section change, as it might have been updated by tests etc.
  currentUser = Auth.current();

  if (id === 'dashboard') loadDashboard();
  if (id === 'profile') loadProfile();
  if (id === 'admin') loadAdmin();
  if (id === 'tests') loadTests();
  updateGlobalProgressBar();
}

function toggleUserMenu() {
  const m = document.getElementById('userMenu');
  m.hidden = !m.hidden;
}
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-avatar')) {
    const m = document.getElementById('userMenu');
    if (m) m.hidden = true;
  }
});

function toast(msg, type = 'ok') {
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  document.getElementById('toastZone').appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3200);
}

function loadDashboard() {
  if (!currentUser) return; // currentUser is now set in showSection

  const levelName = KD.LEVEL_NAMES[KD.LEVELS[currentUser.level || 0]] || '🌱 Débutant';
  const maxXP = KD.LEVEL_XP[KD.LEVELS[currentUser.level]] || 100;
  const xp = currentUser.xp || 0;
  const pct = Math.min(100, Math.round((xp % maxXP) / maxXP * 100));

  document.getElementById('welcomeMsg').textContent = 'أَهْلاً ' + (currentUser.name || currentUser.username) + '!';
  document.getElementById('dashLevel').textContent = levelName;
  document.getElementById('dashProgBar').style.width = pct + '%';
  document.getElementById('dashXP').textContent = xp + ' XP total';
  document.getElementById('dashLessons').textContent = (currentUser.lessonsCompleted || []).length;
  document.getElementById('dashWords').textContent = currentUser.wordsLearned || 0;

  const scores = currentUser.testScores || [];
  if (scores.length) {
    const avg = Math.round(scores.reduce((s, t) => s + t.score / t.total * 100, 0) / scores.length);
    document.getElementById('dashScore').textContent = avg + '%';
  } else {
    document.getElementById('dashScore').textContent = '—';
  }

  const grid = document.getElementById('quickLessons');
  const userLevel = currentUser.level || 0;
  const available = KD.LESSONS.filter(l => KD.LEVELS.indexOf(l.level) <= userLevel + 1).slice(0, 4);
  grid.innerHTML = available.map(l => lessonCard(l)).join('');

  const hd = KD.DAILY_HADITHS[new Date().getDate() % KD.DAILY_HADITHS.length];
  document.getElementById('hwArabic').textContent = hd.arabic;
  document.getElementById('hwText').textContent = hd.text;
  document.getElementById('hwSource').textContent = hd.source;
}

function lessonCard(l) {
  const done = (currentUser?.lessonsCompleted || []).includes(l.id);
  return `<div class="lesson-card" style="--lc-color:${l.color}" onclick="openLesson('${l.id}')">
    <div class="lc-level">${KD.LEVEL_NAMES[l.level] || l.level}</div>
    <div class="lc-arabic">${l.arabic}</div>
    <div class="lc-title">${l.title}</div>
    <div class="lc-desc">${l.desc}</div>
    <div class="lc-footer">
      <span class="lc-done">${done ? '✅ Complétée' : '📖 À faire'}</span>
      <span class="lc-xp">+${l.xp} XP</span>
    </div>
  </div>`;
}

function loadAllLessons() {
  document.getElementById('allLessonsGrid').innerHTML = KD.LESSONS.map(l => lessonCard(l)).join('');
}

function filterLessons(level) {
  document.querySelectorAll('.lvl-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  const filtered = level === 'all' ? KD.LESSONS : KD.LESSONS.filter(l => l.level === level);
  document.getElementById('allLessonsGrid').innerHTML = filtered.map(l => lessonCard(l)).join('');
}

function openLesson(id) {
  const l = KD.LESSONS.find(x => x.id === id);
  if (!l) return;
  const done = (currentUser?.lessonsCompleted || []).includes(l.id);

  // Génération du tableau des formes si disponible
  let wordsHTML = '';
  const hasForms = l.content.words && l.content.words[0].forms;

  if (hasForms) {
    wordsHTML = `
    <div class="forms-table-wrap" style="overflow-x:auto;">
      <table class="forms-table" style="width:100%; text-align:center; border-collapse:collapse;">
        <thead>
          <tr style="background:var(--bg3); color:var(--text2); font-size:0.85rem;">
            <th style="padding:8px;">Lettre</th>
            <th>Isolé</th><th>Début</th><th>Milieu</th><th>Fin</th>
            <th>Son</th>
          </tr>
        </thead>
        <tbody>
          ${l.content.words.map(w => `
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:10px; font-family:'Amiri',serif; font-size:1.4rem;">${w.ar}</td>
              <td class="ar-text" style="font-family:'Amiri',serif; font-size:1.4rem; color:var(--text1);">${w.forms.iso}</td>
              <td class="ar-text" style="font-family:'Amiri',serif; font-size:1.4rem; color:var(--blue);">${w.forms.ini}</td>
              <td class="ar-text" style="font-family:'Amiri',serif; font-size:1.4rem; color:var(--gold);">${w.forms.med}</td>
              <td class="ar-text" style="font-family:'Amiri',serif; font-size:1.4rem; color:var(--red);">${w.forms.fin}</td>
              <td style="font-size:0.9rem; color:var(--text2);">${w.fr}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
  } else {
    // Fallback ancien affichage
    wordsHTML = (l.content.words || []).map(w =>
      `<div class="lv-word-row">
        <div class="lv-word-ar ar-text">${w.ar}</div>
        <div class="lv-word-tr">${w.tr}</div>
        <div class="lv-word-fr">${w.fr}</div>
      </div>`
    ).join('');
  }

  // Section Pratique de Lecture (Audio + Combinaison)
  let readingHTML = '';
  if (l.content.reading) {
    readingHTML = `<div class="lv-section">
      <h3>🎧 Pratique de Lecture & Prononciation</h3>
      <p style="margin-bottom:15px; font-size:0.9rem; color:var(--text2);">Écoutez et répétez. Décomposez le mot pour mieux lire.</p>
      <div class="reading-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:15px;">
        ${l.content.reading.map(r => `
          <div class="reading-card" style="background:var(--bg2); padding:15px; border-radius:10px; border:1px solid var(--border); display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div class="rc-word ar-text" data-orig="${r.word}" style="font-family:'Amiri',serif; font-size:1.8rem; margin-bottom:5px;">${r.word}</div>
              <div class="rc-parts" style="color:var(--text2); font-size:0.9rem;">
                ${r.parts.map(p => `<span style="display:inline-block; padding:2px 6px; background:var(--bg3); border-radius:4px; margin-right:4px;">${p}</span>`).join(' + ')}
              </div>
              <div class="rc-fr" style="font-size:0.85rem; color:var(--gold); margin-top:4px;">${r.fr}</div>
            </div>
            <button onclick="speakArabic('${r.word}')" style="background:var(--gold); border:none; width:40px; height:40px; border-radius:50%; cursor:pointer; font-size:1.2rem; box-shadow:0 2px 5px rgba(0,0,0,0.2);">🔊</button>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  const exHTML = (l.content.examples || []).map(e =>
    `<div class="lv-ex">
      <div class="lv-ex-ar ar-text" data-orig="${e.ar}">${e.ar}</div>
      <div class="lv-ex-fr">${e.fr}</div>
    </div>`
  ).join('');

  document.getElementById('lessonView').innerHTML = `
    <div class="lesson-view">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <button class="lv-back" onclick="showSection('lessons')">← Retour</button>
        <button onclick="toggleVowels(this)" class="btn-harakat" style="padding:6px 12px; border-radius:20px; border:1px solid var(--border); background:var(--bg2); cursor:pointer; font-size:0.85rem;">👁️ Masquer Voyelles</button>
      </div>
      
      <div class="lc-level" style="color:${l.color}; font-size:.78rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; margin-top:10px;">${KD.LEVEL_NAMES[l.level]}</div>
      <h2 class="lv-title" style="margin-bottom:5px;">${l.title}</h2>
      <div class="lv-arabic-title">${l.arabic}</div>
      
      <div class="lv-section">
        <h3>Introduction</h3>
        <p class="lv-content">${l.content.intro}</p>
      </div>
      
      ${wordsHTML ? `<div class="lv-section"><h3>🔤 Formes des Lettres</h3>${wordsHTML}</div>` : ''}
      
      ${readingHTML}

      ${exHTML ? `<div class="lv-section"><h3>Exemples</h3>${exHTML}</div>` : ''}
      ${l.content.note ? `<div class="lv-section"><h3>💡 Bon à savoir</h3><p class="lv-content" style="background:var(--bg3);padding:16px;border-radius:8px;border-left:3px solid var(--gold)">${l.content.note}</p></div>` : ''}
      <button class="btn-complete" id="btnComplete" onclick="completeLesson('${l.id}', ${l.xp})" ${done ? 'disabled' : ''}>
        ${done ? '✅ Leçon déjà complétée' : '✅ Marquer comme complétée (+' + l.xp + ' XP)'}
      </button>
    </div>`;

  showSection('lesson-view');
}

function toggleVowels(btn) {
  const isHidden = btn.getAttribute('data-hidden') === 'true';
  const elements = document.querySelectorAll('.ar-text');
  
  // Regex pour attraper les voyelles (Fatha, Damma, Kasra, Sukun, Tanwin, Shadda...)
  const harakatRegex = /[\u064B-\u065F\u0670]/g;

  elements.forEach(el => {
    const original = el.getAttribute('data-orig') || el.textContent; // Utilise data-orig s'il existe
    if (!el.getAttribute('data-orig')) el.setAttribute('data-orig', original);
    
    el.textContent = isHidden ? original : original.replace(harakatRegex, '');
  });

  btn.textContent = isHidden ? '👁️ Masquer Voyelles' : '👁️ Afficher Voyelles';
  btn.setAttribute('data-hidden', !isHidden);
}

function completeLesson(id, xp) {
  const updated = Auth.completeLesson(id, xp);
  currentUser = updated;
  document.getElementById('btnComplete').disabled = true;
  document.getElementById('btnComplete').textContent = '✅ Leçon complétée !';
  toast('🎉 Leçon complétée ! +' + xp + ' XP gagnés', 'ok');
  updateGlobalProgressBar();
  loadAllLessons();
}

function loadVocabulary() {
  renderVocab(KD.VOCABULARY);
}

function filterVocab() {
  const search = document.getElementById('vocabSearch').value.toLowerCase();
  const cat    = document.getElementById('vocabCat').value;
  const filtered = KD.VOCABULARY.filter(w =>
    (!search || w.fr.toLowerCase().includes(search) || w.ar.includes(search) || w.tr.toLowerCase().includes(search)) &&
    (!cat || w.cat === cat)
  );
  renderVocab(filtered);
}

function renderVocab(words) {
  document.getElementById('vocabGrid').innerHTML = words.map(w =>
    `<div class="vocab-card">
      <div class="vc-arabic">${w.ar}</div>
      <div class="vc-transliteration">${w.tr}</div>
      <div class="vc-french">${w.fr}</div>
      <div class="vc-cat">${w.cat}</div>
      <button class="vc-audio" onclick="speakArabic('${w.ar}')">🔊 Écouter</button>
    </div>`
  ).join('') || '<p style="color:var(--text2);padding:20px">Aucun résultat</p>';
}

function speakArabic(text) {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ar-SA'; u.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } else {
    toast("Synthèse vocale non disponible sur ce navigateur", 'err');
  }
}

function loadGrammar() {
  document.getElementById('grammarGrid').innerHTML = KD.GRAMMAR.map(g =>
    `<div class="grammar-card">
      <div class="gc-title">${g.title}</div>
      <div class="gc-desc">${g.desc}</div>
      <div class="gc-example">
        <div class="gc-ar">${g.example.ar}</div>
        <div class="gc-fr">${g.example.fr}</div>
      </div>
    </div>`
  ).join('');
}

function loadHadiths() {
  document.getElementById('hadithList').innerHTML = KD.HADITHS.map(h =>
    `<div class="hadith-item">
      <div class="hi-narrator">${h.narrator}</div>
      <div class="hi-arabic">${h.arabic}</div>
      <div class="hi-french">${h.french}</div>
      <div class="hi-lesson">💡 ${h.lesson}</div>
      <div class="hi-source">Source : ${h.source}</div>
    </div>`
  ).join('');
}

function loadProfile() {
  if (!currentUser) return; // currentUser is now set in showSection
  const level = KD.LEVELS[currentUser.level || 0];
  const levelName = KD.LEVEL_NAMES[level] || '🌱 Débutant';
  const scores = currentUser.testScores || [];
  const avg = scores.length ? Math.round(scores.reduce((s, t) => s + t.score / t.total * 100, 0) / scores.length) : 0;

  document.getElementById('profileCard').innerHTML = `
    <div class="pc-header">
      <div class="pc-avatar">${(currentUser.name || '?')[0].toUpperCase()}</div>
      <div>
        <div class="pc-name">${currentUser.name || currentUser.username}</div>
        <div class="pc-username">@${currentUser.username}</div>
        <span class="pc-level-badge">${levelName}</span>
      </div>
    </div>
    <div class="pc-stats">
      <div class="pc-stat"><div class="pcs-val">${currentUser.xp || 0}</div><div class="pcs-label">XP Total</div></div>
      <div class="pc-stat"><div class="pcs-val">${(currentUser.lessonsCompleted || []).length}</div><div class="pcs-label">Leçons</div></div>
      <div class="pc-stat"><div class="pcs-val">${currentUser.wordsLearned || 0}</div><div class="pcs-label">Mots</div></div>
      <div class="pc-stat"><div class="pcs-val">${scores.length ? avg + '%' : '—'}</div><div class="pcs-label">Score moy.</div></div>
    </div>
    <div style="margin-top:8px">
      <div style="font-size:.82rem;color:var(--text2);margin-bottom:12px">Inscrit le ${new Date(currentUser.joinedAt).toLocaleDateString('fr-FR')}</div>
      ${scores.length ? `
        <h3 style="font-size:.9rem;font-weight:700;color:var(--text2);margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em">Historique des tests</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${scores.slice().reverse().slice(0,10).map(s => {
            const test = KD.TESTS.find(t => t.id === s.testId);
            const pct = Math.round(s.score / s.total * 100);
            return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--bg3);border-radius:8px">
              <span style="font-size:.88rem">${test ? test.title : s.testId}</span>
              <span style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)'}">${pct}%</span>
            </div>`;
          }).join('')}
        </div>
      ` : '<p style="color:var(--text2);font-size:.88rem">Aucun test effectué pour le moment.</p>'}
    </div>`;
}

window.addEventListener('click', e => {
  if (e.target.classList.contains('overlay')) {
    document.getElementById('lessonModal').hidden = true;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const session = Auth.current();
  if (session) initApp(session);
});
