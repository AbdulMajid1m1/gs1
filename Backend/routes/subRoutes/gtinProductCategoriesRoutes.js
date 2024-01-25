
import express from 'express';
import { createGtinProducts, deleteGtinProducts, getAllGtinProducts, getGtinProductsById, updateGtinProducts } from '../../controllers/gtinProductCategoriesController.js';




const router = express.Router();


// Create a new gtin_products entry
router.post('/', createGtinProducts);

// Get all gtin_products entries
router.get('/', getAllGtinProducts);

// Get a gtin_products entry by ID
router.get('/getGtinProductsById/:id', getGtinProductsById);

// Update a gtin_products entry by ID
router.put('/:id', updateGtinProducts);

// Delete a gtin_products entry by ID
router.delete('/:id', deleteGtinProducts);

export default router;


