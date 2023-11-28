import express from 'express';
import { getAttributesByKeyword } from '../../controllers/attributesController.js';





const router = express.Router();
// Routes
router.get('/:keyword', getAttributesByKeyword); // Get all CRs

export default router;