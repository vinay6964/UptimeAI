import express from 'express';
import { getProfile } from '../controllers/githubController'; // Make sure this path is correct

const router = express.Router();

// The route simply says: "When /:username is hit, let the Controller handle it."
router.get('/:username', getProfile);

export default router;