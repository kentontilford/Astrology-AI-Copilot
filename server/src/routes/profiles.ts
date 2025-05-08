import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { 
  getAllProfiles, 
  getProfileById, 
  createProfile, 
  updateProfile, 
  deleteProfile,
  setDefaultProfile
} from '../controllers/profileController';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Get all profiles for the authenticated user
router.get('/', getAllProfiles);

// Get a specific profile
router.get('/:id', getProfileById);

// Create a new profile
router.post('/', createProfile);

// Update a profile
router.put('/:id', updateProfile);

// Delete a profile
router.delete('/:id', deleteProfile);

// Set a profile as default
router.post('/:id/default', setDefaultProfile);

export const profilesRouter = router;