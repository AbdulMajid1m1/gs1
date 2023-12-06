import express from 'express';
import { createProductType, getAllProductTypes, getProductTypeById, updateProductType, deleteProductType } from '../../controllers/productTypesController.js';

const router = express.Router();

// Create a new product type
router.post('/', createProductType);

// Get all product types
router.get('/', getAllProductTypes);

// Get a product type by ID
router.get('/:id', getProductTypeById);

// Update a product type by ID
router.put('/:id', updateProductType);

// Delete a product type by ID
router.delete('/:id', deleteProductType);

export default router;
