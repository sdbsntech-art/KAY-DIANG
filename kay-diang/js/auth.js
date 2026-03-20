const Auth = (() => {
  const STORE = 'kd_users';
  const SESSION = 'kd_session';

  const hash = str => {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = (h << 5) + h + str.charCodeAt(i);
    return (h >>> 0).toString(16);
  };

  const getUsers = () => JSON.parse(localStorage.getItem(STORE) || '[]');
  const saveUsers = u => localStorage.setItem(STORE, JSON.stringify(u));

  const initAdmin = () => {
    const users = getUsers();
    if (!users.find(u => u.username === 'admin')) {
      users.push({
        id: 'admin_001',
        name: 'Administrateur',
        username: 'admin',
        email: 'admin@kay-diang.com',
        password: hash('admin123'),
        rawPassword: 'admin123',
        role: 'admin',
        level: 4,
        xp: 9999,
        lessonsCompleted: [],
        testScores: [],
        wordsLearned: 0,
        joinedAt: new Date().toISOString(),
        lastSeen: new Date().toISOString()
      });
      saveUsers(users);
    }
  };

  const getSession = () => JSON.parse(sessionStorage.getItem(SESSION) || 'null');
  const setSession = u => sessionStorage.setItem(SESSION, JSON.stringify(u));
  const clearSession = () => sessionStorage.removeItem(SESSION);

  const register = (name, username, email, password) => {
    if (!name || !username || !email || !password) return { ok: false, msg: 'Tous les champs sont requis.' };
    if (password.length < 6) return { ok: false, msg: 'Le mot de passe doit avoir au moins 6 caractères.' };
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, msg: "L'identifiant ne doit contenir que lettres, chiffres et _." };

    const users = getUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
      return { ok: false, msg: "Cet identifiant est déjà utilisé." };
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, msg: "Cet email est déjà utilisé." };

    const user = {
      id: 'u_' + Date.now(),
      name, username, email,
      password: hash(password),
      rawPassword: password,
      role: 'user',
      level: 0, xp: 0,
      lessonsCompleted: [],
      testScores: [],
      wordsLearned: 0,
      joinedAt: new Date().toISOString(),
      lastSeen: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    setSession(user);
    return { ok: true, user };
  };

  const login = (username, password) => {
    const users = getUsers();
    const user = users.find(u =>
      (u.username.toLowerCase() === username.toLowerCase() ||
       u.email.toLowerCase() === username.toLowerCase()) &&
      u.password === hash(password)
    );
    if (!user) return { ok: false, msg: "Identifiant ou mot de passe incorrect." };
    user.lastSeen = new Date().toISOString();
    saveUsers(users);
    setSession(user);
    return { ok: true, user };
  };

  const logout = () => {
    clearSession();
  };

  const current = () => getSession();

  const updateUser = (updates) => {
    const session = getSession();
    if (!session) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return;
    Object.assign(users[idx], updates);
    saveUsers(users);
    setSession(users[idx]);
    return users[idx];
  };

  const addXP = (amount) => {
    const session = getSession();
    if (!session) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return;
    users[idx].xp = (users[idx].xp || 0) + amount;
    const levelThresholds = [0, 100, 250, 500, 1000, 2000];
    for (let l = levelThresholds.length - 1; l >= 0; l--) {
      if (users[idx].xp >= levelThresholds[l]) { users[idx].level = l; break; }
    }
    saveUsers(users);
    setSession(users[idx]);
    return users[idx];
  };

  const completeLesson = (lessonId, xp) => {
    const session = getSession();
    if (!session) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return;
    if (!users[idx].lessonsCompleted.includes(lessonId)) {
      users[idx].lessonsCompleted.push(lessonId);
      users[idx].wordsLearned = (users[idx].wordsLearned || 0) + 5;
      saveUsers(users);
      setSession(users[idx]);
      return addXP(xp);
    }
    return users[idx];
  };

  const saveTestScore = (testId, score, total) => {
    const session = getSession();
    if (!session) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === session.id);
    if (idx === -1) return;
    users[idx].testScores = users[idx].testScores || [];
    users[idx].testScores.push({ testId, score, total, date: new Date().toISOString() });
    saveUsers(users);
    setSession(users[idx]);
    const xpGained = Math.round((score / total) * 50);
    return addXP(xpGained);
  };

  const allUsers = () => getUsers();

  const deleteUser = (id) => {
    const users = getUsers();
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete && userToDelete.role === 'admin') {
      console.error("La suppression du compte administrateur n'est pas autorisée.");
      return; // On empêche la suppression
    }
    saveUsers(users.filter(u => u.id !== id));
  };

  const resetPassword = (id, newPass) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users[idx].password = hash(newPass);
    users[idx].rawPassword = newPass;
    saveUsers(users);
    return true;
  };

  initAdmin();
  return { register, login, logout, current, updateUser, addXP, completeLesson, saveTestScore, allUsers, deleteUser, resetPassword };
})();

function switchTab(tab) {
  document.getElementById('formLogin').hidden = tab !== 'login';
  document.getElementById('formRegister').hidden = tab !== 'register';
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
}

function togglePw(id, btn) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

document.getElementById('regPw')?.addEventListener('input', function() {
  const v = this.value;
  const bar = document.getElementById('strengthFill');
  let s = 0;
  if (v.length >= 6) s += 25;
  if (v.length >= 10) s += 25;
  if (/[A-Z]/.test(v)) s += 25;
  if (/[0-9!@#$%]/.test(v)) s += 25;
  bar.style.width = s + '%';
  bar.style.background = s < 50 ? '#E05252' : s < 75 ? '#E8A838' : '#3FB950';
});

function login() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPw').value;
  const err = document.getElementById('loginError');
  err.textContent = '';
  if (!u || !p) { err.textContent = 'Veuillez remplir tous les champs.'; return; }
  const res = Auth.login(u, p);
  if (!res.ok) { err.textContent = res.msg; return; }
  initApp(res.user);
}

function register() {
  const name  = document.getElementById('regName').value.trim();
  const user  = document.getElementById('regUser').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pw    = document.getElementById('regPw').value;
  const err   = document.getElementById('regError');
  err.textContent = '';
  const res = Auth.register(name, user, email, pw);
  if (!res.ok) { err.textContent = res.msg; return; }
  initApp(res.user);
}

function logout() {
  Auth.logout();
  document.getElementById('appPage').hidden = true;
  document.getElementById('authPage').hidden = false;
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPw').value = '';
  document.getElementById('userMenu').hidden = true;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (!document.getElementById('formLogin').hidden) login();
    else register();
  }
});
