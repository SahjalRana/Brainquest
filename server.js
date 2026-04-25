require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/otp', require('./routes/otpRoutes'));

// MongoDB Integration for Permanent Storage
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
let dbConnected = false;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas successfully.');
      dbConnected = true;
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

const dbSchema = new mongoose.Schema({
  id: { type: String, default: 'global' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
});
const GlobalDB = mongoose.model('GlobalDB', dbSchema);

// Global Memory Sync (Fallback for Local Dev without Mongo)
let globalMemoryDB = null;

app.get('/api/sync', async (req, res) => {
  if (dbConnected) {
    try {
      let doc = await GlobalDB.findOne({ id: 'global' });
      res.json(doc && doc.data ? doc.data : {});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB Read Error' });
    }
  } else {
    res.json(globalMemoryDB || {});
  }
});

app.post('/api/sync', async (req, res) => {
  if (dbConnected) {
    try {
      await GlobalDB.findOneAndUpdate(
        { id: 'global' },
        { data: req.body },
        { upsert: true, new: true }
      );
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB Write Error' });
    }
  } else {
    globalMemoryDB = req.body;
    res.json({ success: true });
  }
});


// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', name: 'BrainQuest API' }));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`\n  BrainQuest Server running on http://localhost:${PORT}\n`);
});