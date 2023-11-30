import express from 'express';
import { getAllgtinProducts } from '../../controllers/gtinProductsController.js';




const router = express.Router();
// Routes
router.get('/', getAllgtinProducts); // Get all CRs


export default router;