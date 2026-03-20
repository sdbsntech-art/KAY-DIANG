let activeTest = null;
let currentQ = 0;
let score = 0;
let answered = false;
let timerInterval = null;
let seconds = 0;

function loadTests() {
  currentUser = Auth.current();
  document.getElementById('testMenu').hidden = false;
  document.getElementById('testRunner').hidden = true;
  document.getElementById('testResult').hidden = true;

  const cards = KD.TESTS.map(t => {
    const userLevel = currentUser?.level || 0;
    const locked = t.minLevel > userLevel;
    const scores = (currentUser?.testScores || []).filter(s => s.testId === t.id);
    const best = scores.length ? Math.round(Math.max(...scores.map(s => s.score / s.total * 100))) : null;

    return `<div class="test-level-card ${locked ? 'tlc-locked' : ''}" onclick="${locked ? '' : `startTest('${t.id}')`}">
      <div class="tlc-icon">${locked ? '🔒' : t.minLevel === 0 ? '🌱' : t.minLevel === 1 ? '📗' : t.minLevel === 2 ? '📘' : '📙'}</div>
      <div class="tlc-title">${t.title}</div>
      <div class="tlc-desc">${t.desc}</div>
      <div class="tlc-badge">${locked ? 'Débloque au niveau ' + KD.LEVEL_NAMES[KD.LEVELS[t.minLevel]] : best !== null ? '✅ Meilleur : ' + best + '%' : t.questions.length + ' questions'}</div>
    </div>`;
  }).join('');

  document.getElementById('testLevelCards').innerHTML = cards;
}

function startTest(id) {
  const test = KD.TESTS.find(t => t.id === id);
  if (!test) return;
  activeTest = test;
  currentQ = 0; score = 0; answered = false; seconds = 0;

  document.getElementById('testMenu').hidden = true;
  document.getElementById('testRunner').hidden = false;
  document.getElementById('testResult').hidden = true;
  document.getElementById('testTitle').textContent = test.title;
  showQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    document.getElementById('testTimer').textContent = '⏱ ' + m + ':' + s;
  }, 1000);
}

function showQuestion() {
  if (!activeTest) return;
  const q = activeTest.questions[currentQ];
  const total = activeTest.questions.length;
  answered = false;

  document.getElementById('testQCount').textContent = (currentQ + 1) + ' / ' + total;
  document.getElementById('testProgFill').style.width = (currentQ / total * 100) + '%';
  document.getElementById('btnNext').textContent = currentQ === total - 1 ? 'Terminer →' : 'Suivant →';

  const optHTML = q.opts.map((o, i) =>
    `<button class="qc-option" data-idx="${i}" onclick="selectAnswer(${i})">${o}</button>`
  ).join('');

  document.getElementById('questionCard').innerHTML = `
    <div class="qc-question">Question ${currentQ + 1} — ${q.q}</div>
    ${q.ar ? `<div class="qc-arabic">${q.ar}</div>` : ''}
    <div class="qc-options">${optHTML}</div>
    <div id="qFeedback"></div>`;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = activeTest.questions[currentQ];
  const opts = document.querySelectorAll('.qc-option');

  opts.forEach(o => o.classList.add('disabled'));
  opts[idx].classList.add(idx === q.ans ? 'correct' : 'wrong');
  if (idx !== q.ans) opts[q.ans].classList.add('correct');

  if (idx === q.ans) score++;

  document.getElementById('qFeedback').innerHTML =
    `<div class="qc-feedback ${idx === q.ans ? 'ok' : 'ko'}">
      ${idx === q.ans ? '✅ Correct !' : '❌ Incorrect.'} ${q.exp}
    </div>`;
}

function nextQuestion() {
  if (!answered && activeTest) {
    toast('Sélectionnez une réponse avant de continuer', 'err');
    return;
  }
  currentQ++;
  if (currentQ >= activeTest.questions.length) {
    finishTest();
  } else {
    showQuestion();
  }
}

function finishTest() {
  clearInterval(timerInterval);
  const total = activeTest.questions.length;
  const pct = Math.round(score / total * 100);
  const min = Math.floor(seconds / 60), sec = seconds % 60;
  const timeStr = (min ? min + 'min ' : '') + sec + 'sec';

  Auth.saveTestScore(activeTest.id, score, total);
  currentUser = Auth.current();

  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '📚';
  const msg = pct >= 90 ? 'Exceptionnel ! Vous maîtrisez ce niveau !'
            : pct >= 70 ? 'Très bien ! Continuez ainsi !'
            : pct >= 50 ? 'Bien essayé ! Révisez les erreurs et recommencez.'
            : 'Continuez à réviser, vous y arriverez !';

  const xpGained = Math.round(pct / 2);

  document.getElementById('testRunner').hidden = true;
  document.getElementById('testResult').hidden = false;
  document.getElementById('resultCard').innerHTML = `
    <div class="rc-emoji">${emoji}</div>
    <div class="rc-score">${pct}%</div>
    <div style="font-size:1.1rem;font-weight:600;margin-bottom:8px">${score} / ${total} bonnes réponses</div>
    <div class="rc-msg">${msg}</div>
    <div style="font-size:.82rem;color:var(--text2);margin-bottom:8px">Temps : ${timeStr} · +${xpGained} XP gagnés</div>
    <div class="rc-actions">
      <button class="btn-rc" onclick="startTest('${activeTest.id}')">🔄 Recommencer</button>
      <button class="btn-rc primary" onclick="loadTests()">📋 Autres tests</button>
      <button class="btn-rc" onclick="showSection('dashboard')">🏠 Accueil</button>
    </div>`;
}
