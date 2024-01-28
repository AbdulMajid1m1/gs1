import express from 'express';
import { upload } from '../../configs/multerConfig.js';
import { createBulkSSCC, createSSCC, deleteSSCC, getSSCCProductsDetails, updateSSCC } from '../../controllers/ssccController.js';
import { generalAuth } from '../../middlewares/auth.js';
const router = express.Router();


router.post('/', generalAuth, createSSCC);

router.post('/bulk', generalAuth, createBulkSSCC);

router.put('/:ssccId', generalAuth, updateSSCC);

router.get('/', getSSCCProductsDetails);
router.delete('/:id', generalAuth, deleteSSCC);

export default router;
