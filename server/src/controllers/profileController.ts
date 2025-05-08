import { Request, Response } from 'express';
import { BirthProfile, User } from '../models';
import { AppError } from '../middleware/errorHandler';

// Get all birth profiles for the authenticated user
export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    const profiles = await BirthProfile.findAll({
      where: { userId: user.id },
      order: [['isDefault', 'DESC'], ['createdAt', 'DESC']]
    });
    
    return res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific birth profile by ID
export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    const profile = await BirthProfile.findOne({
      where: { id, userId: user.id }
    });
    
    if (!profile) {
      throw new AppError('Birth profile not found', 404);
    }
    
    return res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new birth profile
export const createProfile = async (req: Request, res: Response) => {
  try {
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    const { 
      name, 
      birthDate, 
      birthTime, 
      latitude, 
      longitude, 
      location, 
      notes, 
      isDefault 
    } = req.body;
    
    // Validate required fields
    if (!name || !birthDate || !birthTime || !latitude || !longitude || !location) {
      throw new AppError('Missing required fields', 400);
    }
    
    // If this profile is set as default, unset any existing default profiles
    if (isDefault) {
      await BirthProfile.update(
        { isDefault: false },
        { where: { userId: user.id, isDefault: true } }
      );
    }
    
    // Create the profile
    const profile = await BirthProfile.create({
      userId: user.id,
      name,
      birthDate,
      birthTime,
      latitude,
      longitude,
      location,
      notes,
      isDefault: isDefault || false
    });
    
    return res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing birth profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Check if profile exists and belongs to user
    const profile = await BirthProfile.findOne({
      where: { id, userId: user.id }
    });
    
    if (!profile) {
      throw new AppError('Birth profile not found', 404);
    }
    
    const { 
      name, 
      birthDate, 
      birthTime, 
      latitude, 
      longitude, 
      location, 
      notes, 
      isDefault 
    } = req.body;
    
    // If this profile is being set as default, unset any existing default profiles
    if (isDefault && !profile.isDefault) {
      await BirthProfile.update(
        { isDefault: false },
        { where: { userId: user.id, isDefault: true } }
      );
    }
    
    // Update the profile
    await profile.update({
      name: name || profile.name,
      birthDate: birthDate || profile.birthDate,
      birthTime: birthTime || profile.birthTime,
      latitude: latitude !== undefined ? latitude : profile.latitude,
      longitude: longitude !== undefined ? longitude : profile.longitude,
      location: location || profile.location,
      notes: notes !== undefined ? notes : profile.notes,
      isDefault: isDefault !== undefined ? isDefault : profile.isDefault
    });
    
    return res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a birth profile
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Check if profile exists and belongs to user
    const profile = await BirthProfile.findOne({
      where: { id, userId: user.id }
    });
    
    if (!profile) {
      throw new AppError('Birth profile not found', 404);
    }
    
    // Check if this is the only profile
    const profileCount = await BirthProfile.count({
      where: { userId: user.id }
    });
    
    // Delete the profile
    await profile.destroy();
    
    // If this was the default profile and there are other profiles,
    // set the most recently created one as the new default
    if (profile.isDefault && profileCount > 1) {
      const newDefaultProfile = await BirthProfile.findOne({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']]
      });
      
      if (newDefaultProfile) {
        await newDefaultProfile.update({ isDefault: true });
      }
    }
    
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting profile:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Set a profile as the default
export const setDefaultProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Check if profile exists and belongs to user
    const profile = await BirthProfile.findOne({
      where: { id, userId: user.id }
    });
    
    if (!profile) {
      throw new AppError('Birth profile not found', 404);
    }
    
    // Unset any existing default profiles
    await BirthProfile.update(
      { isDefault: false },
      { where: { userId: user.id, isDefault: true } }
    );
    
    // Set this profile as default
    await profile.update({ isDefault: true });
    
    return res.json(profile);
  } catch (error) {
    console.error('Error setting default profile:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};