import express from 'express';
import { createCrs, getAllCrs, getCrsById, updateCrs, deleteCrs } from '../../controllers/crsContoller.js';




const router = express.Router();
// Routes
router.post('/', createCrs); // Create a new CR
router.get('/', getAllCrs); // Get all CRs
router.get('/:id', getCrsById); // Get a CR by ID
router.put('/:id', updateCrs); // Update a CR by ID
router.delete('/:id', deleteCrs); // Delete a CR by ID

export default router;