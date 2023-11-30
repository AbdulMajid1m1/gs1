import express from 'express';
import { getAllOtherProducts } from '../../controllers/otherProuductController.js';




const router = express.Router();

// Cr Routes
router.get('/', getAllOtherProducts); // Get all CRs 


export default router;