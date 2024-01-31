import express from 'express';
import { createGlnUpgradePricing, createGtinUpgradePricing, deleteGlnUpgradePricing, deleteGtinUpgradePricing, getAllGlnUpgradePricing, getAllGtinUpgradePricing, getGlnUpgradePricingById, getGtinUpgradePricingById, updateGlnUpgradePricing, updateGtinUpgradePricing } from '../../controllers/additionalProducts.js';
import { adminAuth, checkPermission, generalAuth } from '../../middlewares/auth.js';

const router = express.Router();
// Create a new gtin_upgrade_pricing entry
router.post('/gtin', adminAuth, checkPermission(['additional_gtin_pricing']), createGtinUpgradePricing);

// Get all gtin_upgrade_pricing entries
router.get('/gtin', getAllGtinUpgradePricing);

// Get a gtin_upgrade_pricing entry by ID
router.get('/getGtinUpgradePricingById/:id', getGtinUpgradePricingById);

// Update a gtin_upgrade_pricing entry by ID
router.put('/gtin/:id', adminAuth, checkPermission(['additional_gtin_pricing']), updateGtinUpgradePricing);

// Delete a gtin_upgrade_pricing entry by ID
router.delete('/gtin/:id', adminAuth, checkPermission(['additional_gtin_pricing']), deleteGtinUpgradePricing);


// Create a new gln_upgrade_pricing entry
router.post('/gln', adminAuth, checkPermission(['additional_gln']), createGlnUpgradePricing);

// Get all gln_upgrade_pricing entries
router.get('/gln', getAllGlnUpgradePricing);

// Get a gln_upgrade_pricing entry by ID
router.get('/getGlnUpgradePricingById/:id', getGlnUpgradePricingById);

// Update a gln_upgrade_pricing entry by ID
router.put('/gln/:id', adminAuth, checkPermission(['additional_gln']), updateGlnUpgradePricing);

// Delete a gln_upgrade_pricing entry by ID
router.delete('/gln/:id', adminAuth, checkPermission(['additional_gln']), deleteGlnUpgradePricing);









export default router;

