const express = require('express');
const pool = require('../config/db');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    let q = `SELECT a.user_id, u.name, a.quiz_id, q.title as quiz_title, q.category,
             MAX(a.score) as best_score, MIN(a.time_taken) as best_time, a.correct_count, a.total_count
             FROM attempts a
             JOIN users u ON a.user_id = u.id
             JOIN quizzes q ON a.quiz_id = q.id`;
    const params = [];
    if (req.query.quiz_id) { q += ' WHERE a.quiz_id = ?'; params.push(req.query.quiz_id); }
    else if (req.query.category) { q += ' WHERE q.category = ?'; params.push(req.query.category); }
    q += ' GROUP BY a.user_id, a.quiz_id ORDER BY best_score DESC, best_time ASC LIMIT 50';
    const [rows] = await pool.query(q, params);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Get user history
router.get('/history', protect, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, q.title as quiz_title, q.category FROM attempts a
       JOIN quizzes q ON a.quiz_id = q.id WHERE a.user_id = ? ORDER BY a.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Get streak
router.get('/streak', protect, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT quiz_date FROM streaks WHERE user_id = ? ORDER BY quiz_date DESC',
      [req.user.id]
    );
    let count = 0;
    const dates = rows.map(r => r.quiz_date);
    if (dates.length) {
      count = 1;
      for (let i = 1; i < dates.length; i++) {
        const diff = (new Date(dates[i - 1]) - new Date(dates[i])) / 86400000;
        if (diff === 1) count++; else break;
      }
    }
    res.json({ count, dates });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
