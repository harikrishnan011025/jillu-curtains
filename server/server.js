const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/business-info', (req, res) => {
  res.json({
    name: "Luxury Experience Hub",
    experienceYears: 15,
    tagline: "15 Years of Crafting Timeless Elegance",
    address: "123 Golden Boulevard, Suite 500, Prestige City",
    phone: "+1 (800) 555-GOLD",
    email: "contact@luxuryhub.com",
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  });
});

app.post('/api/send-whatsapp', async (req, res) => {
  const { name, phone, email, interest, message: userMessage, photoPreview } = req.body || {};

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+14155238886'
  const toNumber = process.env.WHATSAPP_TO || 'whatsapp:+917502718156';

  if (!accountSid || !authToken || !fromNumber) {
    return res.status(500).json({ success: false, error: 'Twilio is not configured on the server.' });
  }

  const twilio = require('twilio')(accountSid, authToken);
  const lines = [];
  if (name) lines.push(`Name: ${name}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (email) lines.push(`Email: ${email}`);
  if (interest) lines.push(`Interest: ${interest}`);
  if (userMessage) lines.push(`Message: ${userMessage}`);
  lines.push(photoPreview ? 'Photo attached: yes' : 'Photo attached: no');
  lines.push('I would like a free measurement visit.');

  try {
    const message = await twilio.messages.create({
      from: fromNumber,
      to: toNumber,
      body: lines.join('\n'),
    });

    return res.json({ success: true, sid: message.sid });
  } catch (error) {
    console.error('Twilio send error:', error && error.message ? error.message : error);
    return res.status(500).json({ success: false, error: error.message || String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});