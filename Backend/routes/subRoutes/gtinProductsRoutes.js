import express from 'express';
import { getAllgtinProducts, getGtinSubscriptions } from '../../controllers/gtinProductsController.js';




const router = express.Router();
// Routes
router.get('/', getAllgtinProducts); // Get all CRs

router.get('/gtinSubcriptions', getGtinSubscriptions); // Get all CRs


export default router;