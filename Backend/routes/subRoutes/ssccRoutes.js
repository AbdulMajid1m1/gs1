import express from 'express';
import { upload } from '../../configs/multerConfig.js';
import { createBulkSSCC, createSSCC, deleteSSCC, getSSCCProductsDetails, updateSSCC } from '../../controllers/ssccController.js';
const router = express.Router();


router.post('/', createSSCC);

router.post('/bulk', createBulkSSCC);

router.put('/:ssccId', updateSSCC);

router.get('/', getSSCCProductsDetails);
router.delete('/:id', deleteSSCC);

export default router;
