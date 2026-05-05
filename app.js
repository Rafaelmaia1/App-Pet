/**
 * PawApp v3 — app.js
 * Multi-perfil: Tutor · Veterinário · Lojista · Pet Sitter · Admin
 */

// ══════════════════════════════════════
// ESTADO GLOBAL
// ══════════════════════════════════════
const STATE = {
  currentType: 'usuario',
  vetOnline: true,
  cart: [],
  bannedUsers: new Set(),
  warnedUsers: new Set(),
  calMonth: 4,
  calYear: 2025,
  sharedMsgs: {
    'consulta': [
      { from: 'vet', text: 'Olá! Sou o Dr. Carlos. Como posso ajudar o Thor hoje? 🐾' },
    ],
    'vet-consulta': [
      { from: 'user', text: 'Oi Doutor! O Thor está coçando muito a orelha há 2 dias.' },
      { from: 'vet', text: 'Entendi! Pode enviar uma foto da orelha?' },
      { from: 'user', text: '📎 orelha_thor.jpg — foto enviada' },
    ],
    'geral-u': [
      { from: 'other', text: 'Bom dia! Receita enviada por e-mail. Qualquer dúvida pode chamar! 🐾' },
      { from: 'me', text: 'Muito obrigado doutor! O Thor está melhorando. 😊' },
    ],
    'geral-v': [
      { from: 'other', text: 'Oi Doutor! O Thor está coçando muito a orelha.' },
      { from: 'me', text: 'Vou analisar a foto. Continue com o tratamento. 💊' },
    ],
    'geral-l': [
      { from: 'other', text: 'Oi! Gostaria de saber sobre o status do meu pedido #1042' },
    ],
    'geral-ps': [
      { from: 'other', text: 'Boa tarde! O Thor está bem? Podem tirar uma foto?' },
    ],
  },
  agendaEvents: [
    { date: '10 Mai', time: '10:00', name: '✂️ Banho e Tosa — Thor', local: 'PetShop Elegance', type: 'banho' },
    { date: '15 Mai', time: '10:00', name: '✂️ Banho — Thor', local: 'PetShop Elegance', type: 'banho' },
    { date: '18 Mai', time: '14:00', name: '💉 Vacina Antirrábica — Thor', local: 'Dr. Carlos Silva · Clínica PetVida', type: 'vacina' },
  ],
};

const CONTACTS = {
  usuario: [
    { id: 'c1', av: '👨‍⚕️', name: 'Dr. Carlos Silva', preview: 'Receita enviada. Qualquer dúvida...', time: '14:32', unread: 2, online: true },
    { id: 'c2', av: '✂️', name: 'PetShop Elegance', preview: 'Agendamento confirmado para...', time: '10:15', unread: 1, online: false },
    { id: 'c3', av: '👩‍⚕️', name: 'Dra. Ana Beatriz', preview: 'Resultado do exame ficou pronto', time: 'Ontem', unread: 0, online: true },
    { id: 'c4', av: '🛒', name: 'PetLand Loja', preview: 'Seu pedido foi enviado!', time: 'Segunda', unread: 0, online: false },
  ],
  veterinario: [
    { id: 'v1', av: '🐕', name: 'João Silva (Thor)', preview: 'Oi Doutor! Posso tirar uma dúvida?', time: '14:32', unread: 2, online: true },
    { id: 'v2', av: '🐈', name: 'Ana Lima (Luna)', preview: 'Obrigada pelo atendimento!', time: '11:20', unread: 1, online: true },
    { id: 'v3', av: '🐕‍🦺', name: 'Maria (Rex)', preview: 'Quando pode o retorno?', time: 'Ontem', unread: 0, online: false },
  ],
  lojista: [
    { id: 'l1', av: '🐕', name: 'Maria Santos', preview: 'Quando chega meu pedido?', time: '09:10', unread: 1, online: true },
    { id: 'l2', av: '🐈', name: 'Pedro Alves', preview: 'Pode trocar o tamanho?', time: '08:45', unread: 0, online: false },
    { id: 'l3', av: '🐕‍🦺', name: 'Joana Costa', preview: 'Produto chegou perfeito! ⭐⭐⭐⭐⭐', time: 'Ontem', unread: 0, online: false },
  ],
  petsitter: [
    { id: 'ps1', av: '🐕', name: 'João Silva', preview: 'O Thor está bem?', time: '13:00', unread: 1, online: true },
    { id: 'ps2', av: '🐈', name: 'Ana Lima', preview: 'Pode cuidar da Luna em junho?', time: 'Ontem', unread: 0, online: false },
  ],
};

