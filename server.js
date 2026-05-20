import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Route for upload page
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// API route — sends YouTube credentials to frontend safely
app.get('/api/config', (req, res) => {
  res.json({
    youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID,
    youtubeApiKey: process.env.YOUTUBE_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});