// ===== API Base URL (auto-detect proxy prefix) =====
const BASE = window.location.pathname.startsWith('/bugtracker') ? '/bugtracker' : '';

// ===== State =====
let bugs = [];
let filter = 'all';
let searchQuery = '';
let filterPriority = '';
let filterPlatform = '';
let pastedFiles = []; // {data: base64, type: 'image'|'video', blob: File|null}

// ===== DOM =====
const bugList = document.getElementById('bugList');
const modal = document.getElementById('bugModal');
const lightbox = document.getElementById('lightbox');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  loadBugs();
  setupPasteZone();
  setupGlobalPaste();
});

// ===== API =====
async function loadBugs() {
  try {
    const res = await fetch(BASE + '/api/bugs');
    bugs = await res.json();
    renderBugs();
    renderStats();
  } catch (e) { console.error(e); }
}

async function submitBug(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Đang gửi...';

  const form = document.getElementById('bugForm');
  const fd = new FormData();
  fd.append('title', form.title.value.trim());
  fd.append('description', form.description.value.trim());
  fd.append('module', form.module.value.trim());
  fd.append('priority', form.priority.value);
  fd.append('reporter', form.reporter.value.trim());
  fd.append('platform', form.platform.value);

  // Uploaded files
  const fileInput = document.getElementById('fileInput');
  for (const f of fileInput.files) fd.append('files', f);

  // Pasted files
  if (pastedFiles.length > 0) {
    const pasted = pastedFiles.map(p => ({ data: p.data, type: p.type }));
    fd.append('pastedImages', JSON.stringify(pasted));
  }

  try {
    const res = await fetch(BASE + '/api/bugs', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success) {
      showToast('✅ Đã báo lỗi thành công!');
      closeModal();
      loadBugs();
    }
  } catch (e) {
    showToast('❌ Lỗi khi gửi!');
  }
  btn.disabled = false;
  btn.textContent = 'Lưu Bug';
}

