const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// In-memory OTP store (use Redis/DB in production)
const otpStore = new Map();

// Create transporter - uses Gmail by default
// You can also use other services like Outlook, Yahoo, etc.
function createTransporter() {
  const service = process.env.EMAIL_SERVICE || 'gmail';
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️  EMAIL_USER and EMAIL_PASS not set in .env — using simulated mode');
    return null;
  }

  return nodemailer.createTransport({
    service: service,
    auth: { user, pass }
  });
}

// Generate 6-digit OTP
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Send OTP email
router.post('/send', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const code = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP
    otpStore.set(email.toLowerCase(), { code, expires, name });

    // Auto-cleanup after 6 minutes
    setTimeout(() => otpStore.delete(email.toLowerCase()), 6 * 60 * 1000);

    const transporter = createTransporter();

    if (transporter) {
      // Send real email
      await transporter.sendMail({
        from: `"BrainQuest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🔐 BrainQuest - Email Verification Code',
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:480px;margin:0 auto;background:#07080f;color:#f0f4ff;border-radius:16px;overflow:hidden;border:1px solid rgba(139,92,246,.3)">
            <div style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);padding:32px;text-align:center">
              <h1 style="margin:0;font-size:28px;color:#fff;letter-spacing:-0.5px">🧠 BrainQuest</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px">Email Verification</p>
            </div>
            <div style="padding:32px;text-align:center">
              <p style="color:#8b95c4;font-size:15px;margin:0 0 8px">Hi <strong style="color:#f0f4ff">${name || 'there'}</strong>,</p>
              <p style="color:#8b95c4;font-size:14px;margin:0 0 24px">Use this code to verify your email address:</p>
              <div style="background:rgba(139,92,246,.12);border:2px solid rgba(139,92,246,.3);border-radius:12px;padding:20px;margin:0 0 24px">
                <div style="font-family:'Courier New',monospace;font-size:36px;font-weight:800;letter-spacing:12px;color:#c4b5fd">${code}</div>
              </div>
              <p style="color:#4a5280;font-size:12px;margin:0">This code expires in <strong>5 minutes</strong>.</p>
              <p style="color:#4a5280;font-size:12px;margin:4px 0 0">If you didn't request this, please ignore this email.</p>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,.08);padding:16px;text-align:center">
              <p style="margin:0;color:#4a5280;font-size:11px">© ${new Date().getFullYear()} BrainQuest — Challenge Your Mind</p>
            </div>
          </div>
        `
      });

      console.log(`✅ OTP sent to ${email}: ${code}`);
      res.json({ success: true, message: 'Verification code sent to your email' });
    } else {
      // Simulated mode - return code in response (development only)
      console.log(`🧪 Simulated OTP for ${email}: ${code}`);
      res.json({ success: true, simulated: true, code, message: 'Simulated mode - code shown on screen' });
    }
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Email address appears to be fake or invalid. Could not deliver code.' });
  }
});

// Verify OTP
router.post('/verify', (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Email and code are required' });

    const stored = otpStore.get(email.toLowerCase());

    if (!stored) {
      return res.status(400).json({ error: 'No verification code found. Please request a new one.' });
    }

    if (Date.now() > stored.expires) {
      otpStore.delete(email.toLowerCase());
      return res.status(400).json({ error: 'Code has expired. Please request a new one.' });
    }

    if (stored.code !== code.trim()) {
      return res.status(400).json({ error: 'Invalid code. Please try again.' });
    }

    // Code is valid - clean up
    otpStore.delete(email.toLowerCase());
    res.json({ success: true, verified: true });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
});

module.exports = router;
