import express from 'express';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';
import { createForeignGtins, deleteForeignGtins, getAllForeignGtins, getForeignGtinsById, getGtinProductDetailsFromGlobalDb, getGtinProductDetailsFromLocalDb, updateForeignGtins } from '../../controllers/foreignGtinController.js';

const router = express.Router();

router.get('/getGtinProductDetailsFromLocalDb', getGtinProductDetailsFromLocalDb);

router.get('/getGtinProductDetailsFromGlobalDb', getGtinProductDetailsFromGlobalDb);



router.post('/', createForeignGtins); // Create a Foreign GTIN
router.get('/', getAllForeignGtins); // Get all Foreign GTINs
router.get('/:id', getForeignGtinsById); // Get a Foreign GTIN by ID
router.put('/:id', updateForeignGtins); // Update a Foreign GTIN by ID
router.delete('/:id', deleteForeignGtins); // Delete a Foreign GTIN by ID

export default router;