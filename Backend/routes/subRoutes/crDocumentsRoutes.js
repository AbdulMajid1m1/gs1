import express from 'express';
import { getAllCrDocuments } from '../../controllers/crDocumentsController.js';





const router = express.Router();
// Routes
router.get('/', getAllCrDocuments); // Get all CRs

export default router;