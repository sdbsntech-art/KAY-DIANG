function loadAdmin() {
  currentUser = Auth.current();
  if (!currentUser || currentUser.role !== 'admin') {
    showSection('dashboard');
    toast('Accès réservé aux administrateurs', 'err');
    return;
  }
  renderAdminUsers();
}

function adminTab(tab) {
  document.querySelectorAll('.adm-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('adminUsers').hidden = tab !== 'users';
  document.getElementById('adminStats').hidden = tab !== 'stats';
  if (tab === 'stats') renderStats();
}

function renderAdminUsers() {
  const users = Auth.allUsers();
  const tbody = document.getElementById('adminTbody');
  tbody.innerHTML = users.map(u => `
    <tr>
      <td><strong>${u.name || '—'}</strong></td>
      <td>@${u.username}</td>
      <td>${u.role === 'admin' ? '******' : u.email}</td>
      <td>${KD.LEVEL_NAMES[KD.LEVELS[u.level || 0]] || '🌱 Débutant'}</td>
      <td><strong style="color:var(--gold)">${u.xp || 0}</strong></td>
      <td>${new Date(u.joinedAt).toLocaleDateString('fr-FR')}</td>
      <td>
        <button class="btn-adm" onclick="showUserDetail('${u.id}')" style="color:var(--blue);border-color:var(--blue);background:rgba(56,139,253,.08);margin-right:4px">👁 Détail</button>
        <button class="btn-adm" onclick="resetUserPassword('${u.id}')" title="Réinitialiser MDP" style="color:var(--gold);border-color:var(--gold);background:rgba(232,168,56,.08);margin-right:4px">🔑</button>
        ${u.role !== 'admin' ? `<button class="btn-adm del" onclick="deleteUserAdmin('${u.id}')">🗑 Suppr.</button>` : '<span style="font-size:.72rem;color:var(--text3)">Admin</span>'}
      </td>
    </tr>`
  ).join('');
}

function showUserDetail(id) {
  const users = Auth.allUsers();
  const u = users.find(x => x.id === id);
  if (!u) return;
  const scores = u.testScores || [];
  const modal = document.getElementById('lessonModal');
  document.getElementById('modalContent').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
      <h3 style="font-size:1.2rem;font-weight:800">${u.name || u.username}</h3>
      <button onclick="document.getElementById('lessonModal').hidden=true" style="background:none;border:none;color:var(--text2);font-size:1.2rem;cursor:pointer">✕</button>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:.88rem">
      ${[
        ['Prénom', u.name],['Username', '@'+u.username],['Email', u.role === 'admin' ? '******' : u.email],
        ['Rôle', u.role],['Niveau', KD.LEVEL_NAMES[KD.LEVELS[u.level||0]]],
        ['XP', u.xp||0],['Leçons complétées', (u.lessonsCompleted||[]).length],
        ['Mots appris', u.wordsLearned||0],
        ['Mot de passe (hash)', `<span class="adm-pw">${u.role === 'admin' ? '******' : u.password}</span>`],
        ['Inscrit le', new Date(u.joinedAt).toLocaleString('fr-FR')],
        ['Vu la dernière fois', new Date(u.lastSeen).toLocaleString('fr-FR')],
        ['Tests passés', scores.length],
      ].map(([k,v]) => `<tr><td style="padding:8px 4px;color:var(--text2);border-bottom:1px solid var(--border);width:45%">${k}</td><td style="padding:8px 4px;border-bottom:1px solid var(--border);font-weight:500">${v}</td></tr>`).join('')}
    </table>
    ${scores.length ? `
      <h4 style="margin:16px 0 10px;font-size:.88rem;color:var(--text2);text-transform:uppercase;letter-spacing:.06em">Historique des tests</h4>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${scores.map(s => {
          const test = KD.TESTS.find(t => t.id === s.testId);
          const pct = Math.round(s.score / s.total * 100);
          return `<div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg3);border-radius:6px;font-size:.82rem">
            <span>${test ? test.title : s.testId}</span>
            <span style="font-weight:700;color:${pct >= 70 ? 'var(--green)' : 'var(--red)'}">${pct}% (${s.score}/${s.total})</span>
          </div>`;
        }).join('')}
      </div>
    ` : ''}`;
  modal.hidden = false;
}

function deleteUserAdmin(id) {
  if (!confirm('Supprimer cet utilisateur ? Cette action est irréversible.')) return;
  Auth.deleteUser(id);
  renderAdminUsers();
  toast('Utilisateur supprimé', 'info');
}

function resetUserPassword(id) {
  const newPw = prompt("Entrez le nouveau mot de passe pour cet utilisateur :");
  if (newPw === null) return; // Annulé
  if (newPw.length < 6) {
    alert("Le mot de passe doit contenir au moins 6 caractères.");
    return;
  }
  Auth.resetPassword(id, newPw);
  renderAdminUsers();
  toast('Mot de passe mis à jour avec succès', 'ok');
}

function renderStats() {
  const users = Auth.allUsers();
  const allScores = users.flatMap(u => u.testScores || []);
  const totalLessons = users.reduce((s, u) => s + (u.lessonsCompleted || []).length, 0);
  const avgXP = users.length ? Math.round(users.reduce((s, u) => s + (u.xp || 0), 0) / users.length) : 0;
  const avgScore = allScores.length ? Math.round(allScores.reduce((s, t) => s + t.score / t.total * 100, 0) / allScores.length) : 0;

  document.getElementById('statsGrid').innerHTML = [
    ['👥', users.length, 'Utilisateurs inscrits'],
    ['📖', totalLessons, 'Leçons complétées'],
    ['🎯', allScores.length, 'Tests effectués'],
    ['⭐', avgXP, 'XP moyen par user'],
    ['📊', allScores.length ? avgScore + '%' : '—', 'Score moyen aux tests'],
    ['🌱', users.filter(u => (u.level||0) === 0).length, 'Débutants'],
    ['📗', users.filter(u => (u.level||0) === 1).length, 'Élémentaires'],
    ['📘', users.filter(u => (u.level||0) >= 2).length, 'Intermédiaires+'],
  ].map(([icon, val, label]) =>
    `<div class="stat-box">
      <div style="font-size:2rem;margin-bottom:8px">${icon}</div>
      <div class="sb-val">${val}</div>
      <div class="sb-label">${label}</div>
    </div>`
  ).join('');
}
