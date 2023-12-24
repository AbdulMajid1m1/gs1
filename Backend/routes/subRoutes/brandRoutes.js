import express from 'express';
import { createBrand, getBrands, updateBrand, deleteBrand } from '../../controllers/brandController.js';
import { upload } from '../../configs/multerConfig.js';

const router = express.Router();

// Routes for brands
// router.post('/', createBrand);


router.post('/', upload([
    {
        name: 'brandCertificate',
        path: 'public/uploads/documents/membersBrandCertificates',
    },
]), createBrand);
router.get('/', getBrands);
router.put('/:id', upload([
    {
        name: 'brandCertificate',
        path: 'public/uploads/documents/membersBrandCertificates',
    },
]), updateBrand);
router.delete('/:id', deleteBrand);

export default router;
