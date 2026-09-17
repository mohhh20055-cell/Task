import express from 'express';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Enable JSON parser for API endpoints
app.use(express.json());

// Health Check for Render / Cloud Run uptime checks
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
  });
});

// Production Static File Serving & SPA Fallback
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routes (e.g. /admin, /#admin, etc.)
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running smoothly on http://${HOST}:${PORT}`);
});
