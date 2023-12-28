import express from 'express';
import { createGLN, getGLNProductsDetails } from '../../controllers/glnController.js';
import { upload } from '../../configs/multerConfig.js';




const router = express.Router();
// Routes


router.post('/', upload([
    { name: 'gln_image', path: 'public/uploads/products/membersGlnImages' },
]), createGLN);


router.get('/', getGLNProductsDetails);

export default router;