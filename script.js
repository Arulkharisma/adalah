/* ══════════════════════════════════════
   FOR YOU — SCRIPT.JS
   Pesan tersimpan di JSONBin.io (shared, bisa dilihat semua user)
   
   SETUP (WAJIB sebelum hosting):
   1. Daftar gratis di https://jsonbin.io
   2. Buat akun → copy API Key dari dashboard
   3. Klik "Create Bin" → isi dengan: {"messages":[]}  → copy BIN ID
   4. Ganti nilai JSONBIN_API_KEY dan JSONBIN_BIN_ID di bawah
══════════════════════════════════════ */

const JSONBIN_API_KEY = '$2a$10$LwhCMhJONuHm37bGBOi0KezLF5kEsskFKk8apl1u9QyUe8whhkhSC'; // ← ganti ini
const JSONBIN_BIN_ID = '6a1b4471ddf5aa59f7796cd6';         // ← ganti ini
const READ_PASS       = 'sayangku';

/* ════════════════════
   CURSOR (desktop)
════════════════════ */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
setInterval(() => {
  tx += (mx - tx) * .16;
  ty += (my - ty) * .16;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
}, 16);

/* ── Click sparks ── */
const sparkEmojis = ['💗','✨','🌸','💕','⭐','🌷'];
document.addEventListener('click', e => {
  for (let i = 0; i < 4; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    const dx = (Math.random() - .5) * 80;
    const dy = (Math.random() - .5) * 80;
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${dx}px;--dy:${dy}px;animation-delay:${i * .05}s`;
    s.textContent = sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)];
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
});

/* ════════════════
   FLOATING PETALS
════════════════ */
const petalColors = ['#f9c8d9','#fce4ec','#f2b5cb','#fdd5e3','#ffeef4'];
const petalsBg    = document.getElementById('petalsBg');
for (let i = 0; i < 22; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const sz = 5 + Math.random() * 14;
  p.style.cssText = `
    left:${Math.random() * 100}vw;
    width:${sz}px; height:${sz}px;
    background:${petalColors[i % petalColors.length]};
    animation-duration:${9 + Math.random() * 13}s;
    animation-delay:${Math.random() * 12}s;
  `;
  petalsBg.appendChild(p);
}

/* ════════════════
   SPLASH SCREEN
════════════════ */
function enterSite() {
  document.getElementById('splash').classList.add('hide');
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('app').classList.add('visible');
  }, 900);
}

/* ════════════════════════════════
   NAVBAR — DESKTOP + HAMBURGER
════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 10);
});

let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('hamburger').classList.toggle('open', menuOpen);
  document.getElementById('mobileMenu').classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

function closeMenu() {
  menuOpen = false;
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (menuOpen) closeMenu();
    closeLightbox();
  }
});

function go(id, el) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
  // sync mobile menu highlight
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.classList.toggle('mob-active', a.dataset.section === id);
  });
  window.scrollTo(0, 0);
}

function goMobile(id) {
  go(id, null);
  closeMenu();
}

/* ════════════════════════════════
   GALERI — POLAROID
════════════════════════════════ */
const photoData = [
  { caption: 'Momen paling manis 🌸', sticker: '🌸', stickerPos: 'tl', tape: true, defaultImg: 'images/foto1.png' },
  { caption: 'Senyummu favoritku ✨', sticker: '✨', stickerPos: 'tr', tape: false, defaultImg: 'images/foto2.png' },
  { caption: 'Hari yang tak terlupakan 🌷', sticker: '🌷', stickerPos: 'br', tape: true, defaultImg: 'images/foto3.png' },
  { caption: 'Berdua selalu hangat 💕', sticker: '💕', stickerPos: 'tl', tape: true, defaultImg: 'images/foto4.png' },
  { caption: 'Tertawa bersama 🥰', sticker: '🥰', stickerPos: 'tr', tape: false, defaultImg: 'images/foto5.png' },
  { caption: 'Kamu & aku 💌', sticker: '💌', stickerPos: 'tl', tape: true, defaultImg: 'images/foto6.png' },
  { caption: 'Momen kebersamaan 🌼', sticker: '🌼', stickerPos: 'br', tape: false, defaultImg: 'images/foto7.png' },
  { caption: 'Selalu bersamamu 💗', sticker: '💗', stickerPos: 'tr', tape: true, defaultImg: 'images/foto8.png' },
];

// Photos stored locally per device (base64)
const PHOTO_KEY  = 'love_gallery_v2';
const photoStore = {};

function loadPhotoStore() {
  try { Object.assign(photoStore, JSON.parse(localStorage.getItem(PHOTO_KEY) || '{}')); } catch {}
}
function savePhotoStore() {
  try { localStorage.setItem(PHOTO_KEY, JSON.stringify(photoStore)); } catch {}
}
loadPhotoStore();

function buildGallery() {
  const grid = document.getElementById('photoGrid');
  grid.innerHTML = '';
  photoData.forEach((item, i) => {
    const hasPhoto = !!photoStore[i];
    const div = document.createElement('div');
    div.className = 'photo-item';

    const tapeHTML    = item.tape ? `<div class="tape"></div>` : '';
    const stickerHTML = `<div class="sticker ${item.stickerPos}" style="animation-delay:${i * .3}s">${item.sticker}</div>`;

    const imgSrc = photoStore[i] || item.defaultImg || null;
    const imgHTML = imgSrc
      ? `<img src="${imgSrc}" alt="foto ${i + 1}">
         <div class="ph-tag" style="position:absolute;bottom:0;left:0;right:0;">
           <label>🔄 Ganti
             <input type="file" accept="image/*" onchange="uploadPhoto(event,${i})">
           </label>
         </div>`
      : `<div class="photo-placeholder">
           <span class="ph-icon">📷</span>
           <span class="ph-text">Tap untuk menambahkan foto</span>
           <div class="ph-tag">
             <label>+ Pilih Foto
               <input type="file" accept="image/*" onchange="uploadPhoto(event,${i})">
             </label>
           </div>
         </div>`;

    div.innerHTML = `
      ${tapeHTML}
      ${stickerHTML}
      <div class="polaroid">
        <div class="photo-slot">${imgHTML}</div>
        <div class="polaroid-caption">${item.caption}</div>
      </div>`;

    div.addEventListener('click', e => {
      if (!e.target.closest('label')) openLightbox(i);
    });
    grid.appendChild(div);
  });
}
buildGallery();

function uploadPhoto(e, idx) {
  const file = e.target.files[0];
  if (!file) return;
  e.stopPropagation();

  const reader = new FileReader();
  reader.onload = ev => openCropEditor(ev.target.result, idx);
  reader.readAsDataURL(file);
}

/* ── CROP EDITOR ── */
let cropIdx = null;
let cropImg = null;
let isDragging = false, isResizing = false;
let dragStartX, dragStartY, cropStartX, cropStartY, cropStartW, cropStartH;

function openCropEditor(src, idx) {
  cropIdx = idx;
  const overlay = document.getElementById('cropOverlay');
  const canvas = document.getElementById('cropCanvas');
  const ctx = canvas.getContext('2d');

  const image = new Image();
  image.onload = () => {
    // fit image inside 500x500 max
    const maxW = Math.min(500, window.innerWidth - 40);
    const scale = Math.min(maxW / image.width, maxW / image.height, 1);
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    cropImg = { image, scale, w: canvas.width, h: canvas.height };

    // default crop box = center 80%
    const bx = canvas.width * .1;
    const by = canvas.height * .1;
    const bw = canvas.width * .8;
    const bh = canvas.height * .8;
    // make it square
    const bs = Math.min(bw, bh);
    cropImg.box = { x: bx, y: by, w: bs, h: bs };

    drawCrop();
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  image.src = src;
}

function drawCrop() {
  const canvas = document.getElementById('cropCanvas');
  const ctx = canvas.getContext('2d');
  const { image, scale, box } = cropImg;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // dim outside crop
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // cut out crop area (show original)
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.restore();

  // redraw image inside crop
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.w, box.h);
  ctx.clip();
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  // crop border
  ctx.strokeStyle = '#e8769f';
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.w, box.h);

  // rule of thirds grid
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 0.8;
  for (let t = 1; t < 3; t++) {
    ctx.beginPath();
    ctx.moveTo(box.x + box.w * t / 3, box.y);
    ctx.lineTo(box.x + box.w * t / 3, box.y + box.h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(box.x, box.y + box.h * t / 3);
    ctx.lineTo(box.x + box.w, box.y + box.h * t / 3);
    ctx.stroke();
  }

  // resize handle (bottom-right)
  ctx.fillStyle = '#e8769f';
  ctx.fillRect(box.x + box.w - 10, box.y + box.h - 10, 10, 10);
}

function getCropPos(e) {
  const canvas = document.getElementById('cropCanvas');
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const touch = e.touches ? e.touches[0] : e;
  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY
  };
}

function onCropStart(e) {
  e.preventDefault();
  const pos = getCropPos(e);
  const box = cropImg.box;
  const handleSize = 16;

  // check resize handle (bottom-right corner)
  if (pos.x >= box.x + box.w - handleSize && pos.y >= box.y + box.h - handleSize) {
    isResizing = true;
  } else if (pos.x >= box.x && pos.x <= box.x + box.w && pos.y >= box.y && pos.y <= box.y + box.h) {
    isDragging = true;
    dragStartX = pos.x - box.x;
    dragStartY = pos.y - box.y;
  }
  cropStartW = box.w;
  cropStartH = box.h;
  cropStartX = pos.x;
  cropStartY = pos.y;
}

function onCropMove(e) {
  if (!isDragging && !isResizing) return;
  e.preventDefault();
  const pos = getCropPos(e);
  const box = cropImg.box;
  const { w: cw, h: ch } = cropImg;

  if (isDragging) {
    box.x = Math.max(0, Math.min(cw - box.w, pos.x - dragStartX));
    box.y = Math.max(0, Math.min(ch - box.h, pos.y - dragStartY));
  } else if (isResizing) {
    const delta = Math.max(pos.x - cropStartX, pos.y - cropStartY);
    const newS = Math.max(40, Math.min(cropStartW + delta, cw - box.x, ch - box.y));
    box.w = newS;
    box.h = newS;
  }
  drawCrop();
}

function onCropEnd(e) {
  isDragging = false;
  isResizing = false;
}

function applyCrop() {
  const { image, scale, box } = cropImg;
  const out = document.createElement('canvas');
  // output at original image resolution
  out.width = box.w / scale;
  out.height = box.h / scale;
  out.getContext('2d').drawImage(
    image,
    box.x / scale, box.y / scale,
    box.w / scale, box.h / scale,
    0, 0, out.width, out.height
  );
  const result = out.toDataURL('image/jpeg', 0.92);
  photoStore[cropIdx] = result;
  savePhotoStore();
  buildGallery();
  closeCropEditor();
}

function closeCropEditor() {
  document.getElementById('cropOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

function openLightbox(idx) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const ph = document.getElementById('lightboxPh');
  const cap = document.getElementById('lightboxCap');

  const imgSrc = photoStore[idx] || photoData[idx].defaultImg || null;
  cap.textContent = photoData[idx].caption;

  if (imgSrc) {
    img.src = imgSrc;
    img.style.display = 'block';
    ph.style.display = 'none';
  } else {
    img.style.display = 'none';
    ph.style.display = 'flex';
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  const lb = document.getElementById('lightbox');
  if (!e || e.target === lb || (e.currentTarget && e.currentTarget.classList.contains('lightbox-close'))) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ════════════════════════════════════════════════
   PESAN — SHARED via JSONBin.io
   Semua user bisa kirim & baca pesan yang sama
════════════════════════════════════════════════ */

// ── Helpers ──
async function fetchMessages() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
    headers: { 'X-Master-Key': JSONBIN_API_KEY }
  });
  if (!res.ok) throw new Error('Fetch gagal');
  const data = await res.json();
  return data.record.messages || [];
}

async function saveMessages(messages) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_API_KEY
    },
    body: JSON.stringify({ messages })
  });
  if (!res.ok) throw new Error('Save gagal');
}

// ── Character count ──
function updateCount() {
  const len = document.getElementById('msgText').value.length;
  document.getElementById('charCount').textContent = len + ' / 500';
}

// ── Send message ──
async function sendMsg() {
  const name = (document.getElementById('msgName').value || 'Anonim').trim();
  const text = document.getElementById('msgText').value.trim();
  if (!text) { document.getElementById('msgText').focus(); return; }

  const btn = document.querySelector('#tabWriteContent .btn-primary');
  btn.textContent = 'Mengirim…'; btn.disabled = true;

  try {
    const messages = await fetchMessages();
    messages.unshift({
      name, text,
      time: new Date().toLocaleString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    });
    await saveMessages(messages);

    document.getElementById('msgName').value  = '';
    document.getElementById('msgText').value  = '';
    document.getElementById('charCount').textContent = '0 / 500';
    const s = document.getElementById('sendSuccess');
    s.classList.add('show');
    setTimeout(() => s.classList.remove('show'), 4500);
  } catch {
    alert('Oops, gagal mengirim pesan. Coba lagi ya 💕');
  } finally {
    btn.textContent = 'Kirim 💌'; btn.disabled = false;
  }
}

// ── Tab switch ──
function switchTab(t) {
  document.getElementById('tabWriteContent').style.display = t === 'write' ? 'block' : 'none';
  document.getElementById('tabReadContent').style.display  = t === 'read'  ? 'block' : 'none';
  document.getElementById('tabWrite').classList.toggle('active', t === 'write');
  document.getElementById('tabRead').classList.toggle('active',  t === 'read');
  if (t === 'read') {
    document.getElementById('lockScreen').style.display = 'block';
    document.getElementById('msgBox').style.display     = 'none';
  }
}

// ── Password check ──
function checkPass() {
  const v   = document.getElementById('passInput').value;
  const err = document.getElementById('passErr');
  if (v === READ_PASS) {
    document.getElementById('lockScreen').style.display = 'none';
    document.getElementById('msgBox').style.display     = 'block';
    document.getElementById('passInput').value = '';
    err.style.display = 'none';
    renderMsgs();
  } else {
    err.style.display = 'block';
    const inp = document.getElementById('passInput');
    inp.style.animation = 'none';
    setTimeout(() => { inp.style.animation = 'wobble .4s ease'; }, 10);
  }
}
document.getElementById('passInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPass();
});

function lockAgain() {
  document.getElementById('lockScreen').style.display = 'block';
  document.getElementById('msgBox').style.display     = 'none';
}

// ── Render messages ──
async function renderMsgs() {
  const list = document.getElementById('messagesList');
  list.innerHTML = `
    <div class="spinner">
      <div class="spin-dot"></div>
      <div class="spin-dot"></div>
      <div class="spin-dot"></div>
      <span>Mengambil pesan…</span>
    </div>`;

  try {
    const messages = await fetchMessages();
    document.getElementById('msgCount').textContent = messages.length + ' pesan masuk 💌';

    if (!messages.length) {
      list.innerHTML = '<div class="empty-msg">Belum ada pesan masuk 🌸<br>Tunggu dia mengirim pesan pertama!</div>';
      return;
    }
    list.innerHTML = messages.map((m, i) => `
      <div class="msg-card">
        <div class="msg-name">
          <span>🌸 ${escHtml(m.name)}</span>
          <button class="msg-delete" onclick="delMsg(${i})">✕</button>
        </div>
        <div class="msg-text">${escHtml(m.text).replace(/\n/g, '<br>')}</div>
        <div class="msg-time">📅 ${m.time}</div>
      </div>`).join('');
  } catch {
    list.innerHTML = '<div class="empty-msg">Gagal memuat pesan. Cek koneksi & konfigurasi API 🌸</div>';
  }
}

async function delMsg(i) {
  if (!confirm('Hapus pesan ini?')) return;
  try {
    const messages = await fetchMessages();
    messages.splice(i, 1);
    await saveMessages(messages);
    renderMsgs();
  } catch {
    alert('Gagal menghapus. Coba lagi 💕');
  }
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ════════════════
   WISH / PERASAAN
════════════════ */
const wishResp = [
  "Syukurlah! Kebahagiaanmu adalah kebahagiaanku juga. Semoga hari ini terus penuh senyum untukmu, sayang 🌸",
  "Istirahat ya, kamu sudah bekerja keras. Aku di sini kalau kamu butuh seseorang untuk bersandar. Peluk hangat 🤗",
  "Aku di sini, ya. Cerita apa saja, aku mau mendengarkan semuanya. Kamu tidak pernah sendirian selama aku ada 💕",
  "Semangatmu menularkan hal positif ke semua orang di sekitarmu. Kamu memang luar biasa, terus bersinar! ✨",
  "Aku kangen kamu juga, lebih dari yang bisa aku ungkapkan dengan kata-kata. Sebentar lagi kita ketemu ya 🥺💌",
  "Ketenangan adalah tanda kamu sudah berada di tempat yang tepat. Nikmati momenmu, kamu berhak bahagia 🌙",
];

function pickWish(el, idx) {
  document.querySelectorAll('.wish-card').forEach(c => c.classList.remove('picked'));
  el.classList.add('picked');
  const r = document.getElementById('wishResponse');
  r.classList.remove('show');
  setTimeout(() => { r.textContent = wishResp[idx]; r.classList.add('show'); }, 100);
}
