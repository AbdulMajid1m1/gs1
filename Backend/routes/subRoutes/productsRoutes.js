import express from 'express';
import { bulkCreateProduct, createProduct, deleteProduct, getProducts, searchMemberGtin, updateProduct } from '../../controllers/productsController.js';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';

const router = express.Router();
router.get('/', getProducts);
router.post('/sarchGtin', searchMemberGtin);


router.post('/', upload([
    { name: 'front_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'back_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_1', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_2', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_3', path: 'public/uploads/products/memberProductsImages' },
]), generalAuth, createProduct);


router.post('/bulkGtin', generalAuth, upload([
    { name: 'file', path: 'public/uploads/products/memberProductsFiles' },
]), bulkCreateProduct);


router.put('/gtin/:id', generalAuth, upload([
    { name: 'front_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'back_image', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_1', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_2', path: 'public/uploads/products/memberProductsImages' },
    { name: 'image_3', path: 'public/uploads/products/memberProductsImages' },
]), updateProduct);


router.delete('/gtin/:id', generalAuth, deleteProduct);

export default router;