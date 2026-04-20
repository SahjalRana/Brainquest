const express = require('express');
const pool = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Create category (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, icon, color, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const [result] = await pool.query('INSERT INTO categories (name, icon, color, description) VALUES (?, ?, ?, ?)', [name, icon || '', color || '#8b5cf6', description || '']);
    res.status(201).json({ id: result.insertId, name, icon, color, description });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Update category (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, icon, color, description } = req.body;
    await pool.query('UPDATE categories SET name=?, icon=?, color=?, description=? WHERE id=?', [name, icon, color, description, req.params.id]);
    res.json({ message: 'Updated' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// Delete category (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
