import { Request, Response } from 'express';
import { calculateNatalChart, calculateTransits, calculateCompositeChart } from '../services/ephemeris/swissephService';
import { ChartData } from '../types/ephemeris';
import { BirthProfile, User } from '../models';
import { AppError } from '../middleware/errorHandler';

// Calculate a birth chart from a saved profile
export const getBirthChart = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Get the birth profile
    const profile = await BirthProfile.findOne({
      where: { id: profileId, userId: user.id }
    });
    
    if (!profile) {
      throw new AppError('Birth profile not found', 404);
    }
    
    // Parse birth date and time
    const birthDate = new Date(profile.birthDate);
    const birthTime = profile.birthTime;
    
    // Calculate the natal chart
    const chart = calculateNatalChart({
      date: birthDate,
      time: birthTime.substring(0, 5), // Extract HH:MM format
      latitude: profile.latitude,
      longitude: profile.longitude,
      houseSystem: req.query.houseSystem as string || 'P', // Default to Placidus
    });
    
    return res.json(chart);
  } catch (error) {
    console.error('Error calculating birth chart:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Calculate a transit chart for a saved profile
export const getTransitChart = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const { date = new Date().toISOString().split('T')[0] } = req.query;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Get the birth profile
    const profile = await BirthProfile.findOne({
      where: { id: profileId, userId: user.id }
    });
    
    if (!profile) {
      throw new AppError('Birth profile not found', 404);
    }
    
    // Parse birth date and time
    const birthDate = new Date(profile.birthDate);
    const birthTime = profile.birthTime;
    
    // Calculate the natal chart
    const birthChart = calculateNatalChart({
      date: birthDate,
      time: birthTime.substring(0, 5), // Extract HH:MM format
      latitude: profile.latitude,
      longitude: profile.longitude,
    });
    
    // Parse transit date
    const transitDate = new Date(date as string);
    
    // Calculate the transit chart
    const transitChart = calculateTransits(birthChart, transitDate);
    
    return res.json({
      birthChart,
      transitChart,
    });
  } catch (error) {
    console.error('Error calculating transit chart:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Calculate a composite chart between two saved profiles
export const getCompositeChart = async (req: Request, res: Response) => {
  try {
    const { profileId1, profileId2 } = req.params;
    const clerkId = req.auth.userId;
    
    // Find user ID from clerk ID
    const user = await User.findOne({ where: { clerkId } });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Get the first birth profile
    const profile1 = await BirthProfile.findOne({
      where: { id: profileId1, userId: user.id }
    });
    
    if (!profile1) {
      throw new AppError('First birth profile not found', 404);
    }
    
    // Get the second birth profile
    const profile2 = await BirthProfile.findOne({
      where: { id: profileId2, userId: user.id }
    });
    
    if (!profile2) {
      throw new AppError('Second birth profile not found', 404);
    }
    
    // Calculate both natal charts
    const chart1 = calculateNatalChart({
      date: new Date(profile1.birthDate),
      time: profile1.birthTime.substring(0, 5),
      latitude: profile1.latitude,
      longitude: profile1.longitude,
    });
    
    const chart2 = calculateNatalChart({
      date: new Date(profile2.birthDate),
      time: profile2.birthTime.substring(0, 5),
      latitude: profile2.latitude,
      longitude: profile2.longitude,
    });
    
    // Calculate the composite chart
    const compositeChart = calculateCompositeChart(chart1, chart2);
    
    return res.json({
      chart1,
      chart2,
      compositeChart,
    });
  } catch (error) {
    console.error('Error calculating composite chart:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Calculate a chart from direct data (not from a saved profile)
export const calculateChart = async (req: Request, res: Response) => {
  try {
    const { 
      birthDate, 
      birthTime, 
      latitude, 
      longitude, 
      location,
      houseSystem = 'P'
    } = req.body;
    
    // Validate required fields
    if (!birthDate || !birthTime || latitude === undefined || longitude === undefined) {
      throw new AppError('Missing required fields', 400);
    }
    
    // Parse date and time
    const date = new Date(birthDate);
    
    // Calculate the natal chart
    const chart = calculateNatalChart({
      date,
      time: birthTime,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      houseSystem,
    });
    
    return res.json(chart);
  } catch (error) {
    console.error('Error calculating chart:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get available house systems
export const getHouseSystems = async (req: Request, res: Response) => {
  try {
    const { HOUSE_SYSTEMS } = require('../types/ephemeris');
    return res.json(HOUSE_SYSTEMS);
  } catch (error) {
    console.error('Error getting house systems:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get available celestial bodies
export const getCelestialBodies = async (req: Request, res: Response) => {
  try {
    const { CELESTIAL_BODIES } = require('../types/ephemeris');
    return res.json(CELESTIAL_BODIES);
  } catch (error) {
    console.error('Error getting celestial bodies:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get available aspects
export const getAspects = async (req: Request, res: Response) => {
  try {
    const { ASPECTS } = require('../types/ephemeris');
    return res.json(ASPECTS);
  } catch (error) {
    console.error('Error getting aspects:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};