import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../controllers/productsController.js';
import { upload } from '../../configs/multerConfig.js';

const router = express.Router();
router.get('/', getProducts);


router.post('/', upload([
    { name: 'front_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'back_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_1', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_2', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_3', path: 'public/uploads/products/memberProductsImages' },
]), createProduct);


router.put('/gtin/:id', upload([
    { name: 'front_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'back_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_1', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_2', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_3', path: 'public/uploads/products/memberProductsImages' },
]), updateProduct);


router.delete('/gtin/:id', deleteProduct);

export default router;