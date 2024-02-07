import express from 'express';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';
import { createForeignGtins, deleteForeignGtins, getForeignGtins, getGtinProductDetailsFromGlobalDb, getGtinProductDetailsFromLocalDb, searchGTINwithMap, updateForeignGtins } from '../../controllers/foreignGtinController.js';

const router = express.Router();

router.get('/getGtinProductDetailsFromLocalDb', getGtinProductDetailsFromLocalDb);

router.get('/getGtinProductDetailsFromGlobalDb', getGtinProductDetailsFromGlobalDb);

router.get("/searchGTINwithMap", searchGTINwithMap);

router.post('/', createForeignGtins); // Create a Foreign GTIN
router.get('/', getForeignGtins)
router.put('/:id', updateForeignGtins); // Update a Foreign GTIN by ID
router.delete('/:id', deleteForeignGtins); // Delete a Foreign GTIN by ID

export default router;