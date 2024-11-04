import express from 'express';
import { getTripData, getTripStats } from '../controllers/tripController.js';

export const router = express.Router();

router.get('/', getTripData);

router.get('/stats', getTripStats);