import express from 'express';
import { getGames, searchGames } from '../controllers/games.controller.js';

const router = express.Router();

// Route to get all games
router.get('/games', getGames);

// Route to search games by name
router.get('/games/search', searchGames);

export default router;