// ══════════════════════════════════════
// LOGIN
// ══════════════════════════════════════
let selectedLoginType = 'usuario';

function selectType(btn) {
  document.querySelectorAll('.atype-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedLoginType = btn.dataset.type;
}

function selectTypeModal(btn) {
  btn.closest('.account-type-grid').querySelectorAll('.atype-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function quickLogin(type) {
  selectedLoginType = type;
  doLogin();
}

function doLogin() {
  const type = selectedLoginType;
  STATE.currentType = type;
  showPage('page-' + type);
  initPageForType(type);
  const names = { usuario:'Tutor de Pet 🐶', veterinario:'Veterinário 🩺', lojista:'Lojista 🏪', petsitter:'Pet Sitter 🧳', admin:'Admin 🛡️' };
  showToast('✅ Bem-vindo! Logado como ' + (names[type] || type));
  setTimeout(() => { if (type === 'usuario') showSOSToast(); }, 5000);
}

function logout() {
  showPage('page-login');
  showToast('👋 Até logo!');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const p = document.getElementById(id);
  if (p) p.classList.add('active');
}

function togglePass() {
  const inp = document.getElementById('login-pass');
  if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
}

function showRegisterModal() { openModal('modal-register'); }

// ══════════════════════════════════════
// INIT POR TIPO
// ══════════════════════════════════════
function initPageForType(type) {
  if (type === 'usuario') {
    buildCalendar('cal-grid','cal-title');
    buildTimeline();
    buildConvList('conv-list-u','usuario');
    loadChat('msgs-consulta','consulta','usuario');
    loadChat('msgs-geral-u','geral-u','usuario');
    startCountdown();
  }
  if (type === 'veterinario') {
    buildCalendar('cal-grid-v','cal-title-v');
    buildConvList('conv-list-v','veterinario');
    loadChat('msgs-vet-consulta','vet-consulta','veterinario');
    loadChat('msgs-geral-v','geral-v','veterinario');
  }
  if (type === 'lojista') {
    buildConvList('conv-list-l','lojista');
    loadChat('msgs-geral-l','geral-l','lojista');
  }
  if (type === 'petsitter') {
    buildCalendar('cal-grid-ps','cal-title-ps');
    buildConvList('conv-list-ps','petsitter');
    loadChat('msgs-geral-ps','geral-ps','petsitter');
  }
}

// ══════════════════════════════════════
// NAVEGAÇÃO
// ══════════════════════════════════════
function goSec(btn, secId) {
  const page = document.querySelector('.page.active');
  if (!page) return;
  page.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(secId);
  if (target) { target.classList.add('active'); target.scrollTop = 0; }
  page.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    if (n.dataset.sec === secId) n.classList.add('active');
  });
  if (btn) { page.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active')); btn.classList.add('active'); }
  closeSidebar();
}

function toggleSidebar(id) {
  const sb = document.getElementById(id);
  const ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.toggle('open');
  if (ov) ov.classList.toggle('open');
}

function closeSidebar() {
  document.querySelectorAll('.sidebar').forEach(s => s.classList.remove('open'));
  const ov = document.getElementById('sidebar-overlay');
  if (ov) ov.classList.remove('open');
}

// ══════════════════════════════════════
// CHAT
// ══════════════════════════════════════
function loadChat(containerId, key, userType) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '<div class="msg-date">Hoje</div>';
  (STATE.sharedMsgs[key] || []).forEach(m => {
    const isSent = m.from === 'me' || m.from === userType || (userType === 'veterinario' && m.from === 'vet') || (userType === 'usuario' && m.from === 'user');
    addMsgBubble(c, m.text, isSent, userType);
  });
  c.scrollTop = c.scrollHeight;
}

