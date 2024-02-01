import express from 'express';
import { createCrs, getAllCrs, getCrsById, updateCrs, deleteCrs, getCrsByKeyword, getCrsByCrNo } from '../../controllers/crsContoller.js';
import { adminAuth, checkPermission } from '../../middlewares/auth.js';




const router = express.Router();
// Routes
router.post('/', adminAuth, checkPermission(["cr_number"]), createCrs); // Create a new CR
router.get('/', getAllCrs); // Get all CRs
router.get('/getCrsById/:id', getCrsById); // Get a CR by ID
router.get('/getCrsByCrNo/:cr', getCrsByCrNo); // Get a CR by ID
router.get('/seachByKeyword', getCrsByKeyword); // Get a CR by ID
router.put('/:id', adminAuth, checkPermission(["cr_number"]), updateCrs); // Update a CR by ID
router.delete('/:id', adminAuth, checkPermission(["cr_number"]), deleteCrs); // Delete a CR by ID

export default router;