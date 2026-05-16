const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3333;

// Ensure directories exist
const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const BUGS_FILE = path.join(DATA_DIR, 'bugs.json');
if (!fs.existsSync(BUGS_FILE)) fs.writeFileSync(BUGS_FILE, '[]', 'utf-8');

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(UPLOAD_DIR));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, 'bug_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6) + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024, fieldSize: 50 * 1024 * 1024 } }); // 50MB per file/field

// Helper functions
function readBugs() {
  try { return JSON.parse(fs.readFileSync(BUGS_FILE, 'utf-8')); }
  catch (e) { return []; }
}
function writeBugs(bugs) {
  fs.writeFileSync(BUGS_FILE, JSON.stringify(bugs, null, 2), 'utf-8');
}

// ===== API ROUTES =====

// GET all bugs
app.get('/api/bugs', (req, res) => {
  const bugs = readBugs();
  // Sort newest first
  bugs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(bugs);
});

// POST new bug (with file uploads)
app.post('/api/bugs', upload.array('files', 20), (req, res) => {
  const bugs = readBugs();
  const id = 'BUG-' + String(bugs.length + 1).padStart(4, '0');
  
  // Handle uploaded files
  const files = (req.files || []).map(f => ({
    url: '/uploads/' + f.filename,
    name: f.originalname,
    type: f.mimetype,
    size: f.size
  }));

  // Handle base64 pasted images
  let pastedFiles = [];
  try {
    if (req.body.pastedImages) {
      const pasted = JSON.parse(req.body.pastedImages);
      pasted.forEach((img, i) => {
        const ext = img.type === 'video' ? '.webm' : '.png';
        const filename = 'paste_' + Date.now() + '_' + i + ext;
        const filepath = path.join(UPLOAD_DIR, filename);
        const base64Data = img.data.replace(/^data:[^;]+;base64,/, '');
        fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
        pastedFiles.push({
          url: '/uploads/' + filename,
          name: 'Pasted ' + (img.type === 'video' ? 'video' : 'image') + ' ' + (i + 1),
          type: img.type === 'video' ? 'video/webm' : 'image/png',
          size: fs.statSync(filepath).size
        });
      });
    }
  } catch (e) { console.error('Paste parse error:', e); }

  const bug = {
    id,
    title: req.body.title || 'Untitled Bug',
    description: req.body.description || '',
    module: req.body.module || '',
    priority: req.body.priority || 'MEDIUM',
    reporter: req.body.reporter || 'Anonymous',
    platform: req.body.platform || 'Web',
    status: 'Chưa fix',
    files: [...files, ...pastedFiles],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  bugs.push(bug);
  writeBugs(bugs);
  res.json({ success: true, bug });
});

// PATCH update bug status
app.patch('/api/bugs/:id', (req, res) => {
  const bugs = readBugs();
  const idx = bugs.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Bug not found' });
  
  if (req.body.status) bugs[idx].status = req.body.status;
  if (req.body.title) bugs[idx].title = req.body.title;
  if (req.body.description) bugs[idx].description = req.body.description;
  if (req.body.priority) bugs[idx].priority = req.body.priority;
  bugs[idx].updated_at = new Date().toISOString();
  
  writeBugs(bugs);
  res.json({ success: true, bug: bugs[idx] });
});

// DELETE bug
app.delete('/api/bugs/:id', (req, res) => {
  let bugs = readBugs();
  const bug = bugs.find(b => b.id === req.params.id);
  if (!bug) return res.status(404).json({ error: 'Bug not found' });
  
  // Delete associated files
  (bug.files || []).forEach(f => {
    const fp = path.join(__dirname, f.url);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  });
  
  bugs = bugs.filter(b => b.id !== req.params.id);
  writeBugs(bugs);
  res.json({ success: true });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BugTracker] Running on http://0.0.0.0:${PORT}`);
});
