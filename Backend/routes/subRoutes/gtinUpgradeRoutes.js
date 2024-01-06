import express from 'express';
import { createGtinUpgradePricing, getAllGtinUpgradePricing, getGtinUpgradePricingById, updateGtinUpgradePricings, deleteGtinUpgradePricings  } from '../../controllers/gtinUpgradeController.js';

const router = express.Router();

router.post('/', createGtinUpgradePricing);
router.get('/', getAllGtinUpgradePricing);
router.get('/:id', getGtinUpgradePricingById);
router.put('/bulk-update', updateGtinUpgradePricings);
router.delete('/bulk-delete', deleteGtinUpgradePricings );

export default router;
