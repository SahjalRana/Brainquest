const express = require('express');
const pool = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all questions (with optional filters)
router.get('/', async (req, res) => {
  try {
    let q = 'SELECT * FROM questions';
    const params = [];
    const where = [];
    if (req.query.category) { where.push('category = ?'); params.push(req.query.category); }
    if (req.query.type) { where.push('type = ?'); params.push(req.query.type); }
    if (req.query.difficulty) { where.push('difficulty = ?'); params.push(req.query.difficulty); }
    if (where.length) q += ' WHERE ' + where.join(' AND ');
    q += ' ORDER BY id DESC';
    const [rows] = await pool.query(q, params);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Create question (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { category, type, difficulty, text, options, correct, explanation, is_kids, kids_category } = req.body;
    if (!text || !category) return res.status(400).json({ error: 'Text and category required' });
    const [result] = await pool.query(
      'INSERT INTO questions (category, type, difficulty, text, options, correct_answer, explanation, is_kids, kids_category) VALUES (?,?,?,?,?,?,?,?,?)',
      [category, type || 'mcq', difficulty || 'Easy', text, JSON.stringify(options || []), typeof correct === 'object' ? JSON.stringify(correct) : String(correct), explanation || '', is_kids ? 1 : 0, kids_category || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Update question (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { category, type, difficulty, text, options, correct, explanation, is_kids, kids_category } = req.body;
    await pool.query(
      'UPDATE questions SET category=?, type=?, difficulty=?, text=?, options=?, correct_answer=?, explanation=?, is_kids=?, kids_category=? WHERE id=?',
      [category, type, difficulty, text, JSON.stringify(options || []), typeof correct === 'object' ? JSON.stringify(correct) : String(correct), explanation, is_kids ? 1 : 0, kids_category || null, req.params.id]
    );
    res.json({ message: 'Updated' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Delete question (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM questions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
