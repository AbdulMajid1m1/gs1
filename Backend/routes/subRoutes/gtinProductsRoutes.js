import express from 'express';
import { deleteGtinSubscription, deleteOtherProductsSubscription, getAllgtinProducts, getGtinSubscriptions, getUserSubscribedProductsNames } from '../../controllers/gtinProductsController.js';




const router = express.Router();
// Routes
router.get('/', getAllgtinProducts); // Get all CRs

router.get('/subcriptionsProducts', getGtinSubscriptions); // Get all CRs

router.get('/getUserSubscribedProductsNames', getUserSubscribedProductsNames);


router.delete('/gtinSubscriptions/:id', deleteGtinSubscription);

router.delete('/deleteotherProductsSubscriptionsFromAdmin', deleteOtherProductsSubscription);

export default router;