import express from 'express';
import { createBrand, getBrands, updateBrand, deleteBrand } from '../../controllers/brandController.js';

const router = express.Router();

// Routes for brands
router.post('/', createBrand);
router.get('/', getBrands);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default router;
