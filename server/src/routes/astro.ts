import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import {
  getBirthChart,
  getTransitChart,
  getCompositeChart,
  calculateChart,
  getHouseSystems,
  getCelestialBodies,
  getAspects
} from '../controllers/astroController';

const router = express.Router();

// Reference data endpoints
router.get('/house-systems', getHouseSystems);
router.get('/celestial-bodies', getCelestialBodies);
router.get('/aspects', getAspects);

// Chart calculation endpoints (authenticated)
router.use(requireAuth);
router.get('/chart/:profileId', getBirthChart);
router.get('/transit/:profileId', getTransitChart);
router.get('/composite/:profileId1/:profileId2', getCompositeChart);
router.post('/calculate', calculateChart);

export const astroRouter = router;