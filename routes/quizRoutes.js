const express = require('express');
const pool = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    let q = 'SELECT * FROM quizzes';
    const params = [];
    if (req.query.category) { q += ' WHERE category = ?'; params.push(req.query.category); }
    q += ' ORDER BY created_at DESC';
    const [rows] = await pool.query(q, params);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Get quiz by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM quizzes WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Quiz not found' });
    const quiz = rows[0];
    quiz.question_ids = JSON.parse(quiz.question_ids || '[]');
    res.json(quiz);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Create quiz (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, description, category, difficulty, type, time_per_q, question_ids, is_kids } = req.body;
    if (!title || !category) return res.status(400).json({ error: 'Title and category required' });
    const [result] = await pool.query(
      'INSERT INTO quizzes (title, description, category, difficulty, type, time_per_q, question_ids, is_kids) VALUES (?,?,?,?,?,?,?,?)',
      [title, description || '', category, difficulty || 'Easy', type || 'quick', time_per_q || 20, JSON.stringify(question_ids || []), is_kids ? 1 : 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Update quiz (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { title, description, category, difficulty, type, time_per_q, question_ids, is_kids } = req.body;
    await pool.query(
      'UPDATE quizzes SET title=?, description=?, category=?, difficulty=?, type=?, time_per_q=?, question_ids=?, is_kids=? WHERE id=?',
      [title, description, category, difficulty, type, time_per_q, JSON.stringify(question_ids || []), is_kids ? 1 : 0, req.params.id]
    );
    res.json({ message: 'Updated' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Delete quiz (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM quizzes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Submit attempt
router.post('/:id/attempt', protect, async (req, res) => {
  try {
    const { score, correct, wrong, total, time_taken, answers } = req.body;
    const [result] = await pool.query(
      'INSERT INTO attempts (user_id, quiz_id, score, correct_count, wrong_count, total_count, time_taken, answers) VALUES (?,?,?,?,?,?,?,?)',
      [req.user.id, req.params.id, score, correct, wrong, total, time_taken, JSON.stringify(answers || [])]
    );
    // Update streak
    const today = new Date().toISOString().slice(0, 10);
    await pool.query(
      'INSERT INTO streaks (user_id, quiz_date) VALUES (?, ?) ON DUPLICATE KEY UPDATE quiz_date = quiz_date',
      [req.user.id, today]
    );
    res.status(201).json({ id: result.insertId, score });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
