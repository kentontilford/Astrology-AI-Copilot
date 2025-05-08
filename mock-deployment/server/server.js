const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Astrology AI Copilot API is running',
    version: '0.1.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mock endpoint for auth status
app.get('/api/auth/user', (req, res) => {
  res.json({ 
    id: '123',
    email: 'user@example.com',
    isAuthenticated: true,
    subscription: {
      isActive: true,
      plan: 'PREMIUM',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
