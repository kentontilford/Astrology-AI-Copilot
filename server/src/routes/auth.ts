import express from 'express';
import { Webhook } from 'svix';
import dotenv from 'dotenv';
import { requireAuth } from '../middleware/authMiddleware';
import { getCurrentUser, handleWebhook } from '../controllers/authController';

dotenv.config();

const router = express.Router();

// Get current user
router.get('/me', requireAuth, getCurrentUser);

// Clerk webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  // Verify the webhook signature
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    console.error('Missing Clerk webhook secret');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const svixHeaders = {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    };
    
    const wh = new Webhook(WEBHOOK_SECRET);
    const payload = wh.verify(req.body, svixHeaders);
    
    const { type } = payload;
    
    // Process the webhook event
    await handleWebhook(type, payload.data);
    
    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(400).json({ error: 'Invalid webhook payload' });
  }
});

export const authRouter = router;