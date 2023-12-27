import express from 'express';
import { getAllgtinProducts, getGtinSubscriptions, getUserSubscribedProductsNames } from '../../controllers/gtinProductsController.js';




const router = express.Router();
// Routes
router.get('/', getAllgtinProducts); // Get all CRs

router.get('/subcriptionsProducts', getGtinSubscriptions); // Get all CRs

router.get('/getUserSubscribedProductsNames', getUserSubscribedProductsNames);

export default router;