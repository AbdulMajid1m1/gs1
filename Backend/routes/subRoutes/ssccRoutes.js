import express from 'express';
import { upload } from '../../configs/multerConfig.js';
import { createSSCC, deleteSSCC, getSSCCProductsDetails, updateSSCC } from '../../controllers/ssccController.js';
const router = express.Router();
// Adjust as per your upload middleware

router.post('/', createSSCC);

router.put('/:ssccId', updateSSCC);

router.get('/', getSSCCProductsDetails);
router.delete('/:id', deleteSSCC);

export default router;
