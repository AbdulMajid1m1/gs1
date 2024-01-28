import express from 'express';
import { createGLN, deleteGLN, getGLNProductsDetails, updateGLN } from '../../controllers/glnController.js';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';




const router = express.Router();
// Routes


router.post('/', generalAuth, upload([
    { name: 'gln_image', path: 'public/uploads/products/membersGlnImages' },
]), createGLN);

router.put('/:id', generalAuth, upload([
    { name: 'gln_image', path: 'public/uploads/products/membersGlnImages' },
]), updateGLN);
router.get('/', getGLNProductsDetails);


router.delete('/:id', generalAuth, deleteGLN);


export default router;