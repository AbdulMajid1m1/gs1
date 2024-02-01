
import express from 'express';
import { createGtinProducts, deleteGtinProducts, getAllGtinProducts, getGtinProductsById, updateGtinProducts } from '../../controllers/gtinProductCategoriesController.js';
import { adminAuth, checkPermission, generalAuth } from '../../middlewares/auth.js';




const router = express.Router();


// Create a new gtin_products entry
router.post('/', adminAuth, checkPermission(['gtin_barcode_pricing']), createGtinProducts);

// Get all gtin_products entries
router.get('/', generalAuth, getAllGtinProducts);

// Get a gtin_products entry by ID
router.get('/getGtinProductsById/:id', generalAuth, getGtinProductsById);

// Update a gtin_products entry by ID
router.put('/:id', adminAuth, checkPermission(['gtin_barcode_pricing']), updateGtinProducts);

// Delete a gtin_products entry by ID
router.delete('/:id', adminAuth, checkPermission(['gtin_barcode_pricing']), deleteGtinProducts);

export default router;


