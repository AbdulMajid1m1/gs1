import express from 'express';
import { createGLN, getGLNProductsDetails, updateGLN } from '../../controllers/glnController.js';
import { upload } from '../../configs/multerConfig.js';




const router = express.Router();
// Routes


router.post('/', upload([
    { name: 'gln_image', path: 'public/uploads/products/membersGlnImages' },
]), createGLN);

router.put('/:id', upload([
    { name: 'gln_image', path: 'public/uploads/products/membersGlnImages' },
]), updateGLN);
router.get('/', getGLNProductsDetails);

export default router;