import express from 'express';
import { createGtinUpgradePricing, getAllGtinUpgradePricing, getGtinUpgradePricingById, updateGtinUpgradePricings, deleteGtinUpgradePricings, createGlnUpgradePricing, getAllGlnUpgradePricing } from '../../controllers/gtinUpgradeController.js';

const router = express.Router();

router.post('/', createGtinUpgradePricing);
router.post('/gln', createGlnUpgradePricing);
router.get('/', getAllGtinUpgradePricing);
router.get('/gln', getAllGlnUpgradePricing);
router.get('/:id', getGtinUpgradePricingById);
router.put('/bulk-update', updateGtinUpgradePricings);
router.delete('/bulk-delete', deleteGtinUpgradePricings);

export default router;