function addMsgBubble(container, text, isSent, userType) {
  const div = document.createElement('div');
  div.className = 'msg ' + (isSent ? 'sent' : 'received');
  const b = document.createElement('div');
  b.className = 'msg-bubble';
  if (!isSent && userType === 'veterinario') b.classList.add('vet-msg');
  if (isSent && userType === 'veterinario') b.classList.add('vet-sent');
  b.textContent = text;
  div.appendChild(b);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function sendChatMsg(event, chatKey, userType) {
  if (event.key && event.key !== 'Enter') return;
  const input = document.getElementById('ci-' + chatKey);
  const container = document.getElementById('msgs-' + chatKey);
  if (!input || !container || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = '';
  if (!STATE.sharedMsgs[chatKey]) STATE.sharedMsgs[chatKey] = [];
  STATE.sharedMsgs[chatKey].push({ from: userType, text });
  addMsgBubble(container, text, true, userType);
  clearAttach('attach-prev');

  // Digitando...
  const typing = document.createElement('div');
  typing.className = 'msg received';
  typing.innerHTML = '<div class="msg-bubble" style="opacity:.5;font-style:italic">Digitando... ✍️</div>';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const responses = {
      usuario: ['Entendido! Vou verificar isso. 🩺','Pode me enviar uma foto?','Isso é comum. Não se preocupe! 😊','Vou emitir uma prescrição agora. 💊','Continue o tratamento por 5 dias. ✅'],
      veterinario: ['Obrigado Doutor! Vou fazer isso.','Quantas vezes por dia devo aplicar?','O Thor está melhorando! 😊','Quando posso agendar o retorno?','Perfeito, obrigado pela atenção!'],
      lojista: ['Obrigado! Aguardo a confirmação.','Pode enviar o código de rastreio?','Quando o produto chega?','Tudo bem! Obrigado.'],
      petsitter: ['Que ótimo! Manda foto do meu bebê! 📸','O Thor come às 8h e 18h.','Obrigado pelo cuidado! 🐾','Qualquer coisa pode me ligar. 📱'],
    };
    const opts = responses[userType] || responses.usuario;
    const reply = opts[Math.floor(Math.random() * opts.length)];
    STATE.sharedMsgs[chatKey].push({ from: 'other', text: reply });
    addMsgBubble(container, reply, false, userType);
  }, 1400 + Math.random() * 600);
}

// ══════════════════════════════════════
// LISTA DE CONVERSAS
// ══════════════════════════════════════
function buildConvList(listId, type) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = '';
  (CONTACTS[type] || []).forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'conv-item' + (i === 0 ? ' active' : '');
    item.innerHTML = `
      <div class="conv-av">${c.av}</div>
      <div class="conv-info">
        <div class="conv-name">${c.name}${c.online ? ' <span class="online-dot"></span>' : ''}</div>
        <div class="conv-preview">${c.preview}</div>
      </div>
      <div class="conv-meta">
        <div class="conv-time">${c.time}</div>
        ${c.unread ? `<div class="conv-unread">${c.unread}</div>` : ''}
      </div>`;
    item.addEventListener('click', () => {
      list.querySelectorAll('.conv-item').forEach(x => x.classList.remove('active'));
      item.classList.add('active');
      const badge = item.querySelector('.conv-unread');
      if (badge) badge.remove();
      const sfx = {usuario:'u',veterinario:'v',lojista:'l',petsitter:'ps'}[type];
      const nameEl = document.getElementById('msg-name-'+sfx);
      const avEl = document.getElementById('msg-av-'+sfx);
      if (nameEl) nameEl.textContent = c.name;
      if (avEl) avEl.textContent = c.av;
      showToast('💬 Conversa: ' + c.name);
    });
    list.appendChild(item);
  });
}

