const express = require('express');
const pool = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all users (admin)
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Promote/demote user (admin)
router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
    res.json({ message: 'Role updated' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Delete user (admin)
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    if (req.params.id == req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });
    await pool.query('DELETE FROM attempts WHERE user_id = ?', [req.params.id]);
    await pool.query('DELETE FROM streaks WHERE user_id = ?', [req.params.id]);
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Get stats (admin)
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [[{ userCount }]] = await pool.query('SELECT COUNT(*) as userCount FROM users');
    const [[{ quizCount }]] = await pool.query('SELECT COUNT(*) as quizCount FROM quizzes');
    const [[{ attemptCount }]] = await pool.query('SELECT COUNT(*) as attemptCount FROM attempts');
    const [[{ avgScore }]] = await pool.query('SELECT COALESCE(AVG(score), 0) as avgScore FROM attempts');
    res.json({ userCount, quizCount, attemptCount, avgScore: Math.round(avgScore) });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
