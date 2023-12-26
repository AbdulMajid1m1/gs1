import express from 'express';
import { searchHsCodes } from '../../controllers/hsCodesController.js';

const router = express.Router();

// Route to search HS codes
router.get('/searchHsCodes', searchHsCodes);

export default router;