// ══════════════════════════════════════
// VET / PACIENTE SELEÇÃO
// ══════════════════════════════════════
function selectVetChat(el, name, icon) {
  document.querySelectorAll('.vet-card-item').forEach(c => c.classList.remove('active-vet'));
  el.classList.add('active-vet');
  const av = document.getElementById('vet-av'); const nm = document.getElementById('vet-name');
  if (av) av.textContent = icon; if (nm) nm.textContent = name;
  showToast('🩺 ' + name + ' selecionado');
}

function selectPatientChat(el, petName, petIcon, ownerName) {
  document.querySelectorAll('.vet-card-item').forEach(c => c.classList.remove('active-vet'));
  el.classList.add('active-vet');
  const av = document.getElementById('pat-av'); const nm = document.getElementById('pat-name');
  const fav = document.getElementById('pat-ficha-av'); const fnm = document.getElementById('pat-ficha-name');
  if (av) av.textContent = petIcon; if (nm) nm.textContent = petName + ' — ' + ownerName;
  if (fav) fav.textContent = petIcon; if (fnm) fnm.textContent = petName;
  showToast('📋 Ficha de ' + petName + ' carregada');
}

// ══════════════════════════════════════
// CURTIDAS / FOLLOW / SHARE / SALVAR
// ══════════════════════════════════════
function toggleLike(btnId, countId) {
  const btn = document.getElementById(btnId);
  const cnt = document.getElementById(countId);
  if (!btn || !cnt) return;
  const n = parseInt(cnt.textContent) || 0;
  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    btn.innerHTML = btn.innerHTML.replace('❤️','🤍');
    cnt.textContent = n - 1;
  } else {
    btn.classList.add('liked');
    btn.innerHTML = btn.innerHTML.replace('🤍','❤️');
    cnt.textContent = n + 1;
    btn.style.transform = 'scale(1.35)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  }
}

function toggleFollow(btn) {
  if (btn.classList.contains('following')) {
    btn.classList.remove('following'); btn.textContent = '+ Seguir'; showToast('Deixou de seguir');
  } else {
    btn.classList.add('following'); btn.textContent = 'Seguindo';
    btn.style.transform = 'scale(1.15)'; setTimeout(() => { btn.style.transform = ''; }, 220);
    showToast('Agora seguindo! 🐾');
  }
}

function toggleFollowBtn(btn) {
  if (btn.textContent === 'Seguir') {
    btn.textContent = '✓'; btn.style.background = 'var(--accent)'; btn.style.color = '#fff'; btn.style.border = 'none';
    showToast('Agora seguindo! 🐾');
  } else {
    btn.textContent = 'Seguir'; btn.style.background = ''; btn.style.color = ''; btn.style.border = '';
  }
}

function savePost(btn) {
  btn.style.color = 'var(--accent)';
  showToast('📌 Post salvo!');
}

function sharePost() {
  if (navigator.share) {
    navigator.share({ title: 'PawApp', text: 'Veja no PawApp! 🐾', url: window.location.href });
  } else {
    navigator.clipboard?.writeText(window.location.href);
    showToast('🔗 Link copiado!');
  }
}

