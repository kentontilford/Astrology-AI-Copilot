// Simple Express server for Railway deployment

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Webhook } = require('svix');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

// Configure middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Auth middleware
const requireAuth = ClerkExpressRequireAuth({
  onError: (error, req, res) => {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  },
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Astrology AI Copilot API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.get('/api/auth/me', requireAuth, (req, res) => {
  try {
    const user = req.auth.userId;
    res.json({
      id: user,
      message: 'Authentication successful!'
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clerk webhook handler
app.post('/api/auth/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  // Verify the webhook signature
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error('Missing Clerk webhook secret');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const svixHeaders = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };
    
    const wh = new Webhook(WEBHOOK_SECRET);
    const payload = wh.verify(req.body, svixHeaders);
    
    const { type } = payload;
    console.log(`Webhook received: ${type}`);
    
    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(400).json({ error: 'Invalid webhook payload' });
  }
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Path ${req.originalUrl} does not exist on this server`
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Something went wrong on the server',
    message: err.message
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});