async function updateStatus(id, status) {
  try {
    await fetch(BASE + '/api/bugs/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    showToast('✅ Cập nhật trạng thái!');
    loadBugs();
  } catch (e) { showToast('❌ Lỗi!'); }
}

async function deleteBug(id) {
  if (!confirm('Xoá bug này?')) return;
  try {
    await fetch(BASE + '/api/bugs/' + id, { method: 'DELETE' });
    showToast('🗑️ Đã xoá!');
    loadBugs();
  } catch (e) { showToast('❌ Lỗi!'); }
}

// ===== Render =====
function renderStats() {
  const counts = { all: bugs.length, open: 0, fixing: 0, done: 0 };
  bugs.forEach(b => {
    if (b.status === 'Chưa fix') counts.open++;
    else if (b.status === 'Đang fix') counts.fixing++;
    else if (b.status === 'Đã fix' || b.status === 'Xong') counts.done++;
  });
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countOpen').textContent = counts.open;
  document.getElementById('countFixing').textContent = counts.fixing;
  document.getElementById('countDone').textContent = counts.done;
}

function renderBugs() {
  let filtered = [...bugs];

  // Status filter
  if (filter === 'open') filtered = filtered.filter(b => b.status === 'Chưa fix');
  else if (filter === 'fixing') filtered = filtered.filter(b => b.status === 'Đang fix');
  else if (filter === 'done') filtered = filtered.filter(b => b.status === 'Đã fix' || b.status === 'Xong');

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.description || '').toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      (b.module || '').toLowerCase().includes(q)
    );
  }

  // Priority filter
  if (filterPriority) filtered = filtered.filter(b => b.priority === filterPriority);
  // Platform filter
  if (filterPlatform) filtered = filtered.filter(b => b.platform === filterPlatform);

  if (filtered.length === 0) {
    bugList.innerHTML = '<div class="empty-state"><div class="icon">🐛</div><h3>Chưa có bug nào</h3><p>Nhấn "+ Báo lỗi mới" để thêm</p></div>';
    return;
  }

  bugList.innerHTML = filtered.map(b => {
    const prClass = 'badge-' + b.priority.toLowerCase();
    const stClass = b.status === 'Chưa fix' ? 'status-chua' : b.status === 'Đang fix' ? 'status-dang' : b.status === 'Đã fix' ? 'status-da' : 'status-xong';
    const time = formatTime(b.created_at);

    let filesHtml = '';
    if (b.files && b.files.length) {
      filesHtml = '<div class="bug-files">' + b.files.map(f => {
        const url = f.url.startsWith('http') ? f.url : BASE + f.url;
        if (f.type && f.type.startsWith('video')) {
          return `<video class="bug-file-video" src="${url}" onclick="openLightbox('${url}','video')" muted></video>`;
        }
        return `<img class="bug-file-thumb" src="${url}" alt="" onclick="openLightbox('${url}','image')" loading="lazy"/>`;
      }).join('') + '</div>';
    }

    return `<div class="bug-card">
      <div class="bug-meta">
        <span class="badge ${prClass}">${b.priority}</span>
        <span class="status-badge ${stClass}" onclick="toggleStatusMenu(event,'${b.id}')">${b.status} ▾</span>
        <span style="color:var(--text-secondary);font-size:12px">${b.reporter || 'N/A'}</span>
        <span class="platform-badge">${b.platform || 'Web'}</span>
        ${b.module ? `<span style="color:var(--text-secondary);font-size:12px">📦 ${b.module}</span>` : ''}
      </div>
      <div class="bug-title">${escapeHtml(b.title)}</div>
      ${b.description ? `<div class="bug-desc">${escapeHtml(b.description)}</div>` : ''}
      ${filesHtml}
      <div class="bug-footer">
        <span>🕐 ${time}</span>
        <div class="bug-actions">
          <button class="action-btn" onclick="deleteBug('${b.id}')" title="Xoá">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ===== Status Menu =====
function toggleStatusMenu(e, bugId) {
  e.stopPropagation();
  // Remove existing
  document.querySelectorAll('.status-dropdown.show').forEach(d => d.remove());
  const statuses = ['Chưa fix', 'Đang fix', 'Đã fix', 'Xong'];
  const dd = document.createElement('div');
  dd.className = 'status-dropdown show';
  dd.innerHTML = statuses.map(s => `<div class="status-option" onclick="updateStatus('${bugId}','${s}')">${s}</div>`).join('');
  const badge = e.target;
  badge.style.position = 'relative';
  badge.appendChild(dd);
  setTimeout(() => document.addEventListener('click', () => dd.remove(), { once: true }), 10);
}

// ===== Modal =====
function openModal() {
  modal.classList.add('show');
  pastedFiles = [];
  document.getElementById('bugForm').reset();
  document.getElementById('pastePreviewContainer').innerHTML = '';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  pastedFiles = [];
  document.body.style.overflow = '';
}

// ===== Paste & Drop =====
function setupPasteZone() {
  const zone = document.getElementById('pasteZone');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    handleDroppedFiles(e.dataTransfer.files);
  });
  zone.addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput').addEventListener('change', e => handleDroppedFiles(e.target.files));
}

function setupGlobalPaste() {
  document.addEventListener('paste', e => {
    if (!modal.classList.contains('show')) return;
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/') || item.type.startsWith('video/')) {
        e.preventDefault();
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = ev => {
          const type = item.type.startsWith('video') ? 'video' : 'image';
          pastedFiles.push({ data: ev.target.result, type });
          renderPastePreviews();
        };
        reader.readAsDataURL(blob);
      }
    }
  });
}

function handleDroppedFiles(files) {
  for (const file of files) {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;
    const reader = new FileReader();
    reader.onload = ev => {
      const type = file.type.startsWith('video') ? 'video' : 'image';
      pastedFiles.push({ data: ev.target.result, type });
      renderPastePreviews();
    };
    reader.readAsDataURL(file);
  }
}

function renderPastePreviews() {
  const c = document.getElementById('pastePreviewContainer');
  c.innerHTML = pastedFiles.map((p, i) => {
    const media = p.type === 'video'
      ? `<video src="${p.data}" muted></video>`
      : `<img src="${p.data}" alt=""/>`;
    return `<div class="paste-preview">${media}<button class="remove-btn" onclick="removePasted(${i})">✕</button></div>`;
  }).join('');
}

function removePasted(i) {
  pastedFiles.splice(i, 1);
  renderPastePreviews();
}

// ===== Lightbox =====
function openLightbox(url, type) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lbContent');
  if (type === 'video') {
    content.innerHTML = `<video src="${url}" controls autoplay style="max-width:90vw;max-height:90vh;border-radius:8px"></video>`;
  } else {
    content.innerHTML = `<img src="${url}" style="max-width:90vw;max-height:90vh;border-radius:8px"/>`;
  }
  lb.classList.add('show');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('show');
  document.getElementById('lbContent').innerHTML = '';
}

// ===== Filter =====
function setFilter(f) {
  filter = f;
  document.querySelectorAll('.stat-chip').forEach(c => c.classList.remove('active'));
  document.querySelector(`[data-filter="${f}"]`).classList.add('active');
  renderBugs();
}

// ===== Helpers =====
function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function formatTime(iso) {
  const d = new Date(iso);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Search
if (searchInput) {
  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    renderBugs();
  });
}

// Filter selects
function onFilterPriority(val) { filterPriority = val; renderBugs(); }
function onFilterPlatform(val) { filterPlatform = val; renderBugs(); }
