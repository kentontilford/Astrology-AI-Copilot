import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

// Extend Express Request interface to include auth info
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
        getToken: () => Promise<string | null>;
      };
    }
  }
}

// Basic Clerk authentication middleware
export const requireAuth = ClerkExpressRequireAuth({
  // Optional configuration
  onError: (error, req, res) => {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  },
});

// Middleware to check if the user has an active subscription
export const requireSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // The user is attached to the request by the auth middleware
    const userId = req.auth.userId;
    
    // In a real implementation, you'd check the user's subscription status
    // For example:
    // const user = await User.findOne({ where: { clerkId: userId }, include: 'subscription' });
    // if (!user || !user.subscription || !user.subscription.active) {
    //   return res.status(403).json({ error: 'Subscription required' });
    // }
    
    // For now, we'll just pass through since subscription functionality isn't implemented yet
    next();
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Combined middleware for routes that require both authentication and subscription
export const requireAuthWithSubscription = [requireAuth, requireSubscription];