import express from 'express';
import { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } from '../../controllers/productCategoriesController.js';

const router = express.Router();

// Create a new product category
router.post('/', createProductCategory);

// Get all product categories
router.get('/', getAllProductCategories);

// Get a product category by ID
router.get('/:id', getProductCategoryById);

// Update a product category by ID
router.put('/:id', updateProductCategory);

// Delete a product category by ID
router.delete('/:id', deleteProductCategory);

export default router;
