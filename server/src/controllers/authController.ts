import { Request, Response } from 'express';
import { User } from '../models';
import { AppError } from '../middleware/errorHandler';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

// Get the currently authenticated user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const clerkId = req.auth.userId;
    
    if (!clerkId) {
      throw new AppError('User not authenticated', 401);
    }
    
    // Find user in database
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      // If user doesn't exist in our database, return limited info
      return res.json({
        id: null,
        clerkId,
        email: null,
        firstName: null,
        lastName: null,
        subscriptionStatus: 'free',
        isNewUser: true,
      });
    }
    
    // Return user data
    return res.json({
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionExpiresAt: user.subscriptionExpiresAt,
      isNewUser: false,
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle Clerk webhook events to sync user data
export const handleWebhook = async (event: string, data: any) => {
  try {
    switch (event) {
      case 'user.created':
        await createOrUpdateUser(data);
        break;
      case 'user.updated':
        await createOrUpdateUser(data);
        break;
      case 'user.deleted':
        await deleteUser(data.id);
        break;
    }
  } catch (error) {
    console.error(`Error handling webhook event ${event}:`, error);
  }
};

// Create or update a user in our database from Clerk data
const createOrUpdateUser = async (userData: any) => {
  try {
    const {
      id: clerkId,
      email_addresses,
      first_name,
      last_name,
      image_url,
    } = userData;
    
    // Get primary email
    const primaryEmail = email_addresses.find((email: any) => email.id === userData.primary_email_address_id);
    const email = primaryEmail ? primaryEmail.email_address : email_addresses[0]?.email_address;
    
    if (!email) {
      throw new Error('User has no email address');
    }
    
    // Find or create user
    const [user, created] = await User.findOrCreate({
      where: { clerkId },
      defaults: {
        email,
        firstName: first_name,
        lastName: last_name,
        profileImageUrl: image_url,
        subscriptionStatus: 'free',
      },
    });
    
    // If user exists, update their info
    if (!created) {
      await user.update({
        email,
        firstName: first_name,
        lastName: last_name,
        profileImageUrl: image_url,
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
};

// Delete a user from our database
const deleteUser = async (clerkId: string) => {
  try {
    const user = await User.findOne({ where: { clerkId } });
    if (user) {
      await user.destroy();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};