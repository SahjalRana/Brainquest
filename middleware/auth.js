const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'brainquest_secret_key_2026';

function protect(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ error: 'Not authenticated' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admin access required' });
  next();
}

function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try { req.user = jwt.verify(auth.split(' ')[1], SECRET); } catch (e) {}
  }
  next();
}

module.exports = { protect, adminOnly, optionalAuth, SECRET };