// ══════════════════════════════════════
// FILTROS / TABS
// ══════════════════════════════════════
function setFilter(el) {
  const p = el.closest('.filter-bar,.vet-status-filter,.conv-tabs');
  if (!p) return;
  p.querySelectorAll('.fc,.filter-chip,.ctab').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function setHTab(el) {
  const p = el.closest('.htabs,.header-tabs');
  if (!p) return;
  p.querySelectorAll('.htab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ══════════════════════════════════════
// CALENDÁRIO
// ══════════════════════════════════════
const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const EVENT_DAYS = { 10:true, 15:true, 18:true };

function buildCalendar(gridId, titleId) {
  const grid = document.getElementById(gridId);
  const title = document.getElementById(titleId);
  if (!grid || !title) return;
  title.textContent = MONTHS[STATE.calMonth] + ' ' + STATE.calYear;
  grid.innerHTML = '';
  ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].forEach(d => {
    const dn = document.createElement('div');
    dn.className = 'cal-day-name'; dn.textContent = d; grid.appendChild(dn);
  });
  const firstDay = new Date(STATE.calYear, STATE.calMonth, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement('div'); e.className = 'cal-day empty'; grid.appendChild(e);
  }
  const total = new Date(STATE.calYear, STATE.calMonth + 1, 0).getDate();
  const today = new Date();
  for (let d = 1; d <= total; d++) {
    const el = document.createElement('div');
    el.className = 'cal-day'; el.textContent = d;
    const isToday = d === today.getDate() && STATE.calMonth === today.getMonth() && STATE.calYear === today.getFullYear();
    if (isToday) el.classList.add('today');
    if (EVENT_DAYS[d]) el.classList.add('has-event');
    el.addEventListener('click', () => {
      grid.querySelectorAll('.cal-day').forEach(x => { if (!x.classList.contains('today')) { x.style.background=''; x.style.color=''; x.style.fontWeight=''; } });
      if (!el.classList.contains('today')) { el.style.background='rgba(92,184,122,.15)'; el.style.color='var(--accent)'; el.style.fontWeight='700'; }
      showToast(EVENT_DAYS[d] ? '📅 Evento em ' + d + ' de ' + MONTHS[STATE.calMonth] : '📅 ' + d + ' de ' + MONTHS[STATE.calMonth] + ' — sem eventos');
    });
    grid.appendChild(el);
  }
}

function changeMonth(dir) {
  STATE.calMonth += dir;
  if (STATE.calMonth < 0) { STATE.calMonth = 11; STATE.calYear--; }
  if (STATE.calMonth > 11) { STATE.calMonth = 0; STATE.calYear++; }
  [['cal-grid','cal-title'],['cal-grid-v','cal-title-v'],['cal-grid-ps','cal-title-ps']].forEach(([g,t]) => buildCalendar(g,t));
}

function buildTimeline() {
  const c = document.getElementById('agenda-events');
  if (!c) return;
  c.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.style.cssText = 'border-left:2px solid var(--border);padding-left:14px;margin-left:6px';
  STATE.agendaEvents.forEach(ev => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-dot" style="background:${ev.type==='vacina'?'var(--accent2)':'var(--accent)'}"></div>
      <div class="tl-date">${ev.date} · ${ev.time}</div>
      <div>
        <div class="tl-name">${ev.name}</div>
        <div class="tl-local">${ev.local}</div>
      </div>
      <div class="tl-acts">
        <button class="btn-xs" onclick="showToast('📅 Reagendando...')">Reagendar</button>
        <button class="btn-xs btn-red-outline" onclick="this.closest('.tl-item').style.opacity='.4';this.closest('.tl-item').style.textDecoration='line-through';showToast('❌ Cancelado: ${ev.name.replace(/'/g,'')}')">Cancelar</button>
      </div>`;
    wrap.appendChild(item);
  });
  c.appendChild(wrap);
}

function saveAppointment() {
  closeModal('modal-agendar');
  showToast('✅ Agendamento salvo! Lembrete 24h antes.');
}

// ══════════════════════════════════════
// MAPA
// ══════════════════════════════════════
function searchMapa() {
  const q = document.getElementById('mapa-search')?.value?.trim();
  if (q) showToast('🔍 Buscando: "' + q + '" perto de você...');
  else showToast('🔍 Digite algo para buscar');
}

function selectPlace(el) {
  document.querySelectorAll('.place-card').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}

// ══════════════════════════════════════
// CARRINHO
// ══════════════════════════════════════
function addToCart(name, price) {
  STATE.cart.push({ name, price });
  showToast('🛒 ' + name + ' adicionado! ('+STATE.cart.length+' item'+(STATE.cart.length>1?'s':'')+')');
}

// ══════════════════════════════════════
// MÍDIA / ANEXO
// ══════════════════════════════════════
function attachMedia(areaId) {
  const area = document.getElementById(areaId);
  if (area) { area.style.display = 'block'; showToast('📷 Arquivo selecionado — clique Enviar'); }
}

function clearAttach(areaId) {
  const area = document.getElementById(areaId || 'attach-prev');
  if (area) area.style.display = 'none';
}

// ══════════════════════════════════════
// COMENTÁRIOS
// ══════════════════════════════════════
function addComment() {
  const input = document.getElementById('ci-comment');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim(); input.value = '';
  const list = document.querySelector('.comments-list');
  if (!list) return;
  const item = document.createElement('div');
  item.className = 'comment-item';
  item.innerHTML = `<div class="c-av" style="background:linear-gradient(135deg,#f6a35c,#e8604c)">🐶</div><div><div class="c-name">Você</div><div class="c-text">${escHtml(text)}</div></div>`;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
  showToast('💬 Comentário publicado!');
}

// ══════════════════════════════════════
// STATUS VET/SITTER
// ══════════════════════════════════════
function toggleVetStatus() {
  STATE.vetOnline = !STATE.vetOnline;
  document.querySelectorAll('.btn-status').forEach(btn => {
    btn.textContent = STATE.vetOnline ? '🟢 Online' : '🔴 Offline';
    btn.style.background = STATE.vetOnline ? 'rgba(92,184,122,.15)' : 'rgba(224,85,85,.1)';
    btn.style.color = STATE.vetOnline ? 'var(--accent)' : 'var(--red)';
  });
  showToast(STATE.vetOnline ? '🟢 Você está online!' : '🔴 Você está offline.');
}

// ══════════════════════════════════════
// COUNTDOWN
// ══════════════════════════════════════
let _secs = 2*3600+14*60+33, _cdTimer = null;
function startCountdown() {
  if (_cdTimer) clearInterval(_cdTimer);
  _cdTimer = setInterval(() => {
    if (_secs <= 0) { clearInterval(_cdTimer); return; }
    _secs--;
    const el = document.getElementById('countdown-tag');
    if (!el) return;
    const h = Math.floor(_secs/3600), m = Math.floor((_secs%3600)/60), s = _secs%60;
    el.textContent = `⚡ Oferta relâmpago · ${p2(h)}:${p2(m)}:${p2(s)}`;
  }, 1000);
}
function p2(n) { return String(n).padStart(2,'0'); }

// ══════════════════════════════════════
// ADMIN
// ══════════════════════════════════════
function banUser(userId, rowId) {
  STATE.bannedUsers.add(userId);
  if (rowId) {
    const row = document.getElementById(rowId);
    if (row) {
      row.style.opacity = '.5'; row.style.background = '#fff8f8';
      const chip = row.querySelector('.status-chip');
      if (chip) { chip.className = 'status-chip ban-chip'; chip.textContent = 'Banido'; }
      const banBtn = row.querySelector('.btn-red.btn-xs');
      if (banBtn) { banBtn.className = 'btn-primary btn-xs'; banBtn.textContent = '✅ Desbanir'; banBtn.onclick = () => unbanUser(userId, rowId); }
    }
  }
  showToast('🚫 @' + userId + ' foi banido!');
}

function unbanUser(userId, rowId) {
  STATE.bannedUsers.delete(userId);
  if (rowId) {
    const row = document.getElementById(rowId);
    if (row) {
      row.style.opacity = ''; row.style.background = '';
      const chip = row.querySelector('.status-chip');
      if (chip) { chip.className = 'status-chip ok-chip'; chip.textContent = 'Ativo'; }
    }
  }
  showToast('✅ @' + userId + ' foi desbanido!');
}

function warnUser(userId) {
  STATE.warnedUsers.add(userId);
  showToast('⚠️ @' + userId + ' foi advertido! E-mail enviado.');
}

function removePost(el) {
  const card = el.closest ? el.closest('.pm-card,.den-card,.tl-item') : el;
  if (card) {
    card.style.transition = 'all .4s'; card.style.opacity = '0';
    setTimeout(() => { card.style.maxHeight = '0'; card.style.padding = '0'; card.style.margin = '0'; card.style.overflow = 'hidden'; }, 100);
    setTimeout(() => card.remove(), 500);
  }
  showToast('🗑️ Postagem removida!');
}

function approvePost(el) {
  const card = el.closest ? el.closest('.pm-card,.den-card') : null;
  if (card) {
    const st = card.querySelector('.pm-status,.den-badge');
    if (st) { st.className = st.className.includes('pm') ? 'pm-status ok' : 'den-badge low-badge'; st.textContent = '✅ Aprovada'; }
    card.querySelectorAll('.btn-red').forEach(b => { b.disabled = true; b.style.opacity = '.4'; });
  }
  showToast('✅ Postagem aprovada!');
}

function filterUsers() {
  const q = (document.getElementById('user-search')?.value || '').toLowerCase();
  document.querySelectorAll('.ut-row').forEach(r => {
    const nm = (r.querySelector('.ut-name')?.textContent || '').toLowerCase();
    const em = (r.querySelector('.ut-email')?.textContent || '').toLowerCase();
    r.style.display = (nm.includes(q) || em.includes(q)) ? '' : 'none';
  });
}

// ══════════════════════════════════════
// MODAIS
// ══════════════════════════════════════
function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }
function closeModalOut(event, id) { if (event.target.id === id) closeModal(id); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal-wrap.open').forEach(m => m.classList.remove('open')); });

// ══════════════════════════════════════
// TOAST
// ══════════════════════════════════════
let _toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ══════════════════════════════════════
// SOS TOAST
// ══════════════════════════════════════
function showSOSToast() {
  if (document.getElementById('sos-float')) return;
  const el = document.createElement('div');
  el.id = 'sos-float';
  el.style.cssText = 'position:fixed;bottom:70px;right:16px;background:#E05555;color:#fff;padding:12px 16px;border-radius:14px;font-family:"Sora",sans-serif;font-size:.8rem;font-weight:700;box-shadow:0 8px 32px rgba(224,85,85,.4);z-index:9000;cursor:pointer;max-width:280px;line-height:1.5';
  el.innerHTML = '🆘 <strong>SOS Ativo!</strong><br><span style="font-size:.74rem;font-weight:400">Rex está perdido a 2,3 km de você</span>';
  el.addEventListener('click', () => { goSec(null,'u-sos'); el.remove(); });
  document.body.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 8000);
}

// ══════════════════════════════════════
// UTIL
// ══════════════════════════════════════
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// Drag-to-scroll
function initDragScroll(el) {
  if (!el) return;
  let down = false, sx, sl;
  el.addEventListener('mousedown', e => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; });
  el.addEventListener('mouseleave', () => down = false);
  el.addEventListener('mouseup', () => down = false);
  el.addEventListener('mousemove', e => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx); });
}

// ══════════════════════════════════════
// INICIALIZAÇÃO
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  showPage('page-login');
  document.querySelectorAll('.stories-row').forEach(initDragScroll);

  // Cria overlay mobile
  if (!document.getElementById('sidebar-overlay')) {
    const ov = document.createElement('div');
    ov.className = 'sidebar-overlay'; ov.id = 'sidebar-overlay';
    ov.onclick = closeSidebar;
    document.body.appendChild(ov);
  }

  console.log('🐾 PawApp v3 — Multi-perfil iniciado!');
});

// Expõe globalmente
Object.assign(window, {
  selectType, selectTypeModal, quickLogin, doLogin, logout, togglePass, showRegisterModal,
  goSec, toggleSidebar, closeSidebar,
  sendChatMsg, selectVetChat, selectPatientChat,
  toggleLike, toggleFollow, toggleFollowBtn, savePost, sharePost,
  setFilter, setHTab, changeMonth, saveAppointment,
  searchMapa, selectPlace, addToCart,
  attachMedia, clearAttach, addComment,
  toggleVetStatus, startCountdown,
  banUser, unbanUser, warnUser, removePost, approvePost, filterUsers,
  openModal, closeModal, closeModalOut, showToast, showSOSToast,
});
